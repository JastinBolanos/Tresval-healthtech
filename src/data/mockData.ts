import { ClinicCampus, StaffProfile, Patient, Appointment, Invoice, ToothState } from '../types';

export const mockCampuses: ClinicCampus[] = [
  {
    id: 'campus-central',
    name: 'Tresval Clinic Metropolitano',
    tagline: 'Centro de Especialidades Médicas & Urgencias 24/7',
    city: 'Madrid / Ciudad Central',
    address: 'Paseo de la Castellana 142, Edificio Tresval Med',
    totalChairs: 12,
    occupiedChairs: 9,
    totalBeds: 28,
    occupiedBeds: 22,
    specialties: ['Triaje Rápido', 'Cirugía Maxilofacial', 'Odontología Restauradora', 'Urgencias 24h', 'Implantología Digital'],
    emergencyActive: true,
    phone: '+34 910 882 400',
  },
  {
    id: 'campus-dental',
    name: 'Tresval Dental & Maxillofacial Suite',
    tagline: 'Alta Complejidad Odontológica, Ortodoncia & Estética Facial',
    city: 'Barcelona / Eixample',
    address: 'Avinguda Diagonal 580, Nivel Clínico 4',
    totalChairs: 16,
    occupiedChairs: 11,
    totalBeds: 8,
    occupiedBeds: 4,
    specialties: ['Implantología Carga Inmediata', 'Ortodoncia Invisible', 'Endodoncia Microscópica', 'Periodoncia Láser'],
    emergencyActive: true,
    phone: '+34 932 770 190',
  },
  {
    id: 'campus-vitalis',
    name: 'Vitalis Sync Institute',
    tagline: 'Clínica Quirúrgica Ambulatoria & Diagnóstico Avanzado',
    city: 'Valencia / Jardín Real',
    address: 'Gran Vía Marqués del Turia 45',
    totalChairs: 8,
    occupiedChairs: 5,
    totalBeds: 18,
    occupiedBeds: 13,
    specialties: ['Cirugía Mayor Ambulatoria', 'Sedación Consciente', 'Radiología CBCT 3D', 'Rehabilitación Oral'],
    emergencyActive: false,
    phone: '+34 963 410 880',
  },
];

export const mockStaffProfiles: StaffProfile[] = [
  {
    id: 'staff-dr-elena',
    name: 'Dra. Elena Ramos, MD',
    title: 'Jefa de Cirugía Oral & Maxilofacial',
    role: 'surgeon',
    specialty: 'Cirugía Maxilofacial e Implantes Cigomáticos',
    licenseNumber: 'COM-2849182',
    avatar: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=250',
    assignedCampusId: 'campus-central',
    shift: 'Turno Mañana (08:00 - 15:30)',
    activeStatus: 'on_duty',
  },
  {
    id: 'staff-dr-mateo',
    name: 'Dr. Mateo Valdés, DDS',
    title: 'Especialista en Odontología Restauradora & Estética',
    role: 'dentist',
    specialty: 'Endodoncia Microscópica & Rehabilitación',
    licenseNumber: 'COEM-301824',
    avatar: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=250',
    assignedCampusId: 'campus-dental',
    shift: 'Turno Completo (09:00 - 18:00)',
    activeStatus: 'in_surgery',
  },
  {
    id: 'staff-nurse-camila',
    name: 'Lic. Camila Soto',
    title: 'Coordinadora de Triaje Clínico & Urgencias',
    role: 'triage_nurse',
    specialty: 'Triaje Manchester & Soporte Vital Avanzado',
    licenseNumber: 'COL-ENF-44109',
    avatar: 'https://images.unsplash.com/photo-1594824813589-980f745cb571?auto=format&fit=crop&q=80&w=250',
    assignedCampusId: 'campus-central',
    shift: 'Turno Continuo Urgencias',
    activeStatus: 'on_duty',
  },
  {
    id: 'staff-admin-facturacion',
    name: 'Roberto Méndez',
    title: 'Director de Facturación & Auditoría Aseguradoras',
    role: 'billing_admin',
    specialty: 'Gestión de Coberturas Médicas & Planes Financieros',
    licenseNumber: 'ADM-MED-0921',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=250',
    assignedCampusId: 'campus-central',
    shift: 'Administración y Finanzas',
    activeStatus: 'on_duty',
  },
];

