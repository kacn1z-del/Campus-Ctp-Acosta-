import React from 'react';
import { Bell, Smartphone, Monitor, UserCheck, Moon, Sun, FileCheck, Lock, Users, Download } from 'lucide-react';
import { StudentProfile, UserRole } from '../types';

interface HeaderProps {
  currentStudent: StudentProfile;
  activeRole: UserRole;
  onRoleChange: (role: UserRole) => void;
  isPhoneFrame: boolean;
  onTogglePhoneFrame: () => void;
  unreadCount: number;
  onOpenNotifications: () => void;
  onOpenCard: () => void;
  onOpenCertificates: () => void;
  isDarkMode: boolean;
  onToggleDarkMode: () => void;
  onLockApp?: () => void;
  onOpenParentPortal?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentStudent,
  activeRole,
  onRoleChange,
  isPhoneFrame,
  onTogglePhoneFrame,
  unreadCount,
  onOpenNotifications,
  onOpenCard,
  onOpenCertificates,
  isDarkMode,
  onToggleDarkMode,
  onLockApp,
  onOpenParentPortal,
}) => {
  return (
    <header className="sticky top-0 z-30 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-2.5 flex items-center justify-between gap-3">
        {/* Brand Zone */}
        <div className="flex items-center gap-2.5 shrink-0">
          <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-gradient-to-tr from-sky-600 to-indigo-700 flex items-center justify-center text-white shadow-sm font-bold text-sm sm:text-base tracking-tight">
            CC
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-bold text-sm sm:text-base tracking-tight text-slate-900 dark:text-white whitespace-nowrap">
                Cloud Campus
              </span>
              <span className="text-[10px] font-semibold px-1 py-0.5 rounded bg-sky-50 dark:bg-sky-950/60 text-sky-700 dark:text-sky-300 border border-sky-200 dark:border-sky-800 whitespace-nowrap">
                CTP Acosta
              </span>
            </div>
            <p className="text-[10px] text-slate-500 dark:text-slate-400 hidden sm:block truncate max-w-xs">
              Colegio Técnico Profesional de Acosta · MEP
            </p>
          </div>
        </div>

        {/* Center Zone: Role Selector */}
        <div className="flex items-center gap-1.5">
          <select
            aria-label="Seleccionar rol de usuario"
            value={activeRole}
            onChange={(e) => onRoleChange(e.target.value as UserRole)}
            className="text-[11px] sm:text-xs font-medium bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 rounded-lg py-1.5 pl-2 pr-5 cursor-pointer focus:outline-none focus:ring-2 focus:ring-sky-500 max-w-[130px] sm:max-w-none truncate"
          >
            <option value="student">Estudiante: {currentStudent.firstName}</option>
            <option value="parent">Encargada: {currentStudent.parentName.split(' ')[0]}</option>
            <option value="teacher">Docente: Prof. C. Solís</option>
          </select>

          {/* Quick Parent Portal button */}
          {onOpenParentPortal && (
            <button
              onClick={onOpenParentPortal}
              className={`inline-flex items-center gap-1 text-[11px] sm:text-xs font-semibold px-2.5 py-1.5 rounded-lg border transition-all whitespace-nowrap ${
                activeRole === 'parent'
                  ? 'bg-sky-600 text-white border-sky-600 shadow-sm'
                  : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:text-sky-600'
              }`}
              title="Abrir panel de monitoreo parental en tiempo real"
            >
              <Users className="w-3.5 h-3.5" />
              <span>Monitoreo</span>
            </button>
          )}

          {/* Quick Certificates button */}
          <button
            onClick={onOpenCertificates}
            className="hidden md:inline-flex items-center gap-1 text-xs font-medium text-slate-700 dark:text-slate-300 hover:text-sky-600 bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg px-2.5 py-1.5 transition-colors whitespace-nowrap"
            title="Generar constancia oficial MEP"
          >
            <FileCheck className="w-3.5 h-3.5 text-sky-600" />
            <span>Constancias</span>
          </button>
        </div>

        {/* Right Actions: Dark Mode, Phone Frame Toggle & Notifications */}
        <div className="flex items-center gap-1.5 shrink-0">
          {/* Dark Mode Toggle */}
          <button
            onClick={onToggleDarkMode}
            className="w-8 h-8 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 flex items-center justify-center transition-colors"
            title={isDarkMode ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'}
            aria-label="Alternar tema claro y oscuro"
          >
            {isDarkMode ? (
              <Sun className="w-4 h-4 text-amber-400" />
            ) : (
              <Moon className="w-4 h-4 text-slate-600" />
            )}
          </button>

          {/* Frame Toggle (Desktop Viewports) */}
          <button
            onClick={onTogglePhoneFrame}
            className="hidden lg:flex items-center gap-1.5 text-xs font-medium text-slate-600 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-lg px-2.5 py-1.5 transition-colors whitespace-nowrap"
            title={isPhoneFrame ? "Cambiar a pantalla completa" : "Ver en marco de smartphone móvil"}
          >
            {isPhoneFrame ? (
              <>
                <Monitor className="w-3.5 h-3.5 text-sky-600 dark:text-sky-400" />
                <span>Expandir</span>
              </>
            ) : (
              <>
                <Smartphone className="w-3.5 h-3.5 text-sky-600 dark:text-sky-400" />
                <span>Móvil</span>
              </>
            )}
          </button>

          {/* Notifications Trigger */}
          <button
            onClick={onOpenNotifications}
            className="relative w-8 h-8 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 flex items-center justify-center transition-colors"
            aria-label="Notificaciones y circulares"
            title="Circulares y Notificaciones"
          >
            <Bell className="w-4 h-4" />
            {unreadCount > 0 && (
              <span className="absolute top-1 right-1 flex items-center justify-center min-w-[16px] h-[16px] px-1 text-[9px] font-bold text-white bg-rose-600 rounded-full border border-white dark:border-slate-900">
                {unreadCount}
              </span>
            )}
          </button>

          {/* Direct Download ZIP Button */}
          <a
            href="/proyecto-ctp-acosta.zip"
            download="proyecto-ctp-acosta.zip"
            className="inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm transition-all whitespace-nowrap active:scale-95"
            title="Descargar código completo del proyecto en formato ZIP (1.8 MB)"
          >
            <Download className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Descargar ZIP</span>
          </a>

          {/* Biometric Security Lock Button */}
          {onLockApp && (
            <button
              onClick={onLockApp}
              className="w-8 h-8 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 flex items-center justify-center transition-colors"
              aria-label="Bloquear aplicación con biometría"
              title="Bloquear con Biometría (FaceID/Huella)"
            >
              <Lock className="w-4 h-4 text-sky-600 dark:text-sky-400" />
            </button>
          )}
        </div>
      </div>
    </header>
  );
};

