import React, { useState } from 'react';
import { 
  Award, 
  ChevronRight, 
  Download, 
  Calculator, 
  X, 
  CheckCircle2, 
  AlertTriangle,
  User,
  MapPin,
  Mail
} from 'lucide-react';
import { SubjectGrade, AcademicPeriod, StudentProfile } from '../types';

interface GradesTabProps {
  grades: SubjectGrade[];
  student: StudentProfile;
}

export const GradesTab: React.FC<GradesTabProps> = ({ grades, student }) => {
  const [selectedPeriod, setSelectedPeriod] = useState<AcademicPeriod>('II Periodo');
  const [filterCategory, setFilterCategory] = useState<'all' | 'tecnica' | 'academica'>('all');
  const [selectedSubject, setSelectedSubject] = useState<SubjectGrade | null>(null);
  const [showSimulator, setShowSimulator] = useState(false);
  const [showPrintReport, setShowPrintReport] = useState(false);

  // Simulator state
  const [simSubject, setSimSubject] = useState<string>(grades[0]?.name || '');
  const [targetScore, setTargetScore] = useState<number>(90);

  // Filtered grades
  const filteredGrades = grades.filter((g) => {
    if (filterCategory === 'all') return true;
    return g.category === filterCategory;
  });

  // Calculate current period average
  const periodAvg = (
    filteredGrades.reduce((sum, g) => {
      const val = selectedPeriod === 'I Periodo' ? g.period1 : selectedPeriod === 'II Periodo' ? g.period2 : g.currentAverage;
      return sum + val;
    }, 0) / (filteredGrades.length || 1)
  ).toFixed(1);

  return (
    <div className="space-y-6 pb-12">
      {/* 1. Header with Period Selector and Overall Average */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-3xl p-5 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs text-sky-700 dark:text-sky-300 font-semibold">
              <span>Registro Oficial MEP</span>
              <span aria-hidden="true">·</span>
              <span>{student.section}</span>
            </div>
            <h2 className="text-xl font-bold tracking-tight text-slate-900 dark:text-white mt-0.5">
              Calificaciones y Rúbricas
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Evaluación formativa y sumativa por competencias técnicas y académicas
            </p>
          </div>

          {/* Average Badge */}
          <div className="flex items-center gap-3 bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-2xl p-3 shrink-0">
            <div className="w-10 h-10 rounded-xl bg-sky-100 dark:bg-sky-950 text-sky-700 dark:text-sky-400 flex items-center justify-center">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] uppercase font-bold tracking-wider text-slate-500 dark:text-slate-400 block">
                Promedio {selectedPeriod}
              </span>
              <div className="flex items-baseline gap-1.5">
                <span className="text-2xl font-bold font-mono tabular-nums text-slate-900 dark:text-white">
                  {periodAvg}
                </span>
                <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                  / 100
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Period Selector Tabs (Segmented Control) */}
        <div className="flex items-center gap-1.5 p-1 bg-slate-100 dark:bg-slate-800 rounded-xl mt-4">
          {(['I Periodo', 'II Periodo', 'Anual'] as AcademicPeriod[]).map((period) => (
            <button
              key={period}
              onClick={() => setSelectedPeriod(period)}
              className={`flex-1 py-2 text-xs font-semibold rounded-lg transition-all ${
                selectedPeriod === period
                  ? 'bg-white dark:bg-slate-900 text-sky-700 dark:text-sky-400 shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
              }`}
            >
              {period}
              {period === 'II Periodo' && (
                <span className="ml-1 text-[10px] text-emerald-600 font-normal">
                  (En curso)
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* 2. Category Filter & Action Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        {/* Category buttons */}
        <div className="flex items-center gap-1 p-1 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl">
          <button
            onClick={() => setFilterCategory('all')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap ${
              filterCategory === 'all'
                ? 'bg-sky-600 text-white shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
            }`}
          >
            Todas ({grades.length})
          </button>
          <button
            onClick={() => setFilterCategory('tecnica')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap ${
              filterCategory === 'tecnica'
                ? 'bg-sky-600 text-white shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
            }`}
          >
            Especialidad Técnica (4)
          </button>
          <button
            onClick={() => setFilterCategory('academica')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap ${
              filterCategory === 'academica'
                ? 'bg-sky-600 text-white shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
            }`}
          >
            Académicas (5)
          </button>
        </div>

        {/* Action Tools */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowSimulator(true)}
            className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-1.5 px-3 py-2 text-xs font-semibold text-slate-700 dark:text-slate-200 bg-white dark:bg-slate-900 hover:bg-slate-50 border border-slate-200 dark:border-slate-800 rounded-xl transition-colors whitespace-nowrap"
          >
            <Calculator className="w-3.5 h-3.5 text-sky-600" />
            <span>Simulador MEP</span>
          </button>
          <button
            onClick={() => setShowPrintReport(true)}
            className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-1.5 px-3 py-2 text-xs font-semibold text-slate-700 dark:text-slate-200 bg-white dark:bg-slate-900 hover:bg-slate-50 border border-slate-200 dark:border-slate-800 rounded-xl transition-colors whitespace-nowrap"
          >
            <Download className="w-3.5 h-3.5 text-sky-600" />
            <span>Informe PDF</span>
          </button>
        </div>
      </div>

      {/* 3. Subjects List */}
      <div className="space-y-3">
        {filteredGrades.map((subject) => {
          const score =
            selectedPeriod === 'I Periodo'
              ? subject.period1
              : selectedPeriod === 'II Periodo'
              ? subject.period2
              : subject.currentAverage;

          const isPassing = score >= 70; // 70 is passing mark for MEP technical high schools

          return (
            <div
              key={subject.id}
              onClick={() => setSelectedSubject(subject)}
              className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-2xl p-4 shadow-sm hover:border-sky-300 dark:hover:border-sky-700 transition-all cursor-pointer group"
            >
              <div className="flex items-center justify-between gap-4">
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2 text-[11px] text-slate-500 dark:text-slate-400">
                    <span className="font-mono text-sky-700 dark:text-sky-300 font-medium">
                      {subject.code}
                    </span>
                    <span aria-hidden="true">·</span>
                    <span>{subject.category === 'tecnica' ? 'Especialidad Técnica' : 'Materia Académica'}</span>
                    <span aria-hidden="true">·</span>
                    <span className="truncate">{subject.classroom}</span>
                  </div>

                  <h3 className="text-base font-bold text-slate-900 dark:text-white group-hover:text-sky-600 dark:group-hover:text-sky-400 transition-colors mt-0.5 truncate">
                    {subject.name}
                  </h3>

                  <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 mt-1">
                    <User className="w-3.5 h-3.5" />
                    <span className="truncate">{subject.teacher}</span>
                  </div>
                </div>

                {/* Score & Status */}
                <div className="text-right shrink-0 flex items-center gap-3">
                  <div>
                    <div className="flex items-baseline justify-end gap-1">
                      <span className="text-2xl font-bold font-mono tabular-nums text-slate-900 dark:text-white">
                        {score}
                      </span>
                      <span className="text-xs text-slate-400">/100</span>
                    </div>
                    <span
                      className={`inline-block text-[10px] font-semibold px-2 py-0.5 rounded ${
                        isPassing
                          ? 'text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/60'
                          : 'text-rose-700 dark:text-rose-300 bg-rose-50 dark:bg-rose-950/60'
                      }`}
                    >
                      {isPassing ? 'Aprobado' : 'En Riesgo'}
                    </span>
                  </div>
                  <ChevronRight className="w-5 h-5 text-slate-400 group-hover:text-slate-600 dark:group-hover:text-slate-200 transition-colors" />
                </div>
              </div>

              {/* Progress Bar of Score */}
              <div className="w-full bg-slate-100 dark:bg-slate-800 rounded-full h-1.5 mt-3 overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all duration-500 ${
                    score >= 90
                      ? 'bg-sky-600'
                      : score >= 70
                      ? 'bg-emerald-500'
                      : 'bg-rose-500'
                  }`}
                  style={{ width: `${Math.min(score, 100)}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>

      {/* 4. Subject Detail Modal (Rubric Breakdown) */}
      {selectedSubject && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-4 animate-in fade-in">
          <div className="bg-white dark:bg-slate-900 w-full max-w-xl rounded-t-3xl sm:rounded-3xl border border-slate-200 dark:border-slate-800 shadow-2xl max-h-[90vh] flex flex-col overflow-hidden">
            {/* Modal Header */}
            <div className="p-5 border-b border-slate-100 dark:border-slate-800 flex items-start justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 text-xs text-sky-700 dark:text-sky-300 font-semibold">
                  <span>{selectedSubject.code}</span>
                  <span aria-hidden="true">·</span>
                  <span>{selectedSubject.category === 'tecnica' ? 'Subárea Técnica' : 'Académica'}</span>
                </div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mt-0.5">
                  {selectedSubject.name}
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 flex items-center gap-2">
                  <User className="w-3.5 h-3.5" />
                  <span>{selectedSubject.teacher}</span>
                  <span aria-hidden="true">·</span>
                  <MapPin className="w-3.5 h-3.5" />
                  <span>{selectedSubject.classroom}</span>
                </p>
              </div>

              <button
                onClick={() => setSelectedSubject(null)}
                className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500 hover:text-slate-900 dark:hover:text-white flex items-center justify-center transition-colors"
                aria-label="Cerrar detalles"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Modal Body: Rubric List */}
            <div className="p-5 overflow-y-auto space-y-4">
              <div className="flex items-center justify-between p-3.5 rounded-2xl bg-sky-50 dark:bg-sky-950/50 border border-sky-100 dark:border-sky-900">
                <div>
                  <span className="text-xs font-semibold text-sky-900 dark:text-sky-200">
                    Calificación Obtenida en {selectedPeriod}
                  </span>
                  <span className="text-xs text-sky-700 dark:text-sky-300 block">
                    Normativa de Evaluación de los Aprendizajes MEP
                  </span>
                </div>
                <div className="text-right">
                  <span className="text-2xl font-bold font-mono text-sky-900 dark:text-white">
                    {selectedPeriod === 'I Periodo'
                      ? selectedSubject.period1
                      : selectedPeriod === 'II Periodo'
                      ? selectedSubject.period2
                      : selectedSubject.currentAverage}
                  </span>
                  <span className="text-xs font-semibold text-emerald-600 block">
                    Aprobado
                  </span>
                </div>
              </div>

              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2">
                  Desglose de Componentes de la Calificación
                </h4>
                <div className="space-y-2.5">
                  {selectedSubject.rubrics.map((rubric) => {
                    const percentageRatio = (rubric.scoreObtained / rubric.percentageMax) * 100;
                    return (
                      <div
                        key={rubric.id}
                        className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-700/60"
                      >
                        <div className="flex items-center justify-between text-xs">
                          <span className="font-semibold text-slate-900 dark:text-white">
                            {rubric.name}
                          </span>
                          <span className="font-mono font-bold text-slate-800 dark:text-slate-200">
                            {rubric.scoreObtained} / {rubric.percentageMax}%
                          </span>
                        </div>

                        {/* Micro Progress Bar */}
                        <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-1.5 mt-2 overflow-hidden">
                          <div
                            className="h-full bg-sky-600 rounded-full"
                            style={{ width: `${Math.min(percentageRatio, 100)}%` }}
                          />
                        </div>

                        {rubric.comments && (
                          <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-2 bg-white dark:bg-slate-800 p-2 rounded-lg border border-slate-100 dark:border-slate-700">
                            <span className="font-semibold text-slate-700 dark:text-slate-300">
                              Nota del docente:{' '}
                            </span>
                            {rubric.comments}
                          </p>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Contact Teacher */}
              <div className="p-3 rounded-xl bg-slate-100 dark:bg-slate-800 text-xs text-slate-600 dark:text-slate-300 flex items-center justify-between gap-3">
                <div className="flex items-center gap-2 truncate">
                  <Mail className="w-4 h-4 text-sky-600 shrink-0" />
                  <span className="truncate">{selectedSubject.teacherEmail}</span>
                </div>
                <a
                  href={`mailto:${selectedSubject.teacherEmail}`}
                  className="text-sky-600 font-semibold hover:underline shrink-0"
                >
                  Contactar
                </a>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-4 border-t border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/50 flex justify-end">
              <button
                onClick={() => setSelectedSubject(null)}
                className="px-5 py-2 text-xs font-semibold bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-900 rounded-xl hover:opacity-90 transition-opacity"
              >
                Cerrar Desglose
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 5. Simulator Modal */}
      {showSimulator && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 w-full max-w-md rounded-3xl border border-slate-200 dark:border-slate-800 shadow-2xl p-6 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Calculator className="w-5 h-5 text-sky-600" />
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                  Simulador de Nota MEP
                </h3>
              </div>
              <button
                onClick={() => setShowSimulator(false)}
                className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500 hover:text-slate-900 flex items-center justify-center"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <p className="text-xs text-slate-500 dark:text-slate-400">
              Calcula los puntos necesarios en las evaluaciones pendientes para mantener la beca o nota mínima aprobatoria (70 pts).
            </p>

            <div className="space-y-3">
              <div>
                <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                  Seleccionar Materia / Subárea
                </label>
                <select
                  value={simSubject}
                  onChange={(e) => setSimSubject(e.target.value)}
                  className="w-full text-xs font-medium bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white border border-slate-200 dark:border-slate-700 rounded-xl p-2.5"
                >
                  {grades.map((g) => (
                    <option key={g.id} value={g.name}>
                      {g.name} (Actual: {g.period2} pts)
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                  Meta de Calificación Final Deseada
                </label>
                <div className="flex items-center gap-3">
                  <input
                    type="range"
                    min="70"
                    max="100"
                    value={targetScore}
                    onChange={(e) => setTargetScore(Number(e.target.value))}
                    className="flex-1 accent-sky-600"
                  />
                  <span className="text-lg font-bold font-mono text-sky-600 w-12 text-right">
                    {targetScore}
                  </span>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-sky-50 dark:bg-sky-950/50 border border-sky-100 dark:border-sky-900 text-xs text-slate-700 dark:text-slate-300 space-y-1.5">
                <span className="font-semibold text-sky-900 dark:text-sky-300 block">
                  Proyección para {simSubject}:
                </span>
                <p>
                  Para obtener <span className="font-bold">{targetScore} pts</span>, necesitas promediar al menos{' '}
                  <span className="font-bold text-sky-600 dark:text-sky-400">
                    {Math.max(70, Math.round(targetScore * 0.95))} pts
                  </span>{' '}
                  en las próximas pruebas sumativas y entrega del proyecto técnico.
                </p>
              </div>
            </div>

            <button
              onClick={() => setShowSimulator(false)}
              className="w-full py-2.5 bg-sky-600 hover:bg-sky-700 text-white text-xs font-semibold rounded-xl transition-colors"
            >
              Cerrar Simulador
            </button>
          </div>
        </div>
      )}

      {/* 6. Printable Report Card Modal */}
      {showPrintReport && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white text-slate-900 w-full max-w-2xl rounded-3xl p-6 sm:p-8 max-h-[90vh] overflow-y-auto space-y-6 shadow-2xl">
            <div className="flex items-start justify-between border-b pb-4">
              <div>
                <span className="text-[11px] font-bold tracking-wider uppercase text-sky-800">
                  Ministerio de Educación Pública · Costa Rica
                </span>
                <h3 className="text-xl font-bold">
                  Colegio Técnico Profesional de Acosta
                </h3>
                <p className="text-xs text-slate-600">
                  Informe Oficial de Rendimiento Académico - Periodo II 2026
                </p>
              </div>
              <button
                onClick={() => setShowPrintReport(false)}
                className="w-8 h-8 rounded-full bg-slate-100 text-slate-600 hover:bg-slate-200 flex items-center justify-center"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Student metadata */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs bg-slate-50 p-4 rounded-xl border border-slate-200">
              <div>
                <span className="text-slate-500 block">Estudiante</span>
                <span className="font-semibold">{student.fullName}</span>
              </div>
              <div>
                <span className="text-slate-500 block">Cédula</span>
                <span className="font-mono">{student.idNumber}</span>
              </div>
              <div>
                <span className="text-slate-500 block">Sección</span>
                <span className="font-semibold">{student.section}</span>
              </div>
              <div>
                <span className="text-slate-500 block">Especialidad</span>
                <span className="font-semibold">{student.specialty}</span>
              </div>
            </div>

            {/* Grades table */}
            <table className="w-full text-xs text-left">
              <thead>
                <tr className="border-b text-slate-500 font-semibold">
                  <th className="py-2">Asignatura / Subárea</th>
                  <th className="py-2 text-center">I Per</th>
                  <th className="py-2 text-center">II Per</th>
                  <th className="py-2 text-center">Prom</th>
                  <th className="py-2 text-right">Condición</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {grades.map((g) => (
                  <tr key={g.id}>
                    <td className="py-2.5 font-medium">{g.name}</td>
                    <td className="py-2.5 text-center font-mono">{g.period1}</td>
                    <td className="py-2.5 text-center font-mono font-bold text-sky-700">{g.period2}</td>
                    <td className="py-2.5 text-center font-mono">{g.currentAverage}</td>
                    <td className="py-2.5 text-right font-semibold text-emerald-600">Aprobado</td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Signatures */}
            <div className="pt-8 grid grid-cols-2 gap-8 text-center text-xs text-slate-600 border-t">
              <div>
                <div className="w-40 border-b border-slate-400 mx-auto mb-1" />
                <span className="font-semibold">M.Sc. Roberto Mora Valverde</span>
                <span className="block text-[11px] text-slate-500">Director CTP Acosta</span>
              </div>
              <div>
                <div className="w-40 border-b border-slate-400 mx-auto mb-1" />
                <span className="font-semibold">{student.parentName}</span>
                <span className="block text-[11px] text-slate-500">Firma del Encargado Legal</span>
              </div>
            </div>

            <div className="flex gap-3 justify-end pt-4">
              <button
                onClick={() => window.print()}
                className="px-4 py-2 bg-sky-700 text-white text-xs font-semibold rounded-xl hover:bg-sky-800 transition-colors"
              >
                Imprimir Documento
              </button>
              <button
                onClick={() => setShowPrintReport(false)}
                className="px-4 py-2 bg-slate-100 text-slate-700 text-xs font-semibold rounded-xl hover:bg-slate-200 transition-colors"
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
