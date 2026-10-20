import React, { useState } from 'react';
import { Clock, MapPin, User, BookOpen, Layers, CheckCircle2 } from 'lucide-react';
import { ScheduleLesson, StudentProfile } from '../types';

interface ScheduleTabProps {
  schedule: ScheduleLesson[];
  student: StudentProfile;
}

export const ScheduleTab: React.FC<ScheduleTabProps> = ({ schedule, student }) => {
  const days: Array<'Lunes' | 'Martes' | 'Miércoles' | 'Jueves' | 'Viernes'> = [
    'Lunes',
    'Martes',
    'Miércoles',
    'Jueves',
    'Viernes',
  ];

  // Default to today or Lunes
  const todayDayIndex = new Date().getDay(); // 0 is Sun, 1 is Mon...
  const initialDay =
    todayDayIndex >= 1 && todayDayIndex <= 5
      ? days[todayDayIndex - 1]
      : 'Lunes';

  const [selectedDay, setSelectedDay] = useState<'Lunes' | 'Martes' | 'Miércoles' | 'Jueves' | 'Viernes'>(initialDay);
  const [onlySpecialty, setOnlySpecialty] = useState(false);

  // Filter lessons for selected day
  const dayLessons = schedule
    .filter((lesson) => lesson.day === selectedDay)
    .filter((lesson) => (onlySpecialty ? lesson.isSpecialty : true))
    .sort((a, b) => a.periodNumber - b.periodNumber);

  return (
    <div className="space-y-6 pb-12">
      {/* 1. Header & Section Context */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-3xl p-5 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs text-sky-700 dark:text-sky-300 font-semibold">
              <span>Horario Institucional CTP Acosta</span>
              <span aria-hidden="true">·</span>
              <span>Jornada Completa</span>
            </div>
            <h2 className="text-xl font-bold tracking-tight text-slate-900 dark:text-white mt-0.5">
              Horario de Clases y Talleres
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Sección {student.section} · {student.specialty}
            </p>
          </div>

          <button
            onClick={() => setOnlySpecialty(!onlySpecialty)}
            className={`px-3 py-1.5 text-xs font-semibold rounded-xl border transition-colors self-start sm:self-auto ${
              onlySpecialty
                ? 'bg-sky-600 text-white border-sky-600 shadow-sm'
                : 'bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700'
            }`}
          >
            {onlySpecialty ? 'Viendo solo Especialidad Técnica' : 'Filtrar solo Especialidad'}
          </button>
        </div>

        {/* Day Selector Tabs (Horizontal Ergonomic Buttons) */}
        <div className="grid grid-cols-5 gap-1.5 p-1 bg-slate-100 dark:bg-slate-800 rounded-2xl mt-4">
          {days.map((day) => (
            <button
              key={day}
              onClick={() => setSelectedDay(day)}
              className={`py-2 text-xs font-semibold rounded-xl transition-all ${
                selectedDay === day
                  ? 'bg-white dark:bg-slate-900 text-sky-700 dark:text-sky-400 shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
              }`}
            >
              <span className="hidden sm:inline">{day}</span>
              <span className="sm:hidden">{day.slice(0, 3)}</span>
            </button>
          ))}
        </div>
      </div>

      {/* 2. Schedule Timeline */}
      <div className="space-y-3">
        {dayLessons.length === 0 ? (
          <div className="p-8 text-center bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800">
            <Layers className="w-10 h-10 text-slate-400 mx-auto mb-2" />
            <h4 className="text-sm font-bold text-slate-900 dark:text-white">
              No hay lecciones registradas con el filtro actual
            </h4>
            <p className="text-xs text-slate-500 mt-1">
              Desactive el filtro de especialidad técnica para ver las asignaturas académicas.
            </p>
          </div>
        ) : (
          dayLessons.map((lesson, idx) => {
            // Recreo checks
            const showMorningBreak = lesson.periodNumber === 3;
            const showLunchBreak = lesson.periodNumber === 7;

            return (
              <React.Fragment key={lesson.id}>
                {/* Morning Recess Indicator */}
                {showMorningBreak && (
                  <div className="py-1 px-4 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200/60 dark:border-amber-900/40 text-[11px] font-semibold text-amber-800 dark:text-amber-300 flex items-center justify-between">
                    <span>Recreo de la Mañana</span>
                    <span className="font-mono">08:20 am - 08:30 am</span>
                  </div>
                )}

                {/* Lunch Break Indicator */}
                {showLunchBreak && (
                  <div className="py-2 px-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200/60 dark:border-emerald-900/40 text-xs font-semibold text-emerald-800 dark:text-emerald-300 flex items-center justify-between">
                    <span>Almuerzo Comedor Escolar CTP Acosta</span>
                    <span className="font-mono">11:30 am - 12:30 pm</span>
                  </div>
                )}

                <div
                  className={`bg-white dark:bg-slate-900 border rounded-2xl p-4 shadow-sm transition-all ${
                    lesson.isSpecialty
                      ? 'border-sky-200 dark:border-sky-800/80 bg-gradient-to-r from-sky-50/30 to-white dark:from-sky-950/20 dark:to-slate-900'
                      : 'border-slate-200/80 dark:border-slate-800'
                  }`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-start gap-3 min-w-0">
                      {/* Period Badge */}
                      <div className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 flex flex-col items-center justify-center shrink-0">
                        <span className="text-[10px] uppercase font-bold text-slate-400">Lecc</span>
                        <span className="text-sm font-bold font-mono">{lesson.periodNumber}</span>
                      </div>

                      <div className="min-w-0">
                        <div className="flex items-center gap-2 text-[11px] text-slate-500 dark:text-slate-400">
                          <span className="font-mono text-sky-700 dark:text-sky-300 font-semibold">
                            {lesson.subjectCode}
                          </span>
                          <span aria-hidden="true">·</span>
                          <span>{lesson.isSpecialty ? 'Técnica' : 'Académica'}</span>
                        </div>

                        <h3 className="text-base font-bold text-slate-900 dark:text-white truncate mt-0.5">
                          {lesson.subjectName}
                        </h3>

                        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-slate-500 dark:text-slate-400 mt-1.5">
                          <span className="flex items-center gap-1 truncate">
                            <User className="w-3.5 h-3.5" />
                            {lesson.teacher}
                          </span>
                          <span className="flex items-center gap-1 text-sky-700 dark:text-sky-300 font-medium truncate">
                            <MapPin className="w-3.5 h-3.5" />
                            {lesson.room}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="text-right shrink-0">
                      <div className="flex items-center gap-1 text-xs font-bold font-mono text-slate-800 dark:text-slate-200">
                        <Clock className="w-3.5 h-3.5 text-slate-400" />
                        <span>{lesson.startTime}</span>
                      </div>
                      <span className="block text-[10px] text-slate-400 mt-0.5 font-mono">
                        a {lesson.endTime}
                      </span>
                    </div>
                  </div>
                </div>
              </React.Fragment>
            );
          })
        )}
      </div>
    </div>
  );
};
