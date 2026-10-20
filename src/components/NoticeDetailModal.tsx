import React from 'react';
import { X, Calendar, UserCheck, ShieldAlert, Share2, Check } from 'lucide-react';
import { InstitutionalNotice } from '../types';

interface NoticeDetailModalProps {
  notice: InstitutionalNotice | null;
  onClose: () => void;
}

export const NoticeDetailModal: React.FC<NoticeDetailModalProps> = ({
  notice,
  onClose,
}) => {
  const [copied, setCopied] = React.useState(false);

  if (!notice) return null;

  const handleShare = () => {
    navigator.clipboard?.writeText(`${notice.title}\n${notice.fullContent}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4">
      <div className="bg-white dark:bg-slate-900 w-full max-w-lg rounded-3xl border border-slate-200 dark:border-slate-800 shadow-2xl p-6 space-y-4 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-start justify-between gap-4 border-b border-slate-100 dark:border-slate-800 pb-3">
          <div>
            <div className="flex items-center gap-2 text-xs text-sky-700 dark:text-sky-300 font-semibold">
              <span>{notice.sender}</span>
              <span aria-hidden="true">·</span>
              <span>{notice.category}</span>
            </div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white mt-1">
              {notice.title}
            </h3>
            <span className="text-xs text-slate-400 block mt-0.5 font-mono">
              Publicado: {notice.date}
            </span>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500 hover:text-slate-900 flex items-center justify-center"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Priority Badge if Urgent */}
        {notice.priority === 'Urgente' && (
          <div className="p-3 rounded-2xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900/60 flex items-center gap-2.5 text-xs text-rose-800 dark:text-rose-200">
            <ShieldAlert className="w-4 h-4 text-rose-600 shrink-0" />
            <span>Comunicado Oficial de Carácter Obligatorio e Inmediato</span>
          </div>
        )}

        {/* Full Text Content */}
        <div className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 space-y-3 font-normal">
          <p>{notice.fullContent}</p>
        </div>

        <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-700/60 text-xs text-slate-500 space-y-1">
          <p>
            <strong>Emisor:</strong> Dirección y Consejo de Profesores CTP Acosta
          </p>
          <p>
            <strong>Validez:</strong> Sistema de Información Oficial Cloud Campus Costa Rica
          </p>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-between pt-2 border-t border-slate-100 dark:border-slate-800">
          <button
            onClick={handleShare}
            className="px-3.5 py-2 text-xs font-semibold text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 rounded-xl flex items-center gap-1.5 transition-colors"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Share2 className="w-3.5 h-3.5" />}
            <span>{copied ? 'Copiado al portapapeles' : 'Compartir Circular'}</span>
          </button>

          <button
            onClick={onClose}
            className="px-5 py-2 bg-slate-900 text-white rounded-xl text-xs font-semibold hover:bg-slate-800 transition-colors"
          >
            Entendido
          </button>
        </div>
      </div>
    </div>
  );
};
