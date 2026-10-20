import React, { useState } from 'react';
import { 
  Users, 
  X, 
  ShieldCheck, 
  Clock, 
  MapPin, 
  CheckCircle2, 
  Calendar, 
  FileCheck, 
  PenTool, 
  Phone, 
  Bus, 
  Utensils, 
  AlertCircle, 
  UserCheck, 
  Sparkles,
  ExternalLink,
  ChevronRight
} from 'lucide-react';
import { 
  StudentProfile, 
  ParentRealtimeEvent, 
  ParentAuthorization, 
  TeacherOfficeHour,
  SubjectGrade
} from '../types';
import { 
  PRIMARY_STUDENT, 
  SECONDARY_STUDENT, 
  PARENT_REALTIME_TIMELINE, 
  PARENT_AUTHORIZATIONS, 
  TEACHER_OFFICE_HOURS,
  INITIAL_GRADES
} from '../data/mockData';

interface ParentPortalModalProps {
  isOpen: boolean;
  onClose: () => void;
  activeStudent: StudentProfile;
  onSelectStudent: (student: StudentProfile) => void;
  onOpenCard: () => void;
  onOpenAbsenceModal: () => void;
}

export const ParentPortalModal: React.FC<ParentPortalModalProps> = ({
  isOpen,
  onClose,
  activeStudent,
  onSelectStudent,
  onOpenCard,
  onOpenAbsenceModal,
}) => {
  const [activeTab, setActiveTab] = useState<'timeline' | 'autorizaciones' | 'citas' | 'resumen'>('timeline');
  const [authorizations, setAuthorizations] = useState<ParentAuthorization[]>(PARENT_AUTHORIZATIONS);
  const [bookedTeachers, setBookedTeachers] = useState<Record<string, boolean>>({});
  const [signingAuthId, setSigningAuthId] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSignAuthorization = (id: string) => {
    setAuthorizations((prev) =>
      prev.map((item) =>
        item.id === id
          ? {
              ...item,
              signed: true,
              signatureDate: new Date().toLocaleString('es-CR'),
              signedBy: `${activeStudent.parentName} (Firma Digital Encargada)`,
            }
          : item
      )
    );
    setSigningAuthId(null);
  };

  const handleBookMeeting = (teacherId: string) => {
    setBookedTeachers((prev) => ({
      ...prev,
      [teacherId]: true,
    }));
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-4 animate-in fade-in">
      <div className="bg-white dark:bg-slate-900 w-full max-w-2xl rounded-3xl border border-slate-200 dark:border-slate-800 shadow-2xl flex flex-col max-h-[92vh] overflow-hidden">
        
        {/* Header with Parent Title & Student Switcher */}
        <div className="p-5 border-b border-slate-100 dark:border-slate-800 bg-gradient-to-r from-sky-50/60 to-indigo-50/40 dark:from-slate-900 dark:to-slate-900 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-sky-600 to-indigo-700 text-white flex items-center justify-center shrink-0 shadow-sm">
              <Users className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2 text-xs text-sky-700 dark:text-sky-300 font-semibold">
                <span>Portal de Padres y Madres de Familia</span>
                <span aria-hidden="true">·</span>
                <span>CTP Acosta</span>
              </div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                {activeStudent.parentName}
              </h3>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Child Selector */}
            <div className="flex items-center gap-1.5 p-1 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 text-xs">
              <button
                onClick={() => onSelectStudent(PRIMARY_STUDENT)}
                className={`px-3 py-1.5 rounded-lg font-semibold transition-all ${
                  activeStudent.id === PRIMARY_STUDENT.id
                    ? 'bg-sky-600 text-white shadow-sm'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
                }`}
              >
                Mariana (11-2)
              </button>
              <button
                onClick={() => onSelectStudent(SECONDARY_STUDENT)}
                className={`px-3 py-1.5 rounded-lg font-semibold transition-all ${
                  activeStudent.id === SECONDARY_STUDENT.id
                    ? 'bg-sky-600 text-white shadow-sm'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
                }`}
              >
                Fabián (8-3)
              </button>
            </div>

            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500 hover:text-slate-900 flex items-center justify-center shrink-0"
              aria-label="Cerrar portal de padres"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Child Spotlight Banner */}
        <div className="px-5 py-3 bg-slate-50 dark:bg-slate-800/50 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs">
          <div className="flex items-center gap-3">
            <img
              src={activeStudent.avatarUrl}
              alt={activeStudent.fullName}
              referrerPolicy="no-referrer"
              className="w-8 h-8 rounded-full object-cover border border-sky-400"
            />
            <div>
              <span className="font-bold text-slate-900 dark:text-white block">
                {activeStudent.fullName}
              </span>
              <span className="text-[11px] text-slate-500 dark:text-slate-400">
                {activeStudent.specialty} · Sección {activeStudent.section}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onOpenCard}
              className="px-2.5 py-1 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 rounded-lg font-semibold text-[11px] flex items-center gap-1 hover:text-sky-600 transition-colors"
            >
              <UserCheck className="w-3.5 h-3.5 text-sky-600" />
              <span>Carné QR</span>
            </button>

            <button
              onClick={onOpenAbsenceModal}
              className="px-2.5 py-1 bg-amber-50 dark:bg-amber-950/60 border border-amber-200 dark:border-amber-800 text-amber-700 dark:text-amber-300 rounded-lg font-semibold text-[11px] hover:bg-amber-100 transition-colors"
            >
              Justificar Falta
            </button>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex items-center gap-1 px-5 pt-3 border-b border-slate-100 dark:border-slate-800 overflow-x-auto scrollbar-none">
          <button
            onClick={() => setActiveTab('timeline')}
            className={`pb-2.5 px-3 text-xs font-semibold border-b-2 transition-all whitespace-nowrap flex items-center gap-1.5 ${
              activeTab === 'timeline'
                ? 'border-sky-600 text-sky-600 dark:text-sky-400'
                : 'border-transparent text-slate-500 hover:text-slate-900'
            }`}
          >
            <Clock className="w-3.5 h-3.5" />
            <span>Monitoreo del Día (En Vivo)</span>
          </button>

          <button
            onClick={() => setActiveTab('autorizaciones')}
            className={`pb-2.5 px-3 text-xs font-semibold border-b-2 transition-all whitespace-nowrap flex items-center gap-1.5 ${
              activeTab === 'autorizaciones'
                ? 'border-sky-600 text-sky-600 dark:text-sky-400'
                : 'border-transparent text-slate-500 hover:text-slate-900'
            }`}
          >
            <PenTool className="w-3.5 h-3.5" />
            <span>Firmas y Permisos ({authorizations.filter((a) => !a.signed).length})</span>
          </button>

          <button
            onClick={() => setActiveTab('citas')}
            className={`pb-2.5 px-3 text-xs font-semibold border-b-2 transition-all whitespace-nowrap flex items-center gap-1.5 ${
              activeTab === 'citas'
                ? 'border-sky-600 text-sky-600 dark:text-sky-400'
                : 'border-transparent text-slate-500 hover:text-slate-900'
            }`}
          >
            <Calendar className="w-3.5 h-3.5" />
            <span>Atención de Profesores</span>
          </button>

          <button
            onClick={() => setActiveTab('resumen')}
            className={`pb-2.5 px-3 text-xs font-semibold border-b-2 transition-all whitespace-nowrap flex items-center gap-1.5 ${
              activeTab === 'resumen'
                ? 'border-sky-600 text-sky-600 dark:text-sky-400'
                : 'border-transparent text-slate-500 hover:text-slate-900'
            }`}
          >
            <FileCheck className="w-3.5 h-3.5" />
            <span>Resumen del Expediente</span>
          </button>
        </div>

        {/* Tab Contents */}
        <div className="p-5 overflow-y-auto space-y-4 flex-1">
          
          {/* TAB 1: Live Day Timeline */}
          {activeTab === 'timeline' && (
            <div className="space-y-4">
              <div className="p-3.5 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-900 flex items-center justify-between text-xs">
                <div className="flex items-center gap-2 text-emerald-900 dark:text-emerald-200">
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
                  <span>Estado Actual: <strong>Dentro del Campus CTP Acosta</strong> (En Lección 8)</span>
                </div>
                <span className="font-mono text-emerald-700 dark:text-emerald-300 text-[11px]">
                  Actualizado en vivo
                </span>
              </div>

              {/* Timeline Items */}
              <div className="relative pl-6 space-y-6 before:absolute before:left-2.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-200 dark:before:bg-slate-800">
                {PARENT_REALTIME_TIMELINE.map((item) => (
                  <div key={item.id} className="relative">
                    {/* Timeline Node Dot */}
                    <div className={`absolute -left-[27px] top-1 w-4 h-4 rounded-full border-2 border-white dark:border-slate-900 flex items-center justify-center ${
                      item.status === 'completado'
                        ? 'bg-emerald-500'
                        : item.status === 'en_curso'
                        ? 'bg-sky-500 animate-pulse'
                        : 'bg-slate-300 dark:bg-slate-700'
                    }`} />

                    <div className={`p-4 rounded-2xl border transition-colors ${
                      item.status === 'en_curso'
                        ? 'bg-sky-50/60 dark:bg-sky-950/30 border-sky-300 dark:border-sky-800 ring-2 ring-sky-500/20'
                        : 'bg-slate-50 dark:bg-slate-800/60 border-slate-200/80 dark:border-slate-700/60'
                    }`}>
                      <div className="flex items-center justify-between text-xs mb-1">
                        <span className="font-mono font-bold text-sky-700 dark:text-sky-300">
                          {item.timestamp}
                        </span>
                        <span className="text-[10px] text-slate-400 font-medium">
                          Validado por: {item.verifiedBy}
                        </span>
                      </div>

                      <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                        {item.title}
                      </h4>
                      <p className="text-xs text-slate-600 dark:text-slate-300 mt-1">
                        {item.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 2: Digital Authorizations */}
          {activeTab === 'autorizaciones' && (
            <div className="space-y-4">
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Firme digitalmente las autorizaciones institucionales para giras pedagógicas, salidas de campo y acuses de recibo del MEP.
              </p>

              <div className="space-y-3">
                {authorizations.map((auth) => (
                  <div
                    key={auth.id}
                    className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 space-y-3"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <div className="flex items-center gap-2 text-[11px] text-slate-500">
                          <span className="font-mono">{auth.date}</span>
                          {auth.location && (
                            <>
                              <span aria-hidden="true">·</span>
                              <span>{auth.location}</span>
                            </>
                          )}
                        </div>
                        <h4 className="text-sm font-bold text-slate-900 dark:text-white mt-0.5">
                          {auth.title}
                        </h4>
                      </div>

                      <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                        auth.signed
                          ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                          : 'bg-amber-50 text-amber-700 border border-amber-200'
                      }`}>
                        {auth.signed ? 'Firmada' : 'Pendiente de Firma'}
                      </span>
                    </div>

                    <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed bg-slate-50 dark:bg-slate-800/60 p-3 rounded-xl border border-slate-100 dark:border-slate-700/60">
                      {auth.description}
                    </p>

                    {auth.signed ? (
                      <div className="p-2.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-[11px] text-emerald-900 dark:text-emerald-200 flex items-center justify-between">
                        <div className="flex items-center gap-1.5 font-medium">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                          <span>{auth.signedBy}</span>
                        </div>
                        <span className="font-mono text-slate-500 text-[10px]">{auth.signatureDate}</span>
                      </div>
                    ) : (
                      <div className="flex justify-end pt-1">
                        <button
                          onClick={() => handleSignAuthorization(auth.id)}
                          className="px-4 py-2 bg-sky-600 hover:bg-sky-700 text-white rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors shadow-sm"
                        >
                          <PenTool className="w-3.5 h-3.5" />
                          <span>Firmar como Encargada Legal</span>
                        </button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3: Teacher Office Hours & Appointments */}
          {activeTab === 'citas' && (
            <div className="space-y-4">
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Cada docente del CTP Acosta dispone de un bloque semanal oficial de atención individual a padres de familia.
              </p>

              <div className="space-y-3">
                {TEACHER_OFFICE_HOURS.map((toh) => {
                  const isBooked = !!bookedTeachers[toh.id];
                  return (
                    <div
                      key={toh.id}
                      className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/60 flex items-center justify-between gap-3"
                    >
                      <div className="min-w-0">
                        <span className="text-[11px] font-semibold text-sky-700 dark:text-sky-300 block">
                          {toh.subject}
                        </span>
                        <h4 className="text-sm font-bold text-slate-900 dark:text-white mt-0.5 truncate">
                          {toh.teacherName}
                        </h4>
                        <div className="flex items-center gap-3 text-xs text-slate-500 mt-1">
                          <span className="font-semibold text-slate-700 dark:text-slate-300">
                            {toh.weeklyDay} {toh.timeSlot}
                          </span>
                          <span aria-hidden="true">·</span>
                          <span>{toh.room}</span>
                        </div>
                      </div>

                      <div className="shrink-0">
                        {isBooked ? (
                          <span className="px-3 py-1.5 bg-emerald-50 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 rounded-xl text-xs font-semibold flex items-center gap-1">
                            <CheckCircle2 className="w-3.5 h-3.5" />
                            <span>Cita Solicitada</span>
                          </span>
                        ) : (
                          <button
                            onClick={() => handleBookMeeting(toh.id)}
                            className="px-3.5 py-1.5 bg-white dark:bg-slate-900 hover:bg-sky-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-semibold transition-colors"
                          >
                            Agendar Cita
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* TAB 4: Expediente Parental Summary */}
          {activeTab === 'resumen' && (
            <div className="space-y-4 text-xs">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="p-3.5 rounded-2xl bg-sky-50 dark:bg-sky-950/40 border border-sky-100 dark:border-sky-900">
                  <span className="text-slate-500 block text-[10px] font-semibold uppercase">Asistencia</span>
                  <span className="font-mono text-xl font-bold text-sky-950 dark:text-white">{activeStudent.attendanceRate}%</span>
                  <span className="block text-[10px] text-emerald-600 font-semibold mt-0.5">En regla MEP</span>
                </div>

                <div className="p-3.5 rounded-2xl bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-100 dark:border-indigo-900">
                  <span className="text-slate-500 block text-[10px] font-semibold uppercase">Promedio</span>
                  <span className="font-mono text-xl font-bold text-indigo-950 dark:text-white">{activeStudent.academicAverage}</span>
                  <span className="block text-[10px] text-indigo-600 font-semibold mt-0.5">Aprobado</span>
                </div>

                <div className="p-3.5 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-100 dark:border-emerald-900">
                  <span className="text-slate-500 block text-[10px] font-semibold uppercase">Conducta</span>
                  <span className="font-mono text-xl font-bold text-emerald-950 dark:text-white">{activeStudent.conductScore} pts</span>
                  <span className="block text-[10px] text-emerald-600 font-semibold mt-0.5">Honor al Mérito</span>
                </div>

                <div className="p-3.5 rounded-2xl bg-purple-50 dark:bg-purple-950/40 border border-purple-100 dark:border-purple-900">
                  <span className="text-slate-500 block text-[10px] font-semibold uppercase">Comedor</span>
                  <span className="text-xs font-bold text-purple-950 dark:text-white block mt-1">PANEA 100%</span>
                  <span className="block text-[10px] text-purple-600 font-semibold mt-0.5">Subsidio Activo</span>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-2">
                <span className="font-bold text-slate-900 dark:text-white block">
                  Información de Transporte y Resguardo
                </span>
                <p className="text-slate-600 dark:text-slate-300">
                  Ruta asignada: <strong>{activeStudent.transportRoute}</strong>. En caso de emergencia médica, el estudiante tiene registrada la póliza <strong>{activeStudent.insPolicyNumber}</strong> con atención en el EBAIS de San Ignacio de Acosta.
                </p>
              </div>
            </div>
          )}

        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/50 flex items-center justify-between text-xs">
          <span className="text-slate-500">
            Encargada: {activeStudent.parentName} ({activeStudent.parentPhone})
          </span>
          <button
            onClick={onClose}
            className="px-5 py-2 bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-900 rounded-xl font-semibold hover:opacity-90 transition-opacity"
          >
            Cerrar Panel
          </button>
        </div>

      </div>
    </div>
  );
};
