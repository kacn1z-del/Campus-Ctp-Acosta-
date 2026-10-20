import React, { useState } from 'react';
import { 
  Clock, 
  CheckCircle, 
  AlertCircle, 
  FileText, 
  Plus, 
  X, 
  Calendar as CalendarIcon, 
  CheckCircle2, 
  Paperclip,
  Info
} from 'lucide-react';
import { AbsenceRecord, StudentProfile } from '../types';

interface AttendanceTabProps {
  absences: AbsenceRecord[];
  student: StudentProfile;
  onAddAbsenceJustification: (justification: Omit<AbsenceRecord, 'id'>) => void;
  isModalOpen?: boolean;
  onCloseModal?: () => void;
}

export const AttendanceTab: React.FC<AttendanceTabProps> = ({
  absences,
  student,
  onAddAbsenceJustification,
  isModalOpen = false,
  onCloseModal,
}) => {
  const [showJustifyForm, setShowJustifyForm] = useState(isModalOpen);
  const [selectedRecord, setSelectedRecord] = useState<AbsenceRecord | null>(null);

  // Form State
  const [date, setDate] = useState('2026-10-20');
  const [subjectName, setSubjectName] = useState('Programación en Entornos Web');
  const [lessonsCount, setLessonsCount] = useState(2);
  const [lessonPeriod, setLessonPeriod] = useState('Lecciones 3 y 4 (08:30 am - 09:50 am)');
  const [reasonCategory, setReasonCategory] = useState('Cita Médica CCSS / EBAIS Acosta');
  const [description, setDescription] = useState('');
  const [attachedFileName, setAttachedFileName] = useState('');
  const [formSuccess, setFormSuccess] = useState(false);

  // Sync external modal trigger
  React.useEffect(() => {
    if (isModalOpen) {
      setShowJustifyForm(true);
    }
  }, [isModalOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!description.trim()) return;

    onAddAbsenceJustification({
      date,
      subjectName,
      lessonsCount: Number(lessonsCount),
      lessonPeriod,
      type: 'Justificada',
      justificationStatus: 'Pendiente',
      justificationReason: `${reasonCategory}: ${description}`,
      justificationDate: new Date().toISOString().split('T')[0],
      evidenceUrl: attachedFileName ? 'comprobante_digital_adjunto.pdf' : undefined,
    });

    setFormSuccess(true);
    setTimeout(() => {
      setFormSuccess(false);
      setShowJustifyForm(false);
      if (onCloseModal) onCloseModal();
      setDescription('');
      setAttachedFileName('');
    }, 1500);
  };

  return (
    <div className="space-y-6 pb-12">
      {/* 1. Header & Overall Percentage */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-3xl p-5 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs text-sky-700 dark:text-sky-300 font-semibold">
              <span>Control de Asistencia Oficial</span>
              <span aria-hidden="true">·</span>
              <span>Reglamento MEP</span>
            </div>
            <h2 className="text-xl font-bold tracking-tight text-slate-900 dark:text-white mt-0.5">
              Asistencia y Justificaciones
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Registro continuo por lecciones y subáreas del CTP Acosta
            </p>
          </div>

          <button
            onClick={() => setShowJustifyForm(true)}
            className="inline-flex items-center justify-center gap-2 px-4 py-2 text-xs font-semibold text-white bg-sky-600 hover:bg-sky-700 rounded-xl transition-colors shadow-sm"
          >
            <Plus className="w-4 h-4" />
            <span>Justificar Ausencia</span>
          </button>
        </div>

        {/* Attendance Score Dashboard */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-5">
          <div className="bg-sky-50 dark:bg-sky-950/50 border border-sky-100 dark:border-sky-900 rounded-2xl p-3.5">
            <span className="text-[11px] font-medium text-sky-800 dark:text-sky-300 block">
              % Asistencia General
            </span>
            <div className="flex items-baseline gap-1 mt-1">
              <span className="text-2xl font-bold font-mono text-sky-950 dark:text-white">
                {student.attendanceRate}%
              </span>
            </div>
            <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-semibold block mt-0.5">
              Estado: Excelente
            </span>
          </div>

          <div className="bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 rounded-2xl p-3.5">
            <span className="text-[11px] font-medium text-slate-500 dark:text-slate-400 block">
              Injustificadas
            </span>
            <div className="flex items-baseline gap-1 mt-1">
              <span className="text-2xl font-bold font-mono text-slate-900 dark:text-white">
                {student.unjustifiedCount}
              </span>
              <span className="text-xs text-slate-400">lecc.</span>
            </div>
            <span className="text-[10px] text-slate-500 dark:text-slate-400 block mt-0.5">
              Sin pérdida de puntos
            </span>
          </div>

          <div className="bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 rounded-2xl p-3.5">
            <span className="text-[11px] font-medium text-slate-500 dark:text-slate-400 block">
              Justificadas
            </span>
            <div className="flex items-baseline gap-1 mt-1">
              <span className="text-2xl font-bold font-mono text-slate-900 dark:text-white">
                {student.justifiedCount}
              </span>
              <span className="text-xs text-slate-400">lecc.</span>
            </div>
            <span className="text-[10px] text-sky-600 dark:text-sky-400 block mt-0.5">
              Comprobantes en regla
            </span>
          </div>

          <div className="bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 rounded-2xl p-3.5">
            <span className="text-[11px] font-medium text-slate-500 dark:text-slate-400 block">
              Tardías
            </span>
            <div className="flex items-baseline gap-1 mt-1">
              <span className="text-2xl font-bold font-mono text-slate-900 dark:text-white">
                {student.tardiesCount}
              </span>
              <span className="text-xs text-slate-400">reg.</span>
            </div>
            <span className="text-[10px] text-amber-600 dark:text-amber-400 block mt-0.5">
              Retraso justificado
            </span>
          </div>
        </div>
      </div>

      {/* 2. MEP Policy Notice */}
      <div className="p-4 rounded-2xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200/80 dark:border-amber-900/60 flex items-start gap-3 text-xs text-amber-900 dark:text-amber-200">
        <Info className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
        <p>
          <strong className="font-semibold">Normativa MEP:</strong> Toda ausencia debe ser justificada en un plazo máximo de 3 días hábiles posteriores al reintegro a lecciones mediante este portal o con el profesor guía.
        </p>
      </div>

      {/* 3. Absences History List */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-3xl p-5 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-base font-bold text-slate-900 dark:text-white">
            Historial de Ausencias y Tardías
          </h3>
          <span className="text-xs text-slate-500 dark:text-slate-400">
            {absences.length} registros
          </span>
        </div>

        <div className="space-y-3">
          {absences.map((record) => (
            <div
              key={record.id}
              onClick={() => setSelectedRecord(record)}
              className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-700/60 hover:bg-slate-100/80 dark:hover:bg-slate-800 transition-colors cursor-pointer"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <div className="flex items-center gap-2 text-[11px] text-slate-500 dark:text-slate-400">
                    <span className="font-mono">{record.date}</span>
                    <span aria-hidden="true">·</span>
                    <span>{record.lessonPeriod}</span>
                  </div>
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white mt-1 truncate">
                    {record.subjectName}
                  </h4>
                  {record.justificationReason && (
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 line-clamp-1">
                      {record.justificationReason}
                    </p>
                  )}
                </div>

                <div className="text-right shrink-0">
                  <span
                    className={`inline-block text-[10px] font-bold px-2 py-0.5 rounded ${
                      record.type === 'Justificada'
                        ? 'text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800'
                        : record.type === 'Tardía'
                        ? 'text-amber-700 dark:text-amber-300 bg-amber-50 dark:bg-amber-950/60 border border-amber-200 dark:border-amber-800'
                        : 'text-rose-700 dark:text-rose-300 bg-rose-50 dark:bg-rose-950/60 border border-rose-200 dark:border-rose-800'
                    }`}
                  >
                    {record.type} ({record.lessonsCount} lecc.)
                  </span>
                  {record.justificationStatus && (
                    <span className="block text-[10px] text-slate-500 dark:text-slate-400 mt-1">
                      Estado: {record.justificationStatus}
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 4. Justify Absence Modal */}
      {showJustifyForm && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-4">
          <div className="bg-white dark:bg-slate-900 w-full max-w-lg rounded-t-3xl sm:rounded-3xl border border-slate-200 dark:border-slate-800 shadow-2xl p-6 max-h-[92vh] overflow-y-auto space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-800">
              <div className="flex items-center gap-2">
                <FileText className="w-5 h-5 text-sky-600" />
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                  Formulario de Justificación Digital
                </h3>
              </div>
              <button
                onClick={() => {
                  setShowJustifyForm(false);
                  if (onCloseModal) onCloseModal();
                }}
                className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500 hover:text-slate-900 flex items-center justify-center"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {formSuccess ? (
              <div className="p-8 text-center space-y-3">
                <CheckCircle2 className="w-12 h-12 text-emerald-500 mx-auto animate-bounce" />
                <h4 className="text-base font-bold text-slate-900 dark:text-white">
                  ¡Justificación Enviada con Éxito!
                </h4>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Se ha remitido a la Dirección y al docente guía del CTP Acosta para su respectiva validación en Cloud Campus.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Complete los datos oficiales requeridos por la Dirección del CTP Acosta para validar la inasistencia.
                </p>

                <div>
                  <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                    Fecha de la Inasistencia
                  </label>
                  <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    required
                    className="w-full text-xs font-medium bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white border border-slate-200 dark:border-slate-700 rounded-xl p-2.5"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                      Asignatura / Subárea
                    </label>
                    <select
                      value={subjectName}
                      onChange={(e) => setSubjectName(e.target.value)}
                      className="w-full text-xs font-medium bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white border border-slate-200 dark:border-slate-700 rounded-xl p-2.5"
                    >
                      <option value="Programación en Entornos Web">Programación Web</option>
                      <option value="Gestión y Bases de Datos">Bases de Datos</option>
                      <option value="Inglés Técnico">Inglés Técnico</option>
                      <option value="Matemáticas Académicas">Matemáticas</option>
                      <option value="Español y Literatura">Español</option>
                      <option value="Jornada Completa CTP">Jornada Completa (Todas)</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                      Cantidad de Lecciones
                    </label>
                    <input
                      type="number"
                      min="1"
                      max="10"
                      value={lessonsCount}
                      onChange={(e) => setLessonsCount(Number(e.target.value))}
                      className="w-full text-xs font-medium bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white border border-slate-200 dark:border-slate-700 rounded-xl p-2.5 font-mono"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                    Motivo Oficial MEP
                  </label>
                  <select
                    value={reasonCategory}
                    onChange={(e) => setReasonCategory(e.target.value)}
                    className="w-full text-xs font-medium bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white border border-slate-200 dark:border-slate-700 rounded-xl p-2.5"
                  >
                    <option value="Cita Médica CCSS / EBAIS Acosta">Cita Médica EBAIS / Hospital CCSS</option>
                    <option value="Incapacidad médica por enfermedad">Incapacidad médica por enfermedad</option>
                    <option value="Calamidad doméstica o fuerza mayor">Calamidad doméstica o fuerza mayor</option>
                    <option value="Representación deportiva / artística CTP">Representación institucional / FEA / Juegos</option>
                    <option value="Trámite oficial personal o de transporte">Problemas de transporte / clima cantonal</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                    Detalle y Explicación del Encargado
                  </label>
                  <textarea
                    rows={3}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Escriba aquí los detalles de la ausencia, cita o situación ocurrida..."
                    required
                    className="w-full text-xs bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white border border-slate-200 dark:border-slate-700 rounded-xl p-2.5 placeholder:text-slate-400"
                  />
                </div>

                {/* Comprobante attachment simulation */}
                <div>
                  <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                    Adjuntar Comprobante (Dictamen CCSS / Carné citas)
                  </label>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => setAttachedFileName('comprobante_ebais_acosta_102026.pdf')}
                      className="px-3 py-2 text-xs font-medium bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-700 dark:text-slate-300 rounded-xl border border-slate-200 dark:border-slate-700 flex items-center gap-1.5 transition-colors"
                    >
                      <Paperclip className="w-3.5 h-3.5 text-sky-600" />
                      <span>{attachedFileName ? 'Comprobante listo' : 'Adjuntar archivo / foto'}</span>
                    </button>
                    {attachedFileName && (
                      <span className="text-[11px] text-emerald-600 dark:text-emerald-400 font-mono truncate">
                        {attachedFileName}
                      </span>
                    )}
                  </div>
                </div>

                <div className="pt-2 flex gap-3">
                  <button
                    type="submit"
                    className="flex-1 py-2.5 text-xs font-semibold bg-sky-600 hover:bg-sky-700 text-white rounded-xl shadow-sm transition-colors"
                  >
                    Enviar Justificación a Dirección
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setShowJustifyForm(false);
                      if (onCloseModal) onCloseModal();
                    }}
                    className="px-4 py-2.5 text-xs font-semibold bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl transition-colors"
                  >
                    Cancelar
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

      {/* 5. Absence Details Modal */}
      {selectedRecord && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 w-full max-w-md rounded-3xl border border-slate-200 dark:border-slate-800 shadow-2xl p-6 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                Detalle del Registro de Inasistencia
              </h3>
              <button
                onClick={() => setSelectedRecord(null)}
                className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500 hover:text-slate-900 flex items-center justify-center"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                <span className="text-slate-500 block">Asignatura</span>
                <span className="font-bold text-slate-900 dark:text-white text-sm">
                  {selectedRecord.subjectName}
                </span>
                <span className="text-slate-500 block mt-1 font-mono">
                  {selectedRecord.date} · {selectedRecord.lessonPeriod}
                </span>
              </div>

              <div>
                <span className="text-slate-500 block mb-0.5 font-medium">Condición</span>
                <span className="font-semibold text-slate-900 dark:text-white">
                  {selectedRecord.type} ({selectedRecord.lessonsCount} lecciones)
                </span>
              </div>

              <div>
                <span className="text-slate-500 block mb-0.5 font-medium">Motivo y Justificación</span>
                <p className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-100 dark:border-slate-700">
                  {selectedRecord.justificationReason || 'Sin justificación registrada.'}
                </p>
              </div>

              {selectedRecord.justificationDate && (
                <div>
                  <span className="text-slate-500 block mb-0.5 font-medium">Fecha de Trámite</span>
                  <span className="font-mono text-slate-700 dark:text-slate-300">
                    {selectedRecord.justificationDate}
                  </span>
                </div>
              )}
            </div>

            <button
              onClick={() => setSelectedRecord(null)}
              className="w-full py-2 bg-slate-900 text-white rounded-xl text-xs font-semibold hover:bg-slate-800 transition-colors"
            >
              Cerrar
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
