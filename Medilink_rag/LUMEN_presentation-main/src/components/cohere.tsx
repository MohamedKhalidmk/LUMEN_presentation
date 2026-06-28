import React from 'react';

// Cohere's warm, elegant editorial identity color palette
export const C = {
  ground: '#F6F3EE',       // warm alabaster
  ground2: '#FBFAF7',      // lighter warm alabaster
  card: '#FFFFFF',         // pure card white
  ink: '#1A1815',          // volcanic black
  inkSoft: '#3A3631',      // charcoal/soft ink
  muted: '#807A70',        // mushroom grey
  faint: '#A8A296',        // warm grey
  line: '#E7E0D4',         // warm hairline border
  
  // Accents
  coral: '#FF7759',        // bittersweet, the HERO accent
  coralDeep: '#E8512F',    // deeper coral for text legibility
  coralSoft: '#FFE9E2',    // pale coral for backgrounds/pills
  
  blue: '#5B73C9',         // acrylic blue
  blueSoft: '#E5E9F8',
  
  green: '#3F6F5E',        // coniferous green
  greenSoft: '#E0EDE7',
  
  quartz: '#C9A7C7',       // synthetic quartz purple
  quartzSoft: '#F1E7F0'
};

interface AtmosphereProps {
  variant?: 'coral' | 'mixed' | 'cool';
}

export function Atmosphere({ variant = 'coral' }: AtmosphereProps) {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {variant === 'coral' && (
        <>
          <div 
            className="absolute -top-[10%] -left-[5%] w-[55vw] h-[55vw] rounded-full blur-[140px] opacity-18 transition-all duration-1000"
            style={{
              background: `radial-gradient(circle, ${C.coral} 0%, rgba(255,255,255,0) 70%)`
            }}
          />
          <div 
            className="absolute bottom-[5%] -right-[10%] w-[50vw] h-[50vw] rounded-full blur-[150px] opacity-16 transition-all duration-1000"
            style={{
              background: `radial-gradient(circle, ${C.quartz} 0%, rgba(255,255,255,0) 70%)`
            }}
          />
        </>
      )}
      {variant === 'mixed' && (
        <>
          <div 
            className="absolute -top-[15%] right-[10%] w-[60vw] h-[60vw] rounded-full blur-[150px] opacity-20 transition-all duration-1000"
            style={{
              background: `radial-gradient(circle, ${C.blue} 0%, rgba(255,255,255,0) 70%)`
            }}
          />
          <div 
            className="absolute bottom-[10%] left-[5%] w-[55vw] h-[55vw] rounded-full blur-[140px] opacity-18 transition-all duration-1000"
            style={{
              background: `radial-gradient(circle, ${C.coral} 0%, rgba(255,255,255,0) 70%)`
            }}
          />
          <div 
            className="absolute top-[30%] right-[5%] w-[45vw] h-[45vw] rounded-full blur-[150px] opacity-15 transition-all duration-1000"
            style={{
              background: `radial-gradient(circle, ${C.quartz} 0%, rgba(255,255,255,0) 70%)`
            }}
          />
        </>
      )}
      {variant === 'cool' && (
        <>
          <div 
            className="absolute -top-[5%] left-[20%] w-[50vw] h-[50vw] rounded-full blur-[140px] opacity-18 transition-all duration-1000"
            style={{
              background: `radial-gradient(circle, ${C.blue} 0%, rgba(255,255,255,0) 70%)`
            }}
          />
          <div 
            className="absolute bottom-[15%] right-[15%] w-[45vw] h-[45vw] rounded-full blur-[140px] opacity-16 transition-all duration-1000"
            style={{
              background: `radial-gradient(circle, ${C.green} 0%, rgba(255,255,255,0) 70%)`
            }}
          />
        </>
      )}
    </div>
  );
}

interface CohereCellsProps {
  size?: number;
  color?: string;
  className?: string;
}

export function CohereCells({ size = 20, color = C.coral, className = '' }: CohereCellsProps) {
  // SVG representation of three organic Voronoi-like cells clustered to suggest a 'C'
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 100 100" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Top cell */}
      <path 
        d="M35 25 C45 15, 65 18, 72 28 C75 35, 70 42, 60 40 C50 38, 42 45, 38 35 C35 28, 30 30, 35 25 Z" 
        fill={color} 
        fillOpacity="0.85" 
      />
      {/* Middle/Left back cell */}
      <path 
        d="M25 45 C20 35, 32 30, 42 38 C48 42, 45 52, 40 58 C35 65, 25 60, 25 45 Z" 
        fill={color} 
        fillOpacity="0.95" 
      />
      {/* Bottom cell */}
      <path 
        d="M28 65 C32 55, 48 52, 58 58 C65 62, 70 72, 62 80 C52 85, 38 80, 28 65 Z" 
        fill={color} 
        fillOpacity="0.75" 
      />
    </svg>
  );
}

interface EyebrowProps {
  text: string;
  variant?: 'coral' | 'blue' | 'green' | 'quartz';
  className?: string;
}

export function Eyebrow({ text, variant = 'coral', className = '' }: EyebrowProps) {
  const bg = {
    coral: C.coralSoft,
    blue: C.blueSoft,
    green: C.greenSoft,
    quartz: C.quartzSoft
  }[variant];

  const fg = {
    coral: C.coralDeep,
    blue: C.blue,
    green: C.green,
    quartz: C.quartz
  }[variant];

  return (
    <div 
      className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-[11px] font-mono tracking-[0.18em] lowercase select-none ${className}`}
      style={{ backgroundColor: bg, color: fg, border: `1px solid ${fg}20` }}
    >
      <CohereCells size={11} color={fg} />
      <span>{text}</span>
    </div>
  );
}
