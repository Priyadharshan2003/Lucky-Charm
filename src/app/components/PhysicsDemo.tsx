'use client';
import Image from 'next/image';
import { usePhysicsCharm } from '@/physics';
import { CHARMS, CharmConfig } from '@/core';
import { useState } from 'react';

export default function PhysicsDemo({ activeCharm = CHARMS[0] }: { activeCharm?: CharmConfig }) {
  const { canvasRef, charmPosition, charmAngle, flick, setAnchorPosition } = usePhysicsCharm({
    mass: activeCharm.mass,
    ropeLength: activeCharm.ropeLength,
    stiffness: activeCharm.stiffness,
  });

  const [isDragging, setIsDragging] = useState(false);

  return (
    <div 
      className="relative w-full h-full flex items-center justify-center bg-transparent rounded-xl overflow-hidden group cursor-move"
      onPointerDown={() => setIsDragging(true)}
      onPointerUp={() => setIsDragging(false)}
      onPointerLeave={() => setIsDragging(false)}
    >
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full touch-none z-10" />
      
      {/* Visual cue for anchor drag */}
      <div className="absolute top-0 left-0 w-full h-12 bg-gradient-to-b from-white/10 to-transparent pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity z-10 flex justify-center pt-2 text-white/50 text-xs font-medium tracking-widest uppercase">
        Drag top edge to move pivot
      </div>
      
      {/* The rendered charm element */}
      <div 
        className={`absolute pointer-events-none z-20 transition-transform duration-75 ${isDragging ? 'drop-shadow-[0_0_30px_rgba(255,255,255,0.4)]' : ''}`}
        style={{
          left: charmPosition.x,
          top: charmPosition.y,
          transform: `translate(-50%, 0%) rotate(${charmAngle}rad) ${isDragging ? 'scale(1.05)' : 'scale(1)'}`,
          transformOrigin: 'top center'
        }}
      >
        {isDragging && (
           <div className="absolute inset-0 rounded-full bg-white/20 blur-xl scale-150 -z-10" />
        )}
        <Image 
          src={activeCharm.assetUrl} 
          alt={activeCharm.name} 
          width={128}
          height={128}
          className="w-32 h-32 object-contain drop-shadow-2xl select-none"
          draggable={false}
          priority
        />
      </div>

      <div className="absolute bottom-6 left-6 z-30 flex flex-col gap-4">
        <h2 className="text-white text-2xl font-bold tracking-tight">{activeCharm.name}</h2>
        <p className="text-white/60 max-w-sm text-sm">{activeCharm.description}</p>
        
        <div className="flex flex-wrap gap-2">
          <button 
            onClick={() => flick(100, -20)}
            className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-full text-sm font-medium transition-colors shadow-lg shadow-blue-500/20"
          >
            Flick Charm
          </button>
          
          <button 
            onClick={() => setAnchorPosition?.(0.5)}
            className="px-4 py-2 glass hover:bg-white/20 text-white rounded-full text-sm font-medium transition-colors shadow-lg"
          >
            Hang Center
          </button>
          
          <button 
            onClick={() => setAnchorPosition?.(0.85)}
            className="px-4 py-2 glass hover:bg-white/20 text-white rounded-full text-sm font-medium transition-colors shadow-lg"
          >
            Hang Right
          </button>
        </div>
      </div>
    </div>
  );
}
