import React, { useState } from 'react';
import { 
  FileCheck, 
  X, 
  Download, 
  Printer, 
  QrCode, 
  ShieldCheck, 
  CheckCircle2, 
  Building2 
} from 'lucide-react';
import { StudentProfile, OfficialCertificateRequest } from '../types';
import { CTP_ACOSTA_INFO, OFFICIAL_CERTIFICATES } from '../data/mockData';

interface CertificatesModalProps {
  student: StudentProfile;
  isOpen: boolean;
  onClose: () => void;
}

export const CertificatesModal: React.FC<CertificatesModalProps> = ({
  student,
  isOpen,
  onClose,
}) => {
  const [certType, setCertType] = useState<OfficialCertificateRequest['type']>('Estudiante Regular (MEP)');
  const [targetOrg, setTargetOrg] = useState('CCSS - Trámite de Aseguramiento / Beca');
  const [generatedDoc, setGeneratedDoc] = useState<OfficialCertificateRequest | null>(null);

  if (!isOpen) return null;

  const handleGenerate = (e: React.FormEvent) => {
    e.preventDefault();
    const doc: OfficialCertificateRequest = {
      id: `cer_${Date.now()}`,
      type: certType,
      requestDate: new Date().toLocaleDateString('es-CR', { year: 'numeric', month: 'long', day: 'numeric' }),
      recipientOrg: targetOrg,
      verificationCode: `CTA-2026-${Math.floor(100000 + Math.random() * 900000)}-MEP`,
      status: 'Firmada Digitalmente',
    };
    setGeneratedDoc(doc);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4">
      <div className="bg-white dark:bg-slate-900 w-full max-w-2xl rounded-3xl border border-slate-200 dark:border-slate-800 shadow-2xl flex flex-col max-h-[92vh] overflow-hidden">
        {/* Header */}
        <div className="p-5 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-sky-600 text-white flex items-center justify-center">
              <FileCheck className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2 text-xs text-sky-600 font-semibold">
                <span>Secretaría y Registro CTP Acosta</span>
                <span aria-hidden="true">·</span>
                <span>Firma Digital MEP</span>
              </div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                Generador de Constancias Oficiales
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

        {/* Content */}
        <div className="p-5 overflow-y-auto space-y-5 flex-1">
          {!generatedDoc ? (
            <form onSubmit={handleGenerate} className="space-y-4">
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Seleccione el tipo de documento requerido. Las constancias generadas en Cloud Campus cuentan con firma digital ministerial y código QR de autenticidad para trámites ante la CCSS, IMAS, PANI o juzgados.
              </p>

              <div>
                <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                  Tipo de Documento
                </label>
                <select
                  value={certType}
                  onChange={(e) => setCertType(e.target.value as any)}
                  className="w-full text-xs font-medium bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white border border-slate-200 dark:border-slate-700 rounded-xl p-2.5"
                >
                  <option value="Estudiante Regular (MEP)">Constancia de Estudiante Regular (MEP)</option>
                  <option value="Constancia de Conducta">Constancia de Buena Conducta (100 pts)</option>
                  <option value="Acreditación Beca Avancemos">Acreditación para Beca Avancemos / IMAS</option>
                  <option value="Certificación de Notas">Certificación de Calificaciones Parciales</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                  Institución o Entidad Destinataria
                </label>
                <input
                  type="text"
                  value={targetOrg}
                  onChange={(e) => setTargetOrg(e.target.value)}
                  placeholder="Ej: Caja Costarricense de Seguro Social (CCSS) / IMAS"
                  required
                  className="w-full text-xs bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white border border-slate-200 dark:border-slate-700 rounded-xl p-2.5"
                />
              </div>

              {/* Student info summary */}
              <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/60 text-xs text-slate-600 dark:text-slate-300 grid grid-cols-2 gap-2">
                <div>
                  <span className="text-slate-400 block text-[10px]">Estudiante:</span>
                  <span className="font-bold text-slate-900 dark:text-white">{student.fullName}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px]">Cédula:</span>
                  <span className="font-mono">{student.idNumber}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px]">Sección y Nivel:</span>
                  <span>{student.section} · {student.gradeLevel}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px]">Especialidad:</span>
                  <span className="font-medium">{student.specialty}</span>
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-sky-600 hover:bg-sky-700 text-white font-semibold rounded-xl text-xs flex items-center justify-center gap-2 transition-colors shadow-sm"
              >
                <FileCheck className="w-4 h-4" />
                <span>Generar Documento con Sello Digital</span>
              </button>
            </form>
          ) : (
            /* PREVIEW OF THE GENERATED DOCUMENT */
            <div className="space-y-4">
              <div className="bg-white text-slate-900 p-6 rounded-2xl border border-slate-300 shadow-inner space-y-4 text-xs font-sans">
                {/* Official Letterhead */}
                <div className="border-b-2 border-sky-800 pb-3 flex items-start justify-between gap-3">
                  <div>
                    <span className="text-[10px] uppercase font-bold tracking-wider text-sky-800 block">
                      Ministerio de Educación Pública · Costa Rica
                    </span>
                    <h4 className="text-base font-bold text-slate-900">
                      Colegio Técnico Profesional de Acosta
                    </h4>
                    <p className="text-[11px] text-slate-600">
                      Circuito 03 · Dirección Regional de Educación Puriscal
                    </p>
                  </div>
                  <div className="w-12 h-12 bg-sky-50 rounded-xl flex items-center justify-center border border-sky-200 shrink-0">
                    <QrCode className="w-9 h-9 text-slate-900" />
                  </div>
                </div>

                <div className="text-center py-2">
                  <h5 className="text-sm font-bold tracking-wide uppercase underline">
                    {generatedDoc.type}
                  </h5>
                </div>

                <p className="leading-relaxed text-justify">
                  El suscrito, <strong>{CTP_ACOSTA_INFO.director}</strong>, en su condición de Director del <strong>Colegio Técnico Profesional de Acosta</strong>, hace constar que:
                </p>

                <p className="leading-relaxed text-justify bg-slate-50 p-3 rounded-xl border border-slate-200">
                  La estudiante <strong>{student.fullName}</strong>, portadora de la cédula de identidad <strong>{student.idNumber}</strong> y carné estudiantil <strong>{student.institutionalId}</strong>, se encuentra debidamente matriculada como <strong>Estudiante Regular</strong> en el nivel de <strong>{student.gradeLevel}</strong>, sección <strong>{student.section}</strong>, cursando la especialidad técnica de <strong>{student.specialty}</strong> durante el presente curso lectivo 2026.
                </p>

                <p className="leading-relaxed text-justify">
                  Asimismo, se certifica que la estudiante registra una asistencia del <strong>{student.attendanceRate}%</strong> y una nota de conducta de <strong>{student.conductScore} puntos</strong> (Honor al Mérito).
                </p>

                <p className="leading-relaxed text-justify">
                  A solicitud de la parte interesada, se extiende la presente para ser presentada ante <strong>{generatedDoc.recipientOrg}</strong>, en San Ignacio de Acosta, a los {new Date().getDate()} días del mes de octubre del año 2026.
                </p>

                {/* Digital Signature */}
                <div className="pt-6 flex items-center justify-between border-t border-slate-200 text-[11px]">
                  <div>
                    <div className="w-44 border-b border-slate-400 mb-1" />
                    <span className="font-bold">{CTP_ACOSTA_INFO.director}</span>
                    <span className="block text-slate-500">Director Institucional CTP Acosta</span>
                  </div>

                  <div className="text-right font-mono text-[10px] text-slate-500">
                    <span className="block font-bold text-sky-800">DOCUMENTO FIRMADO DIGITALMENTE</span>
                    <span>Código: {generatedDoc.verificationCode}</span>
                  </div>
                </div>
              </div>

              {/* Document Actions */}
              <div className="flex gap-3">
                <button
                  onClick={() => window.print()}
                  className="flex-1 py-2.5 bg-sky-700 hover:bg-sky-800 text-white rounded-xl text-xs font-semibold flex items-center justify-center gap-2 transition-colors"
                >
                  <Printer className="w-4 h-4" />
                  <span>Imprimir / Guardar PDF</span>
                </button>
                <button
                  onClick={() => setGeneratedDoc(null)}
                  className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-semibold transition-colors"
                >
                  Generar Otra
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