// Helper to generate a default 32-tooth adult chart with realistic FDI numbers
export function generateDefaultToothChart(): ToothState[] {
  const toothNames: Record<number, string> = {
    // Quadrant 1 (Upper Right)
    18: 'Tercer molar sup. der.', 17: 'Segundo molar sup. der.', 16: 'Primer molar sup. der.',
    15: 'Segundo premolar sup. der.', 14: 'Primer premolar sup. der.', 13: 'Canino sup. der.',
    12: 'Incisivo lateral sup. der.', 11: 'Incisivo central sup. der.',
    // Quadrant 2 (Upper Left)
    21: 'Incisivo central sup. izq.', 22: 'Incisivo lateral sup. izq.', 23: 'Canino sup. izq.',
    24: 'Primer premolar sup. izq.', 25: 'Segundo premolar sup. izq.', 26: 'Primer molar sup. izq.',
    27: 'Segundo molar sup. izq.', 28: 'Tercer molar sup. izq.',
    // Quadrant 3 (Lower Left)
    38: 'Tercer molar inf. izq.', 37: 'Segundo molar inf. izq.', 36: 'Primer molar inf. izq.',
    35: 'Segundo premolar inf. izq.', 34: 'Primer premolar inf. izq.', 33: 'Canino inf. izq.',
    32: 'Incisivo lateral inf. izq.', 31: 'Incisivo central inf. izq.',
    // Quadrant 4 (Lower Right)
    41: 'Incisivo central inf. der.', 42: 'Incisivo lateral inf. der.', 43: 'Canino inf. der.',
    44: 'Primer premolar inf. der.', 45: 'Segundo premolar inf. der.', 46: 'Primer molar inf. der.',
    47: 'Segundo molar inf. der.', 48: 'Tercer molar inf. der.',
  };

  const teeth: ToothState[] = [];
  const numbers = [
    18, 17, 16, 15, 14, 13, 12, 11,
    21, 22, 23, 24, 25, 26, 27, 28,
    48, 47, 46, 45, 44, 43, 42, 41,
    31, 32, 33, 34, 35, 36, 37, 38
  ];

  numbers.forEach((num) => {
    const quad = Math.floor(num / 10) as 1 | 2 | 3 | 4;
    teeth.push({
      toothNumber: num,
      name: toothNames[num] || `Pieza ${num}`,
      quadrant: quad,
      condition: 'healthy',
      surfaces: {},
      periodontalDepthMm: 2,
      mobilityGrade: 0,
    });
  });

  return teeth;
}

