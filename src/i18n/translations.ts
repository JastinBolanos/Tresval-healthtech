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
    es: 'Registrar Nuevo Paciente',
    en: 'Register New Patient',
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
    es: 'Nueva Nota SOAP',
    en: 'New SOAP Note',
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
  'odontogram.patient_select': {
    es: 'Paciente Seleccionado',
    en: 'Selected Patient',
  },
  'odontogram.arch.title': {
    es: 'Arcada Dental FDI',
    en: 'FDI Dental Arch',
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
  'odontogram.midline': {
    es: 'Línea Media',
    en: 'Midline',
  },
  'odontogram.tools.title': {
    es: 'Herramientas de Diagnóstico Dental',
    en: 'Dental Diagnostic Tools',
  },
  'odontogram.quad.1': {
    es: 'Cuadrante 1 (Sup. Der.)',
    en: 'Quadrant 1 (Upper Right)',
  },
  'odontogram.quad.2': {
    es: 'Cuadrante 2 (Sup. Izq.)',
    en: 'Quadrant 2 (Upper Left)',
  },
  'odontogram.quad.3': {
    es: 'Cuadrante 3 (Inf. Izq.)',
    en: 'Quadrant 3 (Lower Left)',
  },
  'odontogram.quad.4': {
    es: 'Cuadrante 4 (Inf. Der.)',
    en: 'Quadrant 4 (Lower Right)',
  },
  'odontogram.plan_in_progress': {
    es: 'Plan de Tratamiento en Curso',
    en: 'Treatment Plan in Progress',
  },
  'odontogram.findings_count': {
    es: 'hallazgos clínicos diagnosticados',
    en: 'diagnosed clinical findings',
  },
  'odontogram.view_billing': {
    es: 'Ver Presupuesto y Facturación',
    en: 'View Estimate & Billing',
  },
  'odontogram.diagnosis_label': {
    es: 'Diagnóstico Dental',
    en: 'Dental Diagnosis',
  },
  'odontogram.surfaces_label': {
    es: 'Superficies Afectadas',
    en: 'Affected Surfaces',
  },
  'odontogram.click_toggle': {
    es: 'Clic para alternar',
    en: 'Click to toggle',
  },
  'odontogram.surf.m': {
    es: 'Mesial',
    en: 'Mesial',
  },
  'odontogram.surf.o': {
    es: 'Oclusal',
    en: 'Occlusal',
  },
  'odontogram.surf.d': {
    es: 'Distal',
    en: 'Distal',
  },
  'odontogram.surf.v': {
    es: 'Vestib.',
    en: 'Buccal',
  },
  'odontogram.surf.l': {
    es: 'Lingual',
    en: 'Lingual',
  },
  'odontogram.perio_probing': {
    es: 'Sondaje Periodontal',
    en: 'Periodontal Probing',
  },
  'odontogram.notes_label': {
    es: 'Notas Clínicas de la Pieza',
    en: 'Tooth Clinical Notes',
  },
  'odontogram.notes_placeholder': {
    es: 'Escribe hallazgos adicionales, movilidad o pronóstico...',
    en: 'Enter additional findings, mobility, or prognosis...',
  },
  'odontogram.btn.add_to_plan': {
    es: 'Agregar al Plan de Tratamiento',
    en: 'Add to Treatment Plan',
  },
  'odontogram.auto_calc_hint': {
    es: 'Cálculo automático de copagos y coberturas según aseguradora',
    en: 'Automatic calculation of copays and insurance coverage',
  },
  'odontogram.toast.view_plan': {
    es: 'Ver Plan',
    en: 'View Plan',
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

  // Odontogram Conditions (both namespaces supported)
  'odontogram.cond.healthy': {
    es: 'Sano / Normal',
    en: 'Sound / Healthy',
  },
  'odontogram.cond.caries': {
    es: 'Caries Activa',
    en: 'Active Cavity',
  },
  'odontogram.cond.endodontic': {
    es: 'Endodoncia / Conducto',
    en: 'Root Canal',
  },
  'odontogram.cond.implant': {
    es: 'Implante Dental',
    en: 'Dental Implant',
  },
  'odontogram.cond.crown': {
    es: 'Corona / Zirconio',
    en: 'Crown / Zirconia',
  },
  'odontogram.cond.extraction': {
    es: 'Exodoncia Requerida',
    en: 'Extraction Needed',
  },
  'odontogram.cond.missing': {
    es: 'Diente Ausente',
    en: 'Missing Tooth',
  },
  'odontogram.cond.veneer': {
    es: 'Carilla E.max',
    en: 'E.max Veneer',
  },
  'odontogram.cond.sealant': {
    es: 'Sellador Dental',
    en: 'Pit Sealant',
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

  // Appointments Schedule / Calendar View
  'schedule.title': {
    es: 'Calendario de Citas & Ocupación de Sillones',
    en: 'Appointment Calendar & Chair Occupancy',
  },
  'schedule.desc': {
    es: 'Programación inteligente de procedimientos, control de tiempos en sillón y gestión de recursos clínicos.',
    en: 'Intelligent procedure scheduling, chair time management, and clinical resource tracking.',
  },
  'schedule.btn.new': {
    es: 'Programar Nueva Cita',
    en: 'Schedule New Appointment',
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

  // Calendar View aliases
  'calendar.title': {
    es: 'Agenda Quirúrgica y Consultas Clínicas',
    en: 'Surgical Calendar & Clinical Appointments',
  },
  'calendar.desc': {
    es: 'Gestión de sillones dentales, quirófanos y programación de facultativos.',
    en: 'Management of dental chairs, operating rooms, and doctor scheduling.',
  },
  'calendar.btn.new_appointment': {
    es: 'Nueva Cita Médica',
    en: 'New Medical Appointment',
  },
  'calendar.today': {
    es: 'Hoy',
    en: 'Today',
  },
  'calendar.doctor_filter': {
    es: 'Filtrar por Facultativo:',
    en: 'Filter by Practitioner:',
  },
  'calendar.all_staff': {
    es: 'Todo el Equipo Médico',
    en: 'All Medical Staff',
  },
  'calendar.specialty_filter': {
    es: 'Especialidad:',
    en: 'Specialty:',
  },
  'calendar.all_specialties': {
    es: 'Todas las Especialidades',
    en: 'All Specialties',
  },
  'calendar.agenda_title': {
    es: 'Citas Programadas',
    en: 'Scheduled Appointments',
  },
  'calendar.procedures_count': {
    es: 'actos médicos programados',
    en: 'scheduled medical procedures',
  },
  'calendar.standard_intervals': {
    es: 'Intervalos estándar de 15/30 min',
    en: 'Standard 15/30 min intervals',
  },
  'calendar.no_appointments': {
    es: 'Sin citas programadas',
    en: 'No appointments scheduled',
  },
  'calendar.no_appointments_desc': {
    es: 'No hay procedimientos agendados para este día con los filtros seleccionados.',
    en: 'No procedures scheduled for this day with the selected filters.',
  },
  'calendar.card.patient': {
    es: 'Paciente:',
    en: 'Patient:',
  },
  'calendar.card.doctor': {
    es: 'Doctor / Cirujano:',
    en: 'Doctor / Surgeon:',
  },
  'calendar.card.location': {
    es: 'Ubicación / Box:',
    en: 'Location / Chair:',
  },
  'calendar.card.notes': {
    es: 'Indicaciones:',
    en: 'Instructions:',
  },
  'calendar.btn.mark_waiting': {
    es: 'Marcar en Espera',
    en: 'Mark Waiting',
  },
  'calendar.btn.move_chair': {
    es: 'Pasar a Sillón',
    en: 'Move to Chair',
  },
  'calendar.btn.finish_treatment': {
    es: 'Finalizar Atención',
    en: 'Complete Care',
  },
  'calendar.status.in_chair': {
    es: 'En Sillón',
    en: 'In Chair',
  },
  'calendar.status.waiting': {
    es: 'En Espera',
    en: 'Waiting',
  },
  'calendar.status.completed': {
    es: 'Completado',
    en: 'Completed',
  },
  'calendar.status.confirmed': {
    es: 'Confirmado',
    en: 'Confirmed',
  },
  'calendar.status.finished_label': {
    es: 'Atendido',
    en: 'Completed',
  },

  // Patients View & Patient Details
  'patient.back': {
    es: '← Volver al Directorio de Pacientes',
    en: '← Back to Patients Directory',
  },
  'patient.btn.odontogram': {
    es: 'Odontograma FDI',
    en: 'FDI Dental Chart',
  },
  'patient.btn.schedule': {
    es: 'Agendar Cita',
    en: 'Schedule Appointment',
  },
  'patient.btn.billing': {
    es: 'Facturación & Planes',
    en: 'Billing & Plans',
  },
  'patient.btn.new_soap': {
    es: 'Nueva Nota SOAP',
    en: 'New SOAP Note',
  },
  'patient.detail.age': {
    es: 'Edad',
    en: 'Age',
  },
  'patient.detail.gender': {
    es: 'Sexo',
    en: 'Sex',
  },
  'patient.detail.blood_group': {
    es: 'Grupo Sanguíneo',
    en: 'Blood Group',
  },
  'patient.detail.dni': {
    es: 'DNI / Pasaporte',
    en: 'ID / Passport',
  },
  'patient.detail.allergy': {
    es: 'Alergias Conocidas',
    en: 'Known Allergies',
  },
  'patient.insurance.title': {
    es: 'Cobertura Aseguradora',
    en: 'Insurance Coverage',
  },
  'patient.insurance.active': {
    es: 'Póliza Activa',
    en: 'Active Policy',
  },
  'patient.insurance.policy': {
    es: 'Póliza Nº',
    en: 'Policy No.',
  },
  'patient.insurance.coverage': {
    es: 'Cobertura Odonto/Médica',
    en: 'Dental/Medical Coverage',
  },
  'patient.insurance.emergency_contact': {
    es: 'Contacto de Emergencia',
    en: 'Emergency Contact',
  },
  'patient.timeline.title': {
    es: 'Línea de Tiempo Clínica',
    en: 'Clinical Timeline',
  },
  'patient.timeline.tab.all': {
    es: 'Todos los Eventos',
    en: 'All Events',
  },
  'patient.timeline.tab.triage': {
    es: 'Triajes & Urgencias',
    en: 'Triage & Emergencies',
  },
  'patient.timeline.tab.surgery': {
    es: 'Cirugías',
    en: 'Surgeries',
  },
  'patient.timeline.tab.imaging': {
    es: 'Radiología',
    en: 'Imaging',
  },
  'patient.timeline.tab.dental': {
    es: 'Odontología',
    en: 'Dental',
  },
  'patient.soap.title': {
    es: 'Evolución Clínica SOAP',
    en: 'SOAP Clinical Evolution',
  },
  'patient.soap.signed': {
    es: 'Firmado por',
    en: 'Signed by',
  },
  'patient.soap.s': {
    es: 'Subjetivo (S):',
    en: 'Subjective (S):',
  },
  'patient.soap.o': {
    es: 'Objetivo (O):',
    en: 'Objective (O):',
  },
  'patient.soap.a': {
    es: 'Evaluación (A):',
    en: 'Assessment (A):',
  },
  'patient.soap.p': {
    es: 'Plan (P):',
    en: 'Plan (P):',
  },
  'patient.imaging.attached': {
    es: 'Estudios Radiológicos Adjuntos',
    en: 'Attached Imaging Studies',
  },
  'patient.imaging.click_view': {
    es: 'Clic para inspeccionar CBCT / Ortopantomografía',
    en: 'Click to inspect CBCT / Panoramic X-ray',
  },
  'patient.rx.title': {
    es: 'Pautas Farmacológicas Activas',
    en: 'Active Drug Prescriptions',
  },
  'patient.viewer.title': {
    es: 'Visor Radiológico Digital DICOM',
    en: 'DICOM Digital Radiology Viewer',
  },
  'patient.viewer.specs': {
    es: 'Especificaciones Técnicas',
    en: 'Technical Specifications',
  },
  'patient.viewer.close': {
    es: 'Cerrar Visor',
    en: 'Close Viewer',
  },

  // Patients Directory aliases
  'patients.btn.new': {
    es: 'Registrar Nuevo Paciente',
    en: 'Register New Patient',
  },
  'patients.search.placeholder': {
    es: 'Buscar paciente por nombre, DNI, MRN...',
    en: 'Search patient by name, ID, MRN...',
  },
  'patients.filter.status': {
    es: 'Estado Clínico:',
    en: 'Clinical Status:',
  },
  'patients.filter.all': {
    es: 'Todos los Pacientes',
    en: 'All Patients',
  },
  'patients.filter.triage_queue': {
    es: 'En Cola de Triaje',
    en: 'In Triage Queue',
  },
  'patients.card.id_label': {
    es: 'DNI / NIE:',
    en: 'ID / Passport:',
  },
  'patients.card.phone_label': {
    es: 'Teléfono:',
    en: 'Phone:',
  },
  'patients.card.insurance_label': {
    es: 'Aseguradora:',
    en: 'Insurance:',
  },
  'patients.card.odontogram': {
    es: 'Odontograma FDI',
    en: 'FDI Dental Chart',
  },
  'patients.card.view_dossier': {
    es: 'Ver Expediente',
    en: 'View Dossier',
  },

  // SOAP Modal aliases
  'soap_modal.title': {
    es: 'Nueva Nota Clínica SOAP & Evolución',
    en: 'New SOAP Clinical Evolution Note',
  },
  'soap_modal.ai_title': {
    es: 'Estructurador Clínico SOAP Asistido por IA',
    en: 'AI-Assisted SOAP Clinical Structurer',
  },
  'soap_modal.structuring': {
    es: 'Estructurando nota clínica con IA...',
    en: 'Structuring clinical note with AI...',
  },
  'soap_modal.btn_structure': {
    es: 'Estructurar en Formato SOAP con IA',
    en: 'Structure into SOAP with AI',
  },
  'soap_modal.raw_notes_label': {
    es: 'Dictado o Anotaciones Rápidas del Facultativo:',
    en: 'Doctor Quick Dictation / Rough Notes:',
  },
  'soap_modal.raw_placeholder': {
    es: 'Escribe los hallazgos rápidos para que la IA los ordene en Subjetivo, Objetivo, Análisis y Plan...',
    en: 'Type rough findings for AI to structure into Subjective, Objective, Assessment and Plan...',
  },
  'soap_modal.consult_title': {
    es: 'Título de la Consulta:',
    en: 'Consultation Title:',
  },
  'soap_modal.act_type': {
    es: 'Tipo de Acto Clínico:',
    en: 'Clinical Act Type:',
  },
  'soap_modal.cancel': {
    es: 'Cancelar',
    en: 'Cancel',
  },
  'soap_modal.save': {
    es: 'Firmar y Guardar en Historial',
    en: 'Sign & Save to Medical Record',
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
  'billing.tab.treatment_plans': {
    es: 'Presupuestos & Planes de Tratamiento',
    en: 'Estimates & Treatment Plans',
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
  'billing.kpi.copay': {
    es: 'Copago Pacientes',
    en: 'Patient Copay',
  },
  'billing.kpi.copay_sub': {
    es: 'Liquidado este mes',
    en: 'Settled this month',
  },
  'billing.kpi.insurance': {
    es: 'Reclamaciones Aseguradoras',
    en: 'Insurer Claims',
  },
  'billing.kpi.insurance_sub': {
    es: 'Pendiente de liquidación',
    en: 'Pending settlement',
  },
  'billing.kpi.collected': {
    es: 'Cobrado Total',
    en: 'Total Collected',
  },
  'billing.kpi.collected_sub': {
    es: 'Ingresos netos en clínica',
    en: 'Net clinic revenue',
  },
  'billing.kpi.pending': {
    es: 'Pendiente de Cobro',
    en: 'Outstanding Balance',
  },
  'billing.kpi.pending_sub': {
    es: 'Cuotas y copagos pendientes',
    en: 'Pending installments & copays',
  },
  'billing.invoices.title': {
    es: 'Registro de Facturación & Cobros',
    en: 'Invoicing & Claims Register',
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
  'billing.status.partial': {
    es: 'Pago Parcial',
    en: 'Partial Payment',
  },
  'billing.status.partially_paid': {
    es: 'Pago Parcial',
    en: 'Partial Payment',
  },
  'billing.item.copay_total': {
    es: 'Copago Total',
    en: 'Total Copay',
  },
  'billing.item.remains': {
    es: 'Restante',
    en: 'Remains',
  },
  'billing.item.settled': {
    es: 'Cobrado',
    en: 'Settled',
  },
  'billing.item.procedures_included': {
    es: 'Procedimientos incluidos:',
    en: 'Procedures included:',
  },
  'billing.item.insurance_coverage': {
    es: 'Cobertura aseguradora:',
    en: 'Insurance coverage:',
  },
  'billing.item.date': {
    es: 'Fecha Emisión:',
    en: 'Issue Date:',
  },
  'billing.detail.title': {
    es: 'Detalle del Presupuesto & Facturación',
    en: 'Estimate & Billing Breakdown',
  },
  'billing.detail.btn_print': {
    es: 'Imprimir Factura',
    en: 'Print Invoice',
  },
  'billing.detail.patient': {
    es: 'Paciente:',
    en: 'Patient:',
  },
  'billing.detail.campus': {
    es: 'Sede Clínica:',
    en: 'Clinic Campus:',
  },
  'billing.detail.claim_id': {
    es: 'ID Reclamación:',
    en: 'Claim ID:',
  },
  'billing.detail.procedures_breakdown': {
    es: 'Desglose de Actos Médicos',
    en: 'Medical Acts Breakdown',
  },
  'billing.detail.insurance_cover': {
    es: 'Cobertura Póliza:',
    en: 'Policy Coverage:',
  },
  'billing.calc.subtotal': {
    es: 'Subtotal Bruto:',
    en: 'Gross Subtotal:',
  },
  'billing.calc.insurance_discount': {
    es: 'Cobertura / Descuento Seguro:',
    en: 'Insurance Coverage / Discount:',
  },
  'billing.calc.vat': {
    es: 'IVA Aplicado:',
    en: 'Applied VAT:',
  },
  'billing.calc.tax_exempt': {
    es: 'Exento (Art. 20 Ley Sanidad)',
    en: 'Exempt (Healthcare Law Art. 20)',
  },
  'billing.calc.total_copay': {
    es: 'Total Copago Paciente:',
    en: 'Total Patient Copay:',
  },
  'billing.calc.paid_amount': {
    es: 'Importe Ya Abonado:',
    en: 'Amount Already Paid:',
  },
  'billing.calc.balance_due': {
    es: 'Saldo Pendiente:',
    en: 'Balance Due:',
  },
  'billing.ai.title': {
    es: 'Explicador de Facturación con IA',
    en: 'AI Billing & Copay Explainer',
  },
  'billing.pos.title': {
    es: 'Terminal de Cobro TPV Clínico',
    en: 'Clinical POS Payment Terminal',
  },
  'billing.pos.amount_label': {
    es: 'Importe a Cobrar (€):',
    en: 'Amount to Charge (€):',
  },
  'billing.pos.method_label': {
    es: 'Método de Pago:',
    en: 'Payment Method:',
  },
  'billing.pos.card': {
    es: 'Tarjeta Débito/Crédito',
    en: 'Debit/Credit Card',
  },
  'billing.pos.wire': {
    es: 'Transferencia / Bizum',
    en: 'Wire / Transfer',
  },
  'billing.pos.installments': {
    es: 'Financiación / Cuotas',
    en: 'Financing / Installments',
  },
  'billing.pos.cash': {
    es: 'Efectivo en Caja',
    en: 'Cash at Counter',
  },
  'billing.pos.process_btn': {
    es: 'Registrar y Cobrar',
    en: 'Process & Collect',
  },
  'billing.pos.fully_paid': {
    es: 'Factura Totalmente Cobrada',
    en: 'Invoice Fully Paid',
  },
  'billing.modal.official_title': {
    es: 'Factura Oficial Clínica & Desglose',
    en: 'Official Clinic Invoice & Breakdown',
  },
  'billing.modal.patient_info': {
    es: 'Datos del Paciente',
    en: 'Patient Information',
  },
  'billing.modal.insurance_coverage': {
    es: 'Póliza de Aseguradora',
    en: 'Insurance Policy',
  },
  'billing.modal.claim_id': {
    es: 'Nº Liquidación:',
    en: 'Claim ID:',
  },
  'billing.modal.th.code': {
    es: 'Código CDT',
    en: 'CDT Code',
  },
  'billing.modal.th.desc': {
    es: 'Descripción',
    en: 'Description',
  },
  'billing.modal.th.price': {
    es: 'Precio Base',
    en: 'Base Price',
  },
  'billing.modal.th.insurance': {
    es: 'Aseguradora',
    en: 'Insurer',
  },
  'billing.modal.th.copay': {
    es: 'Copago',
    en: 'Copay',
  },
  'billing.modal.fiscal_stamp': {
    es: 'Timbre Fiscal Certificado',
    en: 'Certified Tax Stamp',
  },
  'billing.modal.total_liquidated': {
    es: 'Total Liquidado',
    en: 'Total Liquidated',
  },
  'billing.modal.qr_verification': {
    es: 'Verificación QR Fiscal',
    en: 'Tax QR Verification',
  },
  'billing.modal.print_doc': {
    es: 'Imprimir Documento Oficial',
    en: 'Print Official Document',
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

  // New Triage Intake Modal aliases
  'modal.triage.select_patient': {
    es: 'Seleccionar Paciente Registrado:',
    en: 'Select Registered Patient:',
  },
  'modal.triage.chief_complaint': {
    es: 'Motivo Principal de Consulta:',
    en: 'Chief Complaint:',
  },
  'modal.triage.complaint_placeholder': {
    es: 'Ej: Dolor agudo punzante en mandíbula, inflamación periapical...',
    en: 'E.g.: Sharp throbbing jaw pain, periapical swelling...',
  },
  'modal.triage.symptoms_label': {
    es: 'Síntomas Declarados y Hallazgos Clínicos:',
    en: 'Reported Symptoms & Clinical Findings:',
  },
  'modal.triage.symptoms_placeholder': {
    es: 'Describe síntomas adicionales, tiempo de evolución, antecedentes...',
    en: 'Describe additional symptoms, onset time, history...',
  },
  'modal.triage.vitals_title': {
    es: 'Registro de Constantes Vitales',
    en: 'Vital Signs Record',
  },
  'modal.triage.bp': {
    es: 'Tensión Arterial (PA):',
    en: 'Blood Pressure (BP):',
  },
  'modal.triage.hr': {
    es: 'Frecuencia Cardíaca (FC bpm):',
    en: 'Heart Rate (HR bpm):',
  },
  'modal.triage.spo2': {
    es: 'Saturación Oxígeno (SpO2 %):',
    en: 'Oxygen Saturation (SpO2 %):',
  },
  'modal.triage.temp': {
    es: 'Temperatura (°C):',
    en: 'Temperature (°C):',
  },
  'modal.triage.pain_label': {
    es: 'Escala de Dolor EVA (0 a 10):',
    en: 'Pain Scale VAS (0 to 10):',
  },
  'modal.triage.red_flags_title': {
    es: 'Signos de Alarma / Red Flags:',
    en: 'Warning Signs / Red Flags:',
  },
  'modal.triage.ai_manchester_title': {
    es: 'Clasificación IA según Escala Manchester',
    en: 'AI Manchester Triage Classification',
  },
  'modal.triage.evaluating': {
    es: 'Analizando agudeza clínica con IA...',
    en: 'Analyzing clinical acuity with AI...',
  },
  'modal.triage.evaluate_ai': {
    es: 'Calcular Nivel de Triaje con IA',
    en: 'Evaluate Triage Level with AI',
  },
  'modal.triage.ai_rationale': {
    es: 'Razonamiento Clínico de la IA:',
    en: 'AI Clinical Rationale:',
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
