import React from 'react';
import { X, Bell, Check, ChevronRight, AlertCircle, Calendar } from 'lucide-react';
import { InstitutionalNotice } from '../types';

interface NotificationsModalProps {
  isOpen: boolean;
  onClose: () => void;
  notices: InstitutionalNotice[];
  onSelectNotice: (notice: InstitutionalNotice) => void;
  onMarkAllAsRead: () => void;
}

export const NotificationsModal: React.FC<NotificationsModalProps> = ({
  isOpen,
  onClose,
  notices,
  onSelectNotice,
  onMarkAllAsRead,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4">
      <div className="bg-white dark:bg-slate-900 w-full max-w-lg rounded-3xl border border-slate-200 dark:border-slate-800 shadow-2xl flex flex-col max-h-[88vh] overflow-hidden">
        {/* Header */}
        <div className="p-5 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between gap-4">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-sky-100 dark:bg-sky-950 text-sky-600 dark:text-sky-400 flex items-center justify-center">
              <Bell className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                Circulares y Notificaciones
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Comunicados oficiales del CTP Acosta
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500 hover:text-slate-900 flex items-center justify-center"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Action bar */}
        <div className="px-5 py-2.5 bg-slate-50 dark:bg-slate-800/50 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs">
          <span className="text-slate-500">
            {notices.filter((n) => !n.read).length} no leídos de {notices.length}
          </span>
          <button
            onClick={onMarkAllAsRead}
            className="text-sky-600 dark:text-sky-400 font-semibold hover:underline flex items-center gap-1"
          >
            <Check className="w-3.5 h-3.5" />
            <span>Marcar todo como leído</span>
          </button>
        </div>

        {/* Notices list */}
        <div className="p-5 overflow-y-auto space-y-3 flex-1">
          {notices.map((notice) => (
            <div
              key={notice.id}
              onClick={() => onSelectNotice(notice)}
              className={`p-4 rounded-2xl border transition-all cursor-pointer ${
                notice.read
                  ? 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/60'
                  : 'bg-sky-50/50 dark:bg-sky-950/30 border-sky-200 dark:border-sky-800 hover:bg-sky-50'
              }`}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <div className="flex items-center gap-2 text-[11px] text-slate-500 dark:text-slate-400">
                    <span className="font-semibold text-sky-700 dark:text-sky-300">
                      {notice.sender}
                    </span>
                    <span aria-hidden="true">·</span>
                    <span>{notice.date}</span>
                  </div>

                  <h4 className="text-sm font-bold text-slate-900 dark:text-white mt-1">
                    {notice.title}
                  </h4>

                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 line-clamp-2">
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
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
