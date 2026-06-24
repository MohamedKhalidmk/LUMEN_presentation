import React, { useState, useRef } from 'react';
import { 
  Play, Pause, Film, Upload, ChevronRight, Sparkles, Laptop, Video 
} from 'lucide-react';

type NeoColor = 'citrus' | 'ocean' | 'teal' | 'silver';

export default function BtsWorkflowScene() {
  const [selectedColor, setSelectedColor] = useState<NeoColor>('ocean');
  const [videoSrc, setVideoSrc] = useState<string | null>(
    'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4'
  );
  const [videoName, setVideoName] = useState<string>('medilink_agent_bts_workflow.mp4');
  const [isDraggingFile, setIsDraggingFile] = useState(false);
  
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const scrollToNextSection = () => {
    const el = document.getElementById('comparison');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDraggingFile(true);
  };

  const handleDragLeave = () => {
    setIsDraggingFile(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDraggingFile(false);
    
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith('video/')) {
      const url = URL.createObjectURL(file);
      setVideoSrc(url);
      setVideoName(file.name);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setVideoSrc(url);
      setVideoName(file.name);
    }
  };

  const triggerFileInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const getColorStyles = (color: NeoColor) => {
    switch (color) {
      case 'citrus':
        return {
          bgAccent: 'bg-[#A3E635]',
          textAccent: 'text-[#84CC16]',
          gradient: 'from-[#A3E635] via-[#84CC16] to-[#4D7C0F]',
          glow: 'rgba(163,230,53,0.15)',
          circle: 'fill-[#A3E635] drop-shadow-[0_0_8px_#A3E635]',
          primaryNode: 'border-lime-500/40 bg-lime-950/20 text-lime-400'
        };
      case 'ocean':
        return {
          bgAccent: 'bg-[#0EA5E9]',
          textAccent: 'text-[#0284C7]',
          gradient: 'from-[#38BDF8] via-[#0EA5E9] to-[#0369A1]',
          glow: 'rgba(14,165,233,0.15)',
          circle: 'fill-[#0EA5E9] drop-shadow-[0_0_8px_#0EA5E9]',
          primaryNode: 'border-sky-500/40 bg-sky-950/20 text-sky-400'
        };
      case 'teal':
        return {
          bgAccent: 'bg-[#14B8A6]',
          textAccent: 'text-[#0D9488]',
          gradient: 'from-[#2DD4BF] via-[#14B8A6] to-[#0F766E]',
          glow: 'rgba(20,184,166,0.15)',
          circle: 'fill-[#14B8A6] drop-shadow-[0_0_8px_#14B8A6]',
          primaryNode: 'border-teal-500/40 bg-teal-950/20 text-teal-400'
        };
      case 'silver':
        return {
          bgAccent: 'bg-[#E2E8F0]',
          textAccent: 'text-[#94A3B8]',
          gradient: 'from-[#F1F5F9] via-[#CBD5E1] to-[#64748B]',
          glow: 'rgba(226,232,240,0.15)',
          circle: 'fill-[#E2E8F0] drop-shadow-[0_0_8px_#E2E8F0]',
          primaryNode: 'border-slate-400/40 bg-slate-950/20 text-slate-300'
        };
    }
  };

  const currentStyles = getColorStyles(selectedColor);

  return (
    <section 
      className="relative min-h-screen bg-[#F5F5F7] text-[#1D1D1F] flex flex-col justify-center py-20 px-6 md:px-12 select-none overflow-hidden border-b border-[#D2D2D7]/50" 
      id="bts-workflow-root"
    >
      {/* Hidden file selector for loading the user's video file */}
      <input 
        type="file" 
        ref={fileInputRef} 
        onChange={handleFileChange} 
        accept="video/*" 
        className="hidden" 
      />

      {/* Dynamic ambient backlights based on color theme */}
      <div 
        className="absolute top-[25%] left-[15%] w-[500px] h-[500px] rounded-full filter blur-[150px] pointer-events-none transition-all duration-1000 ease-in-out" 
        style={{ 
          backgroundColor: selectedColor === 'citrus' ? 'rgba(163,230,53,0.06)' : 
                           selectedColor === 'ocean' ? 'rgba(14,165,233,0.06)' : 
                           selectedColor === 'teal' ? 'rgba(20,184,166,0.06)' : 
                           'rgba(226,232,240,0.06)' 
        }} 
      />
      <div 
        className="absolute bottom-[20%] right-[15%] w-[450px] h-[450px] rounded-full filter blur-[130px] pointer-events-none transition-all duration-1000 ease-in-out"
        style={{ 
          backgroundColor: selectedColor === 'citrus' ? 'rgba(77,124,15,0.04)' : 
                           selectedColor === 'ocean' ? 'rgba(3,105,161,0.04)' : 
                           selectedColor === 'teal' ? 'rgba(15,118,110,0.04)' : 
                           'rgba(100,116,139,0.04)' 
        }} 
      />

      <div className="max-w-6xl w-full mx-auto relative z-10 flex flex-col items-center">
        
        {/* Apple Style Top Header Block */}
        <div className="text-center mb-10 max-w-3xl space-y-3">
          <span className="text-[11px] font-mono text-neutral-500 tracking-[0.22em] uppercase font-bold block">
            The Behind-the-Scenes Recording
          </span>
          
          <h2 className="text-5xl sm:text-7xl font-display font-light text-[#1D1D1F] tracking-tight leading-[1.05]">
            Behind the <span className={`font-semibold bg-gradient-to-r ${currentStyles.gradient} bg-clip-text text-transparent transition-all duration-700`}>Scenes.</span>
          </h2>

          <p className="text-base sm:text-lg text-[#86868B] max-w-2xl mx-auto leading-relaxed font-sans font-light">
            Press play to watch our autonomous AI booking system execute end-to-end clinical reservation flows.
          </p>
        </div>

        {/* MacBook Neo Hardware Reveal Mockup */}
        <div className="w-full max-w-[840px] relative mt-4">
          
          {/* Glass display chassis bezel */}
          <div className="w-full aspect-[16/10] bg-[#17181C] rounded-2xl p-3.5 shadow-2xl border border-white/[0.08] relative overflow-hidden flex flex-col justify-between">
            
            {/* Screen Inner Glass Layer */}
            <div className="absolute inset-0 bg-gradient-to-tr from-neutral-900/40 to-neutral-800/10 pointer-events-none z-10" />
            
            {/* Camera Bezel Dot */}
            <div className="absolute top-1.5 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-neutral-900 border border-white/5 flex items-center justify-center z-20">
              <div className="w-0.5 h-0.5 rounded-full bg-blue-500/50" />
            </div>

            {/* SCREEN CONTENT AREA */}
            <div 
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              className={`w-full h-full bg-[#0D0E11] rounded-lg relative overflow-hidden flex flex-col justify-between p-6 transition-all duration-300 ${
                isDraggingFile ? 'ring-4 ring-[#0EA5E9]/50 bg-neutral-900/90' : ''
              }`}
            >
              
              {/* Floating ambient glow corresponding to color */}
              <div 
                className="absolute -top-[10%] -left-[10%] w-[250px] h-[250px] rounded-full filter blur-[60px] pointer-events-none transition-all duration-1000" 
                style={{ backgroundColor: currentStyles.glow }}
              />

              {/* Top Bar Navigation / System Indicator */}
              <div className="flex justify-between items-center border-b border-white/[0.05] pb-3 z-10">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-red-500/60" />
                  <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/60" />
                  <div className="w-2.5 h-2.5 rounded-full bg-green-500/60" />
                  <span className="text-[10px] font-mono text-neutral-500 ml-2 tracking-wide truncate max-w-[200px]">
                    {videoName}
                  </span>
                </div>
                
                {/* Discrete option to change the video file with a single click */}
                <div className="flex items-center gap-2">
                  <button 
                    onClick={triggerFileInput}
                    className="flex items-center gap-1.5 text-[9px] font-mono font-medium text-neutral-400 hover:text-white bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.08] rounded-full px-3 py-1 transition-all cursor-pointer"
                  >
                    <Upload className="w-2.5 h-2.5" />
                    <span>Choose File</span>
                  </button>
                </div>
              </div>

              {/* VIDEO PLAYER VIEWPORT CONTAINER */}
              <div className="flex-1 w-full mt-4 rounded-lg overflow-hidden bg-black/40 border border-white/[0.03] relative flex items-center justify-center group/player">
                
                {videoSrc ? (
                  <video
                    ref={videoRef}
                    src={videoSrc}
                    className="w-full h-full object-contain bg-black rounded-md"
                    controls
                    playsInline
                  />
                ) : (
                  <button 
                    onClick={triggerFileInput}
                    className="flex flex-col items-center gap-3 text-center p-8 transition-all hover:scale-105"
                  >
                    <div className="w-12 h-12 rounded-full bg-neutral-900 border border-white/10 flex items-center justify-center">
                      <Film className="w-5 h-5 text-neutral-400" />
                    </div>
                    <div className="space-y-1">
                      <p className="text-xs text-white font-medium">No video loaded</p>
                      <p className="text-[10px] text-neutral-500 max-w-xs">
                        Drag and drop your MP4 screen recording here, or click to choose a file.
                      </p>
                    </div>
                  </button>
                )}

                {/* Subtle Drag and Drop Overly */}
                {isDraggingFile && (
                  <div className="absolute inset-0 bg-[#0D0E11]/90 backdrop-blur-sm flex flex-col items-center justify-center p-6 text-center z-30 pointer-events-none">
                    <div className="w-14 h-14 rounded-full bg-[#0EA5E9]/10 border border-[#0EA5E9]/30 flex items-center justify-center mb-3 animate-bounce">
                      <Upload className="w-6 h-6 text-[#0EA5E9]" />
                    </div>
                    <p className="text-xs font-semibold text-white">Drop to Load Your Recording</p>
                    <p className="text-[10px] text-neutral-400 mt-1">Accepts any MP4 or WebM video file</p>
                  </div>
                )}
              </div>

            </div>

          </div>

          {/* Aluminium base frame lip representing bottom of screen hinge */}
          <div className="w-[86%] h-1 bg-[#1F2024] mx-auto rounded-b-md shadow-lg border-t border-white/5" />
        </div>

      </div>

    </section>
  );
}
