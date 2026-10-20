import React, { useState } from 'react';
import { 
  X, 
  Users, 
  CheckCircle2, 
  Clock, 
  Award, 
  Save, 
  Layers, 
  Check, 
  AlertTriangle 
} from 'lucide-react';
import { PRIMARY_STUDENT } from '../data/mockData';

interface TeacherViewModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface StudentRosterItem {
  id: string;
  name: string;
  status: 'presente' | 'tardia' | 'ausente';
  scoreCotidiano: number;
}

export const TeacherViewModal: React.FC<TeacherViewModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [selectedSubarea, setSelectedSubarea] = useState('Programación en Entornos Web');
  const [selectedSection, setSelectedSection] = useState('11-2 Informática');
  const [savedSuccess, setSavedSuccess] = useState(false);

  const [roster, setRoster] = useState<StudentRosterItem[]>([
    { id: '1', name: PRIMARY_STUDENT.fullName, status: 'presente', scoreCotidiano: 35 },
    { id: '2', name: 'Kevin Cascante Valverde', status: 'presente', scoreCotidiano: 32 },
    { id: '3', name: 'Sofía Navarro Zúñiga', status: 'presente', scoreCotidiano: 34 },
    { id: '4', name: 'Bryan Fallas Calderón', status: 'tardia', scoreCotidiano: 30 },
    { id: '5', name: 'Valeria Porras Chinchilla', status: 'presente', scoreCotidiano: 35 },
    { id: '6', name: 'Esteban Cordero Mora', status: 'ausente', scoreCotidiano: 28 },
  ]);

  const updateStatus = (id: string, status: 'presente' | 'tardia' | 'ausente') => {
    setRoster((prev) =>
      prev.map((item) => (item.id === id ? { ...item, status } : item))
    );
  };

  const updateScore = (id: string, score: number) => {
    setRoster((prev) =>
      prev.map((item) => (item.id === id ? { ...item, scoreCotidiano: score } : item))
    );
  };

  const handleSaveAll = () => {
    setSavedSuccess(true);
    setTimeout(() => {
      setSavedSuccess(false);
      onClose();
    }, 1500);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4">
      <div className="bg-white dark:bg-slate-900 w-full max-w-2xl rounded-3xl border border-slate-200 dark:border-slate-800 shadow-2xl flex flex-col max-h-[92vh] overflow-hidden">
        {/* Header */}
        <div className="p-5 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-600 text-white flex items-center justify-center">
              <Users className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2 text-xs text-indigo-600 dark:text-indigo-400 font-semibold">
                <span>Módulo Docente Cloud Campus</span>
                <span aria-hidden="true">·</span>
                <span>CTP Acosta</span>
              </div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                Prof. Carlos Solís Umaña
              </h3>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500 hover:text-slate-900 flex items-center justify-center"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Filters */}
        <div className="p-4 bg-slate-50 dark:bg-slate-800/50 border-b border-slate-100 dark:border-slate-800 grid grid-cols-2 gap-3 text-xs">
          <div>
            <label className="block text-slate-500 mb-1 font-semibold">Subárea Técnica</label>
            <select
              value={selectedSubarea}
              onChange={(e) => setSelectedSubarea(e.target.value)}
              className="w-full bg-white dark:bg-slate-900 text-slate-900 dark:text-white border border-slate-200 dark:border-slate-700 rounded-xl p-2 font-medium"
            >
              <option value="Programación en Entornos Web">Programación en Entornos Web</option>
              <option value="Gestión y Bases de Datos">Gestión y Bases de Datos</option>
              <option value="Soporte y Telecomunicaciones">Soporte y Telecomunicaciones</option>
            </select>
          </div>

          <div>
            <label className="block text-slate-500 mb-1 font-semibold">Sección Asignada</label>
            <select
              value={selectedSection}
              onChange={(e) => setSelectedSection(e.target.value)}
              className="w-full bg-white dark:bg-slate-900 text-slate-900 dark:text-white border border-slate-200 dark:border-slate-700 rounded-xl p-2 font-medium"
            >
              <option value="11-2 Informática">11-2 Informática en Software (Bilingüe)</option>
              <option value="12-1 Informática">12-1 Informática (Práctica)</option>
            </select>
          </div>
        </div>

        {/* Student Roster Table */}
        <div className="p-5 overflow-y-auto space-y-3 flex-1">
          <div className="flex items-center justify-between text-xs text-slate-500 font-semibold px-2">
            <span>Estudiante CTP Acosta</span>
            <div className="flex items-center gap-8">
              <span>Asistencia Hoy</span>
              <span>Cotidiano (/35%)</span>
            </div>
          </div>

          <div className="space-y-2">
            {roster.map((st) => (
              <div
                key={st.id}
                className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/60 flex items-center justify-between gap-3"
              >
                <div className="min-w-0">
                  <h4 className="text-xs font-bold text-slate-900 dark:text-white truncate">
                    {st.name}
                  </h4>
                  <span className="text-[10px] text-slate-500 block">
                    {st.id === '1' ? 'Honor al Mérito · 98% asistencia' : 'Regular'}
                  </span>
                </div>

                <div className="flex items-center gap-4 shrink-0">
                  {/* Attendance buttons */}
                  <div className="flex items-center gap-1 bg-white dark:bg-slate-900 p-1 rounded-xl border border-slate-200 dark:border-slate-700">
                    <button
                      onClick={() => updateStatus(st.id, 'presente')}
                      className={`px-2 py-1 text-[11px] font-semibold rounded-lg transition-colors ${
                        st.status === 'presente'
                          ? 'bg-emerald-600 text-white'
                          : 'text-slate-600 hover:text-slate-900'
                      }`}
                      title="Presente"
                    >
                      P
                    </button>
                    <button
                      onClick={() => updateStatus(st.id, 'tardia')}
                      className={`px-2 py-1 text-[11px] font-semibold rounded-lg transition-colors ${
                        st.status === 'tardia'
                          ? 'bg-amber-500 text-white'
                          : 'text-slate-600 hover:text-slate-900'
                      }`}
                      title="Tardía"
                    >
                      T
                    </button>
                    <button
                      onClick={() => updateStatus(st.id, 'ausente')}
                      className={`px-2 py-1 text-[11px] font-semibold rounded-lg transition-colors ${
                        st.status === 'ausente'
                          ? 'bg-rose-600 text-white'
                          : 'text-slate-600 hover:text-slate-900'
                      }`}
                      title="Ausente"
                    >
                      A
                    </button>
                  </div>

                  {/* Score input */}
                  <div className="flex items-center gap-1">
                    <input
                      type="number"
                      min="0"
                      max="35"
                      value={st.scoreCotidiano}
                      onChange={(e) => updateScore(st.id, Number(e.target.value))}
                      className="w-14 text-center text-xs font-mono font-bold bg-white dark:bg-slate-900 text-slate-900 dark:text-white border border-slate-200 dark:border-slate-700 rounded-xl py-1.5"
                    />
                    <span className="text-[10px] text-slate-400">/35</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/50 flex items-center justify-between">
          <span className="text-xs text-slate-500">
            {roster.filter((r) => r.status === 'presente').length} presentes · {roster.filter((r) => r.status === 'tardia').length} tardías · {roster.filter((r) => r.status === 'ausente').length} ausentes
          </span>

          <button
            onClick={handleSaveAll}
            disabled={savedSuccess}
            className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold rounded-xl flex items-center gap-2 transition-colors shadow-sm disabled:opacity-50"
          >
            {savedSuccess ? (
              <>
                <Check className="w-4 h-4" />
                <span>Guardado en Servidor Cloud Campus</span>
              </>
            ) : (
              <>
                <Save className="w-4 h-4" />
                <span>Registrar en Cloud Campus MEP</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
