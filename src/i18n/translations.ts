export type Language = 'es' | 'en';

export interface TranslationsDict {
  [key: string]: {
    es: string;
    en: string;
  };
}

export const translations: TranslationsDict = {
  // Brand & Meta
  'app.name': {
    es: 'Tresval Clinic OS',
    en: 'Tresval Clinic OS',
  },
  'app.tagline': {
    es: 'Natural Tones OS',
    en: 'Natural Tones OS',
  },
  'app.network': {
    es: 'Red Central Activa',
    en: 'Active Central Network',
  },
  'app.encryption': {
    es: 'Encriptación HIPAA/GDPR',
    en: 'HIPAA/GDPR Encryption',
  },

  // Navbar Tabs
  'nav.triage': {
    es: 'Triaje & Urgencias',
    en: 'Triage & Emergency',
  },
  'nav.patients': {
    es: 'Pacientes & Historial',
    en: 'Patients & Records',
  },
  'nav.odontogram': {
    es: 'Odontograma FDI',
    en: 'FDI Dental Chart',
  },
  'nav.schedule': {
    es: 'Citas & Sillones',
    en: 'Appointments & Chairs',
  },
  'nav.billing': {
    es: 'Facturación & Planes',
    en: 'Billing & Plans',
  },

  // Privacy Toggle
  'nav.privacy.hidden': {
    es: 'HIPAA Oculto',
    en: 'HIPAA Hidden',
  },
  'nav.privacy.visible': {
    es: 'Datos Visibles',
    en: 'Visible Data',
  },
  'nav.privacy.title.hidden': {
    es: 'Modo Privacidad HIPAA Activo (Datos Sensibles Ocultos)',
    en: 'HIPAA Privacy Mode Active (Sensitive Data Masked)',
  },
  'nav.privacy.title.visible': {
    es: 'Modo Privacidad Inactivo (Clic para ocultar DNI/Teléfono)',
    en: 'Privacy Mode Inactive (Click to mask ID/Phone)',
  },

  // Language Button
  'nav.lang.toggle': {
    es: 'ES / EN',
    en: 'EN / ES',
  },
  'nav.lang.label': {
    es: 'Español',
    en: 'English',
  },
  'nav.lang.tooltip': {
    es: 'Cambiar idioma a Inglés (EN)',
    en: 'Switch language to Spanish (ES)',
  },

  // AI Copilot
  'nav.copilot': {
    es: 'Copilot IA',
    en: 'AI Copilot',
  },
  'nav.copilot.tooltip': {
    es: 'Abrir Asistente Clínico de IA',
    en: 'Open Clinical AI Copilot',
  },
  'nav.user.tooltip': {
    es: 'Cambiar usuario o volver al inicio',
    en: 'Switch user or return to welcome screen',
  },
  'nav.brand.tooltip': {
    es: 'Volver a la portada de Tresval Clinic',
    en: 'Return to Tresval Clinic welcome portal',
  },

  // Welcome Screen
  'welcome.hero.sub': {
    es: 'Gestión inteligente para clínicas odontológicas y redes hospitalarias de alto rendimiento.',
    en: 'Intelligent management for dental clinics and high-performance hospital networks.',
  },
  'welcome.active_doctor': {
    es: 'Facultativo Activo',
    en: 'Active Practitioner',
  },
  'welcome.tab.doctors': {
    es: 'Médicos',
    en: 'Doctors',
  },
  'welcome.tab.campuses': {
    es: 'Sedes',
    en: 'Campuses',
  },
  'welcome.enter_btn': {
    es: 'Ingresar al Sistema',
    en: 'Enter Clinical OS',
  },
  'welcome.connected_as': {
    es: 'Conectado como',
    en: 'Connected as',
  },
  'welcome.quick.odontogram': {
    es: 'Odontograma',
    en: 'Dental Chart',
  },
  'welcome.quick.patients': {
    es: 'Pacientes',
    en: 'Patients',
  },
  'welcome.quick.billing': {
    es: 'Facturación',
    en: 'Billing',
  },
  'welcome.tag.support': {
    es: 'SOPORTE TÉCNICO',
    en: 'TECH SUPPORT',
  },
  'welcome.tag.manchester': {
    es: 'GUÍA MANCHESTER',
    en: 'MANCHESTER GUIDE',
  },
  'welcome.tag.fdi': {
    es: 'FDI DENTAL',
    en: 'FDI DENTAL',
  },
  'welcome.agenda.title': {
    es: 'Agenda del Día',
    en: 'Daily Schedule',
  },
  'welcome.agenda.date': {
    es: 'Martes, 24 de Octubre',
    en: 'Tuesday, October 24',
  },
  'welcome.agenda.see_all': {
    es: 'Ver agenda completa',
    en: 'View full schedule',
  },
  'welcome.revenue.title': {
    es: 'Facturación Mes',
    en: 'Monthly Billing',
  },
  'welcome.status.title': {
    es: 'Estado Clínico',
    en: 'Clinical Status',
  },
  'welcome.status.occupancy': {
    es: 'Ocupación de Boxes',
    en: 'Box Occupancy',
  },
  'welcome.status.chairs_desc': {
    es: '6 de 8 sillones en procedimiento',
    en: '6 of 8 chairs in procedure',
  },
  'welcome.footer.system': {
    es: 'Tresval Clinic Network • Sistema Clínico Natural Tones',
    en: 'Tresval Clinic Network • Natural Tones Clinical System',
  },

  // Triage Desk View
  'triage.title': {
    es: 'Triaje Clínico & Sala de Urgencias',
    en: 'Clinical Triage & Emergency Room',
  },
  'triage.desc': {
    es: 'Clasificación de agudeza según protocolo Manchester y asignación de boxes en tiempo real.',
    en: 'Acuity classification following Manchester protocol and real-time box assignment.',
  },
  'triage.btn.new': {
    es: 'Nuevo Ingreso a Triaje',
    en: 'New Triage Intake',
  },
  'triage.kpi.waiting': {
    es: 'En Espera',
    en: 'Waiting',
  },
  'triage.kpi.waiting_desc': {
    es: 'En cola de triaje',
    en: 'In triage queue',
  },
  'triage.kpi.l1_l2': {
    es: 'Nivel 1 y 2',
    en: 'Level 1 & 2',
  },
  'triage.kpi.immediate': {
    es: 'Atención inmediata',
    en: 'Immediate care',
  },
  'triage.kpi.l3': {
    es: 'Nivel 3 (Urgencias)',
    en: 'Level 3 (Urgent)',
  },
  'triage.kpi.l3_desc': {
    es: 'Tiempo est. < 20m',
    en: 'Est. time < 20m',
  },
  'triage.kpi.active_boxes': {
    es: 'Boxes Activos',
    en: 'Active Boxes',
  },
  'triage.kpi.free_boxes': {
    es: '3 boxes libres',
    en: '3 free boxes',
  },
  'triage.filter.scale': {
    es: 'Escala:',
    en: 'Scale:',
  },
  'triage.filter.all': {
    es: 'Todos',
    en: 'All',
  },
  'triage.filter.l2': {
    es: 'Nivel 2',
    en: 'Level 2',
  },
  'triage.filter.l3': {
    es: 'Nivel 3',
    en: 'Level 3',
  },
  'triage.filter.l4': {
    es: 'Nivel 4',
    en: 'Level 4',
  },
  'triage.filter.l5': {
    es: 'Nivel 5',
    en: 'Level 5',
  },
  'triage.search.placeholder': {
    es: 'Buscar por paciente o síntoma...',
    en: 'Search by patient or symptom...',
  },
  'triage.empty.title': {
    es: 'No hay pacientes en este filtro de triaje',
    en: 'No patients found under this triage filter',
  },
  'triage.empty.desc': {
    es: 'Todos los pacientes han sido atendidos o asignados a sus respectivos boxes.',
    en: 'All patients have been attended or assigned to their designated boxes.',
  },
  'triage.card.est_wait': {
    es: 'Espera est.:',
    en: 'Est. wait:',
  },
  'triage.card.min': {
    es: 'min',
    en: 'min',
  },
  'triage.card.years': {
    es: 'años',
    en: 'years old',
  },
  'triage.card.gender.female': {
    es: 'Femenino',
    en: 'Female',
  },
  'triage.card.gender.male': {
    es: 'Masculino',
    en: 'Male',
  },
  'triage.card.group': {
    es: 'Grupo',
    en: 'Blood Type',
  },
  'triage.card.dni': {
    es: 'DNI:',
    en: 'ID:',
  },
  'triage.card.phone': {
    es: 'Tel:',
    en: 'Phone:',
  },
  'triage.card.complaint_label': {
    es: 'Motivo de Consulta & Síntomas:',
    en: 'Chief Complaint & Symptoms:',
  },
  'triage.card.allergy': {
    es: 'Alergia:',
    en: 'Allergy:',
  },
  'triage.card.vitals': {
    es: 'Constantes Vitales',
    en: 'Vital Signs',
  },
  'triage.card.monitor_active': {
    es: 'Monitor Activo',
    en: 'Active Monitor',
  },
  'triage.card.bp': {
    es: 'Presión Art.',
    en: 'Blood Pressure',
  },
  'triage.card.hr': {
    es: 'Frec. Cardíaca',
    en: 'Heart Rate',
  },
  'triage.card.bpm': {
    es: 'lpm',
    en: 'bpm',
  },
  'triage.card.temp_spo2': {
    es: 'Temp. / SatO2',
    en: 'Temp / SpO2',
  },
  'triage.card.pain_eva': {
    es: 'Dolor (EVA):',
    en: 'Pain (VAS):',
  },
  'triage.card.ai_diag': {
    es: 'IA Diagnóstica:',
    en: 'AI Diagnostics:',
  },
  'triage.btn.attend_box': {
    es: 'Atender en Box',
    en: 'Admit to Box',
  },
  'triage.btn.odontogram': {
    es: 'Odontograma',
    en: 'Dental Chart',
  },
  'triage.btn.view_dossier': {
    es: 'Ver Historial y Evolución Clínica',
    en: 'View Medical History & Evolution',
  },

  // Patients Directory & Detail
  'patients.title': {
    es: 'Directorio Clínico de Pacientes',
    en: 'Clinical Patient Directory',
  },
  'patients.desc': {
    es: 'Historiales médicos electrónicos, evolución clínica SOAP, odontograma y aseguradoras.',
    en: 'Electronic medical records, SOAP clinical progress notes, dental charting, and insurers.',
  },
  'patients.search': {
    es: 'Buscar paciente por nombre, DNI, MRN...',
    en: 'Search patient by name, ID, MRN...',
  },
  'patients.filter.all_status': {
    es: 'Todos los Estados',
    en: 'All Statuses',
  },
  'patients.filter.in_triage': {
    es: 'En Triaje',
    en: 'In Triage',
  },
  'patients.filter.in_chair': {
    es: 'En Sillón',
    en: 'In Chair',
  },
  'patients.filter.scheduled': {
    es: 'Programado',
    en: 'Scheduled',
  },
  'patients.filter.discharged': {
    es: 'Alta Médica',
    en: 'Discharged',
  },
  'patients.btn.new_patient': {
    es: '+ Registrar Nuevo Paciente',
    en: '+ Register New Patient',
  },
  'patients.col.patient': {
    es: 'Paciente & MRN',
    en: 'Patient & MRN',
  },
  'patients.col.demographics': {
    es: 'Demografía & Contacto',
    en: 'Demographics & Contact',
  },
  'patients.col.alerts': {
    es: 'Alertas & Alergias',
    en: 'Alerts & Allergies',
  },
  'patients.col.insurance': {
    es: 'Aseguradora & Cobertura',
    en: 'Insurance & Coverage',
  },
  'patients.col.status': {
    es: 'Estado Clínico',
    en: 'Clinical Status',
  },
  'patients.col.actions': {
    es: 'Acciones',
    en: 'Actions',
  },
  'patients.action.dossier': {
    es: 'Ver Expediente',
    en: 'View Dossier',
  },
  'patients.action.odontogram': {
    es: 'Odontograma',
    en: 'Dental Chart',
  },

  // Patient Detail View
  'detail.back': {
    es: '← Volver al Directorio de Pacientes',
    en: '← Back to Patients Directory',
  },
  'detail.btn.odontogram': {
    es: 'Odontograma FDI',
    en: 'FDI Dental Chart',
  },
  'detail.btn.appointment': {
    es: 'Agendar Cita',
    en: 'Schedule Appointment',
  },
  'detail.btn.billing': {
    es: 'Facturación & Planes',
    en: 'Billing & Plans',
  },
  'detail.btn.new_soap': {
    es: '+ Nueva Nota SOAP',
    en: '+ New SOAP Note',
  },
  'detail.status.active': {
    es: 'Activo',
    en: 'Active',
  },
  'detail.age': {
    es: 'Edad:',
    en: 'Age:',
  },
  'detail.sex': {
    es: 'Sexo:',
    en: 'Sex:',
  },
  'detail.blood_type': {
    es: 'Grupo Sanguíneo:',
    en: 'Blood Group:',
  },
  'detail.dni': {
    es: 'DNI:',
    en: 'ID:',
  },
  'detail.insurance.verified': {
    es: 'Aseguradora Verificada',
    en: 'Verified Insurance',
  },
  'detail.insurance.active_policy': {
    es: 'Póliza Activa',
    en: 'Active Policy',
  },
  'detail.insurance.policy_no': {
    es: 'Póliza Nº',
    en: 'Policy No.',
  },
  'detail.insurance.coverage': {
    es: 'Cobertura Odonto/Médica',
    en: 'Dental/Medical Coverage',
  },
  'detail.insurance.direct': {
    es: 'directa',
    en: 'direct',
  },
  'detail.emergency_contact': {
    es: 'Contacto Emergencia:',
    en: 'Emergency Contact:',
  },
  'detail.timeline.title': {
    es: 'Línea de Tiempo Médica & Evolución Clínica',
    en: 'Medical Timeline & Clinical Evolution',
  },
  'detail.timeline.all': {
    es: 'Todos',
    en: 'All',
  },
  'detail.timeline.triages': {
    es: 'Triajes',
    en: 'Triages',
  },
  'detail.timeline.surgeries': {
    es: 'Cirugías & Procedimientos',
    en: 'Surgeries & Procedures',
  },
  'detail.timeline.imaging': {
    es: 'Imágenes Radiológicas',
    en: 'Imaging & X-Rays',
  },
  'detail.timeline.prescriptions': {
    es: 'Recetas',
    en: 'Prescriptions',
  },
  'detail.timeline.billing': {
    es: 'Facturas',
    en: 'Invoices',
  },
  'detail.soap.subjective': {
    es: 'Subjetivo (S):',
    en: 'Subjective (S):',
  },
  'detail.soap.objective': {
    es: 'Objetivo (O):',
    en: 'Objective (O):',
  },
  'detail.soap.assessment': {
    es: 'Evaluación / Diagnóstico (A):',
    en: 'Assessment / Diagnosis (A):',
  },
  'detail.soap.plan': {
    es: 'Plan Terapéutico (P):',
    en: 'Treatment Plan (P):',
  },
  'detail.imaging.view_btn': {
    es: 'Inspeccionar Estudio Radiológico Digital',
    en: 'Inspect Digital Imaging Study',
  },

  // Odontogram View
  'odontogram.title': {
    es: 'Odontograma FDI 32 Piezas & Plan de Tratamiento',
    en: 'FDI 32-Tooth Odontogram & Treatment Plan',
  },
  'odontogram.desc': {
    es: 'Cartografía dental interactiva, marcado de superficies y presupuesto clínico automatizado.',
    en: 'Interactive dental charting, surface marking, and automated treatment estimates.',
  },
  'odontogram.arch.both': {
    es: 'Arcada Completa',
    en: 'Full Mouth',
  },
  'odontogram.arch.upper': {
    es: 'Arcada Superior (Maxilar)',
    en: 'Upper Arch (Maxillary)',
  },
  'odontogram.arch.lower': {
    es: 'Arcada Inferior (Mandibular)',
    en: 'Lower Arch (Mandibular)',
  },
  'odontogram.tools.title': {
    es: 'Herramientas de Diagnóstico Dental',
    en: 'Dental Diagnostic Tools',
  },
  'odontogram.quad.1': {
    es: 'Cuadrante 1 (Superior Derecho)',
    en: 'Quadrant 1 (Upper Right)',
  },
  'odontogram.quad.2': {
    es: 'Cuadrante 2 (Superior Izquierdo)',
    en: 'Quadrant 2 (Upper Left)',
  },
  'odontogram.quad.3': {
    es: 'Cuadrante 3 (Inferior Izquierdo)',
    en: 'Quadrant 3 (Lower Left)',
  },
  'odontogram.quad.4': {
    es: 'Cuadrante 4 (Inferior Derecho)',
    en: 'Quadrant 4 (Lower Right)',
  },
  'odontogram.inspector.title': {
    es: 'Explorador de Pieza',
    en: 'Tooth Explorer',
  },
  'odontogram.inspector.cond_label': {
    es: 'Condición Diagnosticada:',
    en: 'Diagnosed Condition:',
  },
  'odontogram.inspector.surfaces_label': {
    es: 'Superficies Afectadas (Haz clic para alternar):',
    en: 'Affected Surfaces (Click to toggle):',
  },
  'odontogram.surf.occlusal': {
    es: 'Oclusal (O)',
    en: 'Occlusal (O)',
  },
  'odontogram.surf.mesial': {
    es: 'Mesial (M)',
    en: 'Mesial (M)',
  },
  'odontogram.surf.distal': {
    es: 'Distal (D)',
    en: 'Distal (D)',
  },
  'odontogram.surf.vestibular': {
    es: 'Vestibular (V)',
    en: 'Vestibular (V)',
  },
  'odontogram.surf.lingual': {
    es: 'Lingual/Palatino (L)',
    en: 'Lingual/Palatal (L)',
  },
  'odontogram.probing.depth': {
    es: 'Sondaje Periodontal (mm):',
    en: 'Periodontal Probing (mm):',
  },
  'odontogram.probing.mobility': {
    es: 'Grado de Movilidad:',
    en: 'Mobility Grade:',
  },
  'odontogram.btn.add_plan': {
    es: 'Agregar al Plan de Tratamiento',
    en: 'Add to Treatment Plan',
  },
  'odontogram.toast.added': {
    es: 'Tratamiento agregado al plan del paciente',
    en: 'Treatment added to patient plan',
  },
  'odontogram.summary.title': {
    es: 'Plan de Tratamiento Acumulado',
    en: 'Accumulated Treatment Plan',
  },
  'odontogram.summary.total': {
    es: 'Total Estimado:',
    en: 'Estimated Total:',
  },
  'odontogram.summary.patient_copay': {
    es: 'Copago Paciente:',
    en: 'Patient Copay:',
  },
  'odontogram.btn.go_billing': {
    es: 'Emitir Factura / Ver Presupuesto',
    en: 'Issue Invoice / View Estimate',
  },

  // Conditions
  'cond.healthy': {
    es: 'Sano / Normal',
    en: 'Healthy / Normal',
  },
  'cond.caries': {
    es: 'Caries Activa',
    en: 'Active Cavity',
  },
  'cond.endodontic': {
    es: 'Endodoncia / Conducto',
    en: 'Root Canal / Endodontic',
  },
  'cond.implant': {
    es: 'Implante Osteointegrado',
    en: 'Dental Implant',
  },
  'cond.crown': {
    es: 'Corona / Zirconio',
    en: 'Crown / Zirconia',
  },
  'cond.extraction_needed': {
    es: 'Exodoncia Requerida',
    en: 'Extraction Needed',
  },
  'cond.missing': {
    es: 'Diente Ausente',
    en: 'Missing Tooth',
  },
  'cond.veneer': {
    es: 'Carilla Estética E.max',
    en: 'E.max Cosmetic Veneer',
  },
  'cond.sealant': {
    es: 'Sellador de Fisuras',
    en: 'Pit & Fissure Sealant',
  },

  // Appointments Schedule View
  'schedule.title': {
    es: 'Calendario de Citas & Ocupación de Sillones',
    en: 'Appointment Calendar & Chair Occupancy',
  },
  'schedule.desc': {
    es: 'Programación inteligente de procedimientos, control de tiempos en sillón y gestión de recursos clínicos.',
    en: 'Intelligent procedure scheduling, chair time management, and clinical resource tracking.',
  },
  'schedule.btn.new': {
    es: '+ Programar Nueva Cita',
    en: '+ Schedule New Appointment',
  },
  'schedule.filter.all_doctors': {
    es: 'Todos los Doctores',
    en: 'All Doctors',
  },
  'schedule.filter.all_categories': {
    es: 'Todas las Especialidades',
    en: 'All Specialties',
  },
  'schedule.cat.surgery': {
    es: 'Cirugía Maxilofacial',
    en: 'Maxillofacial Surgery',
  },
  'schedule.cat.dental': {
    es: 'Odontología General',
    en: 'General Dentistry',
  },
  'schedule.cat.implants': {
    es: 'Implantología',
    en: 'Implantology',
  },
  'schedule.cat.orthodontics': {
    es: 'Ortodoncia',
    en: 'Orthodontics',
  },
  'schedule.status.confirmed': {
    es: 'Confirmada',
    en: 'Confirmed',
  },
  'schedule.status.in_chair': {
    es: 'En Sillón Ahora',
    en: 'In Chair Now',
  },
  'schedule.status.waiting': {
    es: 'En Sala de Espera',
    en: 'In Waiting Room',
  },
  'schedule.status.completed': {
    es: 'Finalizado',
    en: 'Completed',
  },
  'schedule.status.change_label': {
    es: 'Cambiar Estado:',
    en: 'Change Status:',
  },
  'schedule.btn.view_patient': {
    es: 'Ver Ficha del Paciente',
    en: 'View Patient Record',
  },
  'schedule.empty.title': {
    es: 'No hay citas programadas para este día o filtro',
    en: 'No appointments scheduled for this day or filter',
  },
  'schedule.empty.desc': {
    es: 'Utiliza el botón superior para agendar un nuevo procedimiento o cambia la fecha seleccionada.',
    en: 'Use the button above to schedule a new procedure or select a different date.',
  },

  // Billing & Treatments View
  'billing.title': {
    es: 'Facturación Médica, Coberturas & Presupuestos',
    en: 'Medical Billing, Insurance & Invoicing',
  },
  'billing.desc': {
    es: 'Planes de tratamiento por fases, liquidación con aseguradoras y emisión de facturas oficiales.',
    en: 'Phased treatment plans, insurance claim settlements, and official invoice issuance.',
  },
  'billing.tab.invoices': {
    es: 'Libro de Facturas',
    en: 'Invoice Ledger',
  },
  'billing.tab.plans': {
    es: 'Planes & Presupuestos',
    en: 'Treatment Plans & Estimates',
  },
  'billing.kpi.total_billed': {
    es: 'Facturación Total',
    en: 'Total Invoiced',
  },
  'billing.kpi.total_paid': {
    es: 'Cobrado / Liquidado',
    en: 'Collected / Settled',
  },
  'billing.kpi.insurance_subsidy': {
    es: 'Subsidio Aseguradoras',
    en: 'Insurance Coverage',
  },
  'billing.kpi.pending_balance': {
    es: 'Saldo Pendiente',
    en: 'Balance Due',
  },
  'billing.filter.all': {
    es: 'Todas',
    en: 'All',
  },
  'billing.filter.paid': {
    es: 'Pagadas',
    en: 'Paid',
  },
  'billing.filter.pending': {
    es: 'Pendientes',
    en: 'Pending',
  },
  'billing.filter.partially_paid': {
    es: 'Parciales',
    en: 'Partial',
  },
  'billing.status.paid': {
    es: 'Pagada',
    en: 'Paid',
  },
  'billing.status.pending': {
    es: 'Pendiente',
    en: 'Pending',
  },
  'billing.status.partially_paid': {
    es: 'Pago Parcial',
    en: 'Partial Payment',
  },
  'billing.col.invoice_no': {
    es: 'Nº Factura',
    en: 'Invoice #',
  },
  'billing.col.patient': {
    es: 'Paciente',
    en: 'Patient',
  },
  'billing.col.date': {
    es: 'Fecha Emisión',
    en: 'Issue Date',
  },
  'billing.col.subtotal': {
    es: 'Subtotal Base',
    en: 'Base Subtotal',
  },
  'billing.col.coverage': {
    es: 'Cobertura Seguro',
    en: 'Insurance Coverage',
  },
  'billing.col.patient_share': {
    es: 'Total Paciente',
    en: 'Patient Total',
  },
  'billing.col.balance': {
    es: 'Saldo Deudor',
    en: 'Balance Due',
  },
  'billing.col.status': {
    es: 'Estado',
    en: 'Status',
  },
  'billing.payment.title': {
    es: 'Registrar Cobro / Abono',
    en: 'Record Payment / Settlement',
  },
  'billing.payment.amount': {
    es: 'Importe a Pagar (€):',
    en: 'Amount to Pay (€):',
  },
  'billing.payment.method': {
    es: 'Método de Pago:',
    en: 'Payment Method:',
  },
  'billing.payment.credit_card': {
    es: 'Tarjeta de Crédito / Débito',
    en: 'Credit / Debit Card',
  },
  'billing.payment.wire': {
    es: 'Transferencia Bancaria',
    en: 'Bank Wire Transfer',
  },
  'billing.payment.cash': {
    es: 'Efectivo en Caja',
    en: 'Cash at Clinic',
  },
  'billing.payment.insurance': {
    es: 'Liquidación Directa Aseguradora',
    en: 'Direct Insurance Settlement',
  },
  'billing.payment.installments': {
    es: 'Financiación en Cuotas',
    en: 'Installment Financing',
  },
  'billing.payment.btn_confirm': {
    es: 'Confirmar Cobro',
    en: 'Confirm Payment',
  },
  'billing.ai.btn': {
    es: 'Explicador IA para el Paciente',
    en: 'AI Patient Explainer',
  },
  'billing.ai.generating': {
    es: 'Generando explicación clara para el paciente...',
    en: 'Generating clear patient explanation...',
  },
  'billing.btn.print': {
    es: 'Imprimir Factura Oficial',
    en: 'Print Official Invoice',
  },

  // Modals
  'modal.triage.title': {
    es: 'Nuevo Ingreso a Triaje Manchester',
    en: 'New Manchester Triage Intake',
  },
  'modal.triage.subtitle': {
    es: 'Evaluación rápida de constantes, agudeza y asignación inmediata de box',
    en: 'Rapid assessment of vitals, acuity, and immediate box assignment',
  },
  'modal.triage.patient': {
    es: 'Paciente Seleccionado:',
    en: 'Selected Patient:',
  },
  'modal.triage.complaint': {
    es: 'Motivo Principal de Consulta:',
    en: 'Chief Medical Complaint:',
  },
  'modal.triage.symptoms': {
    es: 'Síntomas Clínicos y Hallazgos:',
    en: 'Clinical Symptoms & Findings:',
  },
  'modal.triage.vitals_header': {
    es: 'Signos Vitales del Paciente',
    en: 'Patient Vital Signs',
  },
  'modal.triage.pain_score': {
    es: 'Escala de Dolor EVA (0-10):',
    en: 'VAS Pain Scale (0-10):',
  },
  'modal.triage.bleeding': {
    es: 'Nivel de Hemorragia:',
    en: 'Bleeding Severity:',
  },
  'modal.triage.bleeding.none': {
    es: 'Ninguna',
    en: 'None',
  },
  'modal.triage.bleeding.mild': {
    es: 'Leve',
    en: 'Mild',
  },
  'modal.triage.bleeding.moderate': {
    es: 'Moderada',
    en: 'Moderate',
  },
  'modal.triage.bleeding.severe': {
    es: 'Severa / Activa',
    en: 'Severe / Active',
  },
  'modal.triage.ai_btn': {
    es: 'Clasificar con IA Clínica',
    en: 'Classify with Clinical AI',
  },
  'modal.triage.ai_analyzing': {
    es: 'Analizando protocolo clínico...',
    en: 'Analyzing clinical protocol...',
  },
  'modal.triage.level_label': {
    es: 'Nivel Manchester Sugerido:',
    en: 'Suggested Manchester Level:',
  },
  'modal.triage.box_label': {
    es: 'Box / Quirófano Asignado:',
    en: 'Assigned Box / Operating Room:',
  },
  'modal.triage.submit': {
    es: 'Ingresar Paciente a Triaje',
    en: 'Admit Patient to Triage',
  },
  'modal.triage.cancel': {
    es: 'Cancelar',
    en: 'Cancel',
  },

  // Appointment Modal
  'modal.appt.title': {
    es: 'Programar Cita Médica / Quirúrgica',
    en: 'Schedule Medical / Surgical Appointment',
  },
  'modal.appt.subtitle': {
    es: 'Asignación de sillón, profesional y tiempo estimado',
    en: 'Chair assignment, healthcare professional, and estimated duration',
  },
  'modal.appt.patient': {
    es: 'Paciente:',
    en: 'Patient:',
  },
  'modal.appt.doctor': {
    es: 'Facultativo / Doctor:',
    en: 'Practitioner / Doctor:',
  },
  'modal.appt.chair': {
    es: 'Sillón / Box Asignado:',
    en: 'Assigned Chair / Box:',
  },
  'modal.appt.date': {
    es: 'Fecha:',
    en: 'Date:',
  },
  'modal.appt.time': {
    es: 'Hora de Inicio:',
    en: 'Start Time:',
  },
  'modal.appt.duration': {
    es: 'Duración (minutos):',
    en: 'Duration (minutes):',
  },
  'modal.appt.procedure': {
    es: 'Tipo de Procedimiento:',
    en: 'Procedure Type:',
  },
  'modal.appt.category': {
    es: 'Categoría Clínica:',
    en: 'Clinical Category:',
  },
  'modal.appt.notes': {
    es: 'Notas Previas / Indicaciones:',
    en: 'Pre-appointment Notes & Instructions:',
  },
  'modal.appt.submit': {
    es: 'Confirmar y Guardar Cita',
    en: 'Confirm & Save Appointment',
  },

  // SOAP Note Modal
  'modal.soap.title': {
    es: 'Nueva Nota Clínica SOAP & Evolución',
    en: 'New SOAP Clinical Evolution Note',
  },
  'modal.soap.subtitle': {
    es: 'Registro digital estructurado bajo estándar HL7/FHIR',
    en: 'Structured digital medical record under HL7/FHIR standard',
  },
  'modal.soap.note_title': {
    es: 'Título de la Nota:',
    en: 'Note Title:',
  },
  'modal.soap.event_type': {
    es: 'Tipo de Evento Clínico:',
    en: 'Clinical Event Type:',
  },
  'modal.soap.type.consultation': {
    es: 'Consulta / Control Evolutivo',
    en: 'Consultation / Follow-up',
  },
  'modal.soap.type.dental': {
    es: 'Procedimiento Odontológico',
    en: 'Dental Procedure',
  },
  'modal.soap.type.surgery': {
    es: 'Cirugía Oral / Maxilofacial',
    en: 'Oral / Maxillofacial Surgery',
  },
  'modal.soap.type.imaging': {
    es: 'Estudio Radiológico / CBCT',
    en: 'Radiology / CBCT Scan',
  },
  'modal.soap.type.prescription': {
    es: 'Pauta Farmacológica',
    en: 'Prescription & Medication',
  },
  'modal.soap.dictate_label': {
    es: 'Dictado o Anotaciones Rápidas del Doctor:',
    en: 'Doctor Quick Dictation / Rough Notes:',
  },
  'modal.soap.dictate_placeholder': {
    es: 'Escribe o dicta notas rápidas del paciente para que la IA estructure el SOAP...',
    en: 'Type or dictate rough patient findings for AI to structure into SOAP format...',
  },
  'modal.soap.ai_draft_btn': {
    es: 'Estructurar SOAP con IA',
    en: 'Structure SOAP with AI',
  },
  'modal.soap.ai_drafting': {
    es: 'Estructurando nota clínica...',
    en: 'Structuring clinical note...',
  },
  'modal.soap.save': {
    es: 'Firmar y Guardar en Historial',
    en: 'Sign & Save to Medical Record',
  },

  // AI Copilot Drawer
  'copilot.title': {
    es: 'Tresval Clinic IA Copilot',
    en: 'Tresval Clinic AI Copilot',
  },
  'copilot.subtitle': {
    es: 'Asistente clínico y farmacológico en tiempo real',
    en: 'Real-time clinical and pharmacological assistant',
  },
  'copilot.welcome_text': {
    es: 'Hola, soy el Asistente Clínico IA de Tresval Clinic OS. Estoy calibrado para soporte en triaje, protocolos de cirugía maxilofacial, odontología restauradora e interacciones medicamentosas.',
    en: 'Hello, I am the Tresval Clinic OS Clinical AI Assistant. I am calibrated for triage support, maxillofacial surgery protocols, restorative dentistry, and drug-drug interactions.',
  },
  'copilot.patient_context': {
    es: 'Paciente en contexto:',
    en: 'Patient in context:',
  },
  'copilot.no_allergies': {
    es: 'Sin alergias declaradas',
    en: 'No declared allergies',
  },
  'copilot.prompt_1': {
    es: 'Profilaxis antibiótica en implantes para alérgicos a Penicilina',
    en: 'Antibiotic prophylaxis for implants in penicillin-allergic patients',
  },
  'copilot.prompt_2': {
    es: 'Dosis máxima de Articaína 4% con epinefrina 1:100.000',
    en: 'Maximum safe dose of 4% Articaine with 1:100,000 epinephrine',
  },
  'copilot.prompt_3': {
    es: 'Manejo de flemón vestibular con trismus moderado',
    en: 'Management of vestibular abscess with moderate trismus',
  },
  'copilot.prompt_4': {
    es: 'Guía de consentimiento informado para exodoncia quirúrgica',
    en: 'Informed consent checklist for surgical wisdom tooth extraction',
  },
  'copilot.input_placeholder': {
    es: 'Escribe una consulta clínica, posología o protocolo...',
    en: 'Ask a clinical question, dosage or protocol...',
  },
  'copilot.btn_send': {
    es: 'Enviar',
    en: 'Send',
  },
};
