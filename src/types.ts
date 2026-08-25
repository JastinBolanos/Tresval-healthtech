export type TriageLevel = 1 | 2 | 3 | 4 | 5;

export interface ClinicCampus {
  id: string;
  name: string;
  tagline: string;
  city: string;
  address: string;
  totalChairs: number;
  occupiedChairs: number;
  totalBeds: number;
  occupiedBeds: number;
  specialties: string[];
  emergencyActive: boolean;
  phone: string;
}

export interface StaffProfile {
  id: string;
  name: string;
  title: string;
  role: 'surgeon' | 'dentist' | 'triage_nurse' | 'billing_admin' | 'medical_director';
  specialty: string;
  licenseNumber: string;
  avatar: string;
  assignedCampusId: string;
  shift: string;
  activeStatus: 'on_duty' | 'in_surgery' | 'on_break' | 'off_duty';
}

export type ToothCondition = 
  | 'healthy'
  | 'caries'
  | 'endodontic'
  | 'implant'
  | 'crown'
  | 'extraction_needed'
  | 'missing'
  | 'sealant'
  | 'veneer'
  | 'calculus'
  | 'fracture';

export interface ToothSurfaceState {
  occlusal?: boolean;
  mesial?: boolean;
  distal?: boolean;
  vestibular?: boolean;
  lingual?: boolean;
}

export interface ToothState {
  toothNumber: number; // 11-48 FDI notation
  name: string;
  quadrant: 1 | 2 | 3 | 4;
  condition: ToothCondition;
  surfaces: ToothSurfaceState;
  notes?: string;
  periodontalDepthMm?: number;
  mobilityGrade?: 0 | 1 | 2 | 3;
  lastTreatedDate?: string;
  plannedProcedure?: string;
}

export type CampusLocation = ClinicCampus;

export interface VitalSigns {
  bp: string; // e.g. "120/80"
  hr: number; // bpm
  rr?: number; // rpm
  spo2: number; // %
  temp: number; // °C
  painScore: number; // 0-10 EVA
  glucose?: number; // mg/dL
  bleedingLevel?: 'none' | 'mild' | 'moderate' | 'severe';
  bleeding?: 'none' | 'mild' | 'moderate' | 'severe';
}

export interface TriageRecord {
  id: string;
  patientId: string;
  timestamp: string;
  level: TriageLevel;
  categoryName?: string;
  colorCode?: string;
  chiefComplaint: string;
  symptoms: string;
  vitals: VitalSigns;
  specialty?: string;
  assignedBox: string;
  assignedDoctorName?: string;
  priorityScore?: number;
  estimatedWaitMinutes: number;
  redFlags: string[];
  aiAnalysis?: {
    suggestedICD10?: string[];
    riskAssessment?: string;
    protocol?: string;
    recommendedLevel?: number;
    confidence?: number;
    clinicalRationale?: string;
  };
  nurseNotes?: string;
  status: 'waiting' | 'in_assessment' | 'in_progress' | 'attended' | 'transferred' | 'discharged';
}

export interface SoapNote {
  subjective: string;
  objective: string;
  assessment: string;
  plan: string;
  prescriptions?: Array<{
    medication: string;
    dosage: string;
    frequency: string;
    duration: string;
    notes?: string;
  }>;
}

export interface TimelineEvent {
  id: string;
  patientId: string;
  date: string;
  type: 
    | 'triage'
    | 'dental_procedure'
    | 'consultation'
    | 'surgery'
    | 'imaging'
    | 'lab'
    | 'prescription'
    | 'billing';
  title: string;
  doctorName: string;
  doctorSpecialty: string;
  campusName: string;
  summary: string;
  details?: string;
  soap?: SoapNote;
  imagingUrl?: string;
  imagingType?: 'xray_panoramic' | 'xray_periapical' | 'cbct_3d' | 'intraoral_scan' | 'mri';
  attachments?: string[];
  badges?: string[];
  cost?: number;
}

export interface PatientInsurance {
  provider: string;
  policyNumber: string;
  planName: string;
  coverageRate: number; // e.g. 0.8 for 80%
  deductible: number;
  isVerified: boolean;
  expirationDate: string;
}

export interface Patient {
  id: string;
  mrn: string; // Medical Record Number
  firstName: string;
  lastName: string;
  nationalId: string; // Sensitive
  birthDate: string;
  age: number;
  gender: 'M' | 'F' | 'Other';
  bloodType: 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-';
  phone: string; // Sensitive
  email: string; // Sensitive
  address: string; // Sensitive
  emergencyContact: {
    name: string;
    relation: string;
    phone: string;
  };
  allergies: string[];
  chronicConditions: string[];
  currentMedications: string[];
  insurance: PatientInsurance;
  campusId: string;
  currentStatus: 'triage_queue' | 'in_chair' | 'scheduled' | 'recovery' | 'discharged';
  assignedDoctorId?: string;
  currentTriage?: TriageRecord;
  dentalChart: ToothState[];
  timeline: TimelineEvent[];
}

export interface Appointment {
  id: string;
  patientId: string;
  patientName: string;
  patientMrn: string;
  doctorId: string;
  doctorName: string;
  doctorSpecialty: string;
  campusId: string;
  chairOrRoom: string; // e.g. "Sillón Dental 03", "Quirófano Maxilofacial 01"
  date: string; // YYYY-MM-DD
  startTime: string; // HH:mm
  durationMinutes: number;
  procedureType: string;
  category: 'dental' | 'surgery' | 'triage' | 'consultation' | 'orthodontics' | 'implants';
  status: 'confirmed' | 'waiting' | 'in_chair' | 'completed' | 'no_show' | 'cancelled';
  notes: string;
  estimatedCost: number;
}

export interface TreatmentItem {
  id: string;
  code: string; // CDT or ICD-10
  toothNumber?: number;
  description: string;
  category: 'preventive' | 'restorative' | 'endodontics' | 'periodontics' | 'surgery' | 'prosthetics' | 'orthodontics';
  unitPrice: number;
  quantity: number;
  insuranceDiscount: number;
  status: 'planned' | 'approved' | 'in_progress' | 'completed';
  phase: 'Fase 1: Urgencia & Saneamiento' | 'Fase 2: Restauración & Cirugía' | 'Fase 3: Estética & Mantenimiento';
}

export interface Invoice {
  id: string;
  invoiceNumber: string; // e.g. "FAC-2026-0891"
  patientId: string;
  patientName: string;
  patientNationalId: string;
  patientMrn: string;
  date: string;
  dueDate: string;
  campusName: string;
  items: TreatmentItem[];
  subtotal: number;
  insuranceCoverageAmount: number;
  taxAmount: number;
  total: number;
  paidAmount: number;
  balanceDue: number;
  paymentMethod?: 'credit_card' | 'wire_transfer' | 'cash' | 'insurance_direct' | 'installments';
  status: 'paid' | 'pending' | 'partially_paid' | 'overdue';
  insuranceClaimId?: string;
  fiscalStamp: string;
}
