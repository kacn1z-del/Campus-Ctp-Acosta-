export type UserRole = 'student' | 'parent' | 'teacher';

export type AcademicPeriod = 'I Periodo' | 'II Periodo' | 'Anual';

export type SubjectCategory = 'tecnica' | 'academica';

export interface RubricItem {
  id: string;
  name: string; // e.g., "Trabajo Cotidiano", "Tareas", "Prueba Parcial 1", "Asistencia", "Proyecto Técnico"
  percentageMax: number;
  scoreObtained: number;
  comments?: string;
}

export interface SubjectGrade {
  id: string;
  name: string;
  code: string;
  category: SubjectCategory;
  subarea?: string;
  teacher: string;
  teacherEmail: string;
  classroom: string;
  period1: number;
  period2: number;
  currentAverage: number;
  rubrics: RubricItem[];
  absencesCount: number;
  status: 'Aprobado' | 'En Riesgo' | 'Reprobado';
}

export interface AbsenceRecord {
  id: string;
  date: string; // YYYY-MM-DD
  subjectName: string;
  lessonsCount: number;
  lessonPeriod: string; // e.g. "Lección 3 y 4 (8:30 - 9:50 am)"
  type: 'Injustificada' | 'Justificada' | 'Tardía' | 'Fuga';
  justificationStatus?: 'Pendiente' | 'Aprobada' | 'Rechazada' | 'Sin justificar';
  justificationReason?: string;
  justificationDate?: string;
  evidenceUrl?: string;
}

export interface ScheduleLesson {
  id: string;
  periodNumber: number;
  startTime: string;
  endTime: string;
  subjectName: string;
  subjectCode: string;
  teacher: string;
  room: string;
  isSpecialty: boolean;
  day: 'Lunes' | 'Martes' | 'Miércoles' | 'Jueves' | 'Viernes';
}

export interface InstitutionalNotice {
  id: string;
  title: string;
  sender: string; // e.g., "Dirección General", "Dpto. de Orientación", "Comité de Comedor"
  date: string;
  preview: string;
  fullContent: string;
  priority: 'Urgente' | 'Informativo' | 'Académico';
  read: boolean;
  category: string;
}

export interface StudentProfile {
  id: string;
  fullName: string;
  firstName: string;
  idNumber: string; // Cédula
  institutionalId: string; // Carné CTP
  specialty: string;
  section: string;
  gradeLevel: string; // e.g., "11° Año Técnico"
  avatarUrl: string;
  parentName: string;
  parentPhone: string;
  bloodType: string;
  emergencyContact: string;
  attendanceRate: number;
  tardiesCount: number;
  justifiedCount: number;
  unjustifiedCount: number;
  academicAverage: number;
  conductScore: number; // Conducta MEP (100 base)
  status: 'Activo' | 'Egresado';
  transportRoute?: string;
  diningScholarship: boolean;
  insPolicyNumber: string;
  allergies: string;
  clinicEbais: string;
}

export interface DiningMenuDay {
  day: string;
  mainDish: string;
  sides: string;
  salad: string;
  drink: string;
  dessert: string;
  caloriesApprox: number;
}

export interface TransportRoute {
  id: string;
  name: string;
  routeCode: string;
  driver: string;
  phone: string;
  capacity: number;
  morningDeparture: string;
  afternoonReturn: string;
  stops: string[];
}

export interface TechnicalInternship {
  company: string;
  tutor: string;
  hoursCompleted: number;
  hoursRequired: number; // usually 320 for Costa Rican CTPs
  status: 'En curso' | 'Finalizado' | 'Pendiente';
  latestLogDate: string;
  projectTitle: string;
}

export interface StudentAssignment {
  id: string;
  title: string;
  subjectName: string;
  teacher: string;
  dueDate: string;
  dueTime: string;
  maxScore: number;
  obtainedScore?: number;
  weightPercentage: string;
  status: 'Pendiente' | 'Entregada' | 'Calificada' | 'Atrasada';
  description: string;
  submissionDate?: string;
  submissionLink?: string;
  submissionFileName?: string;
  teacherFeedback?: string;
}

export interface ConductRecord {
  id: string;
  date: string;
  type: 'Falta Leve' | 'Falta Grave' | 'Falta Gravísima' | 'Reconocimiento';
  pointsDeducted: number;
  description: string;
  teacher: string;
  articleMep: string;
  status: 'Aplicada' | 'En Descargos' | 'Reconsiderada';
}

export interface SchoolCalendarEvent {
  id: string;
  date: string; // YYYY-MM-DD
  title: string;
  category: 'Evaluación' | 'Feriado' | 'Feria Técnica' | 'Reunión' | 'Acto Cívico';
  description: string;
  time?: string;
  location?: string;
}

export interface OfficialCertificateRequest {
  id: string;
  type: 'Estudiante Regular (MEP)' | 'Certificación de Notas' | 'Constancia de Conducta' | 'Acreditación Beca Avancemos';
  requestDate: string;
  recipientOrg: string; // e.g. "CCSS - Seguro de Invalidez, Vejez y Muerte", "IMAS / Beca Avancemos", "Trámite General"
  verificationCode: string;
  status: 'Generada' | 'Firmada Digitalmente';
}

export interface ParentRealtimeEvent {
  id: string;
  studentId: string;
  timestamp: string;
  title: string;
  category: 'porton' | 'asistencia' | 'comedor' | 'transporte' | 'academico';
  description: string;
  verifiedBy: string;
  status: 'completado' | 'en_curso' | 'proximo';
}

export interface ParentAuthorization {
  id: string;
  studentId: string;
  title: string;
  date: string;
  description: string;
  location?: string;
  signed: boolean;
  signatureDate?: string;
  signedBy?: string;
}

export interface TeacherOfficeHour {
  id: string;
  teacherName: string;
  subject: string;
  room: string;
  weeklyDay: string;
  timeSlot: string;
}

