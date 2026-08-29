import React, { useState } from 'react';
import { 
  mockPatients, 
  mockAppointments, 
  mockInvoices, 
  mockStaffProfiles,
  mockCampuses
} from './data/mockData';
import { 
  Patient, 
  Appointment, 
  Invoice, 
  StaffProfile, 
  CampusLocation, 
  ToothState, 
  TreatmentItem, 
  TimelineEvent, 
  TriageRecord 
} from './types';
import { WelcomeScreen } from './components/WelcomeScreen';
import { Navbar } from './components/Navbar';
import { TriageDeskView } from './components/TriageDeskView';
import { PatientsView, PatientDetailView } from './components/PatientsView';
import { OdontogramView } from './components/OdontogramView';
import { ScheduleCalendarView } from './components/ScheduleCalendarView';
import { BillingAndTreatmentsView } from './components/BillingAndTreatmentsView';
import { NewTriageIntakeModal } from './components/NewTriageIntakeModal';
import { NewAppointmentModal } from './components/NewAppointmentModal';
import { AICopilotDrawer } from './components/AICopilotDrawer';
import { LanguageProvider } from './context/LanguageContext';
import { storageService } from './services/storage.service';

export default function App() {
  return (
    <LanguageProvider>
      <MainAppContent />
    </LanguageProvider>
  );
}

