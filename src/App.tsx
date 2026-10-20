/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { 
  Wifi, 
  Battery, 
  Signal, 
  Smartphone, 
  Monitor 
} from 'lucide-react';

import { 
  PRIMARY_STUDENT, 
  SECONDARY_STUDENT, 
  INITIAL_GRADES, 
  INITIAL_ABSENCES, 
  WEEKLY_SCHEDULE, 
  INSTITUTIONAL_NOTICES, 
  INITIAL_ASSIGNMENTS,
  INITIAL_CONDUCT_RECORDS,
  SCHOOL_CALENDAR_EVENTS,
  CTP_ACOSTA_INFO 
} from './data/mockData';

import { 
  StudentProfile, 
  UserRole, 
  SubjectGrade, 
  AbsenceRecord, 
  InstitutionalNotice,
  StudentAssignment,
  ConductRecord,
  SchoolCalendarEvent 
} from './types';

import { Header } from './components/Header';
import { BottomNav, ActiveTab } from './components/BottomNav';
import { DashboardTab } from './components/DashboardTab';
import { GradesTab } from './components/GradesTab';
import { AttendanceTab } from './components/AttendanceTab';
import { ScheduleTab } from './components/ScheduleTab';
import { AssignmentsTab } from './components/AssignmentsTab';
import { ConductTab } from './components/ConductTab';
import { CalendarTab } from './components/CalendarTab';
import { MoreServicesTab } from './components/MoreServicesTab';
import { DigitalCardModal } from './components/DigitalCardModal';
import { TeacherViewModal } from './components/TeacherViewModal';
import { NotificationsModal } from './components/NotificationsModal';
import { NoticeDetailModal } from './components/NoticeDetailModal';
import { CertificatesModal } from './components/CertificatesModal';
import { BiometricOverlay } from './components/BiometricOverlay';
import { ParentPortalModal } from './components/ParentPortalModal';

