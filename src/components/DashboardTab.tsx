import React from 'react';
import { 
  Award, 
  Clock, 
  Calendar, 
  FileText, 
  Utensils, 
  ChevronRight, 
  AlertCircle,
  ExternalLink,
  BookOpen,
  CheckSquare,
  ShieldCheck,
  CalendarDays,
  FileCheck,
  HeartPulse,
  Users
} from 'lucide-react';
import { StudentProfile, InstitutionalNotice, SubjectGrade } from '../types';
import { ActiveTab } from './BottomNav';

interface DashboardTabProps {
  student: StudentProfile;
  grades: SubjectGrade[];
  notices: InstitutionalNotice[];
  pendingAssignmentsCount: number;
  onNavigateTab: (tab: ActiveTab) => void;
  onOpenCard: () => void;
  onOpenNotice: (notice: InstitutionalNotice) => void;
  onOpenAbsenceModal: () => void;
  onOpenCertificates: () => void;
  onOpenParentPortal?: () => void;
}

export const DashboardTab: React.FC<DashboardTabProps> = ({
  student,
  grades,
  notices,
  pendingAssignmentsCount,
  onNavigateTab,
  onOpenCard,
  onOpenNotice,
  onOpenAbsenceModal,
  onOpenCertificates,
  onOpenParentPortal,
}) => {
  // Calculate average
  const academicAvg = (
    grades.reduce((acc, curr) => acc + curr.currentAverage, 0) / grades.length
  ).toFixed(1);

  // Upcoming technical and academic deadlines
  const upcomingDeadlines = [
    {
      id: 'd1',
      title: 'Prueba Práctica: APIs RESTful & TypeScript',
      subject: 'Programación en Entornos Web',
      date: 'Viernes 24 Oct · 07:00 am',
      room: 'Lab Cómputo 2',
      type: 'Prueba Sumativa',
      weight: '20%',
    },
    {
      id: 'd2',
      title: 'Entrega Fase II: Esquema Relacional PostgreSQL',
      subject: 'Gestión y Bases de Datos',
      date: 'Lunes 27 Oct · 09:10 am',
      room: 'Lab Cómputo 1',
      type: 'Proyecto Técnico',
      weight: '25%',
    },
    {
      id: 'd3',
      title: 'Speaking Pitch: Tech Startup Acosta',
      subject: 'Inglés Técnico Orientado a TI',
      date: 'Miércoles 29 Oct · 10:10 am',
      room: 'Aula Bilingüe 4',
      type: 'Evaluación Oral',
      weight: '15%',
    },
  ];

  return (
    <div className="space-y-6 pb-8">
      {/* 1. Student Identity Card */}
      <div className="bg-gradient-to-br from-slate-900 via-sky-950 to-slate-900 text-white rounded-3xl p-5 shadow-sm relative overflow-hidden">
        {/* Subtle background decoration */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-sky-500/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-indigo-500/10 rounded-full blur-2xl pointer-events-none -ml-16 -mb-16" />

        <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="relative shrink-0">
              <img
                src={student.avatarUrl}
                alt={student.fullName}
                referrerPolicy="no-referrer"
                onError={(e) => {
                  // Fallback styling if image has issues
                  (e.target as HTMLElement).style.display = 'none';
                }}
                className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl object-cover border-2 border-white/20 shadow-inner"
              />
              <div className="absolute -bottom-1 -right-1 bg-emerald-500 text-white rounded-full p-1 border-2 border-slate-900" title="Matrícula Activa MEP">
                <div className="w-2 h-2 rounded-full bg-white" />
              </div>
            </div>

            <div>
              <div className="flex items-center gap-2 text-xs text-sky-300">
                <span>{student.section}</span>
                <span aria-hidden="true">·</span>
                <span>{student.gradeLevel}</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-white mt-0.5">
                {student.fullName}
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 font-medium mt-0.5">
                {student.specialty}
              </p>
              <div className="flex items-center gap-2 text-[11px] text-slate-400 mt-1 font-mono tabular-nums">
                <span>Carné: {student.institutionalId}</span>
                <span aria-hidden="true">·</span>
                <span>Céd: {student.idNumber}</span>
              </div>
            </div>
          </div>

          <div className="w-full sm:w-auto flex sm:flex-col items-center sm:items-end justify-between gap-2 pt-2 sm:pt-0 border-t sm:border-t-0 border-white/10">
            <button
              onClick={onOpenCard}
              className="w-full sm:w-auto px-4 py-2 text-xs font-semibold bg-white text-slate-950 hover:bg-sky-50 rounded-xl transition-all shadow-sm flex items-center justify-center gap-2 active:scale-95 whitespace-nowrap"
            >
              <span>Ver Carné QR</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </button>
            <span className="text-[11px] text-sky-200/80 hidden sm:inline">
              Válido Comedor & Portón
            </span>
          </div>
        </div>
      </div>

      {/* 1.5 Live Parental Monitoring Bar */}
      {onOpenParentPortal && (
        <div 
          onClick={onOpenParentPortal}
          className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-2xl p-3.5 shadow-sm hover:border-sky-300 dark:hover:border-sky-700 transition-all cursor-pointer flex items-center justify-between gap-3 group"
        >
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-10 h-10 rounded-xl bg-sky-100 dark:bg-sky-950 text-sky-600 dark:text-sky-400 flex items-center justify-center shrink-0">
              <Users className="w-5 h-5" />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-2 text-[11px]">
                <span className="font-semibold text-sky-700 dark:text-sky-300">Monitoreo Parental CTP Acosta</span>
                <span aria-hidden="true">·</span>
                <span className="text-emerald-600 dark:text-emerald-400 font-medium">Seguimiento en Vivo</span>
              </div>
              <p className="text-xs font-bold text-slate-900 dark:text-white truncate mt-0.5">
                Último registro: 11:42 am · Almuerzo Servido en Comedor PANEA
              </p>
            </div>
          </div>
          <div className="flex items-center gap-1 text-xs font-semibold text-sky-600 dark:text-sky-400 shrink-0">
            <span className="hidden sm:inline">Ver Monitoreo</span>
            <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          </div>
        </div>
      )}

      {/* 2. Key Academic Indicators (Stat Cards) */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {/* Attendance Ring Card */}
        <div 
          onClick={() => onNavigateTab('asistencia')}
          className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-2xl p-4 shadow-sm cursor-pointer hover:border-sky-300 dark:hover:border-sky-700 transition-colors"
        >
          <div className="flex items-center justify-between text-slate-500 dark:text-slate-400 mb-2">
            <span className="text-xs font-medium">Asistencia</span>
            <Clock className="w-4 h-4 text-sky-600 dark:text-sky-400" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white font-mono tabular-nums">
              {student.attendanceRate}%
            </span>
            <span className="text-[11px] font-medium text-emerald-600 dark:text-emerald-400">
              Excelente
            </span>
          </div>
          <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">
            0 injustificadas · 2 tardías
          </p>
        </div>

        {/* MEP Average Card */}
        <div 
          onClick={() => onNavigateTab('notas')}
          className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-2xl p-4 shadow-sm cursor-pointer hover:border-sky-300 dark:hover:border-sky-700 transition-colors"
        >
          <div className="flex items-center justify-between text-slate-500 dark:text-slate-400 mb-2">
            <span className="text-xs font-medium">Promedio MEP</span>
            <Award className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white font-mono tabular-nums">
              {academicAvg}
            </span>
            <span className="text-[11px] font-medium text-indigo-600 dark:text-indigo-400">
              Condición: Aprobado
            </span>
          </div>
          <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">
            9 materias registradas
          </p>
        </div>

        {/* Subareas Técnicas Card */}
        <div 
          onClick={() => onNavigateTab('notas')}
          className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-2xl p-4 shadow-sm cursor-pointer hover:border-sky-300 dark:hover:border-sky-700 transition-colors"
        >
          <div className="flex items-center justify-between text-slate-500 dark:text-slate-400 mb-2">
            <span className="text-xs font-medium">Subáreas Técnicas</span>
            <BookOpen className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white font-mono tabular-nums">
              94.0
            </span>
            <span className="text-[11px] font-medium text-emerald-600 dark:text-emerald-400">
              4 subáreas
            </span>
          </div>
          <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">
            Informática en Software
          </p>
        </div>

        {/* Conducta MEP */}
        <div 
          onClick={() => onNavigateTab('conducta')}
          className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-2xl p-4 shadow-sm cursor-pointer hover:border-sky-300 dark:hover:border-sky-700 transition-colors"
        >
          <div className="flex items-center justify-between text-slate-500 dark:text-slate-400 mb-2">
            <span className="text-xs font-medium">Conducta MEP</span>
            <ShieldCheck className="w-4 h-4 text-emerald-500" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white font-mono tabular-nums">
              {student.conductScore} pts
            </span>
            <span className="text-[11px] font-medium text-emerald-600 dark:text-emerald-400">
              Honor
            </span>
          </div>
          <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">
            Sin boletas de demérito
          </p>
        </div>
      </div>

      {/* 2.5 Health & INS Student Insurance Coverage Strip */}
      <div className="bg-gradient-to-r from-sky-50 to-indigo-50 dark:from-slate-900 dark:to-slate-900 border border-sky-100 dark:border-slate-800 rounded-2xl p-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-xl bg-sky-600 text-white flex items-center justify-center shrink-0">
            <HeartPulse className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-slate-900 dark:text-white">Póliza Estudiantil INS Activa:</span>
              <span className="font-mono text-sky-700 dark:text-sky-300 font-semibold">{student.insPolicyNumber}</span>
            </div>
            <span className="text-[11px] text-slate-500 dark:text-slate-400">
              Cobertura en talleres técnicos y giras · EBAIS: {student.clinicEbais} · Sangre: {student.bloodType}
            </span>
          </div>
        </div>
        <button
          onClick={onOpenCertificates}
          className="self-start sm:self-auto px-3 py-1 bg-white dark:bg-slate-800 hover:bg-slate-50 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 font-semibold rounded-lg text-[11px] whitespace-nowrap"
        >
          Ver Constancia
        </button>
      </div>

      {/* 3. Quick Action Buttons (8 Integrated Cloud Campus Shortcuts) */}
      <div>
        <h3 className="text-xs font-bold tracking-wide uppercase text-slate-500 dark:text-slate-400 mb-2.5">
          Accesos Rápidos Cloud Campus CTP Acosta
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
          {/* Calificaciones */}
          <button
            onClick={() => onNavigateTab('notas')}
            className="flex items-center gap-3 p-3 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/80 transition-colors text-left"
          >
            <div className="w-10 h-10 rounded-xl bg-sky-50 dark:bg-sky-950/60 text-sky-600 dark:text-sky-400 flex items-center justify-center shrink-0">
              <Award className="w-5 h-5" />
            </div>
            <div className="min-w-0">
              <span className="text-xs font-semibold text-slate-900 dark:text-white block truncate">
                Calificaciones
              </span>
              <span className="text-[10px] text-slate-500 dark:text-slate-400 block truncate">
                Rúbricas y periodos
              </span>
            </div>
          </button>

          {/* Tareas Virtuales */}
          <button
            onClick={() => onNavigateTab('tareas')}
            className="flex items-center gap-3 p-3 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/80 transition-colors text-left relative"
          >
            <div className="w-10 h-10 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 flex items-center justify-center shrink-0">
              <CheckSquare className="w-5 h-5" />
            </div>
            <div className="min-w-0">
              <span className="text-xs font-semibold text-slate-900 dark:text-white block truncate">
                Tareas y Proyectos
              </span>
              <span className="text-[10px] text-indigo-600 dark:text-indigo-400 font-semibold block truncate">
                {pendingAssignmentsCount} por entregar
              </span>
            </div>
          </button>

          {/* Justificar Falta */}
          <button
            onClick={onOpenAbsenceModal}
            className="flex items-center gap-3 p-3 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/80 transition-colors text-left"
          >
            <div className="w-10 h-10 rounded-xl bg-amber-50 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 flex items-center justify-center shrink-0">
              <FileText className="w-5 h-5" />
            </div>
            <div className="min-w-0">
              <span className="text-xs font-semibold text-slate-900 dark:text-white block truncate">
                Justificar Falta
              </span>
              <span className="text-[10px] text-slate-500 dark:text-slate-400 block truncate">
                Trámite en línea
              </span>
            </div>
          </button>

          {/* Conducta MEP */}
          <button
            onClick={() => onNavigateTab('conducta')}
            className="flex items-center gap-3 p-3 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/80 transition-colors text-left"
          >
            <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div className="min-w-0">
              <span className="text-xs font-semibold text-slate-900 dark:text-white block truncate">
                Conducta MEP
              </span>
              <span className="text-[10px] text-slate-500 dark:text-slate-400 block truncate">
                {student.conductScore} pts · Boletas
              </span>
            </div>
          </button>

          {/* Horario Semanal */}
          <button
            onClick={() => onNavigateTab('horario')}
            className="flex items-center gap-3 p-3 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/80 transition-colors text-left"
          >
            <div className="w-10 h-10 rounded-xl bg-sky-50 dark:bg-sky-950/60 text-sky-600 dark:text-sky-400 flex items-center justify-center shrink-0">
              <Calendar className="w-5 h-5" />
            </div>
            <div className="min-w-0">
              <span className="text-xs font-semibold text-slate-900 dark:text-white block truncate">
                Horario Semanal
              </span>
              <span className="text-[10px] text-slate-500 dark:text-slate-400 block truncate">
                Aulas y laboratorios
              </span>
            </div>
          </button>

          {/* Menú Comedor */}
          <button
            onClick={() => onNavigateTab('mas')}
            className="flex items-center gap-3 p-3 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/80 transition-colors text-left"
          >
            <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
              <Utensils className="w-5 h-5" />
            </div>
            <div className="min-w-0">
              <span className="text-xs font-semibold text-slate-900 dark:text-white block truncate">
                Menú Comedor
              </span>
              <span className="text-[10px] text-slate-500 dark:text-slate-400 block truncate">
                Beca PANEA CTP
              </span>
            </div>
          </button>

          {/* Calendario Institucional */}
          <button
            onClick={() => onNavigateTab('calendario')}
            className="flex items-center gap-3 p-3 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/80 transition-colors text-left"
          >
            <div className="w-10 h-10 rounded-xl bg-purple-50 dark:bg-purple-950/60 text-purple-600 dark:text-purple-400 flex items-center justify-center shrink-0">
              <CalendarDays className="w-5 h-5" />
            </div>
            <div className="min-w-0">
              <span className="text-xs font-semibold text-slate-900 dark:text-white block truncate">
                Calendario CTP
              </span>
              <span className="text-[10px] text-slate-500 dark:text-slate-400 block truncate">
                Expo y pruebas
              </span>
            </div>
          </button>

          {/* Constancias Oficiales */}
          <button
            onClick={onOpenCertificates}
            className="flex items-center gap-3 p-3 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/80 transition-colors text-left"
          >
            <div className="w-10 h-10 rounded-xl bg-rose-50 dark:bg-rose-950/60 text-rose-600 dark:text-rose-400 flex items-center justify-center shrink-0">
              <FileCheck className="w-5 h-5" />
            </div>
            <div className="min-w-0">
              <span className="text-xs font-semibold text-slate-900 dark:text-white block truncate">
                Constancias MEP
              </span>
              <span className="text-[10px] text-slate-500 dark:text-slate-400 block truncate">
                Estudiante Regular
              </span>
            </div>
          </button>
        </div>
      </div>

      {/* 4. CTP Acosta Institutional Campus Spotlight Banner */}
      <div className="relative rounded-3xl overflow-hidden shadow-sm border border-slate-200/80 dark:border-slate-800">
        <img
          src="/src/assets/images/ctp_acosta_campus_hero_1792523854427.jpg"
          alt="Campus CTP Acosta en San Ignacio"
          referrerPolicy="no-referrer"
          className="w-full h-48 sm:h-56 object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-transparent p-5 flex flex-col justify-end text-white">
          <div className="flex items-center gap-2 text-xs text-sky-300 font-medium mb-1">
            <span>Colegio Técnico Profesional de Acosta</span>
            <span aria-hidden="true">·</span>
            <span>San Ignacio</span>
          </div>
          <h3 className="text-lg sm:text-xl font-bold tracking-tight text-white">
            Excelencia Técnica al Servicio de Acosta
          </h3>
          <p className="text-xs text-slate-300 max-w-xl mt-1 line-clamp-2">
            Preparando a los futuros profesionales de Costa Rica en Software, Contabilidad, Mecánica, Turismo y Agroecología con formación integral y valores MEP.
          </p>
        </div>
      </div>

      {/* 5. Próximas Evaluaciones y Entregas Técnicas */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-3xl p-5 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              Próximas Evaluaciones y Proyectos
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Calendario de pruebas y entregas del II Periodo
            </p>
          </div>
          <button
            onClick={() => onNavigateTab('notas')}
            className="text-xs font-semibold text-sky-600 dark:text-sky-400 hover:text-sky-700 flex items-center gap-1"
          >
            <span>Ver todo</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <div className="space-y-3">
          {upcomingDeadlines.map((item) => (
            <div
              key={item.id}
              className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-700/60 flex items-center justify-between gap-3 hover:bg-slate-100/80 dark:hover:bg-slate-800 transition-colors"
            >
              <div className="min-w-0">
                <div className="flex items-center gap-2 text-[11px] text-slate-500 dark:text-slate-400">
                  <span className="font-medium text-sky-700 dark:text-sky-300">{item.subject}</span>
                  <span aria-hidden="true">·</span>
                  <span>{item.room}</span>
                </div>
                <h4 className="text-sm font-semibold text-slate-900 dark:text-white truncate mt-0.5">
                  {item.title}
                </h4>
                <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 mt-1">
                  <Calendar className="w-3.5 h-3.5 text-slate-400" />
                  <span>{item.date}</span>
                </div>
              </div>

              <div className="text-right shrink-0">
                <span className="text-xs font-bold text-indigo-700 dark:text-indigo-300 bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-200 dark:border-indigo-800 rounded-lg px-2 py-1">
                  Valor {item.weight}
                </span>
                <span className="block text-[10px] text-slate-400 mt-1 font-medium">
                  {item.type}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 6. Comunicados Recientes de la Institución */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-3xl p-5 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              Circulares y Comunicados CTP Acosta
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Avisos oficiales de Dirección, Orientación y Comedor
            </p>
          </div>
          <span className="text-xs text-slate-500 dark:text-slate-400">
            {notices.length} circulares
          </span>
        </div>

        <div className="divide-y divide-slate-100 dark:divide-slate-800">
          {notices.slice(0, 3).map((notice) => (
            <button
              key={notice.id}
              onClick={() => onOpenNotice(notice)}
              className="w-full py-3.5 text-left flex items-start justify-between gap-4 hover:bg-slate-50/60 dark:hover:bg-slate-800/40 rounded-xl px-2 transition-colors"
            >
              <div className="min-w-0">
                <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
                  <span className="font-semibold text-sky-700 dark:text-sky-400">{notice.sender}</span>
                  <span aria-hidden="true">·</span>
                  <span>{notice.date}</span>
                </div>
                <h4 className="text-sm font-semibold text-slate-900 dark:text-white truncate mt-1">
                  {notice.title}
                </h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-1 mt-0.5">
                  {notice.preview}
                </p>
              </div>

              <div className="shrink-0 flex items-center gap-2 pt-1">
                {notice.priority === 'Urgente' && (
                  <span className="text-[10px] font-bold text-rose-700 dark:text-rose-300 bg-rose-50 dark:bg-rose-950/60 border border-rose-200 dark:border-rose-800 px-2 py-0.5 rounded">
                    Urgente
                  </span>
                )}
                <ChevronRight className="w-4 h-4 text-slate-400" />
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