function MainAppContent() {
  // Global application state
  const [activeView, setActiveView] = useState<string>('welcome');
  const [patients, setPatients] = useState<Patient[]>(() => storageService.getPatients(mockPatients));
  const [selectedPatientId, setSelectedPatientId] = useState<string>(() => {
    const initPatients = storageService.getPatients(mockPatients);
    return initPatients[0]?.id || mockPatients[0].id;
  });
  const [appointments, setAppointments] = useState<Appointment[]>(() => storageService.getAppointments(mockAppointments));
  const [invoices, setInvoices] = useState<Invoice[]>(() => storageService.getInvoices(mockInvoices));
  const [staffProfiles] = useState<StaffProfile[]>(mockStaffProfiles);

  // Sync to storage
  React.useEffect(() => {
    storageService.savePatients(patients);
  }, [patients]);

  React.useEffect(() => {
    storageService.saveAppointments(appointments);
  }, [appointments]);

  React.useEffect(() => {
    storageService.saveInvoices(invoices);
  }, [invoices]);
  
  // Active session profile
  const [currentDoctor, setCurrentDoctor] = useState<StaffProfile>(mockStaffProfiles[0]);
  const [activeCampus, setActiveCampus] = useState<CampusLocation>(mockCampuses[0]);

  // UI state
  const [isPrivacyMode, setIsPrivacyMode] = useState(false);
  const [isAICopilotOpen, setIsAICopilotOpen] = useState(false);
  const [showNewTriageModal, setShowNewTriageModal] = useState(false);
  const [showNewAppointmentModal, setShowNewAppointmentModal] = useState(false);

  const selectedPatient = patients.find(p => p.id === selectedPatientId) || patients[0];

  // Handler: Enter from Welcome Screen
  const handleEnterApp = (targetView: string, doctorName: string, campus: string) => {
    const doc = staffProfiles.find(s => s.name === doctorName) || staffProfiles[0];
    const camp = mockCampuses.find(c => c.name === campus) || mockCampuses[0];
    setCurrentDoctor(doc);
    setActiveCampus(camp);
    setActiveView(targetView);
  };

  // Handler: Patient Status update (e.g. from waiting to in_chair)
  const handleUpdatePatientStatus = (patientId: string, newStatus: Patient['currentStatus']) => {
    setPatients(prev => prev.map(p => {
      if (p.id === patientId) {
        return {
          ...p,
          currentStatus: newStatus,
          currentTriage: p.currentTriage ? {
            ...p.currentTriage,
            status: newStatus === 'in_chair' ? 'in_progress' : p.currentTriage.status
          } : undefined
        };
      }
      return p;
    }));
  };

  // Handler: Tooth State Update in Odontogram
  const handleUpdateTooth = (patientId: string, toothNumber: number, updatedState: Partial<ToothState>) => {
    setPatients(prev => prev.map(p => {
      if (p.id === patientId) {
        const updatedChart = p.dentalChart.map(tooth => {
          if (tooth.toothNumber === toothNumber) {
            return { ...tooth, ...updatedState };
          }
          return tooth;
        });
        return { ...p, dentalChart: updatedChart };
      }
      return p;
    }));
  };

  // Handler: Add Treatment Item to Patient and automatically create/update Invoice
  const handleAddTreatmentItem = (patientId: string, item: Omit<TreatmentItem, 'id'>) => {
    const newItem: TreatmentItem = {
      ...item,
      id: `treat-${Date.now()}`,
    };

    // Update patient treatment plan
    setPatients(prev => prev.map(p => {
      if (p.id === patientId) {
        return {
          ...p,
          treatmentPlan: [...p.treatmentPlan, newItem]
        };
      }
      return p;
    }));

    // Update or create corresponding invoice
    const patientObj = patients.find(p => p.id === patientId);
    if (!patientObj) return;

    setInvoices(prev => {
      const existingInvIndex = prev.findIndex(inv => inv.patientId === patientId && inv.status !== 'paid');
      const itemCopay = Math.max(0, newItem.unitPrice - newItem.insuranceDiscount);

      if (existingInvIndex >= 0) {
        const inv = prev[existingInvIndex];
        const updatedItems = [...inv.items, newItem];
        const newSubtotal = inv.subtotal + newItem.unitPrice;
        const newDiscount = inv.insuranceCoverageAmount + newItem.insuranceDiscount;
        const newTotal = inv.total + itemCopay;
        const newBalance = inv.balanceDue + itemCopay;

        const updatedInvoices = [...prev];
        updatedInvoices[existingInvIndex] = {
          ...inv,
          items: updatedItems,
          subtotal: newSubtotal,
          insuranceCoverageAmount: newDiscount,
          total: newTotal,
          balanceDue: newBalance,
          status: 'pending'
        };
        return updatedInvoices;
      } else {
        const newInv: Invoice = {
          id: `inv-${Date.now()}`,
          patientId: patientObj.id,
          patientName: `${patientObj.firstName} ${patientObj.lastName}`,
          patientNationalId: patientObj.nationalId,
          patientMrn: patientObj.mrn,
          campusName: activeCampus.name,
          invoiceNumber: `FAC-TRV-2026-${Math.floor(1000 + Math.random() * 9000)}`,
          date: new Date().toISOString().split('T')[0],
          dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
          items: [newItem],
          subtotal: newItem.unitPrice,
          taxAmount: 0,
          insuranceCoverageAmount: newItem.insuranceDiscount,
          total: itemCopay,
          paidAmount: 0,
          balanceDue: itemCopay,
          status: 'pending',
          fiscalStamp: `SHA256:${Math.random().toString(36).substring(2, 15).toUpperCase()}`,
          insuranceClaimId: `CLM-${patientObj.insurance.provider.substring(0, 3).toUpperCase()}-9902`,
        };
        return [newInv, ...prev];
      }
    });
  };

  // Handler: Pay Invoice
  const handlePayInvoice = (invoiceId: string, amount: number, method: Invoice['paymentMethod']) => {
    setInvoices(prev => prev.map(inv => {
      if (inv.id === invoiceId) {
        const newPaid = inv.paidAmount + amount;
        const newBalance = Math.max(0, inv.balanceDue - amount);
        const newStatus = newBalance <= 0 ? 'paid' : 'partially_paid';
        return {
          ...inv,
          paidAmount: newPaid,
          balanceDue: newBalance,
          status: newStatus,
          paymentMethod: method,
        };
      }
      return inv;
    }));
  };

  // Handler: Add Timeline Event
  const handleAddTimelineEvent = (patientId: string, event: Omit<TimelineEvent, 'id'>) => {
    const newEvent: TimelineEvent = {
      ...event,
      id: `ev-${Date.now()}`,
    };

    setPatients(prev => prev.map(p => {
      if (p.id === patientId) {
        return {
          ...p,
          timeline: [newEvent, ...p.timeline]
        };
      }
      return p;
    }));
  };

  // Handler: Submit new Triage record
  const handleSubmitTriage = (patientId: string, triageRecord: TriageRecord) => {
    setPatients(prev => prev.map(p => {
      if (p.id === patientId) {
        return {
          ...p,
          currentStatus: 'triage_queue',
          currentTriage: triageRecord,
          timeline: [
            {
              id: `ev-triage-${Date.now()}`,
              patientId: p.id,
              date: new Date().toISOString().replace('T', ' ').slice(0, 16),
              type: 'triage',
              title: `Ingreso a Triaje - Nivel ${triageRecord.level}`,
              doctorName: triageRecord.assignedDoctorName || currentDoctor.name,
              doctorSpecialty: 'Urgencias & Triaje',
              campusName: activeCampus.name,
              summary: `${triageRecord.chiefComplaint}. EVA ${triageRecord.vitals.painScore}/10. Constantes: PA ${triageRecord.vitals.bp}, FC ${triageRecord.vitals.hr} lpm.`,
              badges: [`Manchester Nivel ${triageRecord.level}`, triageRecord.assignedBox]
            },
            ...p.timeline
          ]
        };
      }
      return p;
    }));
    setActiveView('triage');
  };

  // Handler: Submit new Appointment
  const handleSubmitAppointment = (newApt: Omit<Appointment, 'id'>) => {
    const created: Appointment = {
      ...newApt,
      id: `apt-${Date.now()}`,
    };
    setAppointments(prev => [created, ...prev]);
    setActiveView('schedule');
  };

  // Handler: Update appointment status
  const handleUpdateAppointmentStatus = (appointmentId: string, status: Appointment['status']) => {
    setAppointments(prev => prev.map(a => {
      if (a.id === appointmentId) {
        return { ...a, status };
      }
      return a;
    }));
  };

  // If in Welcome view, show high-fidelity landing and entry portal
  if (activeView === 'welcome') {
    return (
      <WelcomeScreen
        onEnter={handleEnterApp}
        staffProfiles={staffProfiles}
        campuses={mockCampuses}
      />
    );
  }

  return (
    <div className="min-h-screen bg-[#F8F7F2] text-[#2D332D] flex flex-col font-sans selection:bg-[#4A5D4E] selection:text-white">
      
      {/* Top Clinical Navigation Bar */}
      <Navbar
        activeView={activeView}
        onNavigate={(view) => {
          setActiveView(view);
        }}
        isPrivacyMode={isPrivacyMode}
        onTogglePrivacyMode={() => setIsPrivacyMode(prev => !prev)}
        onOpenAICopilot={() => setIsAICopilotOpen(true)}
        waitingPatientsCount={patients.filter(p => p.currentTriage?.status === 'waiting').length}
        activeCampusName={activeCampus.name}
        doctorName={currentDoctor.name}
        doctorSpecialty={currentDoctor.specialty}
        onOpenWelcome={() => setActiveView('welcome')}
      />

      {/* Main Viewport Container */}
      <main className="flex-1 pb-16">
        
        {/* VIEW 1: TRIAGE DESK */}
        {activeView === 'triage' && (
          <TriageDeskView
            patients={patients}
            isPrivacyMode={isPrivacyMode}
            onOpenNewTriage={() => setShowNewTriageModal(true)}
            onSelectPatient={(p) => {
              setSelectedPatientId(p.id);
              setActiveView('patient_detail');
            }}
            onOpenOdontogram={(p) => {
              setSelectedPatientId(p.id);
              setActiveView('odontogram');
            }}
            onUpdatePatientStatus={handleUpdatePatientStatus}
          />
        )}

        {/* VIEW 2: PATIENTS DIRECTORY */}
        {activeView === 'patients' && (
          <PatientsView
            patients={patients}
            isPrivacyMode={isPrivacyMode}
            onSelectPatient={(p) => {
              setSelectedPatientId(p.id);
              setActiveView('patient_detail');
            }}
            onOpenOdontogram={(p) => {
              setSelectedPatientId(p.id);
              setActiveView('odontogram');
            }}
            onOpenNewTriage={() => setShowNewTriageModal(true)}
          />
        )}

        {/* VIEW 3: PATIENT DOSSIER & MEDICAL TIMELINE */}
        {activeView === 'patient_detail' && selectedPatient && (
          <PatientDetailView
            patient={selectedPatient}
            isPrivacyMode={isPrivacyMode}
            onBackToList={() => setActiveView('patients')}
            onOpenOdontogram={(p) => {
              setSelectedPatientId(p.id);
              setActiveView('odontogram');
            }}
            onOpenNewAppointment={(p) => {
              setSelectedPatientId(p.id);
              setShowNewAppointmentModal(true);
            }}
            onOpenBilling={(pId) => {
              setSelectedPatientId(pId);
              setActiveView('billing');
            }}
            onAddTimelineEvent={handleAddTimelineEvent}
            doctorName={currentDoctor.name}
          />
        )}

        {/* VIEW 4: ODONTOGRAM (FDI 32-TOOTH 3D CHART) */}
        {activeView === 'odontogram' && (
          <OdontogramView
            patients={patients}
            selectedPatient={selectedPatient}
            onSelectPatient={(p) => setSelectedPatientId(p.id)}
            onUpdateTooth={handleUpdateTooth}
            onAddTreatmentItem={handleAddTreatmentItem}
            onNavigateToBilling={(pId) => {
              setSelectedPatientId(pId);
              setActiveView('billing');
            }}
          />
        )}

        {/* VIEW 5: CALENDAR & SURGICAL CHAIR RESOURCE SCHEDULE */}
        {activeView === 'schedule' && (
          <ScheduleCalendarView
            appointments={appointments}
            patients={patients}
            staffProfiles={staffProfiles}
            onOpenNewAppointment={() => setShowNewAppointmentModal(true)}
            onSelectPatient={(p) => {
              setSelectedPatientId(p.id);
              setActiveView('patient_detail');
            }}
            onUpdateAppointmentStatus={handleUpdateAppointmentStatus}
          />
        )}

        {/* VIEW 6: BILLING, INSURANCE COPAYS & INVOICES */}
        {activeView === 'billing' && (
          <BillingAndTreatmentsView
            invoices={invoices}
            patients={patients}
            selectedPatientId={selectedPatientId}
            isPrivacyMode={isPrivacyMode}
            onSelectPatient={(p) => {
              setSelectedPatientId(p.id);
              setActiveView('patient_detail');
            }}
            onPayInvoice={handlePayInvoice}
            onAddTreatmentItem={handleAddTreatmentItem}
          />
        )}

      </main>

      {/* Global AI Copilot Assistant Drawer */}
      <AICopilotDrawer
        isOpen={isAICopilotOpen}
        onClose={() => setIsAICopilotOpen(false)}
        activePatient={selectedPatient}
      />

      {/* Global Modal: New Triage Intake */}
      {showNewTriageModal && (
        <NewTriageIntakeModal
          patients={patients}
          onClose={() => setShowNewTriageModal(false)}
          onSubmitTriage={handleSubmitTriage}
        />
      )}

      {/* Global Modal: New Appointment */}
      {showNewAppointmentModal && (
        <NewAppointmentModal
          patients={patients}
          staffProfiles={staffProfiles}
          initialPatient={selectedPatient}
          onClose={() => setShowNewAppointmentModal(false)}
          onSubmitAppointment={handleSubmitAppointment}
        />
      )}

    </div>
  );
}
