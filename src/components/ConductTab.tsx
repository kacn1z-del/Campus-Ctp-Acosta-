import React, { useState } from 'react';
import { 
  ShieldCheck, 
  AlertTriangle, 
  Award, 
  FileText, 
  CheckCircle2, 
  Send, 
  X, 
  Info,
  Calendar,
  UserCheck
} from 'lucide-react';
import { ConductRecord, StudentProfile } from '../types';

interface ConductTabProps {
  student: StudentProfile;
  records: ConductRecord[];
  onAddAppeal: (recordId: string, appealReason: string) => void;
}

export const ConductTab: React.FC<ConductTabProps> = ({
  student,
  records,
  onAddAppeal,
}) => {
  const [selectedRecord, setSelectedRecord] = useState<ConductRecord | null>(null);
  const [appealText, setAppealText] = useState('');
  const [appealSuccess, setAppealSuccess] = useState(false);

  const handleAppealSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedRecord || !appealText.trim()) return;

    onAddAppeal(selectedRecord.id, appealText);
    setAppealSuccess(true);
    setTimeout(() => {
      setAppealSuccess(false);
      setSelectedRecord(null);
      setAppealText('');
    }, 1500);
  };

  const isGoodConduct = student.conductScore >= 90;

  return (
    <div className="space-y-6 pb-12">
      {/* 1. Header & Conduct Gauge */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-3xl p-5 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs text-sky-700 dark:text-sky-300 font-semibold">
              <span>Expediente Disciplinario Oficial</span>
              <span aria-hidden="true">·</span>
              <span>Reglamento MEP</span>
            </div>
            <h2 className="text-xl font-bold tracking-tight text-slate-900 dark:text-white mt-0.5">
              Conducta y Convivencia Escolar
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Evaluación actitudinal conforme al Reglamento de Evaluación de los Aprendizajes
            </p>
          </div>

          {/* Conduct Score Badge */}
          <div className="flex items-center gap-3 bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-2xl p-3 shrink-0">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
              isGoodConduct ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'
            }`}>
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] uppercase font-bold tracking-wider text-slate-500">
                Nota de Conducta
              </span>
              <div className="flex items-baseline gap-1">
                <span className="text-2xl font-bold font-mono tabular-nums text-slate-900 dark:text-white">
                  {student.conductScore}
                </span>
                <span className="text-xs text-slate-400">/ 100</span>
              </div>
            </div>
          </div>
        </div>

        {/* Status bar */}
        <div className="mt-4 p-3.5 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200/80 dark:border-emerald-900/60 flex items-center justify-between text-xs">
          <div className="flex items-center gap-2 text-emerald-900 dark:text-emerald-200">
            <Award className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>Condición: <strong>Honor al Mérito Estudiantil</strong> (Sin rebajo de puntos en el periodo)</span>
          </div>
          <span className="text-[10px] font-bold uppercase text-emerald-700 font-mono">
            Mínimo MEP: 65 pts
          </span>
        </div>
      </div>

      {/* 2. MEP Regulatory Notice */}
      <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 text-xs text-slate-600 dark:text-slate-300 flex items-start gap-3">
        <Info className="w-4 h-4 text-sky-600 shrink-0 mt-0.5" />
        <p>
          <strong>Garantía de Debido Proceso MEP:</strong> Las observaciones y boletas pueden ser objeto de descargo o apelación por parte del encargado legal ante el Consejo de Profesores en un plazo máximo de 3 días hábiles.
        </p>
      </div>

      {/* 3. Conduct History */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-3xl p-5 shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-bold text-slate-900 dark:text-white">
            Boletas y Anotaciones en el Expediente
          </h3>
          <span className="text-xs text-slate-500">
            {records.length} registros
          </span>
        </div>

        <div className="space-y-3">
          {records.map((rec) => (
            <div
              key={rec.id}
              className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/60 space-y-2.5"
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <div className="flex items-center gap-2 text-[11px] text-slate-500">
                    <span className="font-mono">{rec.date}</span>
                    <span aria-hidden="true">·</span>
                    <span>{rec.articleMep}</span>
                  </div>
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white mt-0.5">
                    {rec.type === 'Reconocimiento' ? 'Reconocimiento y Distinción Positiva' : rec.type}
                  </h4>
                  <span className="text-xs text-slate-500 block">Docente/Emisor: {rec.teacher}</span>
                </div>

                <div className="text-right shrink-0">
                  <span className={`inline-block text-[10px] font-bold px-2 py-0.5 rounded ${
                    rec.type === 'Reconocimiento'
                      ? 'text-emerald-700 bg-emerald-100 dark:bg-emerald-950 dark:text-emerald-300'
                      : 'text-amber-700 bg-amber-100 dark:bg-amber-950 dark:text-amber-300'
                  }`}>
                    {rec.type === 'Reconocimiento' ? '+ Mérito' : `-${rec.pointsDeducted} pts`}
                  </span>
                  <span className="block text-[10px] text-slate-400 mt-0.5">
                    {rec.status}
                  </span>
                </div>
              </div>

              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed bg-white dark:bg-slate-900 p-3 rounded-xl border border-slate-100 dark:border-slate-800">
                {rec.description}
              </p>

              {rec.type !== 'Reconocimiento' && (
                <div className="flex justify-end pt-1">
                  <button
                    onClick={() => setSelectedRecord(rec)}
                    className="text-xs font-semibold text-sky-600 hover:text-sky-700 underline"
                  >
                    Presentar descargos o apelación legal
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* 4. Appeal Modal */}
      {selectedRecord && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 w-full max-w-md rounded-3xl border border-slate-200 dark:border-slate-800 shadow-2xl p-6 space-y-4">
            <div className="flex items-center justify-between pb-2 border-b">
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                Descargos de Boleta Disciplinaria
              </h3>
              <button
                onClick={() => setSelectedRecord(null)}
                className="w-8 h-8 rounded-full bg-slate-100 text-slate-500 hover:text-slate-900 flex items-center justify-center"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {appealSuccess ? (
              <div className="p-6 text-center space-y-2">
                <CheckCircle2 className="w-10 h-10 text-emerald-500 mx-auto" />
                <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                  Descargo Registrado
                </h4>
                <p className="text-xs text-slate-500">
                  Se ha remitido a la Dirección y al Comité de Convivencia Estudiantil del CTP Acosta.
                </p>
              </div>
            ) : (
              <form onSubmit={handleAppealSubmit} className="space-y-3">
                <p className="text-xs text-slate-500">
                  Explique las justificaciones de hecho o de derecho conforme al debido proceso MEP para la revisión de esta observación.
                </p>
                <textarea
                  rows={4}
                  value={appealText}
                  onChange={(e) => setAppealText(e.target.value)}
                  placeholder="Detalle sus argumentos y descargos..."
                  required
                  className="w-full text-xs bg-slate-50 dark:bg-slate-800 border rounded-xl p-2.5"
                />
                <button
                  type="submit"
                  className="w-full py-2.5 bg-sky-600 hover:bg-sky-700 text-white rounded-xl text-xs font-semibold"
                >
                  Enviar Descargo Formal
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
