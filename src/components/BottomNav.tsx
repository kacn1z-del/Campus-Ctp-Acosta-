import React from 'react';
import { Home, Award, Calendar, Clock, CreditCard, MoreHorizontal } from 'lucide-react';

export type ActiveTab = 
  | 'inicio' 
  | 'notas' 
  | 'asistencia' 
  | 'horario' 
  | 'mas' 
  | 'tareas' 
  | 'conducta' 
  | 'calendario';

interface BottomNavProps {
  activeTab: ActiveTab;
  onTabChange: (tab: ActiveTab) => void;
  onOpenCard: () => void;
}

export const BottomNav: React.FC<BottomNavProps> = ({
  activeTab,
  onTabChange,
  onOpenCard,
}) => {
  const tabs = [
    { id: 'inicio' as ActiveTab, label: 'Inicio', icon: Home },
    { id: 'notas' as ActiveTab, label: 'Notas', icon: Award },
    { id: 'asistencia' as ActiveTab, label: 'Asistencia', icon: Clock },
    { id: 'horario' as ActiveTab, label: 'Horario', icon: Calendar },
    { id: 'mas' as ActiveTab, label: 'Servicios', icon: MoreHorizontal },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-t border-slate-200 dark:border-slate-800 pb-safe transition-colors">
      <div className="max-w-md md:max-w-xl mx-auto px-2 flex items-center justify-around h-16">
        {tabs.slice(0, 2).map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`flex-1 min-h-[48px] flex flex-col items-center justify-center transition-colors relative ${
                isActive ? 'text-sky-600 dark:text-sky-400 font-semibold' : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 font-medium'
              }`}
            >
              <Icon className={`w-5 h-5 transition-transform duration-150 ${isActive ? 'scale-110' : ''}`} />
              <span className="text-[11px] tracking-tight mt-1 truncate">{tab.label}</span>
              {isActive && (
                <span className="absolute bottom-1 w-1.5 h-1.5 rounded-full bg-sky-600 dark:bg-sky-400" />
              )}
            </button>
          );
        })}

        {/* Center Prominent Digital ID Card Quick Button */}
        <button
          onClick={onOpenCard}
          className="flex flex-col items-center justify-center -mt-5 min-w-[56px] min-h-[56px] focus:outline-none group"
          title="Abrir Carné Estudiantil Oficial"
        >
          <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-sky-600 via-sky-700 to-indigo-700 flex items-center justify-center text-white shadow-md shadow-sky-600/25 group-active:scale-95 transition-transform">
            <CreditCard className="w-5 h-5" />
          </div>
          <span className="text-[10px] font-semibold text-slate-700 dark:text-slate-300 mt-0.5">
            Carné
          </span>
        </button>

        {tabs.slice(2).map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`flex-1 min-h-[48px] flex flex-col items-center justify-center transition-colors relative ${
                isActive ? 'text-sky-600 dark:text-sky-400 font-semibold' : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 font-medium'
              }`}
            >
              <Icon className={`w-5 h-5 transition-transform duration-150 ${isActive ? 'scale-110' : ''}`} />
              <span className="text-[11px] tracking-tight mt-1 truncate">{tab.label}</span>
              {isActive && (
                <span className="absolute bottom-1 w-1.5 h-1.5 rounded-full bg-sky-600 dark:bg-sky-400" />
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
};
