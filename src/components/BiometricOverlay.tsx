import React, { useState, useEffect } from 'react';
import { 
  ScanFace, 
  Fingerprint, 
  ShieldCheck, 
  Lock, 
  Unlock, 
  CheckCircle2, 
  KeyRound, 
  Delete,
  Sparkles
} from 'lucide-react';
import { StudentProfile } from '../types';

interface BiometricOverlayProps {
  student: StudentProfile;
  isOpen: boolean;
  onAuthenticated: () => void;
}

export const BiometricOverlay: React.FC<BiometricOverlayProps> = ({
  student,
  isOpen,
  onAuthenticated,
}) => {
  const [authMode, setAuthMode] = useState<'face' | 'fingerprint' | 'pin'>('face');
  const [scanState, setScanState] = useState<'idle' | 'scanning' | 'success' | 'error'>('idle');
  const [statusMessage, setStatusMessage] = useState('Toque para iniciar autenticación biométrica');
  const [pinDigits, setPinDigits] = useState<string[]>([]);
  const [pinError, setPinError] = useState(false);

  // Auto-trigger biometric scan when modal opens
  useEffect(() => {
    if (isOpen) {
      setScanState('idle');
      setStatusMessage('Autenticación Biométrica Cloud Campus');
      const timer = setTimeout(() => {
        triggerBiometricScan();
      }, 600);
      return () => clearTimeout(timer);
    }
  }, [isOpen, authMode]);

  const triggerBiometricScan = () => {
    if (scanState === 'scanning' || scanState === 'success') return;
    setScanState('scanning');
    setStatusMessage(
      authMode === 'face'
        ? 'Escaneando rostro del estudiante...'
        : 'Leyendo sensor dactilar institucional...'
    );

    // Simulated scan duration
    setTimeout(() => {
      setScanState('success');
      setStatusMessage('¡Identidad Verificada! Acceso Concedido.');
      
      // Complete auth
      setTimeout(() => {
        onAuthenticated();
      }, 700);
    }, 1400);
  };

  const handlePinPress = (digit: string) => {
    if (pinDigits.length < 4) {
      const next = [...pinDigits, digit];
      setPinDigits(next);
      setPinError(false);

      if (next.length === 4) {
        // Any 4-digit PIN works, or specifically 2026
        const entered = next.join('');
        if (entered === '2026' || entered.length === 4) {
          setScanState('success');
          setStatusMessage('PIN Válido. Bienvenido a Cloud Campus.');
          setTimeout(() => {
            onAuthenticated();
            setPinDigits([]);
          }, 600);
        } else {
          setPinError(true);
          setTimeout(() => setPinDigits([]), 600);
        }
      }
    }
  };

  const handlePinDelete = () => {
    setPinDigits((prev) => prev.slice(0, -1));
    setPinError(false);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/90 backdrop-blur-xl flex items-center justify-center p-4 animate-in fade-in duration-300">
      <div className="w-full max-w-sm rounded-[36px] bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950 border border-slate-700/80 shadow-2xl p-6 sm:p-8 text-white flex flex-col items-center justify-between min-h-[520px] relative overflow-hidden">
        
        {/* Ambient background glows */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-64 bg-sky-500/10 rounded-full blur-3xl pointer-events-none -mt-16" />
        <div className="absolute bottom-0 right-0 w-48 h-48 bg-indigo-500/10 rounded-full blur-2xl pointer-events-none -mr-12 -mb-12" />

        {/* 1. Header with MEP / Institutional Branding */}
        <div className="relative z-10 flex flex-col items-center text-center space-y-1">
          <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[11px] font-medium text-sky-300">
            <ShieldCheck className="w-3.5 h-3.5 text-sky-400" />
            <span>Seguridad Biométrica Institucional</span>
          </div>
          <h2 className="text-xl font-bold tracking-tight text-white mt-1">
            Cloud Campus MEP
          </h2>
          <p className="text-xs text-slate-400 font-medium">
            Colegio Técnico Profesional de Acosta
          </p>
        </div>

        {/* 2. Student Avatar & Identity Lockup */}
        <div className="relative z-10 flex flex-col items-center my-3 text-center">
          <div className="relative">
            <img
              src={student.avatarUrl}
              alt={student.fullName}
              referrerPolicy="no-referrer"
              className="w-20 h-20 rounded-2xl object-cover border-2 border-sky-400/40 shadow-xl"
            />
            <div className={`absolute -bottom-1 -right-1 p-1 rounded-full border-2 border-slate-900 ${
              scanState === 'success' ? 'bg-emerald-500' : 'bg-sky-600'
            }`}>
              {scanState === 'success' ? (
                <Unlock className="w-3 h-3 text-white" />
              ) : (
                <Lock className="w-3 h-3 text-white" />
              )}
            </div>
          </div>

          <h3 className="text-base font-bold text-white mt-2">
            {student.fullName}
          </h3>
          <p className="text-xs text-slate-400 font-mono">
            {student.section} · Carné {student.institutionalId}
          </p>
        </div>

        {/* 3. Biometric Interactive Zone */}
        <div className="relative z-10 w-full flex flex-col items-center">
          {authMode === 'face' && (
            <div
              onClick={triggerBiometricScan}
              className="relative w-28 h-28 flex items-center justify-center cursor-pointer group"
              title="Toca para escanear rostro"
            >
              {/* Animated Scanner HUD Corners */}
              <div className={`absolute inset-0 rounded-3xl border-2 transition-all duration-300 ${
                scanState === 'scanning'
                  ? 'border-sky-400 scale-105 shadow-[0_0_25px_rgba(56,189,248,0.4)]'
                  : scanState === 'success'
                  ? 'border-emerald-400 scale-105 shadow-[0_0_25px_rgba(52,211,153,0.4)]'
                  : 'border-white/20 group-hover:border-white/40'
              }`}>
                {/* HUD Corner highlights */}
                <div className="absolute -top-1 -left-1 w-3 h-3 border-t-2 border-l-2 border-sky-400" />
                <div className="absolute -top-1 -right-1 w-3 h-3 border-t-2 border-r-2 border-sky-400" />
                <div className="absolute -bottom-1 -left-1 w-3 h-3 border-b-2 border-l-2 border-sky-400" />
                <div className="absolute -bottom-1 -right-1 w-3 h-3 border-b-2 border-r-2 border-sky-400" />
              </div>

              {/* Scanning beam animation */}
              {scanState === 'scanning' && (
                <div className="absolute inset-x-2 h-0.5 bg-gradient-to-r from-transparent via-sky-400 to-transparent animate-pulse shadow-[0_0_8px_#38bdf8]" />
              )}

              {/* Center Icon */}
              {scanState === 'success' ? (
                <CheckCircle2 className="w-14 h-14 text-emerald-400 animate-in zoom-in-75 duration-300" />
              ) : (
                <ScanFace className={`w-14 h-14 transition-colors duration-300 ${
                  scanState === 'scanning' ? 'text-sky-400 animate-pulse' : 'text-slate-300 group-hover:text-white'
                }`} />
              )}
            </div>
          )}

          {authMode === 'fingerprint' && (
            <div
              onClick={triggerBiometricScan}
              className="relative w-28 h-28 flex items-center justify-center cursor-pointer group"
              title="Toca para escanear huella dactilar"
            >
              {/* Ripple Ring Effect */}
              <div className={`absolute inset-0 rounded-full border-2 transition-all duration-300 ${
                scanState === 'scanning'
                  ? 'border-sky-400 scale-110 animate-ping opacity-30'
                  : scanState === 'success'
                  ? 'border-emerald-400 scale-105'
                  : 'border-white/20 group-hover:border-white/40'
              }`} />

              <div className={`w-24 h-24 rounded-full flex items-center justify-center bg-white/5 border border-white/10 ${
                scanState === 'scanning' ? 'bg-sky-500/10 border-sky-400/50' : ''
              }`}>
                {scanState === 'success' ? (
                  <CheckCircle2 className="w-12 h-12 text-emerald-400 animate-in zoom-in-75" />
                ) : (
                  <Fingerprint className={`w-12 h-12 transition-colors duration-300 ${
                    scanState === 'scanning' ? 'text-sky-400 animate-pulse' : 'text-slate-300 group-hover:text-white'
                  }`} />
                )}
              </div>
            </div>
          )}

          {authMode === 'pin' && (
            <div className="w-full flex flex-col items-center space-y-3">
              {/* PIN Dots */}
              <div className="flex items-center gap-3 my-1">
                {[0, 1, 2, 3].map((idx) => {
                  const filled = pinDigits.length > idx;
                  return (
                    <div
                      key={idx}
                      className={`w-3.5 h-3.5 rounded-full border-2 transition-all duration-200 ${
                        pinError
                          ? 'border-rose-500 bg-rose-500 animate-bounce'
                          : filled
                          ? 'border-sky-400 bg-sky-400 scale-110 shadow-[0_0_8px_#38bdf8]'
                          : 'border-slate-600 bg-transparent'
                      }`}
                    />
                  );
                })}
              </div>

              {/* Numeric Keypad */}
              <div className="grid grid-cols-3 gap-2 w-full max-w-[240px]">
                {['1', '2', '3', '4', '5', '6', '7', '8', '9'].map((num) => (
                  <button
                    key={num}
                    type="button"
                    onClick={() => handlePinPress(num)}
                    className="h-11 rounded-xl bg-white/5 hover:bg-white/15 active:scale-95 text-base font-semibold transition-all flex items-center justify-center font-mono"
                  >
                    {num}
                  </button>
                ))}
                <button
                  type="button"
                  onClick={() => setAuthMode('face')}
                  className="h-11 rounded-xl bg-white/5 hover:bg-white/10 active:scale-95 text-xs text-slate-400 flex items-center justify-center"
                  title="Volver a Biometría"
                >
                  <ScanFace className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => handlePinPress('0')}
                  className="h-11 rounded-xl bg-white/5 hover:bg-white/15 active:scale-95 text-base font-semibold transition-all flex items-center justify-center font-mono"
                >
                  0
                </button>
                <button
                  type="button"
                  onClick={handlePinDelete}
                  className="h-11 rounded-xl bg-white/5 hover:bg-white/10 active:scale-95 text-slate-400 flex items-center justify-center"
                  title="Borrar dígito"
                >
                  <Delete className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* Feedback Status Text */}
          <p className={`text-xs mt-3 font-medium transition-colors text-center ${
            scanState === 'success'
              ? 'text-emerald-400 font-semibold'
              : scanState === 'scanning'
              ? 'text-sky-300'
              : 'text-slate-400'
          }`}>
            {statusMessage}
          </p>

          {/* Primary Action Button (If in idle state) */}
          {authMode !== 'pin' && scanState === 'idle' && (
            <button
              onClick={triggerBiometricScan}
              className="mt-3 px-5 py-2 rounded-xl bg-sky-600 hover:bg-sky-500 active:scale-95 text-xs font-semibold text-white shadow-lg shadow-sky-600/30 transition-all flex items-center gap-1.5"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Autenticar Ahora</span>
            </button>
          )}
        </div>

        {/* 4. Bottom Switchers for Biometric Methods & Fallback */}
        <div className="relative z-10 w-full pt-4 border-t border-white/10 flex items-center justify-around text-xs text-slate-400">
          <button
            onClick={() => {
              setAuthMode('face');
              setScanState('idle');
            }}
            className={`flex items-center gap-1.5 py-1.5 px-2.5 rounded-lg transition-colors ${
              authMode === 'face' ? 'text-sky-400 bg-white/10 font-semibold' : 'hover:text-white'
            }`}
          >
            <ScanFace className="w-4 h-4" />
            <span>Face ID</span>
          </button>

          <button
            onClick={() => {
              setAuthMode('fingerprint');
              setScanState('idle');
            }}
            className={`flex items-center gap-1.5 py-1.5 px-2.5 rounded-lg transition-colors ${
              authMode === 'fingerprint' ? 'text-sky-400 bg-white/10 font-semibold' : 'hover:text-white'
            }`}
          >
            <Fingerprint className="w-4 h-4" />
            <span>Huella</span>
          </button>

          <button
            onClick={() => {
              setAuthMode('pin');
              setScanState('idle');
              setStatusMessage('Ingrese el PIN institucional (Ej: 2026)');
            }}
            className={`flex items-center gap-1.5 py-1.5 px-2.5 rounded-lg transition-colors ${
              authMode === 'pin' ? 'text-sky-400 bg-white/10 font-semibold' : 'hover:text-white'
            }`}
          >
            <KeyRound className="w-4 h-4" />
            <span>PIN MEP</span>
          </button>
        </div>

      </div>
    </div>
  );
};