export const mockPatients: Patient[] = [
  {
    id: 'pat-01',
    mrn: 'TRV-2026-8819',
    firstName: 'Sofia',
    lastName: 'Navarro Morales',
    nationalId: '48.912.834-K',
    birthDate: '1989-04-14',
    age: 37,
    gender: 'F',
    bloodType: 'A+',
    phone: '+34 654 220 918',
    email: 'sofia.navarro.m@gmail.com',
    address: 'C/ Velázquez 78, 4º B, Madrid',
    emergencyContact: {
      name: 'Carlos Navarro (Hermano)',
      relation: 'Hermano',
      phone: '+34 611 980 432',
    },
    allergies: ['Penicilina', 'AINEs (Ibuprofeno - Reacción moderada)'],
    chronicConditions: ['Hipertensión arterial controlada', 'Bruxismo severo'],
    currentMedications: ['Enalapril 10mg / 24h', 'Férula de descarga nocturna'],
    insurance: {
      provider: 'Sanitas Dental Premium',
      policyNumber: 'SAN-994102-D',
      planName: 'Elite Maxilofacial Oro',
      coverageRate: 0.85,
      deductible: 50,
      isVerified: true,
      expirationDate: '2026-12-31',
    },
    campusId: 'campus-central',
    currentStatus: 'triage_queue',
    assignedDoctorId: 'staff-dr-elena',
    currentTriage: {
      id: 'tri-801',
      patientId: 'pat-01',
      timestamp: '2026-08-22 13:45',
      level: 2,
      categoryName: 'Emergencia Severa',
      colorCode: '#EF4444',
      chiefComplaint: 'Dolor punzante irradiado a mandíbula y flemón facial derecho.',
      symptoms: 'Inflamación vestibular notable en pieza 46, trismo moderado (apertura 22mm), dolor pulsátil 9/10, febrícula.',
      vitals: {
        bp: '138/88',
        hr: 94,
        rr: 18,
        spo2: 99,
        temp: 37.8,
        painScore: 9,
        bleedingLevel: 'mild',
      },
      specialty: 'Cirugía Maxilofacial / Endodoncia Urgente',
      assignedBox: 'Box Quirúrgico 02',
      priorityScore: 92,
      estimatedWaitMinutes: 8,
      redFlags: ['Riesgo de celulitis facial difusa', 'Alergia a Penicilina (Contraindicación de Amoxicilina)'],
      aiAnalysis: {
        suggestedICD10: ['K04.7 Absceso periapical agudo sin fístula', 'K04.0 Pulpitis aguda irreversible'],
        riskAssessment: 'Riesgo Alto por progresión de espacio aponeurótico facial. Requiere Clindamicina o Azitromicina alternativa.',
        protocol: 'Drenaje por conducto / incisión transmucosa si fluctuante. Pauta antibiótica segura sin betalactámicos.'
      },
      nurseNotes: 'Canalizada vía salina en antebrazo. Paciente angustiada por dolor. Alerta de alergia a Penicilina resaltada en pulsera roja.',
      status: 'waiting',
    },
    dentalChart: (() => {
      const chart = generateDefaultToothChart();
      // Apply Sofia's specific conditions
      const t46 = chart.find(t => t.toothNumber === 46);
      if (t46) {
        t46.condition = 'endodontic';
        t46.surfaces = { occlusal: true, mesial: true };
        t46.notes = 'Absceso periapical activo. Foco infeccioso en raíz distal.';
        t46.plannedProcedure = 'Urgencia: Apertura cameral + Drenaje / Biopulpectomía';
      }
      const t16 = chart.find(t => t.toothNumber === 16);
      if (t16) {
        t16.condition = 'crown';
        t16.notes = 'Corona Zirconio monolítico colocada en 2024. Asentada.';
      }
      const t24 = chart.find(t => t.toothNumber === 24);
      if (t24) {
        t24.condition = 'caries';
        t24.surfaces = { distal: true };
        t24.notes = 'Caries interproximal esmalte-dentina.';
      }
      const t38 = chart.find(t => t.toothNumber === 38);
      if (t38) {
        t38.condition = 'missing';
        t38.notes = 'Exodoncia quirúrgica realizada 2023.';
      }
      return chart;
    })(),
    timeline: [
      {
        id: 'ev-01',
        patientId: 'pat-01',
        date: '2026-08-22 13:45',
        type: 'triage',
        title: 'Ingreso a Triaje Urgente Nivel 2 (Manchester)',
        doctorName: 'Lic. Camila Soto',
        doctorSpecialty: 'Triaje Urgencias',
        campusName: 'Tresval Clinic Metropolitano',
        summary: 'Dolor agudo 9/10 en cuadrante IV con edema facial submandibular.',
        soap: {
          subjective: 'Paciente acude con dolor insoportable desde anoche. Refiere que el dolor palpita y no cede con analgésicos habituales.',
          objective: 'Asimetría facial derecha por edema indurado pero no difuso. Pieza 46 sensible a percusión vertical extrema.',
          assessment: 'Absceso periapical agudo en 46. Alergia a Penicilina comprobada.',
          plan: 'Pase prioritario a Box Quirúrgico 02 para anestesia troncular + apertura de urgencia.'
        },
        badges: ['Nivel 2 Urgente', 'Alergia Crítica Penicilina'],
      },
      {
        id: 'ev-02',
        patientId: 'pat-01',
        date: '2026-06-10 10:30',
        type: 'imaging',
        title: 'Ortopantomografía Digital & CBCT 3D',
        doctorName: 'Dr. Mateo Valdés',
        doctorSpecialty: 'Radiodiagnóstico Odontológico',
        campusName: 'Tresval Clinic Metropolitano',
        summary: 'Control anual de implantes y evaluación de ATM bilateral.',
        imagingUrl: 'https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&q=80&w=800',
        imagingType: 'cbct_3d',
        badges: ['Imagen HD 3D', 'Radiología Validada'],
      },
      {
        id: 'ev-03',
        patientId: 'pat-01',
        date: '2025-11-18 16:00',
        type: 'dental_procedure',
        title: 'Colocación Corona Zirconio CAD/CAM en Pieza 16',
        doctorName: 'Dr. Mateo Valdés',
        doctorSpecialty: 'Rehabilitación Oral',
        campusName: 'Tresval Dental & Maxillofacial Suite',
        summary: 'Cementado definitivo con RelyX Ultimate. Oclusión ajustada con papel articular 12 micras.',
        cost: 650,
        badges: ['Garantía 5 Años', 'Zirconio Monolítico'],
      }
    ]
  },
  {
    id: 'pat-02',
    mrn: 'TRV-2026-9042',
    firstName: 'Alejandro',
    lastName: 'Garrido Cifuentes',
    nationalId: '52.190.412-B',
    birthDate: '1974-09-02',
    age: 51,
    gender: 'M',
    bloodType: 'O+',
    phone: '+34 670 445 119',
    email: 'a.garrido.c@outlook.com',
    address: 'Paseo de Gracia 110, Barcelona',
    emergencyContact: {
      name: 'Lucía Garrido (Hija)',
      relation: 'Hija',
      phone: '+34 622 301 887',
    },
    allergies: ['Sin alergias farmacológicas conocidas'],
    chronicConditions: ['Diabetes Mellitus Tipo 2 (HbA1c 6.8%)', 'Tabaquismo leve (5 cig/día)'],
    currentMedications: ['Metformina 850mg c/12h'],
    insurance: {
      provider: 'Adeslas SegurCaixa Plena',
      policyNumber: 'AD-440918-X',
      planName: 'Adeslas Dental Total',
      coverageRate: 0.80,
      deductible: 0,
      isVerified: true,
      expirationDate: '2027-03-31',
    },
    campusId: 'campus-dental',
    currentStatus: 'in_chair',
    assignedDoctorId: 'staff-dr-mateo',
    currentTriage: {
      id: 'tri-802',
      patientId: 'pat-02',
      timestamp: '2026-08-22 11:20',
      level: 4,
      categoryName: 'Prioritario / Consulta Programada',
      colorCode: '#10B981',
      chiefComplaint: 'Rehabilitación implantológica fija en maxilar superior izquierdo.',
      symptoms: 'Ausencia de piezas 25 y 26 desde hace 1 año. Pérdida de eficacia masticatoria.',
      vitals: {
        bp: '124/82',
        hr: 76,
        rr: 16,
        spo2: 98,
        temp: 36.6,
        painScore: 1,
      },
      specialty: 'Implantología & Cirugía Guiada',
      assignedBox: 'Sillón Quirúrgico 03',
      priorityScore: 40,
      estimatedWaitMinutes: 0,
      redFlags: ['Control de glicemia capilar pre-quirúrgico obligatorio'],
      aiAnalysis: {
        suggestedICD10: ['K08.1 Pérdida completa de dientes por enfermedad periodontal o trauma'],
        riskAssessment: 'Bajo riesgo quirúrgico. Buen control glucémico reportado.',
        protocol: 'Cirugía mínimamente invasiva con férula guiada 3D. Clorhexidina 0.2% preoperatoria.'
      },
      nurseNotes: 'Glicemia capilar en ayunas: 112 mg/dL. Firma de consentimiento informado para implantes Straumann completada.',
      status: 'attended',
    },
    dentalChart: (() => {
      const chart = generateDefaultToothChart();
      const t25 = chart.find(t => t.toothNumber === 25);
      if (t25) {
        t25.condition = 'implant';
        t25.notes = 'Implante Straumann BLX 4.0x10mm planificado para hoy.';
        t25.plannedProcedure = 'Colocación Implante + Pilar de Cicatrización';
      }
      const t26 = chart.find(t => t.toothNumber === 26);
      if (t26) {
        t26.condition = 'implant';
        t26.notes = 'Implante Straumann BLX 4.5x10mm con elevación de seno atraumática.';
      }
      const t11 = chart.find(t => t.toothNumber === 11);
      if (t11) {
        t11.condition = 'veneer';
        t11.notes = 'Carilla de disilicato de litio E.max (Color BL2).';
      }
      const t21 = chart.find(t => t.toothNumber === 21);
      if (t21) {
        t21.condition = 'veneer';
        t21.notes = 'Carilla de disilicato de litio E.max (Color BL2).';
      }
      return chart;
    })(),
    timeline: [
      {
        id: 'ev-11',
        patientId: 'pat-02',
        date: '2026-08-22 11:30',
        type: 'surgery',
        title: 'Cirugía de Implantes Guiada 3D (Piezas 25 y 26)',
        doctorName: 'Dr. Mateo Valdés',
        doctorSpecialty: 'Implantología Avanzada',
        campusName: 'Tresval Dental & Maxillofacial Suite',
        summary: 'Inserción de 2 fijaciones de titanio grado 4 con torque de inserción primario > 40 Ncm.',
        soap: {
          subjective: 'Paciente relajado, acude tras profilaxis antibiótica pautada.',
          objective: 'Lecho óseo D2 con suficiente altura subantral. Sin perforación de membrana Schneider.',
          assessment: 'Estabilidad primaria óptima para carga diferida a 8 semanas.',
          plan: 'Sutura monofilamento 5-0. Retirada de puntos en 10 días. Enjuagues con Clorhexidina 0.12%.'
        },
        cost: 2150,
        badges: ['Cirugía Guiada', 'Torque 45 Ncm', 'Straumann Titanium'],
      },
      {
        id: 'ev-12',
        patientId: 'pat-02',
        date: '2026-07-15 09:00',
        type: 'imaging',
        title: 'Planificación Quirúrgica CBCT & Escaneado Intraoral Trios 5',
        doctorName: 'Dr. Mateo Valdés',
        doctorSpecialty: 'Cirugía Oral',
        campusName: 'Tresval Dental & Maxillofacial Suite',
        summary: 'Diseño de guía digital CAD/CAM con software CoDiagnostiX.',
      }
    ]
  },
  {
    id: 'pat-03',
    mrn: 'TRV-2026-7420',
    firstName: 'Martina',
    lastName: 'Vidal Soler',
    nationalId: '39.814.772-L',
    birthDate: '2004-11-20',
    age: 21,
    gender: 'F',
    bloodType: 'B+',
    phone: '+34 689 112 004',
    email: 'martina.vidal21@icloud.com',
    address: 'C/ Colón 34, Valencia',
    emergencyContact: {
      name: 'Carmen Soler (Madre)',
      relation: 'Madre',
      phone: '+34 633 440 219',
    },
    allergies: ['Látex (Usar guantes de nitrilo / diques sin látex)'],
    chronicConditions: ['Asma bronquial leve'],
    currentMedications: ['Salbutamol inhalador a demanda'],
    insurance: {
      provider: 'Mapfre Salud Dental',
      policyNumber: 'MAP-108422-M',
      planName: 'Plus Oro Integral',
      coverageRate: 0.75,
      deductible: 30,
      isVerified: true,
      expirationDate: '2026-10-31',
    },
    campusId: 'campus-vitalis',
    currentStatus: 'scheduled',
    assignedDoctorId: 'staff-dr-mateo',
    currentTriage: {
      id: 'tri-803',
      patientId: 'pat-03',
      timestamp: '2026-08-22 14:00',
      level: 5,
      categoryName: 'No Urgente / Control Ortodoncia',
      colorCode: '#3B82F6',
      chiefComplaint: 'Revisión mensual de alineadores invisibles Spark Fase 14.',
      symptoms: 'Evolución favorable en desapiñamiento anterior. Sin dolor.',
      vitals: {
        bp: '115/75',
        hr: 68,
        rr: 15,
        spo2: 99,
        temp: 36.4,
        painScore: 0,
      },
      specialty: 'Ortodoncia Digital & Estética',
      assignedBox: 'Box 01 Vitalis',
      priorityScore: 10,
      estimatedWaitMinutes: 0,
      redFlags: ['Alergia a Látex registrada'],
      aiAnalysis: {
        suggestedICD10: ['K07.2 Maloclusión Clase I con apiñamiento moderado'],
        riskAssessment: 'Excelente pronóstico. Tracking de alineadores al 98%.',
        protocol: 'Verificación de ataches en 13, 23, 33, 43. Entrega de sets 15 a 18.'
      },
      nurseNotes: 'Verificado uso de material sin látex. Paciente trae alineadores limpios.',
      status: 'attended',
    },
    dentalChart: (() => {
      const chart = generateDefaultToothChart();
      const t13 = chart.find(t => t.toothNumber === 13);
      if (t13) {
        t13.condition = 'sealant';
        t13.notes = 'Atache elíptico vestibular para desrotación ortodóncica.';
      }
      const t23 = chart.find(t => t.toothNumber === 23);
      if (t23) {
        t23.condition = 'sealant';
        t23.notes = 'Atache elíptico vestibular para desrotación ortodóncica.';
      }
      const t48 = chart.find(t => t.toothNumber === 48);
      if (t48) {
        t48.condition = 'extraction_needed';
        t48.notes = 'Tercer molar incluido mesioangulado con reabsorción ósea.';
        t48.plannedProcedure = 'Exodoncia profiláctica post-ortodoncia';
      }
      return chart;
    })(),
    timeline: [
      {
        id: 'ev-21',
        patientId: 'pat-03',
        date: '2026-08-22 14:15',
        type: 'dental_procedure',
        title: 'Chequeo de Ortodoncia Invisible Spark & Stripping Interproximal',
        doctorName: 'Dr. Mateo Valdés',
        doctorSpecialty: 'Ortodoncia Avanzada',
        campusName: 'Vitalis Sync Institute',
        summary: 'IPR de 0.2mm entre 31-41 para ganancia de espacio. Entrega de 4 pares de alineadores.',
        soap: {
          subjective: 'Paciente muy satisfecha con el avance estético en zona anterior.',
          objective: 'Cierre progresivo de diastema y desapiñamiento de incisivos inferiores.',
          assessment: 'Evolución ortodóncica óptima.',
          plan: 'Próxima cita en 6 semanas para escaneo de control intermedio.'
        },
        badges: ['Ortodoncia Spark', 'IPR 0.2mm'],
      }
    ]
  },
  {
    id: 'pat-04',
    mrn: 'TRV-2026-6199',
    firstName: 'Ignacio',
    lastName: 'Herrera Benítez',
    nationalId: '28.409.115-S',
    birthDate: '1962-02-18',
    age: 64,
    gender: 'M',
    bloodType: 'A-',
    phone: '+34 609 881 772',
    email: 'i.herrera.benitez@gmail.com',
    address: 'C/ Arturo Soria 204, Madrid',
    emergencyContact: {
      name: 'Mercedes Benítez (Esposa)',
      relation: 'Cónyuge',
      phone: '+34 610 992 331',
    },
    allergies: ['Sulfa (Sulfamidas)', 'Yodo (Uso de soluciones no yodadas)'],
    chronicConditions: ['Cardiopatía isquémica con stent (2023)', 'Anticoagulado con Rivaroxabán'],
    currentMedications: ['Xarelto (Rivaroxabán) 20mg / 24h', 'Atorvastatina 40mg / noche'],
    insurance: {
      provider: 'Caser Salud Médica',
      policyNumber: 'CAS-771920-P',
      planName: 'Caser Dental Integral Senior',
      coverageRate: 0.80,
      deductible: 40,
      isVerified: true,
      expirationDate: '2026-12-31',
    },
    campusId: 'campus-central',
    currentStatus: 'triage_queue',
    assignedDoctorId: 'staff-dr-elena',
    currentTriage: {
      id: 'tri-804',
      patientId: 'pat-04',
      timestamp: '2026-08-22 13:58',
      level: 3,
      categoryName: 'Urgencia Médica',
      colorCode: '#F59E0B',
      chiefComplaint: 'Hemorragia post-extracción persistente tras 4 horas y dolor leve.',
      symptoms: 'Sangrado continuo tras extracción en clínica externa de pieza 37. Paciente anticoagulado.',
      vitals: {
        bp: '142/90',
        hr: 82,
        rr: 17,
        spo2: 97,
        temp: 36.7,
        painScore: 4,
        bleedingLevel: 'moderate',
      },
      specialty: 'Cirugía Maxilofacial / Hemostasia Urgente',
      assignedBox: 'Box Quirúrgico 01',
      priorityScore: 78,
      estimatedWaitMinutes: 12,
      redFlags: ['Tratamiento activo con Rivaroxabán (Anticoagulante Oral)', 'Riesgo de hematoma en suelo de boca'],
      aiAnalysis: {
        suggestedICD10: ['T81.0 Hemorragia y hematoma que complican un procedimiento dental'],
        riskAssessment: 'Urgencia hemostática en paciente anticoagulado. Evitar fármacos que interfieran con la coagulación.',
        protocol: 'Compresión local con ácido tranexámico al 5%, colocación de esponja de gelatina reabsorbible (Surgicel) y sutura en cruz.'
      },
      nurseNotes: 'Presión local mantenida con gasa hemostática. PA vigilada. Alerta de anticoagulación comunicada a Dra. Ramos.',
      status: 'waiting',
    },
    dentalChart: (() => {
      const chart = generateDefaultToothChart();
      const t37 = chart.find(t => t.toothNumber === 37);
      if (t37) {
        t37.condition = 'extraction_needed';
        t37.notes = 'Alvéolo post-extracción reciente con sangrado activo. Requiere hemostasia quirúrgica.';
        t37.plannedProcedure = 'Revisión alveolar + Hemostasia con esponja de fibrina + Sutura seda 3-0';
      }
      return chart;
    })(),
    timeline: [
      {
        id: 'ev-31',
        patientId: 'pat-04',
        date: '2026-08-22 14:00',
        type: 'triage',
        title: 'Triaje Nivel 3 - Hemostasia Urgente Paciente Anticoagulado',
        doctorName: 'Lic. Camila Soto',
        doctorSpecialty: 'Triaje Urgencias',
        campusName: 'Tresval Clinic Metropolitano',
        summary: 'Sangrado persistente alvéolo 37 tras toma de Rivaroxabán.',
        badges: ['Nivel 3 Urgencia', 'Alerta Anticoagulado'],
      }
    ]
  }
];

