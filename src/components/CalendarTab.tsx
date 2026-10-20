import React, { useState } from 'react';
import { 
  Calendar as CalendarIcon, 
  MapPin, 
  Clock, 
  Tag, 
  ChevronRight, 
  BookmarkCheck, 
  BellRing 
} from 'lucide-react';
import { SchoolCalendarEvent } from '../types';

interface CalendarTabProps {
  events: SchoolCalendarEvent[];
}

export const CalendarTab: React.FC<CalendarTabProps> = ({ events }) => {
  const [filter, setFilter] = useState<string>('all');
  const [remindedEvents, setRemindedEvents] = useState<Record<string, boolean>>({});

  const categories = ['all', 'Evaluación', 'Feria Técnica', 'Reunión', 'Acto Cívico'];

  const filteredEvents = events.filter((ev) => {
    if (filter === 'all') return true;
    return ev.category === filter;
  });

  const toggleReminder = (id: string) => {
    setRemindedEvents((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <div className="space-y-6 pb-12">
      {/* 1. Header */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-3xl p-5 shadow-sm">
        <div>
          <div className="flex items-center gap-2 text-xs text-sky-700 dark:text-sky-300 font-semibold">
            <span>Cronograma Institucional CTP Acosta</span>
            <span aria-hidden="true">·</span>
            <span>Periodo II 2026</span>
          </div>
          <h2 className="text-xl font-bold tracking-tight text-slate-900 dark:text-white mt-0.5">
            Calendario Escolar y Fechas Clave
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Pruebas ministeriales, Expo-Técnica cantonal, asambleas de padres y actos solemnes
          </p>
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-1.5 p-1 bg-slate-100 dark:bg-slate-800 rounded-2xl mt-4 overflow-x-auto scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-3 py-1.5 text-xs font-semibold rounded-xl transition-all whitespace-nowrap ${
                filter === cat
                  ? 'bg-white dark:bg-slate-900 text-sky-700 dark:text-sky-400 shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
              }`}
            >
              {cat === 'all' ? 'Todos los Eventos' : cat}
            </button>
          ))}
        </div>
      </div>

      {/* 2. Events List */}
      <div className="space-y-3">
        {filteredEvents.map((item) => {
          const isReminded = !!remindedEvents[item.id];
          return (
            <div
              key={item.id}
              className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-2xl p-4 shadow-sm hover:border-sky-300 dark:hover:border-sky-700 transition-colors"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <div className="flex items-center gap-2 text-[11px] text-slate-500">
                    <span className="font-mono text-sky-700 dark:text-sky-300 font-semibold">
                      {item.date}
                    </span>
                    <span aria-hidden="true">·</span>
                    <span>{item.category}</span>
                  </div>

                  <h3 className="text-base font-bold text-slate-900 dark:text-white mt-0.5">
                    {item.title}
                  </h3>

                  <p className="text-xs text-slate-600 dark:text-slate-300 mt-1">
                    {item.description}
                  </p>

                  <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-500 mt-2">
                    {item.time && (
                      <span className="flex items-center gap-1 font-mono">
                        <Clock className="w-3.5 h-3.5 text-slate-400" />
                        {item.time}
                      </span>
                    )}
                    {item.location && (
                      <span className="flex items-center gap-1 text-sky-700 dark:text-sky-300 font-medium">
                        <MapPin className="w-3.5 h-3.5" />
                        {item.location}
                      </span>
                    )}
                  </div>
                </div>

                <button
                  onClick={() => toggleReminder(item.id)}
                  className={`p-2 rounded-xl border text-xs flex items-center gap-1 shrink-0 transition-colors ${
                    isReminded
                      ? 'bg-emerald-50 text-emerald-700 border-emerald-300'
                      : 'bg-slate-50 hover:bg-slate-100 text-slate-600 border-slate-200'
                  }`}
                  title={isReminded ? 'Recordatorio activo' : 'Activar recordatorio'}
                >
                  <BellRing className="w-4 h-4" />
                  <span className="hidden sm:inline">
                    {isReminded ? 'Recordando' : 'Recordar'}
                  </span>
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
