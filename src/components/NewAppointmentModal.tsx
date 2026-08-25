import React, { useState } from 'react';
import { 
  Calendar as CalendarIcon, 
  Clock, 
  User, 
  Stethoscope, 
  Check, 
  Bed
} from 'lucide-react';
import { Appointment, Patient, StaffProfile } from '../types';
import { useLanguage } from '../context/LanguageContext';

interface NewAppointmentModalProps {
  patients: Patient[];
  staffProfiles: StaffProfile[];
  initialPatient?: Patient;
  onClose: () => void;
  onSubmitAppointment: (appointment: Omit<Appointment, 'id'>) => void;
}

export const NewAppointmentModal: React.FC<NewAppointmentModalProps> = ({
  patients,
  staffProfiles,
  initialPatient,
  onClose,
  onSubmitAppointment,
}) => {
  const { language, t } = useLanguage();
  const [patientId, setPatientId] = useState(initialPatient?.id || patients[0]?.id || '');
  const [doctorId, setDoctorId] = useState(staffProfiles[0]?.id || '');
  const [date, setDate] = useState('2026-08-22');
  const [startTime, setStartTime] = useState('11:00');
  const [durationMinutes, setDurationMinutes] = useState(45);
  const [procedureType, setProcedureType] = useState(
    language === 'en' ? 'Dental Filling & Restoration' : 'Obturación y Reconstrucción Dental'
  );
  const [category, setCategory] = useState<Appointment['category']>('dental');
  const [chairOrRoom, setChairOrRoom] = useState('Sillón Dental 01');
  const [notes, setNotes] = useState('');

  const activePatient = patients.find(p => p.id === patientId) || patients[0];
  const activeDoctor = staffProfiles.find(d => d.id === doctorId) || staffProfiles[0];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!activePatient || !activeDoctor) return;

    onSubmitAppointment({
      patientId: activePatient.id,
      patientName: `${activePatient.firstName} ${activePatient.lastName}`,
      patientMrn: activePatient.mrn,
      doctorId: activeDoctor.id,
      doctorName: activeDoctor.name,
      campusId: 'campus-metropolitano',
      date,
      startTime,
      durationMinutes,
      procedureType,
      category,
      status: 'confirmed',
      chairOrRoom,
      notes,
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#2D332D]/40 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white border border-[#E9E9E2] rounded-[32px] max-w-lg w-full p-6 shadow-2xl space-y-5 animate-in fade-in zoom-in-95 duration-150">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-[#E9E9E2] pb-3">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-[#DDE5B6] border border-[#A3B18A] flex items-center justify-center text-[#4A5D4E]">
              <CalendarIcon className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-serif font-bold text-[#2D332D]">{t('modal.appt.title')}</h3>
              <p className="text-xs text-[#6B705C]">{t('modal.appt.subtitle')}</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="text-[#6B705C] hover:text-[#2D332D] text-xl font-bold px-2 py-1 cursor-pointer"
          >
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          
          {/* Patient Selector */}
          <div>
            <label className="font-bold text-[#2D332D] block mb-1">{t('modal.appt.patient')}</label>
            <select
              value={patientId}
              onChange={(e) => setPatientId(e.target.value)}
              className="w-full bg-[#F8F7F2] border border-[#E9E9E2] text-[#4A5D4E] font-bold rounded-xl p-2.5 focus:outline-none focus:border-[#4A5D4E]"
            >
              {patients.map(p => (
                <option key={p.id} value={p.id}>
                  {p.firstName} {p.lastName} • MRN: {p.mrn}
                </option>
              ))}
            </select>
          </div>

          {/* Doctor & Room */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="font-bold text-[#2D332D] block mb-1">{t('modal.appt.doctor')}</label>
              <select
                value={doctorId}
                onChange={(e) => setDoctorId(e.target.value)}
                className="w-full bg-[#F8F7F2] border border-[#E9E9E2] text-[#2D332D] rounded-xl p-2.5 focus:outline-none focus:border-[#4A5D4E]"
              >
                {staffProfiles.map(s => (
                  <option key={s.id} value={s.id}>
                    {s.name} ({s.specialty.split(' ')[0]})
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="font-bold text-[#2D332D] block mb-1">{t('modal.appt.chair')}</label>
              <select
                value={chairOrRoom}
                onChange={(e) => setChairOrRoom(e.target.value)}
                className="w-full bg-[#F8F7F2] border border-[#E9E9E2] text-[#2D332D] rounded-xl p-2.5 focus:outline-none focus:border-[#4A5D4E]"
              >
                <option value="Box Quirúrgico 01">Box Quirúrgico 01</option>
                <option value="Box Quirúrgico 02">Box Quirúrgico 02</option>
                <option value="Sillón Dental 01">Sillón Dental 01</option>
                <option value="Sillón Quirúrgico 03">Sillón Quirúrgico 03</option>
              </select>
            </div>
          </div>

          {/* Date, Time & Duration */}
          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="font-bold text-[#2D332D] block mb-1">{t('modal.appt.date')}</label>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full bg-[#F8F7F2] border border-[#E9E9E2] text-[#2D332D] rounded-xl p-2 font-bold"
              />
            </div>

            <div>
              <label className="font-bold text-[#2D332D] block mb-1">{t('modal.appt.time')}</label>
              <input
                type="time"
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
                className="w-full bg-[#F8F7F2] border border-[#E9E9E2] text-[#2D332D] rounded-xl p-2 font-bold"
              />
            </div>

            <div>
              <label className="font-bold text-[#2D332D] block mb-1">{t('modal.appt.duration')}</label>
              <select
                value={durationMinutes}
                onChange={(e) => setDurationMinutes(Number(e.target.value))}
                className="w-full bg-[#F8F7F2] border border-[#E9E9E2] text-[#2D332D] rounded-xl p-2 font-bold"
              >
                <option value={30}>30 min</option>
                <option value={45}>45 min</option>
                <option value={60}>60 min</option>
                <option value={90}>90 min</option>
                <option value={120}>120 min</option>
              </select>
            </div>
          </div>

          {/* Specialty & Procedure Name */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="font-bold text-[#2D332D] block mb-1">{t('modal.appt.category')}</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as any)}
                className="w-full bg-[#F8F7F2] border border-[#E9E9E2] text-[#2D332D] rounded-xl p-2.5 focus:outline-none focus:border-[#4A5D4E]"
              >
                <option value="dental">{language === 'en' ? 'General Dentistry' : 'Odontología General'}</option>
                <option value="surgery">{language === 'en' ? 'Maxillofacial Surgery' : 'Cirugía Maxilofacial'}</option>
                <option value="implants">{language === 'en' ? 'Digital Implantology' : 'Implantología Digital'}</option>
                <option value="orthodontics">{language === 'en' ? 'Invisible Orthodontics' : 'Ortodoncia Invisible'}</option>
              </select>
            </div>

            <div>
              <label className="font-bold text-[#2D332D] block mb-1">{t('modal.appt.procedure')}</label>
              <input
                type="text"
                value={procedureType}
                onChange={(e) => setProcedureType(e.target.value)}
                className="w-full bg-[#F8F7F2] border border-[#E9E9E2] text-[#2D332D] rounded-xl p-2 focus:outline-none focus:border-[#4A5D4E]"
              />
            </div>
          </div>

          {/* Notes */}
          <div>
            <label className="font-bold text-[#2D332D] block mb-1">{t('modal.appt.notes')}</label>
            <input
              type="text"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder={language === 'en' ? 'e.g. Requires conscious sedation, premedication...' : 'Ej. Requiere sedación consciente, antibiótico previo...'}
              className="w-full bg-[#F8F7F2] border border-[#E9E9E2] text-[#2D332D] placeholder-[#6B705C] rounded-xl p-2.5 focus:outline-none focus:border-[#4A5D4E]"
            />
          </div>

          {/* Submit Button */}
          <div className="pt-3 border-t border-[#E9E9E2] flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-[#6B705C] hover:text-[#2D332D] font-semibold cursor-pointer"
            >
              {language === 'en' ? 'Cancel' : 'Cancelar'}
            </button>
            <button
              type="submit"
              className="px-5 py-2.5 rounded-2xl bg-[#4A5D4E] hover:bg-[#3E4D41] text-white font-semibold shadow-xs flex items-center gap-2 cursor-pointer"
            >
              <Check className="w-4 h-4 stroke-[2.5]" />
              <span>{t('modal.appt.submit')}</span>
            </button>
          </div>

        </form>

      </div>
    </div>
  );
};