export const mockAppointments: Appointment[] = [
  {
    id: 'apt-101',
    patientId: 'pat-01',
    patientName: 'Sofia Navarro Morales',
    patientMrn: 'AUR-2026-8819',
    doctorId: 'staff-dr-elena',
    doctorName: 'Dra. Elena Ramos, MD',
    doctorSpecialty: 'Cirugía Maxilofacial',
    campusId: 'campus-central',
    chairOrRoom: 'Box Quirúrgico 02',
    date: '2026-08-22',
    startTime: '14:30',
    durationMinutes: 45,
    procedureType: 'Drenaje de Absceso & Apertura de Urgencia (Pieza 46)',
    category: 'surgery',
    status: 'waiting',
    notes: 'Alergia estricta a Penicilinas. Administrar Clindamicina 600mg IV lenta.',
    estimatedCost: 320,
  },
  {
    id: 'apt-102',
    patientId: 'pat-02',
    patientName: 'Alejandro Garrido Cifuentes',
    patientMrn: 'AUR-2026-9042',
    doctorId: 'staff-dr-mateo',
    doctorName: 'Dr. Mateo Valdés, DDS',
    doctorSpecialty: 'Implantología Digital',
    campusId: 'campus-dental',
    chairOrRoom: 'Sillón Quirúrgico 03',
    date: '2026-08-22',
    startTime: '11:30',
    durationMinutes: 90,
    procedureType: 'Cirugía Guiada 2 Implantes Straumann BLX (25 y 26)',
    category: 'implants',
    status: 'in_chair',
    notes: 'Férula quirúrgica esterilizada y lista. Glicemia en rango adecuado (112 mg/dL).',
    estimatedCost: 2150,
  },
  {
    id: 'apt-103',
    patientId: 'pat-03',
    patientName: 'Martina Vidal Soler',
    patientMrn: 'AUR-2026-7420',
    doctorId: 'staff-dr-mateo',
    doctorName: 'Dr. Mateo Valdés, DDS',
    doctorSpecialty: 'Ortodoncia Avanzada',
    campusId: 'campus-vitalis',
    chairOrRoom: 'Box 01 Vitalis',
    date: '2026-08-22',
    startTime: '15:15',
    durationMinutes: 30,
    procedureType: 'Control Ortodoncia Spark + IPR Interproximal',
    category: 'orthodontics',
    status: 'confirmed',
    notes: 'Material estrictamente libre de látex.',
    estimatedCost: 90,
  },
  {
    id: 'apt-104',
    patientId: 'pat-04',
    patientName: 'Ignacio Herrera Benítez',
    patientMrn: 'TRV-2026-6199',
    doctorId: 'staff-dr-elena',
    doctorName: 'Dra. Elena Ramos, MD',
    doctorSpecialty: 'Cirugía Oral & Urgencias',
    campusId: 'campus-central',
    chairOrRoom: 'Box Quirúrgico 01',
    date: '2026-08-22',
    startTime: '14:45',
    durationMinutes: 40,
    procedureType: 'Hemostasia Alveolar Quirúrgica + Sutura en Cruz (Pieza 37)',
    category: 'surgery',
    status: 'waiting',
    notes: 'Paciente anticoagulado con Xarelto. Aplicación de esponjas de gelatina hemostática.',
    estimatedCost: 240,
  },
  {
    id: 'apt-105',
    patientId: 'pat-01',
    patientName: 'Sofia Navarro Morales',
    patientMrn: 'AUR-2026-8819',
    doctorId: 'staff-dr-mateo',
    doctorName: 'Dr. Mateo Valdés, DDS',
    doctorSpecialty: 'Endodoncia Microscópica',
    campusId: 'campus-central',
    chairOrRoom: 'Sillón Dental 01',
    date: '2026-08-27',
    startTime: '10:00',
    durationMinutes: 60,
    procedureType: 'Endodoncia Mecanizada Multirradicular 46 (Fase 2)',
    category: 'dental',
    status: 'confirmed',
    notes: 'Cita programada post-remisión de cuadro infeccioso agudo.',
    estimatedCost: 380,
  }
];

