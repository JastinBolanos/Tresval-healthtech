import React, { useState } from 'react';
import { 
  Calendar as CalendarIcon, 
  Clock, 
  User, 
  Plus, 
  CheckCircle2, 
  AlertCircle, 
  ChevronLeft, 
  ChevronRight, 
  Filter, 
  MapPin, 
  Stethoscope, 
  Activity,
  Bed
} from 'lucide-react';
import { Appointment, Patient, StaffProfile } from '../types';
import { useLanguage } from '../context/LanguageContext';

interface ScheduleCalendarViewProps {
  appointments: Appointment[];
  patients: Patient[];
  staffProfiles: StaffProfile[];
  onOpenNewAppointment: () => void;
  onSelectPatient: (patient: Patient) => void;
  onUpdateAppointmentStatus: (appointmentId: string, status: Appointment['status']) => void;
}

export const ScheduleCalendarView: React.FC<ScheduleCalendarViewProps> = ({
  appointments,
  patients,
  staffProfiles,
  onOpenNewAppointment,
  onSelectPatient,
  onUpdateAppointmentStatus,
}) => {
  const { language, t, tSpecialty } = useLanguage();
  const [selectedDate, setSelectedDate] = useState<string>('2026-08-22');
  const [selectedDoctorFilter, setSelectedDoctorFilter] = useState<string>('all');
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState<string>('all');

  const filteredAppointments = appointments.filter(apt => {
    const matchesDate = apt.date === selectedDate;
    const matchesDoctor = selectedDoctorFilter === 'all' || apt.doctorId === selectedDoctorFilter;
    const matchesCategory = selectedCategoryFilter === 'all' || apt.category === selectedCategoryFilter;
    return matchesDate && matchesDoctor && matchesCategory;
  });

  const getStatusBadge = (status: Appointment['status']) => {
    switch (status) {
      case 'in_chair':
        return { bg: 'bg-[#DDE5B6] border-[#A3B18A] text-[#4A5D4E]', text: t('calendar.status.in_chair') };
      case 'waiting':
        return { bg: 'bg-[#FDF9EE] border-[#D4A373] text-[#976C24]', text: t('calendar.status.waiting') };
      case 'completed':
        return { bg: 'bg-[#F8F7F2] border-[#E9E9E2] text-[#6B705C]', text: t('calendar.status.completed') };
      case 'confirmed':
      default:
        return { bg: 'bg-[#F4F7EE] border-[#A3B18A] text-[#4A5D4E]', text: t('calendar.status.confirmed') };
    }
  };

  const getCategoryColor = (category: Appointment['category']) => {
    switch (category) {
      case 'surgery':
        return 'border-l-4 border-l-[#A25032]';
      case 'implants':
        return 'border-l-4 border-l-[#4A5D4E]';
      case 'orthodontics':
        return 'border-l-4 border-l-[#D4A373]';
      case 'dental':
      default:
        return 'border-l-4 border-l-[#A3B18A]';
    }
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 py-6 space-y-6">
      
      {/* Header & Scheduling Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#E9E9E2] pb-5">
        <div>
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-[#4A5D4E] flex items-center justify-center text-white shadow-xs">
              <CalendarIcon className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-2xl font-serif font-bold text-[#2D332D] tracking-tight">
                {t('calendar.title')}
              </h1>
              <p className="text-xs text-[#6B705C] mt-0.5">
                {t('calendar.desc')}
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            id="btn-schedule-new-appointment"
            onClick={onOpenNewAppointment}
            className="flex items-center gap-2 bg-[#4A5D4E] hover:bg-[#3E4D41] text-white px-5 py-2.5 rounded-2xl font-semibold text-xs shadow-xs transition-all cursor-pointer"
          >
            <Plus className="w-4 h-4 stroke-[2.5]" />
            <span>{t('calendar.btn.new_appointment')}</span>
          </button>
        </div>
      </div>

      {/* Date Navigator & Filters Bar */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 bg-white border border-[#E9E9E2] p-4 rounded-[24px] shadow-xs">
        
        {/* Date Selector with quick forward/back */}
        <div className="flex items-center gap-2">
          <button
            id="btn-date-prev"
            onClick={() => {
              const d = new Date(selectedDate);
              d.setDate(d.getDate() - 1);
              setSelectedDate(d.toISOString().split('T')[0]);
            }}
            className="p-2 rounded-xl bg-[#F8F7F2] hover:bg-[#E9E9E2] text-[#2D332D] border border-[#E9E9E2] transition-colors cursor-pointer"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          <div className="flex items-center gap-2 bg-[#F8F7F2] px-3.5 py-1.5 rounded-xl border border-[#E9E9E2]">
            <CalendarIcon className="w-4 h-4 text-[#4A5D4E]" />
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="bg-transparent text-xs font-bold text-[#2D332D] focus:outline-none"
            />
          </div>

          <button
            id="btn-date-next"
            onClick={() => {
              const d = new Date(selectedDate);
              d.setDate(d.getDate() + 1);
              setSelectedDate(d.toISOString().split('T')[0]);
            }}
            className="p-2 rounded-xl bg-[#F8F7F2] hover:bg-[#E9E9E2] text-[#2D332D] border border-[#E9E9E2] transition-colors cursor-pointer"
          >
            <ChevronRight className="w-4 h-4" />
          </button>

          <button
            id="btn-date-today"
            onClick={() => setSelectedDate('2026-08-22')}
            className="text-xs font-semibold px-3 py-1.5 rounded-xl bg-[#DDE5B6] text-[#4A5D4E] hover:bg-[#D4DE9F] transition-colors cursor-pointer"
          >
            {t('calendar.today')}
          </button>
        </div>

        {/* Doctor & Category Selectors */}
        <div className="flex items-center gap-3 flex-wrap text-xs">
          <div className="flex items-center gap-1.5">
            <span className="text-[#6B705C] font-medium">{t('calendar.doctor_filter')}:</span>
            <select
              id="filter-schedule-doctor"
              value={selectedDoctorFilter}
              onChange={(e) => setSelectedDoctorFilter(e.target.value)}
              className="bg-[#F8F7F2] border border-[#E9E9E2] rounded-xl px-3 py-1.5 text-[#2D332D] focus:outline-none focus:border-[#4A5D4E]"
            >
              <option value="all">{t('calendar.all_staff')}</option>
              {staffProfiles.map(s => (
                <option key={s.id} value={s.id}>{s.name} ({tSpecialty(s.specialty)})</option>
              ))}
            </select>
          </div>

          <div className="flex items-center gap-1.5">
            <span className="text-[#6B705C] font-medium">{t('calendar.specialty_filter')}:</span>
            <select
              id="filter-schedule-category"
              value={selectedCategoryFilter}
              onChange={(e) => setSelectedCategoryFilter(e.target.value)}
              className="bg-[#F8F7F2] border border-[#E9E9E2] rounded-xl px-3 py-1.5 text-[#2D332D] focus:outline-none focus:border-[#4A5D4E]"
            >
              <option value="all">{t('calendar.all_specialties')}</option>
              <option value="surgery">{language === 'en' ? 'Maxillofacial Surgery' : 'Cirugía Maxilofacial'}</option>
              <option value="implants">{language === 'en' ? 'Digital Implantology' : 'Implantología Digital'}</option>
              <option value="orthodontics">{language === 'en' ? 'Invisible Orthodontics' : 'Ortodoncia Invisible'}</option>
              <option value="dental">{language === 'en' ? 'General Dentistry' : 'Odontología General'}</option>
            </select>
          </div>
        </div>

      </div>

      {/* Resource Schedule Matrix: Time vs Appointments */}
      <div className="bg-white border border-[#E9E9E2] rounded-[32px] p-6 shadow-xs space-y-4">
        
        <div className="flex items-center justify-between border-b border-[#E9E9E2] pb-3">
          <h3 className="text-xs font-bold text-[#2D332D] uppercase tracking-wider flex items-center gap-2">
            <Bed className="w-4 h-4 text-[#4A5D4E]" />
            {t('calendar.agenda_title')} • {selectedDate} ({filteredAppointments.length} {t('calendar.procedures_count')})
          </h3>
          <span className="text-xs text-[#6B705C]">
            {t('calendar.standard_intervals')}
          </span>
        </div>

        {filteredAppointments.length === 0 ? (
          <div className="text-center py-16 bg-[#F8F7F2] rounded-[24px] border border-[#E9E9E2]">
            <CalendarIcon className="w-10 h-10 text-[#A3B18A] mx-auto mb-2" />
            <h4 className="text-sm font-bold text-[#2D332D]">{t('calendar.no_appointments')}</h4>
            <p className="text-xs text-[#6B705C] mt-1 max-w-sm mx-auto">
              {t('calendar.no_appointments_desc')}
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {filteredAppointments.map((apt) => {
              const statusBadge = getStatusBadge(apt.status);
              const categoryColor = getCategoryColor(apt.category);
              const patientObj = patients.find(p => p.id === apt.patientId);

              return (
                <div
                  key={apt.id}
                  id={`appointment-card-${apt.id}`}
                  className={`bg-[#F8F7F2] hover:bg-[#F3F1E8] border border-[#E9E9E2] rounded-2xl p-4 transition-all shadow-2xs ${categoryColor}`}
                >
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                    
                    {/* Left: Time & Chair */}
                    <div className="flex items-start gap-4">
                      <div className="text-center bg-white p-2.5 rounded-xl border border-[#E9E9E2] min-w-[76px] shrink-0 shadow-2xs">
                        <span className="text-base font-bold font-mono text-[#2D332D] block">{apt.startTime}</span>
                        <span className="text-[10px] text-[#6B705C] font-mono font-medium">{apt.durationMinutes} min</span>
                      </div>

                      <div className="space-y-1">
                        <div className="flex flex-wrap items-center gap-2">
                          <h4 className="text-base font-bold text-[#2D332D]">{apt.procedureType}</h4>
                          <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full border ${statusBadge.bg}`}>
                            {statusBadge.text}
                          </span>
                        </div>

                        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-[#6B705C]">
                          <span>
                            {t('calendar.card.patient')}: <strong 
                              onClick={() => patientObj && onSelectPatient(patientObj)}
                              className="text-[#4A5D4E] font-semibold cursor-pointer hover:underline"
                            >
                              {apt.patientName}
                            </strong> ({apt.patientMrn})
                          </span>
                          <span>{t('calendar.card.doctor')}: <strong className="text-[#2D332D]">{apt.doctorName}</strong></span>
                          <span>{t('calendar.card.location')}: <strong className="text-[#2D332D]">{apt.chairOrRoom}</strong></span>
                        </div>

                        {apt.notes && (
                          <p className="text-xs text-[#6B705C] italic pt-0.5">
                            {t('calendar.card.notes')}: "{apt.notes}"
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Right: Quick Status Actions */}
                    <div className="flex items-center gap-2 self-end lg:self-center shrink-0">
                      {apt.status === 'confirmed' && (
                        <button
                          id={`btn-status-wait-${apt.id}`}
                          onClick={() => onUpdateAppointmentStatus(apt.id, 'waiting')}
                          className="bg-[#FDF9EE] hover:bg-[#FBEFD5] text-[#976C24] border border-[#D4A373] text-xs font-semibold px-3 py-1.5 rounded-xl transition-colors cursor-pointer"
                        >
                          {t('calendar.btn.mark_waiting')}
                        </button>
                      )}

                      {apt.status === 'waiting' && (
                        <button
                          id={`btn-status-chair-${apt.id}`}
                          onClick={() => onUpdateAppointmentStatus(apt.id, 'in_chair')}
                          className="bg-[#4A5D4E] hover:bg-[#3E4D41] text-white text-xs font-semibold px-3.5 py-1.5 rounded-xl shadow-xs transition-colors cursor-pointer"
                        >
                          {t('calendar.btn.move_chair')}
                        </button>
                      )}

                      {apt.status === 'in_chair' && (
                        <button
                          id={`btn-status-complete-${apt.id}`}
                          onClick={() => onUpdateAppointmentStatus(apt.id, 'completed')}
                          className="bg-[#DDE5B6] hover:bg-[#D4DE9F] text-[#4A5D4E] border border-[#A3B18A] text-xs font-bold px-3.5 py-1.5 rounded-xl transition-colors cursor-pointer"
                        >
                          {t('calendar.btn.finish_treatment')}
                        </button>
                      )}

                      {apt.status === 'completed' && (
                        <span className="text-xs text-[#6B705C] flex items-center gap-1 font-medium">
                          <CheckCircle2 className="w-4 h-4 text-[#4A5D4E]" />
                          {t('calendar.status.finished_label')}
                        </span>
                      )}
                    </div>

                  </div>
                </div>
              );
            })}
          </div>
        )}

      </div>

    </div>
  );
};
