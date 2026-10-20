import React, { useState } from 'react';
import { 
  FileCheck, 
  Clock, 
  Calendar, 
  User, 
  ExternalLink, 
  CheckCircle2, 
  Upload, 
  X, 
  AlertTriangle,
  Send,
  MessageSquare,
  Award
} from 'lucide-react';
import { StudentAssignment, StudentProfile } from '../types';

interface AssignmentsTabProps {
  assignments: StudentAssignment[];
  student: StudentProfile;
  onSubmitAssignment: (id: string, submissionLink: string, comment: string) => void;
}

export const AssignmentsTab: React.FC<AssignmentsTabProps> = ({
  assignments,
  student,
  onSubmitAssignment,
}) => {
  const [filter, setFilter] = useState<'all' | 'Pendiente' | 'Entregada' | 'Calificada'>('all');
  const [selectedTask, setSelectedTask] = useState<StudentAssignment | null>(null);

  // Submission Form State
  const [submissionLink, setSubmissionLink] = useState('');
  const [submissionComment, setSubmissionComment] = useState('');
  const [submittingSuccess, setSubmittingSuccess] = useState(false);

  const filteredTasks = assignments.filter((task) => {
    if (filter === 'all') return true;
    return task.status === filter;
  });

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedTask || !submissionLink.trim()) return;

    onSubmitAssignment(selectedTask.id, submissionLink, submissionComment);
    setSubmittingSuccess(true);
    setTimeout(() => {
      setSubmittingSuccess(false);
      setSelectedTask(null);
      setSubmissionLink('');
      setSubmissionComment('');
    }, 1200);
  };

  return (
    <div className="space-y-6 pb-12">
      {/* 1. Header */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-3xl p-5 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs text-sky-700 dark:text-sky-300 font-semibold">
              <span>Aula Virtual y Asignaciones</span>
              <span aria-hidden="true">·</span>
              <span>CTP Acosta</span>
            </div>
            <h2 className="text-xl font-bold tracking-tight text-slate-900 dark:text-white mt-0.5">
              Tareas y Proyectos Técnicos
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Gestión de entregas, rúbricas de código y retroalimentación docente
            </p>
          </div>

          <div className="flex items-center gap-2 self-start sm:self-auto">
            <span className="text-xs font-semibold px-3 py-1.5 rounded-xl bg-sky-50 dark:bg-sky-950 text-sky-700 dark:text-sky-300 border border-sky-200 dark:border-sky-800">
              {assignments.filter((a) => a.status === 'Pendiente').length} por entregar
            </span>
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="flex items-center gap-1.5 p-1 bg-slate-100 dark:bg-slate-800 rounded-2xl mt-4 overflow-x-auto scrollbar-none">
          <button
            onClick={() => setFilter('all')}
            className={`px-3.5 py-2 text-xs font-semibold rounded-xl transition-all whitespace-nowrap ${
              filter === 'all'
                ? 'bg-white dark:bg-slate-900 text-sky-700 dark:text-sky-400 shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
            }`}
          >
            Todas ({assignments.length})
          </button>
          <button
            onClick={() => setFilter('Pendiente')}
            className={`px-3.5 py-2 text-xs font-semibold rounded-xl transition-all whitespace-nowrap ${
              filter === 'Pendiente'
                ? 'bg-white dark:bg-slate-900 text-amber-700 dark:text-amber-400 shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
            }`}
          >
            Pendientes ({assignments.filter((a) => a.status === 'Pendiente').length})
          </button>
          <button
            onClick={() => setFilter('Entregada')}
            className={`px-3.5 py-2 text-xs font-semibold rounded-xl transition-all whitespace-nowrap ${
              filter === 'Entregada'
                ? 'bg-white dark:bg-slate-900 text-sky-700 dark:text-sky-400 shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
            }`}
          >
            Entregadas ({assignments.filter((a) => a.status === 'Entregada').length})
          </button>
          <button
            onClick={() => setFilter('Calificada')}
            className={`px-3.5 py-2 text-xs font-semibold rounded-xl transition-all whitespace-nowrap ${
              filter === 'Calificada'
                ? 'bg-white dark:bg-slate-900 text-emerald-700 dark:text-emerald-400 shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
            }`}
          >
            Calificadas ({assignments.filter((a) => a.status === 'Calificada').length})
          </button>
        </div>
      </div>

      {/* 2. Assignments List */}
      <div className="space-y-3">
        {filteredTasks.length === 0 ? (
          <div className="p-8 text-center bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800">
            <CheckCircle2 className="w-10 h-10 text-emerald-500 mx-auto mb-2" />
            <h4 className="text-sm font-bold text-slate-900 dark:text-white">
              ¡Sin tareas pendientes en esta categoría!
            </h4>
            <p className="text-xs text-slate-500 mt-1">
              Todas las asignaciones ministeriales están al día.
            </p>
          </div>
        ) : (
          filteredTasks.map((task) => (
            <div
              key={task.id}
              className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-2xl p-4 shadow-sm space-y-3 hover:border-sky-300 dark:hover:border-sky-700 transition-colors"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <div className="flex items-center gap-2 text-[11px] text-slate-500 dark:text-slate-400">
                    <span className="font-semibold text-sky-700 dark:text-sky-300">
                      {task.subjectName}
                    </span>
                    <span aria-hidden="true">·</span>
                    <span>{task.weightPercentage}</span>
                  </div>
                  <h3 className="text-base font-bold text-slate-900 dark:text-white mt-0.5">
                    {task.title}
                  </h3>
                  <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 mt-1">
                    <User className="w-3.5 h-3.5" />
                    <span>{task.teacher}</span>
                  </div>
                </div>

                <div className="text-right shrink-0">
                  <span
                    className={`inline-block text-[10px] font-bold px-2 py-0.5 rounded ${
                      task.status === 'Calificada'
                        ? 'text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800'
                        : task.status === 'Entregada'
                        ? 'text-sky-700 dark:text-sky-300 bg-sky-50 dark:bg-sky-950/60 border border-sky-200 dark:border-sky-800'
                        : 'text-amber-700 dark:text-amber-300 bg-amber-50 dark:bg-amber-950/60 border border-amber-200 dark:border-amber-800'
                    }`}
                  >
                    {task.status}
                  </span>
                  {task.obtainedScore !== undefined && (
                    <span className="block text-sm font-bold font-mono text-emerald-600 dark:text-emerald-400 mt-1">
                      {task.obtainedScore} / {task.maxScore} pts
                    </span>
                  )}
                </div>
              </div>

              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed bg-slate-50 dark:bg-slate-800/60 p-3 rounded-xl border border-slate-100 dark:border-slate-700/60">
                {task.description}
              </p>

              {/* Due Date & Submission Action */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-1 border-t border-slate-100 dark:border-slate-800 text-xs">
                <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400">
                  <Calendar className="w-3.5 h-3.5 text-slate-400" />
                  <span>Entrega límite: <strong className="font-semibold text-slate-700 dark:text-slate-300">{task.dueDate} · {task.dueTime}</strong></span>
                </div>

                {task.status === 'Pendiente' ? (
                  <button
                    onClick={() => setSelectedTask(task)}
                    className="px-4 py-2 bg-sky-600 hover:bg-sky-700 text-white font-semibold rounded-xl text-xs flex items-center justify-center gap-1.5 transition-colors self-end sm:self-auto shadow-sm"
                  >
                    <Upload className="w-3.5 h-3.5" />
                    <span>Realizar Entrega en Línea</span>
                  </button>
                ) : (
                  <div className="flex items-center gap-2 self-end sm:self-auto text-[11px] text-slate-500">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Entregado el {task.submissionDate || 'a tiempo'}</span>
                  </div>
                )}
              </div>

              {/* Feedback from teacher if available */}
              {task.teacherFeedback && (
                <div className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200/80 dark:border-emerald-900/60 text-xs text-emerald-950 dark:text-emerald-200">
                  <div className="flex items-center gap-1.5 font-bold mb-1">
                    <Award className="w-4 h-4 text-emerald-600" />
                    <span>Devolución del Docente:</span>
                  </div>
                  <p>{task.teacherFeedback}</p>
                </div>
              )}
            </div>
          ))
        )}
      </div>

      {/* 3. Submission Modal */}
      {selectedTask && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-4">
          <div className="bg-white dark:bg-slate-900 w-full max-w-lg rounded-t-3xl sm:rounded-3xl border border-slate-200 dark:border-slate-800 shadow-2xl p-6 space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-800">
              <div>
                <span className="text-[10px] uppercase font-bold text-sky-600">
                  Entregar Tarea Virtual
                </span>
                <h3 className="text-base font-bold text-slate-900 dark:text-white">
                  {selectedTask.title}
                </h3>
              </div>
              <button
                onClick={() => setSelectedTask(null)}
                className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500 hover:text-slate-900 flex items-center justify-center"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {submittingSuccess ? (
              <div className="p-8 text-center space-y-2">
                <CheckCircle2 className="w-12 h-12 text-emerald-500 mx-auto animate-bounce" />
                <h4 className="text-base font-bold text-slate-900 dark:text-white">
                  ¡Tarea Entregada Exitosamente!
                </h4>
                <p className="text-xs text-slate-500">
                  El docente {selectedTask.teacher} ha recibido tu entrega con sello de tiempo.
                </p>
              </div>
            ) : (
              <form onSubmit={handleFormSubmit} className="space-y-4">
                <div>
                  <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                    Enlace de Entrega (GitHub Repo, Google Drive, Figma o URL del Proyecto)
                  </label>
                  <input
                    type="url"
                    value={submissionLink}
                    onChange={(e) => setSubmissionLink(e.target.value)}
                    placeholder="https://github.com/ctp-acosta/mi-proyecto-web"
                    required
                    className="w-full text-xs font-mono bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white border border-slate-200 dark:border-slate-700 rounded-xl p-2.5 placeholder:text-slate-400"
                  />
                  <span className="text-[10px] text-slate-400 block mt-1">
                    Asegúrese de que el enlace sea accesible para el profesor.
                  </span>
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                    Comentarios adicionales al profesor
                  </label>
                  <textarea
                    rows={3}
                    value={submissionComment}
                    onChange={(e) => setSubmissionComment(e.target.value)}
                    placeholder="Profesor, adjunto el commit final con los triggers y el CRUD completo..."
                    className="w-full text-xs bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white border border-slate-200 dark:border-slate-700 rounded-xl p-2.5 placeholder:text-slate-400"
                  />
                </div>

                <div className="flex gap-3 pt-2">
                  <button
                    type="submit"
                    className="flex-1 py-2.5 bg-sky-600 hover:bg-sky-700 text-white rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors shadow-sm"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Confirmar y Enviar Entrega</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setSelectedTask(null)}
                    className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-semibold transition-colors"
                  >
                    Cancelar
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
