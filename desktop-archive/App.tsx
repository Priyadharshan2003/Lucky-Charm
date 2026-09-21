import { useEffect, useState, useRef } from 'react';
import { usePhysicsCharm } from '@/physics';
import { CHARMS, getCharmById } from '@/core';
import { listen } from '@tauri-apps/api/event';
import { invoke } from '@tauri-apps/api/core';
import { register } from '@tauri-apps/plugin-global-shortcut';
import { onOpenUrl } from '@tauri-apps/plugin-deep-link';

function App() {
  const [activeCharm, setActiveCharm] = useState(() => {
    const saved = localStorage.getItem('ld-active-charm');
    if (saved) {
      return getCharmById(saved) || CHARMS[0];
    }
    return CHARMS[0];
  });
  const [dangled, setDangled] = useState(true);
  const [isBlessed, setIsBlessed] = useState(false);
  const [ropeLengthModifier, setRopeLengthModifier] = useState(1);
  const [autoCycle, setAutoCycle] = useState(false);
  
  const lastUpdateRef = useRef(0);
  const lastPosRef = useRef({ x: 0, y: 0 });

  const { canvasRef, charmPosition, charmAngle, flick, resetPhysics } = usePhysicsCharm({
    mass: activeCharm.mass,
    ropeLength: activeCharm.ropeLength * ropeLengthModifier,
    stiffness: activeCharm.stiffness,
    onUpdate: (points) => {
      const now = performance.now();
      if (now - lastUpdateRef.current < 32) return;
      const lastPoint = points[points.length - 1];
      const dpr = window.devicePixelRatio || 1;
      const cx = Math.round(lastPoint.position.x * dpr);
      const cy = Math.round(lastPoint.position.y * dpr);
      if (Math.abs(cx - lastPosRef.current.x) < 3 && Math.abs(cy - lastPosRef.current.y) < 3) return;
      lastUpdateRef.current = now;
      lastPosRef.current = { x: cx, y: cy };
      invoke("update_charm_pos", { x: cx, y: cy }).catch(() => {});
    }
  });

  // Deep Link & Shortcuts
  useEffect(() => {
    const unlistenDeepLink = onOpenUrl((urls) => {
      for (const url of urls) {
        if (url.includes('antigravity://ritual')) {
          setDangled(true);
          setTimeout(() => flick(200, -50), 600);
        }
      }
    });

    const registerShortcuts = async () => {
      try {
        await register('CommandOrControl+D', () => setDangled(d => !d));
        await register('CommandOrControl+R', () => {
          setDangled(true);
          setTimeout(() => flick(150, 0), 100);
        });
      } catch (e) {
        console.error("Failed to register shortcuts", e);
      }
    };
    
    registerShortcuts();

    return () => {
      unlistenDeepLink.then(fn => fn());
    };
  }, []);

  const flickRef = useRef(flick);
  const resetPhysicsRef = useRef(resetPhysics);
  useEffect(() => {
    flickRef.current = flick;
    resetPhysicsRef.current = resetPhysics;
  }, [flick, resetPhysics]);

  // Event Listeners from Tray Menu
  useEffect(() => {
    const listeners = [
      listen('bless', () => {
        setIsBlessed(true);
        setTimeout(() => setIsBlessed(false), 3000);
        flickRef.current(100, -20);
      }),
      listen('undangle', () => setDangled(false)),
      listen('fresh', () => {
        setDangled(true);
        if (resetPhysicsRef.current) resetPhysicsRef.current();
        setTimeout(() => flickRef.current(150, 0), 50);
      }),
      listen('len-up', () => setRopeLengthModifier(m => Math.min(m + 0.2, 2.0))),
      listen('len-down', () => setRopeLengthModifier(m => Math.max(m - 0.2, 0.4))),
      listen('toggle-auto-cycle', () => setAutoCycle(a => !a)),
      listen<string>('charm:selected', (event) => {
        const charm = getCharmById(event.payload);
        if (charm) {
          setActiveCharm(charm);
          localStorage.setItem('ld-active-charm', charm.id);
        }
      })
    ];

    const unlistenAll = async () => {
      for (const listener of listeners) {
        const f = await listener;
        f();
      }
    };

    return () => {
      unlistenAll();
    };
  }, []);

  // Auto Cycle
  useEffect(() => {
    if (!autoCycle) return;
    const interval = setInterval(() => {
      setActiveCharm(prev => {
        const idx = CHARMS.findIndex(c => c.id === prev.id);
        const next = CHARMS[(idx + 1) % CHARMS.length];
        localStorage.setItem('ld-active-charm', next.id);
        return next;
      });
    }, 10000); // cycle every 10 seconds
    return () => clearInterval(interval);
  }, [autoCycle]);

  useEffect(() => {
    setTimeout(() => {
      setDangled(true);
    }, 500);
  }, []);

  // Update dragging state to Tauri on pointer events for the charm
  const handlePointerDown = () => {
    invoke("set_dragging", { dragging: true }).catch(() => {});
  };

  const handlePointerUp = () => {
    invoke("set_dragging", { dragging: false }).catch(() => {});
    flick(0, 0); // Trigger release physics
  };

  return (
    <div style={{ width: '100vw', height: '100vh', overflow: 'hidden', position: 'relative' }}>
      <canvas 
        ref={canvasRef} 
        style={{ 
          position: 'absolute', 
          inset: 0, 
          width: '100%', 
          height: '100%', 
          touchAction: 'none'
        }}
        onPointerDown={handlePointerDown}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
      />
      
      {dangled && (
        <>
          <div 
            style={{
              position: 'absolute',
              pointerEvents: 'none',
              left: charmPosition.x,
              top: charmPosition.y,
              transform: `translate(-50%, 0%) rotate(${charmAngle}rad)`,
              transformOrigin: 'top center',
              filter: isBlessed ? 'drop-shadow(0 0 20px rgba(255,255,255,0.8))' : 'none',
              transition: 'filter 0.5s',
              zIndex: 2,
            }}
          >
            <img 
              src={activeCharm.assetUrl} 
              alt={activeCharm.name} 
              style={{ width: '128px', height: '128px', objectFit: 'contain', filter: 'drop-shadow(0 4px 12px rgba(0,0,0,0.5))' }}
              draggable="false"
            />
          </div>
        </>
      )}
    </div>
  );
}

export default App;
