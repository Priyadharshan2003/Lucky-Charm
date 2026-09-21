'use client';
import Image from 'next/image';
import { type CharmConfig } from '@/core';
import PhysicsDemo from './PhysicsDemo';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

export default function DesktopStage({ activeCharm }: { activeCharm: CharmConfig }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springX = useSpring(x, { stiffness: 100, damping: 30 });
  const springY = useSpring(y, { stiffness: 100, damping: 30 });

  const bgX = useTransform(springX, [-100, 100], [-10, 10]);
  const bgY = useTransform(springY, [-100, 100], [-10, 10]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    x.set(e.clientX - centerX);
    y.set(e.clientY - centerY);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <div 
      className="relative w-full aspect-video rounded-2xl overflow-hidden glass-panel border border-white/20 shadow-2xl flex flex-col mt-8 md:mt-0"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* Fake Mac Menu Bar */}
      <div className="h-8 w-full bg-black/40 backdrop-blur-md border-b border-white/10 flex items-center px-4 justify-between z-10 shrink-0">
        <div className="flex items-center gap-4">
          <div className="font-semibold text-xs tracking-wide text-white/90"></div>
          <div className="font-bold text-xs tracking-wide text-white/90">Lucky Charm</div>
          <div className="font-medium text-xs tracking-wide text-white/60 hidden sm:block">File</div>
          <div className="font-medium text-xs tracking-wide text-white/60 hidden sm:block">Edit</div>
          <div className="font-medium text-xs tracking-wide text-white/60 hidden sm:block">View</div>
        </div>
        <div className="flex items-center gap-3">
          <div className="w-4 h-4 rounded-sm bg-white/20"></div>
          <div className="font-medium text-[10px] tracking-wide text-white/80">100%</div>
          <div className="font-medium text-[10px] tracking-wide text-white/80">Mon 9:41 AM</div>
        </div>
      </div>
      
      {/* Desktop Wallpaper Area */}
      <div className="flex-1 relative bg-[#09090b] w-full overflow-hidden flex flex-col items-center justify-start pt-0">
        <motion.div 
          style={{ x: bgX, y: bgY }}
          className="w-[108%] h-[108%] absolute -top-[4%] -left-[4%] opacity-50 mix-blend-screen pointer-events-none"
        >
          <Image
            src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1400&auto=format&fit=crop"
            alt="Desktop wallpaper"
            fill
            sizes="(max-width: 1024px) 100vw, 1024px"
            priority
            className="object-cover object-center"
          />
        </motion.div>
        <div className="w-full absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-black/40 z-10 pointer-events-none"></div>
        
        {/* Physics Demo Container */}
        <div className="w-full h-full relative z-20" aria-label="Desktop Physics Simulation">
          <PhysicsDemo activeCharm={activeCharm} />
        </div>
      </div>
    </div>
  );
}
