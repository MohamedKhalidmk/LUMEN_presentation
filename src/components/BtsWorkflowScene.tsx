import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Play, Pause, Film, Upload, ChevronRight, Sparkles, Laptop, Video, Cpu, ShieldCheck, Activity, Eye
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
          textAccent: 'text-[#A3E635]',
          gradient: 'from-[#A3E635] via-[#84CC16] to-[#4D7C0F]',
          glow: 'rgba(163,230,53,0.12)',
          borderGlow: 'border-lime-500/30',
          indicator: 'bg-[#A3E635]/80'
        };
      case 'ocean':
        return {
          bgAccent: 'bg-[#0071E3]',
          textAccent: 'text-[#0071E3]',
          gradient: 'from-[#38BDF8] via-[#0071E3] to-[#0369A1]',
          glow: 'rgba(0,113,227,0.12)',
          borderGlow: 'border-blue-500/30',
          indicator: 'bg-[#0071E3]/80'
        };
      case 'teal':
        return {
          bgAccent: 'bg-[#14B8A6]',
          textAccent: 'text-[#14B8A6]',
          gradient: 'from-[#2DD4BF] via-[#14B8A6] to-[#0F766E]',
          glow: 'rgba(20,184,166,0.12)',
          borderGlow: 'border-teal-500/30',
          indicator: 'bg-[#14B8A6]/80'
        };
      case 'silver':
        return {
          bgAccent: 'bg-[#E2E8F0]',
          textAccent: 'text-[#CBD5E1]',
          gradient: 'from-[#F1F5F9] via-[#CBD5E1] to-[#64748B]',
          glow: 'rgba(226,232,240,0.08)',
          borderGlow: 'border-slate-500/20',
          indicator: 'bg-[#E2E8F0]/40'
        };
    }
  };

  const currentStyles = getColorStyles(selectedColor);

  return (
    <section 
      className="relative min-h-screen bg-[#0A0A0C] text-[#E8E8ED] flex flex-col justify-center py-24 px-6 md:px-12 select-none overflow-hidden border-b border-neutral-900" 
      id="bts-workflow-root"
    >
      {/* Hidden file selector */}
      <input 
        type="file" 
        ref={fileInputRef} 
        onChange={handleFileChange} 
        accept="video/*" 
        className="hidden" 
      />

      {/* Dynamic ambient background glows */}
      <div 
        className="absolute top-[25%] left-[10%] w-[600px] h-[600px] rounded-full filter blur-[150px] pointer-events-none transition-all duration-1000 ease-in-out -z-10" 
        style={{ 
          backgroundColor: selectedColor === 'citrus' ? 'rgba(163,230,53,0.04)' : 
                           selectedColor === 'ocean' ? 'rgba(0,113,227,0.05)' : 
                           selectedColor === 'teal' ? 'rgba(20,184,166,0.04)' : 
                           'rgba(226,232,240,0.02)' 
        }} 
      />
      <div 
        className="absolute bottom-[20%] right-[10%] w-[550px] h-[550px] rounded-full filter blur-[140px] pointer-events-none transition-all duration-1000 ease-in-out -z-10"
        style={{ 
          backgroundColor: selectedColor === 'citrus' ? 'rgba(77,124,15,0.03)' : 
                           selectedColor === 'ocean' ? 'rgba(3,105,161,0.03)' : 
                           selectedColor === 'teal' ? 'rgba(15,118,110,0.03)' : 
                           'rgba(100,116,139,0.02)' 
        }} 
      />

      {/* Grid line accents */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:32px_32px] opacity-20 pointer-events-none -z-10" />

      <div className="max-w-6xl w-full mx-auto relative z-10 flex flex-col items-center">
        
        {/* Apple Style Top Header Block */}
        <div className="text-center mb-12 max-w-3xl space-y-4">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 rounded-full bg-neutral-900 border border-neutral-800 px-4 py-2 shadow-inner mb-2"
          >
            <span className={`h-2.5 w-2.5 rounded-full animate-pulse ${currentStyles.indicator}`} />
            <span className="text-[10px] font-mono tracking-[0.24em] uppercase text-neutral-400">
              SYSTEM DEMONSTRATION // LIVE RECORDING
            </span>
          </motion.div>
          
          <motion.h2 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="text-5xl sm:text-7xl font-display font-light text-white tracking-tight leading-[1.05]"
          >
            Behind the <span className={`font-semibold bg-gradient-to-r ${currentStyles.gradient} bg-clip-text text-transparent transition-all duration-700`}>Scenes.</span>
          </motion.h2>

          <motion.p 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.12 }}
            className="text-base sm:text-lg text-neutral-400 max-w-2xl mx-auto leading-relaxed font-sans font-light"
          >
            Press play to watch our autonomous AI booking system execute end-to-end clinical reservation flows.
          </motion.p>
        </div>

        {/* Theme Accent Controllers */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="flex gap-2.5 justify-center mb-10 bg-neutral-900/60 p-2 rounded-full border border-neutral-800 backdrop-blur-xl"
        >
          {(['ocean', 'teal', 'citrus', 'silver'] as NeoColor[]).map((col) => (
            <button
              key={col}
              onClick={() => setSelectedColor(col)}
              className={`px-4 py-1.5 rounded-full text-xs font-mono capitalize transition-all duration-300 relative ${
                selectedColor === col 
                  ? 'text-white font-medium bg-neutral-800 border border-neutral-700 shadow-md shadow-black/40' 
                  : 'text-neutral-500 hover:text-neutral-300'
              }`}
            >
              {col}
            </button>
          ))}
        </motion.div>

        {/* Cinematic Dashboard Console Layout */}
        <motion.div 
          initial={{ opacity: 0, y: 30, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.15 }}
          className="w-full max-w-[880px] relative mt-2"
        >
          {/* Subtle Ambient Glow directly behind */}
          <div className="absolute inset-0 bg-blue-500/5 blur-[90px] rounded-full -z-10 scale-95" />

          {/* Microchip Contact Pins Trims on Console Edges */}
          <div className="absolute -top-3 inset-x-12 flex justify-between pointer-events-none opacity-40">
            {Array.from({ length: 12 }).map((_, i) => (
              <div key={i} className="w-1 h-3 bg-gradient-to-b from-neutral-700 to-neutral-800 rounded-sm" />
            ))}
          </div>

          <div className="absolute -bottom-3 inset-x-12 flex justify-between pointer-events-none opacity-40">
            {Array.from({ length: 12 }).map((_, i) => (
              <div key={i} className="w-1 h-3 bg-gradient-to-t from-neutral-700 to-neutral-800 rounded-sm" />
            ))}
          </div>

          {/* Console Outer Frame */}
          <div className={`w-full aspect-[16/10] bg-gradient-to-b from-[#161619] to-[#0D0E11] rounded-3xl p-5 shadow-[0_40px_90px_rgba(0,0,0,0.55)] border-2 border-neutral-800 relative overflow-hidden flex flex-col justify-between transition-all duration-700`}>
            
            {/* Corner Bracket Accents for Cinematic Tech Feel */}
            <div className="absolute top-4 left-4 w-3.5 h-3.5 border-t border-l border-neutral-700" />
            <div className="absolute top-4 right-4 w-3.5 h-3.5 border-t border-r border-neutral-700" />
            <div className="absolute bottom-4 left-4 w-3.5 h-3.5 border-b border-l border-neutral-700" />
            <div className="absolute bottom-4 right-4 w-3.5 h-3.5 border-b border-r border-neutral-700" />

            {/* SCREEN CONTENT AREA */}
            <div 
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              className={`w-full h-full bg-[#070709] rounded-2xl relative overflow-hidden flex flex-col justify-between p-6 transition-all duration-300 border border-neutral-800/80 ${
                isDraggingFile ? 'ring-2 ring-blue-500/40 bg-[#0E0F14]' : ''
              }`}
            >
              
              {/* Top Bar Navigation / System Indicator */}
              <div className="flex justify-between items-center border-b border-neutral-900 pb-4 z-10">
                <div className="flex items-center gap-3">
                  <div className="flex gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-red-500/40" />
                    <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/40" />
                    <span className="w-2.5 h-2.5 rounded-full bg-green-500/40" />
                  </div>
                  
                  <div className="h-4 w-[1px] bg-neutral-800" />
                  
                  <div className="flex items-center gap-1.5">
                    <span className="text-[10px] font-mono font-semibold tracking-wider text-neutral-500">FEED_STREAM:</span>
                    <span className="text-[10px] font-mono text-neutral-300 truncate max-w-[220px]">
                      {videoName}
                    </span>
                  </div>
                </div>
                
                {/* Discrete option to change the video file with a single click */}
                <div className="flex items-center gap-3">
                  <span className="hidden sm:inline text-[9px] font-mono text-neutral-500 tracking-widest">FPS: 60.0 // RAW</span>
                  <button 
                    onClick={triggerFileInput}
                    className="flex items-center gap-2 text-[9px] font-mono font-medium text-neutral-300 hover:text-white bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 rounded-full px-3.5 py-1.5 transition-all cursor-pointer shadow-inner"
                  >
                    <Upload className="w-3 h-3 text-neutral-400" />
                    <span>Upload Recording</span>
                  </button>
                </div>
              </div>

              {/* VIDEO PLAYER VIEWPORT CONTAINER */}
              <div className={`flex-1 w-full mt-5 rounded-xl overflow-hidden bg-black/70 border ${currentStyles.borderGlow} relative flex items-center justify-center transition-all duration-700`}>
                
                {/* Scanline overlay for cyber-cinematic texture */}
                <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.04),rgba(0,255,0,0.01),rgba(0,0,255,0.04))] bg-[size:100%_4px,6px_100%] pointer-events-none z-10 opacity-30" />

                {videoSrc ? (
                  <video
                    ref={videoRef}
                    src={videoSrc}
                    className="w-full h-full object-contain bg-neutral-950 rounded-lg relative z-0"
                    controls
                    playsInline
                  />
                ) : (
                  <button 
                    onClick={triggerFileInput}
                    className="flex flex-col items-center gap-4 text-center p-8 transition-all hover:scale-[1.02] relative z-20"
                  >
                    <div className="w-14 h-14 rounded-full bg-neutral-900 border border-neutral-800 flex items-center justify-center shadow-lg">
                      <Film className="w-6 h-6 text-neutral-400" />
                    </div>
                    <div className="space-y-1.5">
                      <p className="text-sm text-neutral-200 font-medium">No video source loaded</p>
                      <p className="text-[11px] text-neutral-500 max-w-sm leading-relaxed">
                        Drag and drop your MP4 screen recording here, or click to choose a local file from your system.
                      </p>
                    </div>
                  </button>
                )}

                {/* Drag and Drop Overlay */}
                <AnimatePresence>
                  {isDraggingFile && (
                    <motion.div 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="absolute inset-0 bg-neutral-950/90 backdrop-blur-md flex flex-col items-center justify-center p-6 text-center z-30 pointer-events-none"
                    >
                      <div className="w-16 h-16 rounded-full bg-blue-500/10 border-2 border-dashed border-blue-500/50 flex items-center justify-center mb-4 animate-pulse">
                        <Upload className="w-7 h-7 text-blue-400" />
                      </div>
                      <p className="text-sm font-semibold text-white tracking-wide">Drop to Load Your Recording</p>
                      <p className="text-xs text-neutral-400 mt-1.5">Accepts standard MP4 or WebM clinical demo clips</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Console Live Metadata Readout bar */}
              <div className="flex justify-between items-center mt-4 pt-4 border-t border-neutral-900 text-[9px] font-mono text-neutral-500">
                <div className="flex gap-4">
                  <span className="flex items-center gap-1">
                    <Cpu className="w-3 h-3 text-neutral-600" />
                    <span>ENGINE: AUTONOMOUS_V4</span>
                  </span>
                  <span className="hidden sm:flex items-center gap-1">
                    <ShieldCheck className="w-3 h-3 text-neutral-600" />
                    <span>TRUSTED HANDSHAKE: COMPLIANT</span>
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="tracking-widest">LIVE_RENDER_OK</span>
                </div>
              </div>

            </div>

          </div>

          {/* Elegant Aluminium Base frame shadow */}
          <div className="w-[88%] h-2 bg-gradient-to-b from-[#111114] to-black mx-auto rounded-b-xl border-t border-neutral-800/60 shadow-xl" />
        </motion.div>

      </div>

    </section>
  );
}

