"use client";

import { useState, ReactNode } from 'react';

interface GuideImageProps {
  src: string;
  alt: string;
  icon: ReactNode;
  stepPath: string;
  imgClassName?: string;
  codeClassName?: string;
}

export default function GuideImage({ src, alt, icon, stepPath, imgClassName = "object-cover", codeClassName = "text-blue-400 bg-blue-400/10" }: GuideImageProps) {
  const [error, setError] = useState(false);
  const [loaded, setLoaded] = useState(false);

  return (
    <div className="absolute inset-0 w-full h-full">
      {(!loaded || error) && (
        <div className="absolute inset-0 flex flex-col items-center justify-center text-neutral-500 text-sm gap-2 bg-black/40 z-0">
          {icon}
          <span>Save image as <code className={`${codeClassName} px-1 rounded`}>{stepPath}</code></span>
        </div>
      )}
      {!error && (
        <img 
          src={src} 
          alt={alt} 
          className={`absolute inset-0 w-full h-full z-10 transition-opacity duration-300 ${imgClassName} ${loaded ? 'opacity-100' : 'opacity-0'}`}
          onLoad={() => setLoaded(true)}
          onError={() => setError(true)}
        />
      )}
    </div>
  );
}
