// @ts-nocheck
import React from 'react';
import { k, dt } from './Physics';

interface CharmRendererProps {
  charmConfig: typeof dt[0];
  engine: any;
}

export const CharmRenderer: React.FC<CharmRendererProps> = ({ charmConfig, engine }) => {
  const { art, slug } = charmConfig;

  if (slug === 'maneki-neko') {
    const t = art.frame[0];
    const i = art.frame[1];
    const s = -charmConfig.attach * i;
    // Animation for arm can be done in CSS or in requestAnimationFrame
    // The pivot is [0.2431, 0.5713] of the frame size
    const px = (-t/2 + 0.2431 * t).toFixed(2);
    const py = (s + 0.5713 * i).toFixed(2);
    
    return (
      <>
        <image href="/charms/maneki-body.png" x={-t/2} y={s} width={t} height={i} />
        {/* We use a CSS animation or React state for waving */}
        <g id="dg-arm" style={{ transformOrigin: `${px}px ${py}px`, animation: 'wave 1s ease-in-out infinite alternate' }}>
          <image href="/charms/maneki-arm.png" x={-t/2} y={s} width={t} height={i} />
        </g>
        <style>{`
          @keyframes wave {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(15deg); }
          }
        `}</style>
      </>
    );
  }

  if (slug === 'daruma') {
    // Determine daruma state from local storage
    const state = parseInt(localStorage.getItem('ld-daruma') || '0', 10);
    const [i, s] = art.frame;
    const n = -charmConfig.attach * s;
    const a = 0.115 * i; // pupil
    
    const drawEye = (dx: number, dy: number) => {
      const cx = (-i/2 + dx * i).toFixed(2);
      const cy = (n + dy * s).toFixed(2);
      const hlx = (-i/2 + dx * i - 0.18 * a).toFixed(2);
      const hly = (n + dy * s - 0.2 * a).toFixed(2);
      return (
        <React.Fragment key={dx}>
          <circle cx={cx} cy={cy} r={(a/2).toFixed(2)} fill="#171416" />
          <circle cx={hlx} cy={hly} r={(0.12*a).toFixed(2)} fill="rgba(255,255,255,0.85)" />
        </React.Fragment>
      );
    };

    return (
      <>
        <image href="/charms/daruma.png" x={-i/2} y={n} width={i} height={s} />
        {state >= 1 && drawEye(0.3433, 0.3584)}
        {state >= 2 && drawEye(0.6509, 0.3584)}
      </>
    );
  }

  if (art.type === 'image' && slug !== 'ghanta') {
    return (
      <image 
        href={art.src} 
        x={-art.frame[0]/2} 
        y={-charmConfig.attach * art.frame[1]} 
        width={art.frame[0]} 
        height={art.frame[1]} 
      />
    );
  }

  if (slug === 'ghanta') {
    // Ghanta has a clapper that swings slightly based on physics
    // But basic image works for now. 
    return (
      <>
        <g id="dg-ghanta-body">
            <image href="/charms/ghanta.png" x={-32} y={-84 * charmConfig.attach} width={64} height={84} />
        </g>
      </>
    );
  }

  if (art.type === 'garland') {
    const [lemonW, lemonH] = k.lemon;
    return (
      <>
        <image href="/charms/nimbu-lemon.png" x={-lemonW/2} y={-lemonH/2} width={lemonW} height={lemonH} />
        <image href="/charms/nimbu-coal.png" x={-k.coal[0]/2} y={(k.coalDrop - k.coal[1]/2)} width={k.coal[0]} height={k.coal[1]} />
      </>
    );
  }

  if (slug === 'custom') {
    const customImage = localStorage.getItem('ld-custom-charm');
    if (customImage) {
      return (
        <image 
          href={customImage} 
          x={-32} 
          y={-32} 
          width={64} 
          height={64} 
          preserveAspectRatio="xMidYMid slice"
        />
      );
    }
  }

  if (art.type === 'emoji') {
    return (
      <text
        x="0"
        y={art.fontSize * 0.35}
        fontSize={art.fontSize}
        textAnchor="middle"
        dominantBaseline="middle"
        fontFamily="system-ui"
      >
        {art.glyph}
      </text>
    );
  }

  return null;
};
