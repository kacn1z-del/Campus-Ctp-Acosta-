import React, { useState } from 'react';
import { 
  Utensils, 
  Bus, 
  Briefcase, 
  Phone, 
  MessageSquare, 
  Send, 
  CheckCircle2, 
  MapPin, 
  Clock, 
  Users, 
  UserCheck,
  ChevronRight,
  HeartPulse,
  FileCheck,
  Download,
  Code2
} from 'lucide-react';
import { 
  DiningMenuDay, 
  TransportRoute, 
  TechnicalInternship, 
  StudentProfile 
} from '../types';
import { 
  DINING_MENU, 
  TRANSPORT_ROUTES, 
  TECHNICAL_INTERNSHIP, 
  CTP_ACOSTA_INFO,
  PRIMARY_STUDENT,
  SECONDARY_STUDENT
} from '../data/mockData';

interface MoreServicesTabProps {
  currentStudent: StudentProfile;
  onSelectStudent: (student: StudentProfile) => void;
  onOpenCard: () => void;
  onOpenCertificates: () => void;
}

export const MoreServicesTab: React.FC<MoreServicesTabProps> = ({
  currentStudent,
  onSelectStudent,
  onOpenCard,
  onOpenCertificates,
}) => {
  const [activeSection, setActiveSection] = useState<'comedor' | 'transporte' | 'pasantia' | 'mensajes' | 'salud' | 'directorio'>('comedor');
  
  // Messaging state
  const [msgSubject, setMsgSubject] = useState('Consulta sobre Entrega de Proyecto Técnico');
  const [msgTeacher, setMsgTeacher] = useState('Ing. Carlos Solís (Informática)');
  const [msgText, setMsgText] = useState('');
  const [msgSent, setMsgSent] = useState(false);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!msgText.trim()) return;
    setMsgSent(true);
    setTimeout(() => {
      setMsgSent(false);
      setMsgText('');
    }, 2000);
  };

  return (
    <div className="space-y-6 pb-12">
      {/* 1. Header & Student Switcher */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-3xl p-5 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs text-sky-700 dark:text-sky-300 font-semibold">
              <span>Servicios Estudiantiles e Institucionales</span>
              <span aria-hidden="true">·</span>
              <span>CTP Acosta</span>
            </div>
            <h2 className="text-xl font-bold tracking-tight text-slate-900 dark:text-white mt-0.5">
              Portal y Servicios Complementarios
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Comedor, rutas MEP, bitácora técnica de pasantías y contacto
            </p>
          </div>

          {/* Student Profile Switcher (Useful for parents with multiple children in CTP Acosta) */}
          <div className="flex items-center gap-2 bg-slate-50 dark:bg-slate-800/80 p-1.5 rounded-2xl border border-slate-200 dark:border-slate-700">
            <button
              onClick={() => onSelectStudent(PRIMARY_STUDENT)}
              className={`px-3 py-1.5 text-xs font-semibold rounded-xl transition-all ${
                currentStudent.id === PRIMARY_STUDENT.id
                  ? 'bg-white dark:bg-slate-900 text-sky-600 dark:text-sky-400 shadow-sm'
                  : 'text-slate-600 dark:text-slate-400'
              }`}
            >
              Mariana (11°)
            </button>
            <button
              onClick={() => onSelectStudent(SECONDARY_STUDENT)}
              className={`px-3 py-1.5 text-xs font-semibold rounded-xl transition-all ${
                currentStudent.id === SECONDARY_STUDENT.id
                  ? 'bg-white dark:bg-slate-900 text-sky-600 dark:text-sky-400 shadow-sm'
                  : 'text-slate-600 dark:text-slate-400'
              }`}
            >
              Fabián (8°)
            </button>
          </div>
        </div>

        {/* Services Navigation Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto p-1 bg-slate-100 dark:bg-slate-800 rounded-2xl mt-4 scrollbar-none">
          <button
            onClick={() => setActiveSection('comedor')}
            className={`px-3.5 py-2 text-xs font-semibold rounded-xl transition-all whitespace-nowrap flex items-center gap-1.5 ${
              activeSection === 'comedor'
                ? 'bg-white dark:bg-slate-900 text-sky-700 dark:text-sky-400 shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
            }`}
          >
            <Utensils className="w-3.5 h-3.5" />
            <span>Comedor Escolar</span>
          </button>

          <button
            onClick={() => setActiveSection('transporte')}
            className={`px-3.5 py-2 text-xs font-semibold rounded-xl transition-all whitespace-nowrap flex items-center gap-1.5 ${
              activeSection === 'transporte'
                ? 'bg-white dark:bg-slate-900 text-sky-700 dark:text-sky-400 shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
            }`}
          >
            <Bus className="w-3.5 h-3.5" />
            <span>Transporte MEP</span>
          </button>

          <button
            onClick={() => setActiveSection('pasantia')}
            className={`px-3.5 py-2 text-xs font-semibold rounded-xl transition-all whitespace-nowrap flex items-center gap-1.5 ${
              activeSection === 'pasantia'
                ? 'bg-white dark:bg-slate-900 text-sky-700 dark:text-sky-400 shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
            }`}
          >
            <Briefcase className="w-3.5 h-3.5" />
            <span>Pasantías (320h)</span>
          </button>

          <button
            onClick={() => setActiveSection('mensajes')}
            className={`px-3.5 py-2 text-xs font-semibold rounded-xl transition-all whitespace-nowrap flex items-center gap-1.5 ${
              activeSection === 'mensajes'
                ? 'bg-white dark:bg-slate-900 text-sky-700 dark:text-sky-400 shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
            }`}
          >
            <MessageSquare className="w-3.5 h-3.5" />
            <span>Cuaderno Mensajería</span>
          </button>

          <button
            onClick={() => setActiveSection('salud')}
            className={`px-3.5 py-2 text-xs font-semibold rounded-xl transition-all whitespace-nowrap flex items-center gap-1.5 ${
              activeSection === 'salud'
                ? 'bg-white dark:bg-slate-900 text-sky-700 dark:text-sky-400 shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
            }`}
          >
            <HeartPulse className="w-3.5 h-3.5" />
            <span>Salud & INS</span>
          </button>

          <button
            onClick={() => setActiveSection('directorio')}
            className={`px-3.5 py-2 text-xs font-semibold rounded-xl transition-all whitespace-nowrap flex items-center gap-1.5 ${
              activeSection === 'directorio'
                ? 'bg-white dark:bg-slate-900 text-sky-700 dark:text-sky-400 shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
            }`}
          >
            <Phone className="w-3.5 h-3.5" />
            <span>Directorio CTP</span>
          </button>
        </div>
      </div>

      {/* 2. Content per selected service */}

      {/* A. Comedor Escolar */}
      {activeSection === 'comedor' && (
        <div className="space-y-4">
          <div className="bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200/80 dark:border-emerald-900/60 rounded-2xl p-4 flex items-center justify-between gap-4">
            <div>
              <span className="text-[11px] font-bold text-emerald-800 dark:text-emerald-300 uppercase tracking-wider block">
                Beca de Alimentación PANEA CTP Acosta
              </span>
              <p className="text-xs text-emerald-900 dark:text-emerald-200 mt-0.5">
                Estado: <strong className="font-semibold">Subsidio 100% Aprobado</strong>. Muestre su código QR en la entrada del comedor escolar.
              </p>
            </div>
            <button
              onClick={onOpenCard}
              className="px-3.5 py-1.5 bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-semibold rounded-xl transition-colors shrink-0"
            >
              Abrir QR Comedor
            </button>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            {DINING_MENU.map((item, idx) => (
              <div
                key={item.day}
                className={`bg-white dark:bg-slate-900 border rounded-2xl p-4 shadow-sm ${
                  idx === 0
                    ? 'border-emerald-300 dark:border-emerald-800 ring-2 ring-emerald-500/20'
                    : 'border-slate-200/80 dark:border-slate-800'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-sky-700 dark:text-sky-400 uppercase">
                    {item.day} {idx === 0 && '· Hoy'}
                  </span>
                  <span className="text-[10px] font-mono text-slate-500">
                    ~{item.caloriesApprox} kcal
                  </span>
                </div>

                <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                  {item.mainDish}
                </h4>
                <p className="text-xs text-slate-600 dark:text-slate-300 mt-1">
                  <strong>Guarnición:</strong> {item.sides}
                </p>
                <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-2 space-y-0.5">
                  <p>🥗 <strong>Ensalada:</strong> {item.salad}</p>
                  <p>🥤 <strong>Bebida:</strong> {item.drink}</p>
                  <p>🍉 <strong>Postre:</strong> {item.dessert}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* B. Transporte MEP Acosta */}
      {activeSection === 'transporte' && (
        <div className="space-y-4">
          <div className="bg-sky-50 dark:bg-sky-950/40 border border-sky-200 dark:border-sky-800 rounded-2xl p-4 text-xs text-sky-900 dark:text-sky-200">
            <p>
              <strong>Servicio de Busetas Estudiantiles CTP Acosta:</strong> Los recorridos inician a las 5:30 am en los distritos y cantones vecinos, con retorno diario a las 4:30 pm desde la bahía techada del colegio.
            </p>
          </div>

          <div className="space-y-3">
            {TRANSPORT_ROUTES.map((route) => (
              <div
                key={route.id}
                className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-2xl p-4 shadow-sm"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 dark:border-slate-800 pb-3">
                  <div>
                    <span className="text-[10px] font-mono font-bold text-sky-600">
                      {route.routeCode}
                    </span>
                    <h4 className="text-base font-bold text-slate-900 dark:text-white">
                      {route.name}
                    </h4>
                  </div>
                  <div className="text-xs text-slate-500 dark:text-slate-400">
                    Chofer: <strong className="text-slate-900 dark:text-white">{route.driver}</strong> ({route.phone})
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 py-3 text-xs">
                  <div>
                    <span className="text-slate-500 block text-[10px] uppercase font-semibold">Salida Mañana</span>
                    <span className="font-mono font-semibold text-slate-800 dark:text-slate-200">
                      {route.morningDeparture}
                    </span>
                  </div>
                  <div>
                    <span className="text-slate-500 block text-[10px] uppercase font-semibold">Regreso Tarde</span>
                    <span className="font-mono font-semibold text-slate-800 dark:text-slate-200">
                      {route.afternoonReturn}
                    </span>
                  </div>
                </div>

                <div className="text-xs">
                  <span className="text-slate-500 block text-[10px] uppercase font-semibold mb-1">
                    Paradas Principales
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {route.stops.map((stop, i) => (
                      <span
                        key={i}
                        className="text-[11px] bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 px-2 py-0.5 rounded-md"
                      >
                        {stop}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* C. Pasantías Técnicas y Práctica Profesional */}
      {activeSection === 'pasantia' && (
        <div className="space-y-4">
          <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-3xl p-5 shadow-sm space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <span className="text-xs font-semibold text-sky-600 uppercase">
                  Requisito de Graduación Técnica CTP Acosta
                </span>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white mt-0.5">
                  Práctica Profesional Supervisada (320 Horas)
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Especialidad: {PRIMARY_STUDENT.specialty}
                </p>
              </div>

              <span className="px-3 py-1 bg-sky-50 dark:bg-sky-950 text-sky-700 dark:text-sky-300 font-bold text-xs rounded-xl border border-sky-200 dark:border-sky-800 self-start sm:self-auto">
                Estado: {TECHNICAL_INTERNSHIP.status}
              </span>
            </div>

            {/* Progress Bar of 320 Hours */}
            <div>
              <div className="flex items-center justify-between text-xs font-semibold mb-1.5">
                <span className="text-slate-700 dark:text-slate-300">
                  Horas Registradas y Validadas
                </span>
                <span className="font-mono text-sky-600">
                  {TECHNICAL_INTERNSHIP.hoursCompleted} / {TECHNICAL_INTERNSHIP.hoursRequired} hrs ({Math.round((TECHNICAL_INTERNSHIP.hoursCompleted / TECHNICAL_INTERNSHIP.hoursRequired) * 100)}%)
                </span>
              </div>
              <div className="w-full bg-slate-100 dark:bg-slate-800 rounded-full h-3 overflow-hidden">
                <div
                  className="bg-gradient-to-r from-sky-600 to-indigo-600 h-full rounded-full transition-all duration-700"
                  style={{
                    width: `${(TECHNICAL_INTERNSHIP.hoursCompleted / TECHNICAL_INTERNSHIP.hoursRequired) * 100}%`,
                  }}
                />
              </div>
            </div>

            {/* Internship details */}
            <div className="grid sm:grid-cols-2 gap-3 text-xs bg-slate-50 dark:bg-slate-800/60 p-4 rounded-2xl border border-slate-100 dark:border-slate-700">
              <div>
                <span className="text-slate-500 block">Empresa / Centro de Práctica</span>
                <span className="font-bold text-slate-900 dark:text-white">
                  {TECHNICAL_INTERNSHIP.company}
                </span>
              </div>
              <div>
                <span className="text-slate-500 block">Tutor Empresarial</span>
                <span className="font-semibold text-slate-900 dark:text-white">
                  {TECHNICAL_INTERNSHIP.tutor}
                </span>
              </div>
              <div className="sm:col-span-2">
                <span className="text-slate-500 block">Proyecto Asignado</span>
                <span className="font-medium text-slate-800 dark:text-slate-200">
                  {TECHNICAL_INTERNSHIP.projectTitle}
                </span>
              </div>
            </div>

            <button
              onClick={() => alert('Bitácora digital semanal abierta para registro de actividades.')}
              className="w-full py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-semibold transition-colors"
            >
              Registrar Nueva Bitácora de Horas
            </button>
          </div>
        </div>
      )}

      {/* D. Cuaderno de Mensajería */}
      {activeSection === 'mensajes' && (
        <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-3xl p-5 shadow-sm space-y-4">
          <div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              Cuaderno de Comunicaciones Digital
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Envío directo de consultas institucionales entre encargados y docentes del CTP Acosta
            </p>
          </div>

          {msgSent ? (
            <div className="p-8 text-center space-y-2 bg-emerald-50 dark:bg-emerald-950/40 rounded-2xl border border-emerald-200 dark:border-emerald-800">
              <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto" />
              <h4 className="text-sm font-bold text-emerald-950 dark:text-emerald-200">
                ¡Mensaje enviado al docente!
              </h4>
              <p className="text-xs text-emerald-800 dark:text-emerald-300">
                El profesor recibirá una notificación inmediata en su perfil de Cloud Campus.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSendMessage} className="space-y-3">
              <div>
                <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                  Destinatario
                </label>
                <select
                  value={msgTeacher}
                  onChange={(e) => setMsgTeacher(e.target.value)}
                  className="w-full text-xs font-medium bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white border border-slate-200 dark:border-slate-700 rounded-xl p-2.5"
                >
                  <option value="Ing. Carlos Solís (Informática)">Ing. Carlos Solís (Informática Web - Docente Guía)</option>
                  <option value="Prof. Gabriela Mora (Bases de Datos)">Prof. Gabriela Mora (Bases de Datos)</option>
                  <option value="Lic. Luis Fernando Zúñiga (Matemáticas)">Lic. Luis Fernando Zúñiga (Matemáticas)</option>
                  <option value="M.Sc. Roberto Mora (Dirección General)">M.Sc. Roberto Mora (Dirección General CTP)</option>
                  <option value="Dpto. de Orientación Vocacional">Dpto. de Orientación Vocacional</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                  Asunto del Mensaje
                </label>
                <input
                  type="text"
                  value={msgSubject}
                  onChange={(e) => setMsgSubject(e.target.value)}
                  required
                  className="w-full text-xs font-medium bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white border border-slate-200 dark:border-slate-700 rounded-xl p-2.5"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                  Mensaje
                </label>
                <textarea
                  rows={4}
                  value={msgText}
                  onChange={(e) => setMsgText(e.target.value)}
                  placeholder="Estimado docente: Le escribo respecto al avance del proyecto o consulta académica..."
                  required
                  className="w-full text-xs bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white border border-slate-200 dark:border-slate-700 rounded-xl p-2.5"
                />
              </div>

              <button
                type="submit"
                className="w-full py-2.5 bg-sky-600 hover:bg-sky-700 text-white rounded-xl text-xs font-semibold flex items-center justify-center gap-2 transition-colors shadow-sm"
              >
                <Send className="w-4 h-4" />
                <span>Enviar Comunicado al Docente</span>
              </button>
            </form>
          )}
        </div>
      )}

      {/* E. Directorio Institucional CTP Acosta */}
      {activeSection === 'directorio' && (
        <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-3xl p-5 shadow-sm space-y-4">
          <div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              Directorio y Contacto CTP Acosta
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              {CTP_ACOSTA_INFO.slogan}
            </p>
          </div>

          <div className="space-y-3 text-xs">
            <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-700/60 flex items-start gap-3">
              <MapPin className="w-4 h-4 text-sky-600 shrink-0 mt-0.5" />
              <div>
                <span className="font-bold text-slate-900 dark:text-white block">Ubicación</span>
                <span className="text-slate-500 dark:text-slate-400">{CTP_ACOSTA_INFO.address}</span>
              </div>
            </div>

            <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-700/60 flex items-start gap-3">
              <Phone className="w-4 h-4 text-sky-600 shrink-0 mt-0.5" />
              <div>
                <span className="font-bold text-slate-900 dark:text-white block">Central Telefónica</span>
                <span className="font-mono text-slate-600 dark:text-slate-300">{CTP_ACOSTA_INFO.phone}</span>
                <span className="block text-[11px] text-slate-400 mt-0.5">
                  Ext. 101: Dirección | Ext. 104: Orientación | Ext. 108: Talleres Técnicos
                </span>
              </div>
            </div>

            <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-700/60">
              <span className="font-bold text-slate-900 dark:text-white block mb-1">
                Especialidades Técnicas Impartidas en el CTP Acosta
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 text-[11px] text-slate-600 dark:text-slate-300">
                {CTP_ACOSTA_INFO.specialtiesOffered.map((sp, i) => (
                  <div key={i} className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-sky-600" />
                    <span>{sp}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* F. Ficha Médica y Póliza INS */}
      {activeSection === 'salud' && (
        <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-3xl p-5 shadow-sm space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <div className="flex items-center gap-2 text-xs text-sky-600 font-semibold">
                <span>Ficha Médica y Cobertura de Accidentes</span>
                <span aria-hidden="true">·</span>
                <span>CTP Acosta</span>
              </div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white mt-0.5">
                Póliza Estudiantil INS y Expediente de Salud
              </h3>
            </div>
            <button
              onClick={onOpenCertificates}
              className="px-3.5 py-1.5 bg-sky-600 hover:bg-sky-700 text-white rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors self-start sm:self-auto"
            >
              <FileCheck className="w-3.5 h-3.5" />
              <span>Constancia de Seguro</span>
            </button>
          </div>

          <div className="space-y-3 text-xs">
            <div className="p-4 rounded-2xl bg-sky-50 dark:bg-sky-950/40 border border-sky-100 dark:border-sky-900 space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-bold text-sky-950 dark:text-sky-200">
                  Póliza Colectiva Estudiantil del INS
                </span>
                <span className="px-2 py-0.5 bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 rounded font-semibold text-[10px]">
                  Vigente 2026
                </span>
              </div>
              <p className="text-slate-600 dark:text-slate-300">
                Cubre accidentes escolares dentro del campus, talleres de mecánica/cómputo, transporte oficial MEP y giras técnicas pedagógicas.
              </p>
              <div className="font-mono text-sky-800 dark:text-sky-300 font-bold text-xs pt-1">
                Número de Póliza: {currentStudent.insPolicyNumber}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-700/60">
                <span className="text-slate-400 block text-[10px] font-semibold uppercase">Tipo de Sangre</span>
                <span className="font-mono font-bold text-base text-slate-900 dark:text-white">{currentStudent.bloodType}</span>
              </div>

              <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-700/60">
                <span className="text-slate-400 block text-[10px] font-semibold uppercase">Centro de Salud EBAIS</span>
                <span className="font-semibold text-slate-900 dark:text-white">{currentStudent.clinicEbais}</span>
              </div>

              <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-700/60 sm:col-span-2">
                <span className="text-slate-400 block text-[10px] font-semibold uppercase">Alergias y Condiciones Notificadas</span>
                <span className="font-medium text-slate-800 dark:text-slate-200">{currentStudent.allergies}</span>
              </div>

              <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-700/60 sm:col-span-2">
                <span className="text-slate-400 block text-[10px] font-semibold uppercase">Contacto Inmediato en Caso de Emergencia</span>
                <span className="font-bold text-slate-900 dark:text-white">{currentStudent.parentName} ({currentStudent.emergencyContact})</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 8. Export Project / Download ZIP Section */}
      <div className="bg-gradient-to-br from-slate-900 to-indigo-950 text-white rounded-3xl p-5 shadow-sm border border-slate-800">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-2xl bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shrink-0">
              <Code2 className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-base text-white">Descargar Código Fuente</h3>
                <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  ZIP · 1.8 MB
                </span>
              </div>
              <p className="text-xs text-slate-300 mt-1">
                Descarga todo el proyecto React + TypeScript + Tailwind CSS listo para ejecutar o subir a GitHub.
              </p>
            </div>
          </div>

          <a
            href="/proyecto-ctp-acosta.zip"
            download="proyecto-ctp-acosta.zip"
            className="inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-emerald-600 hover:bg-emerald-500 active:scale-95 text-white font-semibold text-xs rounded-xl shadow-md transition-all whitespace-nowrap self-start sm:self-auto"
          >
            <Download className="w-4 h-4" />
            <span>Descargar archivo ZIP</span>
          </a>
        </div>

        <div className="mt-4 pt-4 border-t border-slate-800/80 text-[11px] text-slate-400 grid grid-cols-1 sm:grid-cols-2 gap-2">
          <div>
            <span className="font-semibold text-slate-300 block">Para ejecutar en tu PC:</span>
            <code className="text-emerald-400 font-mono text-[10px]">unzip proyecto-ctp-acosta.zip && npm install && npm run dev</code>
          </div>
          <div>
            <span className="font-semibold text-slate-300 block">Para subir a GitHub:</span>
            <code className="text-sky-400 font-mono text-[10px]">git remote add origin &lt;URL&gt; && git push -u origin main</code>
          </div>
        </div>
      </div>
    </div>
  );
};
