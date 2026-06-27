import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Tv, Monitor, Smartphone, Wifi, Play, Square, AlertCircle, 
  Settings, ExternalLink, RefreshCw, Layers, ShieldCheck, HeartPulse, Check
} from 'lucide-react';

export default function ScreenMirrorScene() {
  const [castMode, setCastMode] = useState<'simulated' | 'real'>('simulated');
  const [streamActive, setStreamActive] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  
  // Simulated state for interactive phone content inside macOS window
  const [phoneScreen, setPhoneScreen] = useState<'summary' | 'mri' | 'prescriptions'>('summary');
  const [connectionPulse, setConnectionPulse] = useState(true);
  const [signalStrength, setSignalStrength] = useState(100);

  // Real Cast stream reference
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const streamRef = useRef<MediaStream | null>(null);

  // Status logs for the macOS console
  const [logs, setLogs] = useState<string[]>([
    'Informatics air-mirror daemon v1.4.2 online.',
    'Awaiting connection handshakes via secure port 3000...'
  ]);

  const addLog = (msg: string) => {
    const timestamp = new Date().toLocaleTimeString();
    setLogs(prev => [...prev, `[${timestamp}] ${msg}`].slice(-6));
  };

  // Toggle Connection pulse simulation
  useEffect(() => {
    const interval = setInterval(() => {
      setConnectionPulse(prev => !prev);
      if (streamActive) {
        setSignalStrength(Math.floor(Math.random() * 15) + 85);
      }
    }, 2500);
    return () => clearInterval(interval);
  }, [streamActive]);

  const startRealScreenShare = async () => {
    setErrorMsg(null);
    addLog('Requesting screen capture credentials from browser...');
    try {
      if (!navigator.mediaDevices || !navigator.mediaDevices.getDisplayMedia) {
        throw new Error('getDisplayMedia is not supported in this browser environment, or requires a standalone tab instead of an iframe.');
      }
      
      const stream = await navigator.mediaDevices.getDisplayMedia({
        video: {
          width: { ideal: 1920 },
          height: { ideal: 1080 },
          frameRate: { ideal: 30 }
        },
        audio: false
      });

      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }

      setStreamActive(true);
      addLog('WebRTC Screen Share channel established successfully!');
      addLog('Mirroring client screen buffer directly to mac-receiver.');

      // Listen for stream ends (user clicks "Stop Sharing" on browser bar)
      stream.getVideoTracks()[0].onended = () => {
        stopRealScreenShare();
        addLog('Client terminated screen-cast session.');
      };

    } catch (err: any) {
      console.error(err);
      setErrorMsg(err.message || 'Permission denied or browser error.');
      addLog(`Casting Error: ${err.message || 'User aborted session'}`);
      setStreamActive(false);
    }
  };

  const stopRealScreenShare = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
    setStreamActive(false);
    addLog('Screen share disconnected. Reverting to standby diagnostics.');
  };

  // Cleanup stream on unmount
  useEffect(() => {
    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  return (
    <section 
      id="screen-mirror-root"
      className="relative min-h-screen bg-[#070809] text-white py-24 px-6 md:px-12 flex flex-col justify-center overflow-hidden"
    >
      {/* Background visual cues */}
      <div className="absolute top-[10%] left-[20%] w-[500px] h-[500px] bg-[#0071E3]/5 rounded-full filter blur-[150px] pointer-events-none" />
      <div className="absolute bottom-[15%] right-[10%] w-[400px] h-[400px] bg-indigo-500/5 rounded-full filter blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto w-full relative z-10 space-y-12">
        
        {/* Title Block */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 bg-[#1C1D24] border border-white/10 px-4 py-1.5 rounded-full text-[10px] font-mono tracking-widest text-[#0071E3] font-bold uppercase">
            <Tv className="w-3 h-3 text-[#0071E3]" />
            <span>AIR-MIRROR RECEIVER ENGINE</span>
          </div>
          
          <h2 className="text-4xl md:text-6xl font-display font-light text-white tracking-tight leading-tight">
            Consultation Screen Cast.
          </h2>
          
          <p className="text-sm md:text-base text-neutral-400 font-sans max-w-2xl mx-auto">
            Mirror your live mobile medical interface directly onto the doctor's macOS workstation. Select Simulated Live Feed or activate a hardware WebRTC connection to mirror your actual screen.
          </p>
        </div>

        {/* Dynamic Dual layout: Mac Station & Sidebar Controller */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Left panel: Mac Station Display Frame (Col span 8) */}
          <div className="lg:col-span-8 flex flex-col justify-between bg-[#111216] border border-white/10 rounded-[2.5rem] p-6 shadow-2xl relative overflow-hidden min-h-[580px]">
            {/* Gloss reflection line */}
            <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-white/[0.02] to-transparent pointer-events-none" />
            
            {/* macOS window header controls */}
            <div className="flex items-center justify-between pb-4 border-b border-white/5 relative z-10">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-[#FF5F56] border border-black/10" />
                <div className="w-3 h-3 rounded-full bg-[#FFBD2E] border border-black/10" />
                <div className="w-3 h-3 rounded-full bg-[#27C93F] border border-black/10" />
                <span className="ml-2.5 text-xs text-neutral-400 font-mono tracking-wide">macOS-Informatics_Dossier_Terminal_v4.app</span>
              </div>

              {/* Status bar */}
              <div className="flex items-center gap-4 text-[10px] font-mono">
                <div className="flex items-center gap-2 bg-black/40 px-3 py-1 rounded-full border border-white/5">
                  <span className={`w-1.5 h-1.5 rounded-full ${streamActive || castMode === 'simulated' ? 'bg-emerald-400 animate-pulse' : 'bg-neutral-500'}`} />
                  <span className="text-neutral-300 font-bold uppercase">
                    {castMode === 'real' ? (streamActive ? 'REAL STREAM ACTIVE' : 'REAL STREAM STANDBY') : 'SIMULATION FEED ACTIVE'}
                  </span>
                </div>
                
                {streamActive && (
                  <div className="flex items-center gap-1.5 text-neutral-400">
                    <Wifi className="w-3.5 h-3.5 text-emerald-400" />
                    <span>{signalStrength}%</span>
                  </div>
                )}
              </div>
            </div>

            {/* Inner Mac Display Screen area */}
            <div className="flex-1 my-6 bg-[#090A0C] border border-white/5 rounded-2xl p-4 flex items-center justify-center relative overflow-hidden min-h-[360px]">
              {/* Overlay grid mesh lines */}
              <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,_rgba(0,0,0,0.25)_50%),_linear-gradient(90deg,_rgba(255,0,0,0.06),_rgba(0,255,0,0.02),_rgba(0,0,255,0.06))] bg-[size:100%_4px,_6px_100%] pointer-events-none z-10 opacity-30" />

              {/* Mode 1: Simulated Phone Mirroring interface */}
              {castMode === 'simulated' && (
                <div className="w-full h-full flex flex-col md:flex-row items-center justify-center gap-8 py-4 relative z-10">
                  {/* The Simulated Phone Screen mockup inside the Mac */}
                  <div className="w-[240px] h-[380px] bg-[#141517] border-4 border-[#2A2B2F] rounded-[2.5rem] p-3 shadow-2xl relative flex flex-col justify-between overflow-hidden">
                    {/* Phone Camera Notch */}
                    <div className="absolute top-2.5 left-1/2 -translate-x-1/2 w-14 h-4 bg-black rounded-full z-20 flex items-center justify-center">
                      <div className="w-1.5 h-1.5 rounded-full bg-neutral-800" />
                    </div>

                    {/* Phone inner screen */}
                    <div className="flex-1 bg-black rounded-[1.8rem] overflow-hidden flex flex-col justify-between p-3 pt-6 relative text-left">
                      {/* Internal contents based on state */}
                      <AnimatePresence mode="wait">
                        {phoneScreen === 'summary' && (
                          <motion.div 
                            key="summary"
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 10 }}
                            className="space-y-2.5 flex-1 flex flex-col justify-between"
                          >
                            <div className="space-y-1.5">
                              <span className="text-[7px] font-mono text-neutral-500 uppercase font-bold tracking-widest block">MEDILINK MOBILE</span>
                              <h4 className="text-xs font-semibold text-white">Patient Dossier Overview</h4>
                              
                              <div className="bg-neutral-900 border border-white/5 p-2 rounded-lg space-y-1">
                                <div className="flex justify-between text-[7px] text-neutral-400 font-mono">
                                  <span>PATIENT</span>
                                  <span>M. Khaled</span>
                                </div>
                                <div className="h-px bg-white/5" />
                                <div className="flex justify-between text-[7px] text-neutral-400 font-mono">
                                  <span>VISITS</span>
                                  <span>3 Scheduled</span>
                                </div>
                                <div className="h-px bg-white/5" />
                                <div className="flex justify-between text-[7px] text-neutral-400 font-mono">
                                  <span>INFORMATICS</span>
                                  <span className="text-emerald-400">Synced</span>
                                </div>
                              </div>
                            </div>

                            <div className="bg-[#0071E3]/10 border border-[#0071E3]/20 p-2 rounded-xl text-center">
                              <HeartPulse className="w-5 h-5 text-[#0071E3] mx-auto mb-1 animate-pulse" />
                              <span className="text-[8px] text-white font-mono uppercase block">Real-time telemetry</span>
                            </div>
                          </motion.div>
                        )}

                        {phoneScreen === 'mri' && (
                          <motion.div 
                            key="mri"
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 10 }}
                            className="space-y-2 flex-1 flex flex-col justify-between"
                          >
                            <div className="space-y-1.5">
                              <span className="text-[7px] font-mono text-orange-400 uppercase font-bold tracking-widest block">HTAN SEGMENTATION</span>
                              <h4 className="text-xs font-semibold text-white">Interactive Cell Map</h4>
                              
                              <div className="w-full h-24 bg-black border border-white/10 rounded-lg relative overflow-hidden flex items-center justify-center">
                                <div className="w-10 h-10 rounded-full border border-orange-500/30 bg-orange-500/10 animate-ping absolute" />
                                <div className="w-6 h-6 rounded-full bg-orange-500/20 border border-orange-500 flex items-center justify-center">
                                  <span className="w-2 h-2 rounded-full bg-orange-500" />
                                </div>
                              </div>
                              <p className="text-[8px] text-neutral-400 leading-normal font-sans">
                                90.32% Segmentation confidence. Contours traced autonomously.
                              </p>
                            </div>

                            <div className="bg-neutral-900 border border-white/5 p-1.5 rounded-lg text-center font-mono text-[7px] text-neutral-300">
                              Active Trace Target: Area x4
                            </div>
                          </motion.div>
                        )}

                        {phoneScreen === 'prescriptions' && (
                          <motion.div 
                            key="prescriptions"
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 10 }}
                            className="space-y-2 flex-1 flex flex-col justify-between"
                          >
                            <div className="space-y-1.5">
                              <span className="text-[7px] font-mono text-emerald-400 uppercase font-bold tracking-widest block">E-PRESCRIPTIONS</span>
                              <h4 className="text-xs font-semibold text-white">Active Pharmacy Orders</h4>
                              
                              <div className="bg-neutral-900/50 border border-white/5 p-2 rounded-lg space-y-2">
                                <div className="flex items-center gap-1.5 text-[8px] text-white">
                                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                                  <span>Amoxicillin 500mg</span>
                                </div>
                                <div className="flex items-center gap-1.5 text-[8px] text-white">
                                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                                  <span>Loratadine 10mg</span>
                                </div>
                                <div className="flex items-center gap-1.5 text-[8px] text-white">
                                  <div className="w-1.5 h-1.5 rounded-full bg-neutral-600" />
                                  <span className="text-neutral-400">Betamethasone - Closed</span>
                                </div>
                              </div>
                            </div>

                            <div className="p-1.5 bg-emerald-950/30 border border-emerald-500/20 rounded-lg text-center text-[7px] font-mono text-emerald-400 uppercase">
                              Secured by Weaviate RAG
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>

                      {/* Phone navigation bar bar */}
                      <div className="mt-3 pt-2 border-t border-white/5 flex justify-around text-[9px] font-mono text-neutral-500">
                        <button 
                          onClick={() => setPhoneScreen('summary')}
                          className={`hover:text-white transition-colors ${phoneScreen === 'summary' ? 'text-white font-bold' : ''}`}
                        >
                          Dossier
                        </button>
                        <button 
                          onClick={() => setPhoneScreen('mri')}
                          className={`hover:text-white transition-colors ${phoneScreen === 'mri' ? 'text-orange-400 font-bold' : ''}`}
                        >
                          Trace
                        </button>
                        <button 
                          onClick={() => setPhoneScreen('prescriptions')}
                          className={`hover:text-white transition-colors ${phoneScreen === 'prescriptions' ? 'text-emerald-400 font-bold' : ''}`}
                        >
                          Rx
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Mac Side Terminal Display Mirror explaining what is happening */}
                  <div className="flex-1 max-w-sm space-y-4 text-left bg-black/40 p-4 rounded-xl border border-white/5">
                    <span className="text-[9px] font-mono text-[#0071E3] uppercase tracking-wider font-bold block">MIRROR LOGS</span>
                    <div className="space-y-2">
                      <div className="text-xs text-neutral-300 leading-relaxed font-sans">
                        You are browsing the <span className="text-white font-bold">{phoneScreen.toUpperCase()}</span> screen of your mobile device, currently projected via secure tunnel to the consultation desktop.
                      </div>
                      <div className="h-px bg-white/5" />
                      <div className="space-y-1">
                        <div className="flex justify-between items-center text-[9px] font-mono text-neutral-500">
                          <span>Connection Type</span>
                          <span className="text-emerald-400 font-bold">WIFI-Airmirror</span>
                        </div>
                        <div className="flex justify-between items-center text-[9px] font-mono text-neutral-500">
                          <span>Signal Link</span>
                          <span className="text-emerald-400 font-bold">Excellent (-48dBm)</span>
                        </div>
                        <div className="flex justify-between items-center text-[9px] font-mono text-neutral-500">
                          <span>Frame Buffer Latency</span>
                          <span className="text-emerald-400 font-bold">4.2ms</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Mode 2: Real Screen Share WebRTC casting */}
              {castMode === 'real' && (
                <div className="w-full h-full flex flex-col items-center justify-center text-center p-6 min-h-[300px]">
                  
                  {/* Video Player receiving WebRTC stream */}
                  <div className="relative w-full max-w-2xl aspect-video bg-black rounded-xl border border-white/10 overflow-hidden shadow-2xl flex items-center justify-center">
                    
                    {!streamActive && (
                      <div className="absolute inset-0 flex flex-col items-center justify-center space-y-4 p-4">
                        <div className="p-3 bg-neutral-900 border border-white/10 rounded-full text-neutral-500">
                          <Monitor className="w-8 h-8" />
                        </div>
                        <div className="space-y-1">
                          <p className="text-sm font-semibold text-white">WebRTC Receiver Stream Off</p>
                          <p className="text-xs text-neutral-400 max-w-md mx-auto">
                            Launch your browser’s screen-share credentials using the controller panel to the right to see your live display projected inside the macOS terminal frame.
                          </p>
                        </div>
                      </div>
                    )}

                    {/* The Live Video screen feed */}
                    <video 
                      ref={videoRef}
                      autoPlay 
                      playsInline 
                      muted 
                      className={`w-full h-full object-contain relative z-20 ${streamActive ? 'block' : 'hidden'}`}
                    />
                  </div>

                  {/* Informational Hint about Frame Permissions & Iframes */}
                  <div className="mt-4 flex items-start gap-2 max-w-md bg-blue-950/20 border border-blue-900/30 p-3 rounded-lg text-left">
                    <AlertCircle className="w-4 h-4 text-[#0071E3] shrink-0 mt-0.5" />
                    <p className="text-[10px] text-neutral-400 leading-normal font-sans">
                      <strong className="text-blue-400">Sandbox Note:</strong> Real-time casting uses secure WebRTC. If browser permissions fail, click <strong className="text-white">"Open in New Tab"</strong> at the top right of your workspace to bypass iframe isolation blocks.
                    </p>
                  </div>

                </div>
              )}

            </div>

            {/* macOS bottom bar / dock simulator */}
            <div className="pt-4 border-t border-white/5 flex justify-between items-center relative z-10 text-[9px] font-mono text-neutral-500">
              <span className="uppercase">AIR-RECEIVER INBOUND ACTIVE</span>
              <span className="uppercase">Port: 3000 • Encryption: SSL/TLS</span>
            </div>
          </div>

          {/* Right panel: Sidebar Controller (Col span 4) */}
          <div className="lg:col-span-4 bg-[#111216] border border-white/10 rounded-[2.5rem] p-6 md:p-8 flex flex-col justify-between shadow-xl space-y-6">
            
            <div className="space-y-6">
              <div className="space-y-1.5 text-left">
                <span className="text-[9px] font-mono text-[#0071E3] uppercase tracking-wider font-bold">STATION CONFIG</span>
                <h3 className="text-xl font-display font-medium text-white">Mirroring Options</h3>
                <p className="text-xs text-neutral-400 leading-relaxed font-sans font-light">
                  Toggle between simulated informatics previews or start a WebRTC-based live screen sharing connection.
                </p>
              </div>

              {/* Mode Select Buttons */}
              <div className="grid grid-cols-2 gap-2 bg-black/40 border border-white/5 p-1.5 rounded-xl">
                <button
                  onClick={() => {
                    stopRealScreenShare();
                    setCastMode('simulated');
                    addLog('Switched connection to simulated device stream.');
                  }}
                  className={`py-2 text-[10px] font-mono font-bold uppercase rounded-lg transition-colors flex items-center justify-center gap-1.5 ${
                    castMode === 'simulated' 
                      ? 'bg-[#0071E3] text-white' 
                      : 'text-neutral-400 hover:text-white'
                  }`}
                >
                  <Smartphone className="w-3.5 h-3.5" />
                  <span>Simulated</span>
                </button>

                <button
                  onClick={() => {
                    setCastMode('real');
                    addLog('Switched connection to real-time WebRTC feed.');
                  }}
                  className={`py-2 text-[10px] font-mono font-bold uppercase rounded-lg transition-colors flex items-center justify-center gap-1.5 ${
                    castMode === 'real' 
                      ? 'bg-[#0071E3] text-white' 
                      : 'text-neutral-400 hover:text-white'
                  }`}
                >
                  <Monitor className="w-3.5 h-3.5" />
                  <span>Real Cast</span>
                </button>
              </div>

              {/* Action controller panels based on active mode */}
              <AnimatePresence mode="wait">
                {castMode === 'simulated' ? (
                  <motion.div
                    key="ctrl-simulated"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="space-y-4 text-left"
                  >
                    <span className="text-[9px] font-mono text-[#0071E3] uppercase tracking-wider font-bold block">SIMULATION TARGETS</span>
                    <div className="space-y-2">
                      <button
                        onClick={() => {
                          setPhoneScreen('summary');
                          addLog('Consultation terminal requested Dossier Overview.');
                        }}
                        className={`w-full p-3 rounded-xl border text-left flex items-center justify-between text-xs transition-colors ${
                          phoneScreen === 'summary' 
                            ? 'bg-[#1C1D24] border-[#0071E3]/50 text-white' 
                            : 'bg-black/30 border-white/5 text-neutral-400 hover:text-white'
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <Layers className="w-4 h-4 text-[#0071E3]" />
                          <span>Patient Dossier Overview</span>
                        </div>
                        {phoneScreen === 'summary' && <Check className="w-4 h-4 text-emerald-400" />}
                      </button>

                      <button
                        onClick={() => {
                          setPhoneScreen('mri');
                          addLog('Consultation terminal requested HTAN Cell Map.');
                        }}
                        className={`w-full p-3 rounded-xl border text-left flex items-center justify-between text-xs transition-colors ${
                          phoneScreen === 'mri' 
                            ? 'bg-[#1C1D24] border-orange-500/50 text-white' 
                            : 'bg-black/30 border-white/5 text-neutral-400 hover:text-white'
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <HeartPulse className="w-4 h-4 text-orange-400" />
                          <span>HTAN Cell Map</span>
                        </div>
                        {phoneScreen === 'mri' && <Check className="w-4 h-4 text-emerald-400" />}
                      </button>

                      <button
                        onClick={() => {
                          setPhoneScreen('prescriptions');
                          addLog('Consultation terminal requested Biomedical RAG Order.');
                        }}
                        className={`w-full p-3 rounded-xl border text-left flex items-center justify-between text-xs transition-colors ${
                          phoneScreen === 'prescriptions' 
                            ? 'bg-[#1C1D24] border-emerald-500/50 text-white' 
                            : 'bg-black/30 border-white/5 text-neutral-400 hover:text-white'
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <ShieldCheck className="w-4 h-4 text-emerald-400" />
                          <span>Biomedical RAG Prescriptions</span>
                        </div>
                        {phoneScreen === 'prescriptions' && <Check className="w-4 h-4 text-emerald-400" />}
                      </button>
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    key="ctrl-real"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="space-y-4 text-left"
                  >
                    <span className="text-[9px] font-mono text-[#0071E3] uppercase tracking-wider font-bold block">WEBRTC MEDIA CHANNEL</span>
                    
                    {!streamActive ? (
                      <button
                        onClick={startRealScreenShare}
                        className="w-full py-3.5 bg-[#0071E3] hover:bg-[#147CE5] font-semibold text-xs uppercase tracking-wider text-white rounded-xl transition-all hover:scale-[1.01] active:scale-95 flex items-center justify-center gap-2 shadow-lg cursor-pointer"
                      >
                        <Play className="w-4 h-4" />
                        <span>Start Real Cast</span>
                      </button>
                    ) : (
                      <button
                        onClick={stopRealScreenShare}
                        className="w-full py-3.5 bg-red-600 hover:bg-red-700 font-semibold text-xs uppercase tracking-wider text-white rounded-xl transition-all hover:scale-[1.01] active:scale-95 flex items-center justify-center gap-2 shadow-lg cursor-pointer"
                      >
                        <Square className="w-4 h-4" />
                        <span>Stop Sharing</span>
                      </button>
                    )}

                    {errorMsg && (
                      <div className="p-3 bg-red-950/20 border border-red-900/30 text-red-400 text-[10px] font-mono rounded-lg">
                        <strong>ERROR:</strong> {errorMsg}
                      </div>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Inbound Logs Console */}
            <div className="space-y-3 pt-6 border-t border-white/5 text-left">
              <span className="text-[9px] font-mono text-[#86868B] uppercase tracking-wider font-bold block">STATION DIAGNOSTIC CONSOLE</span>
              <div className="bg-black/60 p-4 rounded-xl border border-white/5 font-mono text-[9px] text-[#A1A1A6] space-y-1.5 h-[120px] overflow-y-auto">
                {logs.map((log, idx) => (
                  <div key={idx} className="truncate">
                    {log}
                  </div>
                ))}
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