export const mockInvoices: Invoice[] = [
  {
    id: 'inv-2026-01',
    invoiceNumber: 'FAC-TRV-2026-0889',
    patientId: 'pat-02',
    patientName: 'Alejandro Garrido Cifuentes',
    patientNationalId: '52.190.412-B',
    patientMrn: 'TRV-2026-9042',
    date: '2026-08-22',
    dueDate: '2026-09-05',
    campusName: 'Tresval Dental & Maxillofacial Suite',
    items: [
      {
        id: 'itm-01',
        code: 'CDT-D6010',
        toothNumber: 25,
        description: 'Implante Quirúrgico Straumann BLX Titanio Grado 4',
        category: 'surgery',
        unitPrice: 850,
        quantity: 1,
        insuranceDiscount: 450,
        status: 'in_progress',
        phase: 'Fase 2: Restauración & Cirugía',
      },
      {
        id: 'itm-02',
        code: 'CDT-D6010',
        toothNumber: 26,
        description: 'Implante Quirúrgico Straumann BLX Titanio Grado 4',
        category: 'surgery',
        unitPrice: 850,
        quantity: 1,
        insuranceDiscount: 450,
        status: 'in_progress',
        phase: 'Fase 2: Restauración & Cirugía',
      },
      {
        id: 'itm-03',
        code: 'CDT-D6190',
        description: 'Planificación Quirúrgica 3D & Férula Digital CoDiagnostiX',
        category: 'surgery',
        unitPrice: 450,
        quantity: 1,
        insuranceDiscount: 150,
        status: 'completed',
        phase: 'Fase 2: Restauración & Cirugía',
      },
      {
        id: 'itm-04',
        code: 'CDT-D0367',
        description: 'Tomografía Cone Beam CBCT 3D Maxilar',
        category: 'preventive',
        unitPrice: 180,
        quantity: 1,
        insuranceDiscount: 180, // 100% cubierto por póliza Adeslas
        status: 'completed',
        phase: 'Fase 1: Urgencia & Saneamiento',
      }
    ],
    subtotal: 2330,
    insuranceCoverageAmount: 1230,
    taxAmount: 0, // Exento sanitario
    total: 1100,
    paidAmount: 500,
    balanceDue: 600,
    paymentMethod: 'installments',
    status: 'partially_paid',
    insuranceClaimId: 'CLM-AD-2026-89102',
    fiscalStamp: 'SHA256-TRV-9921-XFA-2026-MEDCORE-VALIDATED',
  },
  {
    id: 'inv-2026-02',
    invoiceNumber: 'FAC-TRV-2026-0890',
    patientId: 'pat-01',
    patientName: 'Sofia Navarro Morales',
    patientNationalId: '48.912.834-K',
    patientMrn: 'TRV-2026-8819',
    date: '2026-08-22',
    dueDate: '2026-08-29',
    campusName: 'Tresval Clinic Metropolitano',
    items: [
      {
        id: 'itm-11',
        code: 'CDT-D7510',
        toothNumber: 46,
        description: 'Incisión & Drenaje Quirúrgico Absceso Intraoral de Urgencia',
        category: 'surgery',
        unitPrice: 190,
        quantity: 1,
        insuranceDiscount: 150,
        status: 'approved',
        phase: 'Fase 1: Urgencia & Saneamiento',
      },
      {
        id: 'itm-12',
        code: 'CDT-D3330',
        toothNumber: 46,
        description: 'Endodoncia Mecanizada Molar 3 Conductos',
        category: 'endodontics',
        unitPrice: 380,
        quantity: 1,
        insuranceDiscount: 220,
        status: 'planned',
        phase: 'Fase 2: Restauración & Cirugía',
      },
      {
        id: 'itm-13',
        code: 'CDT-D2740',
        toothNumber: 46,
        description: 'Corona Cerámica Zirconio Monolítico Alta Resistencia',
        category: 'prosthetics',
        unitPrice: 620,
        quantity: 1,
        insuranceDiscount: 300,
        status: 'planned',
        phase: 'Fase 3: Estética & Mantenimiento',
      }
    ],
    subtotal: 1190,
    insuranceCoverageAmount: 670,
    taxAmount: 0,
    total: 520,
    paidAmount: 0,
    balanceDue: 520,
    paymentMethod: 'insurance_direct',
    status: 'pending',
    insuranceClaimId: 'CLM-SAN-2026-44019',
    fiscalStamp: 'SHA256-TRV-1829-ZZA-2026-SANITAS-VALIDATED',
  },
  {
    id: 'inv-2026-03',
    invoiceNumber: 'FAC-TRV-2026-0872',
    patientId: 'pat-03',
    patientName: 'Martina Vidal Soler',
    patientNationalId: '39.814.772-L',
    patientMrn: 'TRV-2026-7420',
    date: '2026-08-10',
    dueDate: '2026-08-10',
    campusName: 'Vitalis Sync Institute',
    items: [
      {
        id: 'itm-21',
        code: 'CDT-D8080',
        description: 'Tratamiento Integral Ortodoncia Invisible Spark Aligners',
        category: 'orthodontics',
        unitPrice: 3400,
        quantity: 1,
        insuranceDiscount: 1200,
        status: 'in_progress',
        phase: 'Fase 2: Restauración & Cirugía',
      }
    ],
    subtotal: 3400,
    insuranceCoverageAmount: 1200,
    taxAmount: 0,
    total: 2200,
    paidAmount: 2200,
    balanceDue: 0,
    paymentMethod: 'credit_card',
    status: 'paid',
    insuranceClaimId: 'CLM-MAP-2026-11840',
    fiscalStamp: 'SHA256-TRV-3388-QQP-2026-MAPFRE-SETTLED',
  }
];
