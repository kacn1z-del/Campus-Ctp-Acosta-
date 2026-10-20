import React, { useState } from 'react';
import { 
  X, 
  RotateCw, 
  ShieldCheck, 
  QrCode, 
  Download, 
  Share2, 
  Sparkles,
  Phone,
  Heart
} from 'lucide-react';
import { StudentProfile } from '../types';

interface DigitalCardModalProps {
  student: StudentProfile;
  isOpen: boolean;
  onClose: () => void;
}

export const DigitalCardModal: React.FC<DigitalCardModalProps> = ({
  student,
  isOpen,
  onClose,
}) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [qrValidSeconds, setQrValidSeconds] = useState(45);

  // Dynamic token timer simulator
  React.useEffect(() => {
    if (!isOpen) return;
    const interval = setInterval(() => {
      setQrValidSeconds((prev) => (prev > 1 ? prev - 1 : 60));
    }, 1000);
    return () => clearInterval(interval);
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/75 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in">
      <div className="w-full max-w-sm flex flex-col items-center">
        {/* Top Control Bar */}
        <div className="w-full flex items-center justify-between text-white mb-4 px-2">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-sky-400" />
            <span className="text-xs font-bold tracking-tight">
              Carné Digital Oficial CTP Acosta
            </span>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
            aria-label="Cerrar carné"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* 3D Flip Card Container */}
        <div className="w-full aspect-[1/1.58] perspective-1000">
          <div
            className={`w-full h-full relative transition-transform duration-700 preserve-3d cursor-pointer ${
              isFlipped ? 'rotate-y-180' : ''
            }`}
            onClick={() => setIsFlipped(!isFlipped)}
            title="Haz clic para voltear el carné"
          >
            {/* FRONT OF THE CARD */}
            <div className="absolute inset-0 backface-hidden rounded-3xl bg-gradient-to-b from-sky-900 via-slate-900 to-slate-950 border-2 border-sky-400/30 p-5 shadow-2xl text-white flex flex-col justify-between overflow-hidden">
              {/* Security Hologram Ribbon */}
              <div className="absolute top-0 right-0 w-36 h-36 bg-gradient-to-bl from-sky-400/20 via-emerald-400/10 to-transparent rounded-full blur-xl pointer-events-none" />

              {/* Card Header */}
              <div className="relative z-10 border-b border-white/15 pb-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-sky-500 flex items-center justify-center text-white font-black text-xs shadow-sm">
                      MEP
                    </div>
                    <div>
                      <h4 className="text-[11px] font-extrabold tracking-wide uppercase text-sky-300">
                        CTP Acosta
                      </h4>
                      <p className="text-[9px] text-slate-300 tracking-tight">
                        Col. Técnico Profesional de Acosta
                      </p>
                    </div>
                  </div>

                  <div className="text-right">
                    <span className="text-[10px] font-mono font-bold text-sky-400 block">
                      {student.institutionalId}
                    </span>
                    <span className="text-[8px] text-emerald-400 uppercase font-semibold">
                      Activo 2026
                    </span>
                  </div>
                </div>
              </div>

              {/* Card Middle: Photo & Student Data */}
              <div className="relative z-10 flex gap-4 items-center my-auto">
                <div className="relative shrink-0">
                  <img
                    src={student.avatarUrl}
                    alt={student.fullName}
                    referrerPolicy="no-referrer"
                    className="w-24 h-28 rounded-2xl object-cover border-2 border-sky-400/40 shadow-md"
                  />
                  <div className="absolute -bottom-1.5 -right-1.5 bg-sky-600 rounded-full p-1 border border-slate-900 shadow">
                    <Sparkles className="w-3 h-3 text-white" />
                  </div>
                </div>

                <div className="min-w-0">
                  <span className="text-[10px] text-sky-300 font-semibold block">
                    {student.section} · {student.gradeLevel}
                  </span>
                  <h3 className="text-base font-bold tracking-tight text-white line-clamp-2 mt-0.5 leading-snug">
                    {student.fullName}
                  </h3>
                  <p className="text-[11px] text-slate-300 font-medium line-clamp-2 mt-1">
                    {student.specialty}
                  </p>
                  <p className="text-[10px] font-mono text-slate-400 mt-1">
                    Cédula: {student.idNumber}
                  </p>
                </div>
              </div>

              {/* Card Bottom: Secure Dynamic QR */}
              <div className="relative z-10 bg-white rounded-2xl p-3 flex items-center justify-between gap-3 text-slate-950">
                <div className="min-w-0">
                  <span className="text-[10px] font-bold text-sky-900 uppercase block tracking-wider">
                    QR Dinámico de Seguridad
                  </span>
                  <p className="text-[10px] text-slate-500 truncate">
                    Acceso Portón · Comedor · Biblioteca
                  </p>
                  <span className="text-[9px] font-mono text-sky-700 block mt-0.5">
                    Actualiza en: {qrValidSeconds}s
                  </span>
                </div>

                <div className="w-14 h-14 bg-slate-100 rounded-xl flex items-center justify-center p-1 border border-slate-200 shrink-0">
                  <QrCode className="w-full h-full text-slate-900" />
                </div>
              </div>
            </div>

            {/* BACK OF THE CARD */}
            <div className="absolute inset-0 backface-hidden rotate-y-180 rounded-3xl bg-gradient-to-b from-slate-900 via-slate-950 to-slate-900 border-2 border-slate-700 p-5 shadow-2xl text-white flex flex-col justify-between overflow-hidden">
              <div className="border-b border-white/10 pb-2 flex justify-between items-center">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                  Información Institucional & Emergencia
                </span>
                <span className="text-[10px] font-mono text-sky-400">
                  Circuito 03 MEP
                </span>
              </div>

              <div className="space-y-3 text-xs my-auto">
                <div className="flex items-center gap-2">
                  <Heart className="w-4 h-4 text-rose-500 shrink-0" />
                  <div>
                    <span className="text-[10px] text-slate-400 block">Tipo de Sangre</span>
                    <span className="font-bold font-mono">{student.bloodType}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-emerald-400 shrink-0" />
                  <div>
                    <span className="text-[10px] text-slate-400 block">Encargada / Contacto</span>
                    <span className="font-semibold">{student.parentName}</span>
                    <span className="block text-[11px] font-mono text-slate-300">
                      {student.parentPhone}
                    </span>
                  </div>
                </div>

                <div className="p-2.5 rounded-xl bg-white/5 border border-white/10 text-[11px]">
                  <span className="text-slate-400 block text-[10px]">Ruta de Transporte Asignada:</span>
                  <span className="font-medium text-sky-300">{student.transportRoute}</span>
                </div>
              </div>

              {/* Barcode & Director Signature */}
              <div className="border-t border-white/10 pt-3 space-y-2">
                <div className="flex items-center justify-between text-[10px] text-slate-400">
                  <span>M.Sc. Roberto Mora V.</span>
                  <span>Vigencia: 31/12/2026</span>
                </div>

                {/* Simulated Barcode */}
                <div className="h-9 bg-white rounded-lg p-1.5 flex items-center justify-center">
                  <div className="w-full h-full flex items-center justify-around gap-[2px]">
                    {[4, 2, 6, 2, 5, 2, 8, 3, 4, 2, 7, 3, 5, 2, 6, 4, 3, 2, 8, 2, 5, 3].map((w, i) => (
                      <div
                        key={i}
                        className="h-full bg-slate-900"
                        style={{ width: `${w}px` }}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Card Actions */}
        <div className="flex items-center justify-center gap-3 mt-4 w-full">
          <button
            onClick={() => setIsFlipped(!isFlipped)}
            className="flex-1 py-2.5 px-4 rounded-xl bg-white/15 hover:bg-white/25 text-white text-xs font-semibold flex items-center justify-center gap-2 transition-colors"
          >
            <RotateCw className="w-4 h-4" />
            <span>Voltear Carné</span>
          </button>

          <button
            onClick={() => alert('Carné guardado en el almacenamiento del dispositivo para acceso sin conexión.')}
            className="flex-1 py-2.5 px-4 rounded-xl bg-sky-600 hover:bg-sky-500 text-white text-xs font-semibold flex items-center justify-center gap-2 transition-colors shadow-lg shadow-sky-600/30"
          >
            <Download className="w-4 h-4" />
            <span>Guardar Carné</span>
          </button>
        </div>
      </div>
    </div>
  );
};