export default function App() {
  const [currentStudent, setCurrentStudent] = useState<StudentProfile>(PRIMARY_STUDENT);
  const [activeRole, setActiveRole] = useState<UserRole>('student');
  const [activeTab, setActiveTab] = useState<ActiveTab>('inicio');
  const [isPhoneFrame, setIsPhoneFrame] = useState(true);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isBiometricLocked, setIsBiometricLocked] = useState(true);
  const [isParentPortalOpen, setIsParentPortalOpen] = useState(false);

  // Sync dark mode class with root html element
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  // Core Data States
  const [grades, setGrades] = useState<SubjectGrade[]>(INITIAL_GRADES);
  const [absences, setAbsences] = useState<AbsenceRecord[]>(INITIAL_ABSENCES);
  const [notices, setNotices] = useState<InstitutionalNotice[]>(INSTITUTIONAL_NOTICES);
  const [assignments, setAssignments] = useState<StudentAssignment[]>(INITIAL_ASSIGNMENTS);
  const [conductRecords, setConductRecords] = useState<ConductRecord[]>(INITIAL_CONDUCT_RECORDS);
  const [calendarEvents] = useState<SchoolCalendarEvent[]>(SCHOOL_CALENDAR_EVENTS);

  // Modals
  const [isCardOpen, setIsCardOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [isTeacherModalOpen, setIsTeacherModalOpen] = useState(false);
  const [isAbsenceModalOpen, setIsAbsenceModalOpen] = useState(false);
  const [isCertificatesOpen, setIsCertificatesOpen] = useState(false);
  const [selectedNotice, setSelectedNotice] = useState<InstitutionalNotice | null>(null);

  // Counters
  const unreadCount = notices.filter((n) => !n.read).length;
  const pendingAssignmentsCount = assignments.filter((a) => a.status === 'Pendiente').length;

  const handleRoleChange = (newRole: UserRole) => {
    setActiveRole(newRole);
    if (newRole === 'teacher') {
      setIsTeacherModalOpen(true);
    } else if (newRole === 'parent') {
      setIsParentPortalOpen(true);
    }
  };

  const handleAddAbsenceJustification = (newRecord: Omit<AbsenceRecord, 'id'>) => {
    const record: AbsenceRecord = {
      ...newRecord,
      id: `abs_${Date.now()}`,
    };
    setAbsences((prev) => [record, ...prev]);
  };

  const handleSubmitAssignment = (taskId: string, submissionLink: string, comment: string) => {
    setAssignments((prev) =>
      prev.map((task) =>
        task.id === taskId
          ? {
              ...task,
              status: 'Entregada',
              submissionDate: new Date().toISOString().split('T')[0],
              submissionLink,
            }
          : task
      )
    );
  };

  const handleAddAppeal = (recordId: string, appealReason: string) => {
    setConductRecords((prev) =>
      prev.map((rec) =>
        rec.id === recordId ? { ...rec, status: 'En Descargos' } : rec
      )
    );
  };

  const handleMarkAllNoticesAsRead = () => {
    setNotices((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  const handleOpenNotice = (notice: InstitutionalNotice) => {
    setSelectedNotice(notice);
    setNotices((prev) =>
      prev.map((n) => (n.id === notice.id ? { ...n, read: true } : n))
    );
  };

  return (
    <div className={`min-h-screen ${isDarkMode ? 'dark bg-slate-950 text-slate-100' : 'bg-slate-900 text-slate-800'} flex flex-col items-center justify-start antialiased selection:bg-sky-500 selection:text-white transition-colors`}>
      {/* Top Banner for Desktop Controls */}
      <div className="w-full bg-slate-950/90 border-b border-slate-800 py-2 px-4 flex items-center justify-between text-xs text-slate-400">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="font-semibold text-slate-200">
            Cloud Campus Móvil · CTP Acosta
          </span>
          <span className="hidden sm:inline text-slate-500">
            (Colegio Técnico Profesional de Acosta, San José)
          </span>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsCertificatesOpen(true)}
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-sky-950/80 hover:bg-sky-900 text-sky-300 border border-sky-800 text-xs font-medium transition-colors"
          >
            <span>Emitir Constancia Oficial</span>
          </button>

          <button
            onClick={() => setIsPhoneFrame(!isPhoneFrame)}
            className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium transition-colors"
          >
            {isPhoneFrame ? (
              <>
                <Monitor className="w-3.5 h-3.5 text-sky-400" />
                <span className="hidden sm:inline">Expandir a Pantalla Completa</span>
                <span className="sm:hidden">Expandir</span>
              </>
            ) : (
              <>
                <Smartphone className="w-3.5 h-3.5 text-sky-400" />
                <span>Modo Teléfono</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Main Viewport Container */}
      <div
        className={`w-full transition-all duration-300 ${
          isPhoneFrame
            ? 'max-w-[430px] my-4 sm:my-8 rounded-[48px] border-[10px] border-slate-800 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.8)] overflow-hidden bg-slate-50 dark:bg-slate-950 relative min-h-[850px] flex flex-col'
            : 'max-w-7xl w-full bg-slate-50 dark:bg-slate-950 min-h-screen flex flex-col'
        }`}
      >
        {/* Smartphone Notch & Status Bar (Visible in Phone Frame mode) */}
        {isPhoneFrame && (
          <div className="bg-white dark:bg-slate-900 px-6 pt-3 pb-1 flex items-center justify-between text-[11px] font-semibold text-slate-800 dark:text-slate-200 select-none border-b border-slate-100 dark:border-slate-800">
            <span>09:41</span>
            {/* Notch capsule */}
            <div className="w-24 h-4 bg-slate-950 rounded-full mx-auto" />
            <div className="flex items-center gap-1.5">
              <Signal className="w-3.5 h-3.5" />
              <Wifi className="w-3.5 h-3.5" />
              <Battery className="w-4 h-4" />
            </div>
          </div>
        )}

        {/* Cloud Campus App Header */}
        <Header
          currentStudent={currentStudent}
          activeRole={activeRole}
          onRoleChange={handleRoleChange}
          isPhoneFrame={isPhoneFrame}
          onTogglePhoneFrame={() => setIsPhoneFrame(!isPhoneFrame)}
          unreadCount={unreadCount}
          onOpenNotifications={() => setIsNotificationsOpen(true)}
          onOpenCard={() => setIsCardOpen(true)}
          onOpenCertificates={() => setIsCertificatesOpen(true)}
          isDarkMode={isDarkMode}
          onToggleDarkMode={() => setIsDarkMode(!isDarkMode)}
          onLockApp={() => setIsBiometricLocked(true)}
          onOpenParentPortal={() => setIsParentPortalOpen(true)}
        />

        {/* Content Area */}
        <main className="flex-1 p-4 sm:p-6 overflow-y-auto">
          {activeTab === 'inicio' && (
            <DashboardTab
              student={currentStudent}
              grades={grades}
              notices={notices}
              pendingAssignmentsCount={pendingAssignmentsCount}
              onNavigateTab={(tab) => setActiveTab(tab)}
              onOpenCard={() => setIsCardOpen(true)}
              onOpenNotice={handleOpenNotice}
              onOpenAbsenceModal={() => setIsAbsenceModalOpen(true)}
              onOpenCertificates={() => setIsCertificatesOpen(true)}
              onOpenParentPortal={() => setIsParentPortalOpen(true)}
            />
          )}

          {activeTab === 'notas' && (
            <GradesTab
              grades={grades}
              student={currentStudent}
            />
          )}

          {activeTab === 'asistencia' && (
            <AttendanceTab
              absences={absences}
              student={currentStudent}
              onAddAbsenceJustification={handleAddAbsenceJustification}
              isModalOpen={isAbsenceModalOpen}
              onCloseModal={() => setIsAbsenceModalOpen(false)}
            />
          )}

          {activeTab === 'horario' && (
            <ScheduleTab
              schedule={WEEKLY_SCHEDULE}
              student={currentStudent}
            />
          )}

          {activeTab === 'tareas' && (
            <AssignmentsTab
              assignments={assignments}
              student={currentStudent}
              onSubmitAssignment={handleSubmitAssignment}
            />
          )}

          {activeTab === 'conducta' && (
            <ConductTab
              student={currentStudent}
              records={conductRecords}
              onAddAppeal={handleAddAppeal}
            />
          )}

          {activeTab === 'calendario' && (
            <CalendarTab
              events={calendarEvents}
            />
          )}

          {activeTab === 'mas' && (
            <MoreServicesTab
              currentStudent={currentStudent}
              onSelectStudent={setCurrentStudent}
              onOpenCard={() => setIsCardOpen(true)}
              onOpenCertificates={() => setIsCertificatesOpen(true)}
            />
          )}
        </main>

        {/* Bottom Nav Bar */}
        <BottomNav
          activeTab={activeTab}
          onTabChange={(tab) => setActiveTab(tab)}
          onOpenCard={() => setIsCardOpen(true)}
        />

        {/* Phone Frame Home Indicator Bar */}
        {isPhoneFrame && (
          <div className="w-full bg-white dark:bg-slate-900 pb-2 pt-1 flex justify-center border-t border-slate-100 dark:border-slate-800">
            <div className="w-32 h-1 bg-slate-300 dark:bg-slate-700 rounded-full" />
          </div>
        )}
      </div>

      {/* MODALS */}
      {/* 1. Carné Estudiantil Digital Modal */}
      <DigitalCardModal
        student={currentStudent}
        isOpen={isCardOpen}
        onClose={() => setIsCardOpen(false)}
      />

      {/* 2. Notifications & Circulars Modal */}
      <NotificationsModal
        isOpen={isNotificationsOpen}
        onClose={() => setIsNotificationsOpen(false)}
        notices={notices}
        onSelectNotice={handleOpenNotice}
        onMarkAllAsRead={handleMarkAllNoticesAsRead}
      />

      {/* 3. Circular Detail Modal */}
      <NoticeDetailModal
        notice={selectedNotice}
        onClose={() => setSelectedNotice(null)}
      />

      {/* 4. Teacher Roster & Attendance Input Modal */}
      <TeacherViewModal
        isOpen={isTeacherModalOpen}
        onClose={() => setIsTeacherModalOpen(false)}
      />

      {/* 5. Official Certificates & Letters Modal */}
      <CertificatesModal
        student={currentStudent}
        isOpen={isCertificatesOpen}
        onClose={() => setIsCertificatesOpen(false)}
      />

      {/* 6. Simulated Biometric Authentication Overlay (FaceID/Fingerprint/PIN) */}
      <BiometricOverlay
        student={currentStudent}
        isOpen={isBiometricLocked}
        onAuthenticated={() => setIsBiometricLocked(false)}
      />

      {/* 7. Comprehensive Parental Monitoring Portal Modal */}
      <ParentPortalModal
        isOpen={isParentPortalOpen}
        onClose={() => setIsParentPortalOpen(false)}
        activeStudent={currentStudent}
        onSelectStudent={setCurrentStudent}
        onOpenCard={() => setIsCardOpen(true)}
        onOpenAbsenceModal={() => setIsAbsenceModalOpen(true)}
      />
    </div>
  );
}
