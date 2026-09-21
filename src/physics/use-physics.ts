'use client';
import { useEffect, useRef, useState } from 'react';
import { VerletEngine, Point, Constraint, type Vector2 } from './physics-engine';

export function usePhysicsCharm(options: {
  mass?: number;
  ropeLength?: number;
  segments?: number;
  stiffness?: number;
  onUpdate?: (points: Point[]) => void;
}) {
  const { mass = 2, ropeLength = 170.5, segments = 12, stiffness = 1, onUpdate } = options;
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const engineRef = useRef<VerletEngine | null>(null);
  const [charmAngle, setCharmAngle] = useState(0);
  const [charmPosition, setCharmPosition] = useState<Vector2>({
    x: typeof window !== 'undefined' ? (window.innerWidth || 800) / 2 : 400,
    y: 150
  });

  useEffect(() => {
    if (!canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Make canvas fill its container for the rope rendering
    const updateSize = () => {
      const w = canvas.parentElement?.clientWidth || window.innerWidth || 800;
      const h = canvas.parentElement?.clientHeight || window.innerHeight || 600;
      canvas.width = w;
      canvas.height = h;
      if (engineRef.current) {
        engineRef.current.bounds = { width: w, height: h };
        if (engineRef.current.points.length > 0) {
          const newStartX = w / 2;
          const shiftX = newStartX - engineRef.current.points[0].position.x;
          if (Math.abs(shiftX) > 1) {
            engineRef.current.points.forEach(p => {
              p.position.x += shiftX;
              p.oldPosition.x += shiftX;
            });
          }
        }
      }
    };
    updateSize();
    window.addEventListener('resize', updateSize);

    const engine = new VerletEngine({ width: canvas.width, height: canvas.height });
    engineRef.current = engine;

    const segmentLength = ropeLength / segments;
    const startX = canvas.width / 2;
    const startY = 0;

    let previousPoint: Point | null = null;
    
    // Create rope segments
    for (let i = 0; i <= segments; i++) {
      const isPinned = i === 0;
      const pointMass = i === segments ? mass : 0.5; // Heavier at the end (the charm)
      const p = new Point(startX, startY + i * segmentLength, pointMass, isPinned);
      engine.addPoint(p);
      
      if (previousPoint) {
        engine.addConstraint(new Constraint(previousPoint, p, segmentLength, stiffness));
      }
      previousPoint = p;
    }

    let animationId: number;
    let lastTime = performance.now();

    const render = (time: number) => {
      const delta = Math.min((time - lastTime) / 1000, 0.1);
      lastTime = time;

      engine.update(delta, 5);
      
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Draw rope
      ctx.beginPath();
      ctx.moveTo(engine.points[0].position.x, engine.points[0].position.y);
      
      // Use quadratic bezier curves through midpoints for perfectly smooth rope
      for (let i = 1; i < engine.points.length - 1; i++) {
        const xc = (engine.points[i].position.x + engine.points[i + 1].position.x) / 2;
        const yc = (engine.points[i].position.y + engine.points[i + 1].position.y) / 2;
        ctx.quadraticCurveTo(engine.points[i].position.x, engine.points[i].position.y, xc, yc);
      }
      
      // Line to the last point
      const lastP = engine.points[engine.points.length - 1];
      ctx.lineTo(lastP.position.x, lastP.position.y);
      
      ctx.strokeStyle = '#a68250'; // Golden brown rope color
      ctx.lineWidth = 3;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
      ctx.stroke();

      // Draw basic beads (small, big, small) near the bottom
      const pLen = engine.points.length;
      if (pLen >= 4) {
        const drawBead = (idx: number, radius: number, color: string, rim: string) => {
          const p = engine.points[idx];
          // Outer rim
          ctx.beginPath();
          ctx.arc(p.position.x, p.position.y, radius + 1, 0, Math.PI * 2);
          ctx.fillStyle = rim;
          ctx.fill();
          // Inner color
          ctx.beginPath();
          ctx.arc(p.position.x, p.position.y, radius, 0, Math.PI * 2);
          ctx.fillStyle = color;
          ctx.fill();
          // Highlight
          ctx.beginPath();
          ctx.ellipse(p.position.x - radius * 0.3, p.position.y - radius * 0.3, radius * 0.25, radius * 0.15, Math.PI / 4, 0, Math.PI * 2);
          ctx.fillStyle = 'rgba(255,255,255,0.7)';
          ctx.fill();
        };
        
        drawBead(pLen - 4, 3, '#edb52e', '#9e6b0a'); // Small gold
        drawBead(pLen - 3, 5.5, '#29a69e', '#084f54'); // Big blue/green (Faience)
        drawBead(pLen - 2, 3, '#edb52e', '#9e6b0a'); // Small gold
      }

      // Update React state for the charm element
      const lastPoint = engine.points[engine.points.length - 1];
      setCharmPosition({ x: lastPoint.position.x, y: lastPoint.position.y });
      setCharmAngle(engine.getCharmAngle());

      if (onUpdate) {
        onUpdate(engine.points);
      }

      animationId = requestAnimationFrame(render);
    };

    animationId = requestAnimationFrame(render);

    // Interaction handling
    let draggedPoint: Point | null = null;
    
    const onPointerDown = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const lastPoint = engine.points[engine.points.length - 1];
      const anchorPoint = engine.points[0];
      
      const distCharm = Math.hypot(lastPoint.position.x - x, lastPoint.position.y - y);
      const distAnchor = Math.hypot(anchorPoint.position.x - x, anchorPoint.position.y - y);
      
      if (distCharm < 60) {
        draggedPoint = lastPoint;
        lastPoint.pinned = true;
      } else if (distAnchor < 80 || y < 40) { // Generous hit area for top anchor
        draggedPoint = anchorPoint;
      }
    };
    
    const onPointerMove = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      if (!draggedPoint) {
        if (engineRef.current) {
          const currentMouse = { x, y };
          if (engineRef.current.mousePosition) {
            engineRef.current.mouseVelocity = {
              x: engineRef.current.mouseVelocity.x * 0.75 + (x - engineRef.current.mousePosition.x) * 0.25,
              y: engineRef.current.mouseVelocity.y * 0.75 + (y - engineRef.current.mousePosition.y) * 0.25
            };
          }
          engineRef.current.mousePosition = currentMouse;
        }
        return;
      }
      
      draggedPoint.position.x = x;
      // If we are dragging the anchor, we might want to keep it at y=0, but letting it be anywhere is fun.
      draggedPoint.position.y = draggedPoint === engine.points[0] ? Math.max(0, Math.min(y, 100)) : y;
      draggedPoint.oldPosition.x = x;
      draggedPoint.oldPosition.y = draggedPoint.position.y;
    };
    
    const onPointerUp = () => {
      if (draggedPoint) {
         if (engineRef.current && draggedPoint === engineRef.current.points[engineRef.current.points.length - 1]) {
            draggedPoint.pinned = false; // Unpin charm
         }
         draggedPoint = null;
      }
      if (engineRef.current) {
         engineRef.current.mousePosition = null;
         engineRef.current.mouseVelocity = { x: 0, y: 0 };
      }
    };
    
    const onPointerOut = () => {
      if (engineRef.current && !draggedPoint) {
        engineRef.current.mousePosition = null;
        engineRef.current.mouseVelocity = { x: 0, y: 0 };
      }
    };

    canvas.addEventListener('pointerdown', onPointerDown);
    window.addEventListener('pointermove', onPointerMove);
    window.addEventListener('pointerup', onPointerUp);
    window.addEventListener('pointerout', onPointerOut);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', updateSize);
      canvas.removeEventListener('pointerdown', onPointerDown);
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerup', onPointerUp);
      window.removeEventListener('pointerout', onPointerOut);
    };
  }, [mass, ropeLength, segments, stiffness]);

  const flick = (forceX?: number, forceY?: number) => {
    if (engineRef.current && engineRef.current.points.length > 0) {
      if (!forceX && !forceY) {
        const randomForce = (18 + Math.random() * 8) * (Math.random() < 0.5 ? 1 : -1);
        const lastPoint = engineRef.current.points[engineRef.current.points.length - 1];
        lastPoint.oldPosition.x -= randomForce;
      } else {
        engineRef.current.applyForce({ x: forceX || 0, y: forceY || 0 });
      }
    }
  };

  const resetPhysics = () => {
    if (engineRef.current && canvasRef.current && engineRef.current.points.length > 0) {
      const startX = canvasRef.current.width / 2;
      const segmentLength = ropeLength / segments;
      engineRef.current.points.forEach((p, idx) => {
        p.position.x = startX;
        p.position.y = idx * segmentLength;
        p.oldPosition.x = startX;
        p.oldPosition.y = idx * segmentLength;
      });
    }
  };

  const setAnchorPosition = (xRatio: number) => {
    if (engineRef.current && canvasRef.current && engineRef.current.points.length > 0) {
       const anchor = engineRef.current.points[0];
       const targetX = canvasRef.current.width * xRatio;
       anchor.position.x = targetX;
       anchor.position.y = 0;
       anchor.oldPosition.x = targetX;
       anchor.oldPosition.y = 0;
    }
  };

  return { canvasRef, charmPosition, charmAngle, flick, resetPhysics, setAnchorPosition };
}
