import React, { useState } from 'react';
import { 
  CreditCard, 
  DollarSign, 
  FileText, 
  ShieldCheck, 
  CheckCircle2, 
  Printer, 
  Download, 
  Sparkles, 
  ArrowRight, 
  QrCode, 
  Building2, 
  Clock, 
  Plus, 
  TrendingUp,
  Percent
} from 'lucide-react';
import { Invoice, Patient, TreatmentItem } from '../types';
import { maskNationalId, maskPolicy } from '../utils/privacy';
import { useLanguage } from '../context/LanguageContext';
import { aiService } from '../services/ai.service';
import { exportService } from '../services/export.service';

interface BillingAndTreatmentsViewProps {
  invoices: Invoice[];
  patients: Patient[];
  selectedPatientId?: string;
  isPrivacyMode: boolean;
  onSelectPatient: (patient: Patient) => void;
  onPayInvoice: (invoiceId: string, amount: number, method: Invoice['paymentMethod']) => void;
  onAddTreatmentItem: (patientId: string, item: Omit<TreatmentItem, 'id'>) => void;
}

export const BillingAndTreatmentsView: React.FC<BillingAndTreatmentsViewProps> = ({
  invoices,
  patients,
  selectedPatientId,
  isPrivacyMode,
  onSelectPatient,
  onPayInvoice,
  onAddTreatmentItem,
}) => {
  const { language, t } = useLanguage();
  const [activeTab, setActiveTab] = useState<'invoices' | 'treatment_plans'>('invoices');
  const [filterStatus, setFilterStatus] = useState<'all' | 'paid' | 'pending' | 'partially_paid'>('all');
  const [selectedInvoice, setSelectedInvoice] = useState<Invoice | null>(invoices[0] || null);
  const [showPrintModal, setShowPrintModal] = useState(false);
  const [paymentAmount, setPaymentAmount] = useState<number>(0);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<Invoice['paymentMethod']>('credit_card');

  // AI Patient Explainer State
  const [isExplainingAI, setIsExplainingAI] = useState(false);
  const [aiExplanationText, setAiExplanationText] = useState<string | null>(null);

  const filteredInvoices = invoices.filter(inv => {
    if (filterStatus === 'all') return true;
    return inv.status === filterStatus;
  });

  // Calculate totals
  const totalBilled = invoices.reduce((acc, inv) => acc + inv.total, 0);
  const totalPaid = invoices.reduce((acc, inv) => acc + inv.paidAmount, 0);
  const totalInsuranceSubsidies = invoices.reduce((acc, inv) => acc + inv.insuranceCoverageAmount, 0);
  const totalPendingBalance = invoices.reduce((acc, inv) => acc + inv.balanceDue, 0);

  const handleGenerateAIExplanation = async (inv: Invoice) => {
    setIsExplainingAI(true);
    try {
      const data = await aiService.explainTreatment({
        patientName: inv.patientName,
        treatments: inv.items.map(i => `${i.description} (${i.category})`),
        totalCost: inv.total,
        notes: language === 'en' ? 'Comprehensive dental treatment plan in Tresval Clinic OS' : 'Plan de tratamiento integral odontológico en Tresval Clinic OS',
        language
      });
      setAiExplanationText(data.patientExplanation || (language === 'en' ? 'Treatment plan explanation generated successfully.' : 'Explicación del plan de tratamiento generada con éxito.'));
    } catch (err) {
      console.error(err);
      setAiExplanationText(language === 'en'
        ? `Dear ${inv.patientName}, your treatment plan has been structured in phases to ensure pain relief, anatomical restoration, and long-term aesthetic maintenance under your insurance coverage.`
        : `Estimado/a ${inv.patientName}, su plan de tratamiento ha sido estructurado en fases para garantizar la resolución del dolor, la restauración anatómica y el mantenimiento estético a largo plazo con la cobertura de su seguro.`);
    } finally {
      setIsExplainingAI(false);
    }
  };

  const handleExecutePayment = () => {
    if (!selectedInvoice || paymentAmount <= 0) return;
    onPayInvoice(selectedInvoice.id, paymentAmount, selectedPaymentMethod);
    setPaymentAmount(0);
    // Update local selectedInvoice copy
    setSelectedInvoice(prev => prev ? {
      ...prev,
      paidAmount: prev.paidAmount + paymentAmount,
      balanceDue: Math.max(0, prev.balanceDue - paymentAmount),
      status: (prev.balanceDue - paymentAmount <= 0) ? 'paid' : 'partially_paid'
    } : null);
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 py-6 space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#E9E9E2] pb-5">
        <div>
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-[#4A5D4E] flex items-center justify-center text-white shadow-xs">
              <CreditCard className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-2xl font-serif font-bold text-[#2D332D] tracking-tight">
                {t('billing.title')}
              </h1>
              <p className="text-xs text-[#6B705C] mt-0.5">
                {t('billing.desc')}
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 bg-white p-1 rounded-2xl border border-[#E9E9E2] text-xs font-semibold shadow-xs">
          <button
            id="tab-btn-invoices"
            onClick={() => setActiveTab('invoices')}
            className={`px-4 py-2 rounded-xl transition-all cursor-pointer ${
              activeTab === 'invoices' ? 'bg-[#4A5D4E] text-white shadow-xs' : 'text-[#6B705C] hover:text-[#2D332D]'
            }`}
          >
            {t('billing.tab.invoices')} ({invoices.length})
          </button>
          <button
            id="tab-btn-treatments"
            onClick={() => setActiveTab('treatment_plans')}
            className={`px-4 py-2 rounded-xl transition-all cursor-pointer ${
              activeTab === 'treatment_plans' ? 'bg-[#4A5D4E] text-white shadow-xs' : 'text-[#6B705C] hover:text-[#2D332D]'
            }`}
          >
            {t('billing.tab.treatment_plans')}
          </button>
        </div>
      </div>

      {/* KPI Financial Overview Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white border border-[#E9E9E2] rounded-2xl p-5 shadow-xs">
          <span className="text-xs text-[#6B705C] font-medium flex items-center gap-1.5">
            <DollarSign className="w-4 h-4 text-[#4A5D4E]" /> {t('billing.kpi.copay')}
          </span>
          <div className="text-2xl font-serif font-bold text-[#2D332D] mt-1.5">${totalBilled.toLocaleString()}</div>
          <span className="text-[11px] text-[#4A5D4E] font-medium">{t('billing.kpi.copay_sub')}</span>
        </div>

        <div className="bg-white border border-[#E9E9E2] rounded-2xl p-5 shadow-xs">
          <span className="text-xs text-[#6B705C] font-medium flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-[#4A5D4E]" /> {t('billing.kpi.insurance')}
          </span>
          <div className="text-2xl font-serif font-bold text-[#4A5D4E] mt-1.5">${totalInsuranceSubsidies.toLocaleString()}</div>
          <span className="text-[11px] text-[#6B705C] font-medium">{t('billing.kpi.insurance_sub')}</span>
        </div>

        <div className="bg-white border border-[#E9E9E2] rounded-2xl p-5 shadow-xs">
          <span className="text-xs text-[#6B705C] font-medium flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-[#4A5D4E]" /> {t('billing.kpi.collected')}
          </span>
          <div className="text-2xl font-serif font-bold text-[#4A5D4E] mt-1.5">${totalPaid.toLocaleString()}</div>
          <span className="text-[11px] text-[#4A5D4E] font-medium">
            {((totalPaid / (totalBilled || 1)) * 100).toFixed(0)}% {t('billing.kpi.collected_sub')}
          </span>
        </div>

        <div className="bg-white border border-[#E9E9E2] rounded-2xl p-5 shadow-xs">
          <span className="text-xs text-[#6B705C] font-medium flex items-center gap-1.5">
            <Clock className="w-4 h-4 text-[#D4A373]" /> {t('billing.kpi.pending')}
          </span>
          <div className="text-2xl font-serif font-bold text-[#976C24] mt-1.5">${totalPendingBalance.toLocaleString()}</div>
          <span className="text-[11px] text-[#976C24] font-medium">{t('billing.kpi.pending_sub')}</span>
        </div>
      </div>

      {/* Main Content Layout */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 items-start">
        
        {/* Left Column (7 cols): Invoices List */}
        <div className="xl:col-span-7 bg-white border border-[#E9E9E2] rounded-[32px] p-6 shadow-xs space-y-4">
          
          <div className="flex items-center justify-between border-b border-[#E9E9E2] pb-3 flex-wrap gap-2">
            <h3 className="text-xs font-bold text-[#2D332D] uppercase tracking-wider flex items-center gap-2">
              <FileText className="w-4 h-4 text-[#4A5D4E]" />
              {t('billing.invoices.title')} ({filteredInvoices.length})
            </h3>

            {/* Filter buttons */}
            <div className="flex items-center gap-1.5 text-xs bg-[#F8F7F2] p-1 rounded-xl border border-[#E9E9E2]">
              <button
                onClick={() => setFilterStatus('all')}
                className={`px-3 py-1 rounded-lg font-medium transition-colors cursor-pointer ${
                  filterStatus === 'all' ? 'bg-[#4A5D4E] text-white shadow-2xs' : 'text-[#6B705C] hover:text-[#2D332D]'
                }`}
              >
                {t('billing.filter.all')}
              </button>
              <button
                onClick={() => setFilterStatus('pending')}
                className={`px-3 py-1 rounded-lg font-medium transition-colors cursor-pointer ${
                  filterStatus === 'pending' ? 'bg-[#D4A373] text-white shadow-2xs' : 'text-[#6B705C] hover:text-[#2D332D]'
                }`}
              >
                {t('billing.filter.pending')}
              </button>
              <button
                onClick={() => setFilterStatus('paid')}
                className={`px-3 py-1 rounded-lg font-medium transition-colors cursor-pointer ${
                  filterStatus === 'paid' ? 'bg-[#4A5D4E] text-white shadow-2xs' : 'text-[#6B705C] hover:text-[#2D332D]'
                }`}
              >
                {t('billing.filter.paid')}
              </button>
            </div>
          </div>

          <div className="space-y-3">
            {filteredInvoices.map((inv) => {
              const isSelected = selectedInvoice?.id === inv.id;
              const patientObj = patients.find(p => p.id === inv.patientId);

              return (
                <div
                  key={inv.id}
                  id={`invoice-item-${inv.id}`}
                  onClick={() => setSelectedInvoice(inv)}
                  className={`p-4 rounded-2xl border transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-[#DDE5B6]/30 border-[#4A5D4E] ring-1 ring-[#4A5D4E] shadow-xs'
                      : 'bg-[#F8F7F2] border-[#E9E9E2] hover:bg-[#F3F1E8]'
                  }`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-xs font-bold text-[#4A5D4E]">{inv.invoiceNumber}</span>
                        <span className={`text-[10px] font-bold px-2 py-0.2 rounded-full border ${
                          inv.status === 'paid'
                            ? 'bg-[#DDE5B6] border-[#A3B18A] text-[#4A5D4E]'
                            : inv.status === 'partially_paid'
                              ? 'bg-[#F4F7EE] border-[#A3B18A] text-[#4A5D4E]'
                              : 'bg-[#FDF9EE] border-[#D4A373] text-[#976C24]'
                        }`}>
                          {inv.status === 'paid' ? t('billing.status.paid') : inv.status === 'partially_paid' ? t('billing.status.partial') : t('billing.status.pending')}
                        </span>
                      </div>

                      <h4 className="text-sm font-bold text-[#2D332D] mt-1">
                        {inv.patientName}
                      </h4>
                      <p className="text-xs text-[#6B705C] font-mono">
                        {language === 'en' ? 'SSN/ID' : 'DNI'}: {maskNationalId(inv.patientNationalId, isPrivacyMode)} • MRN: {inv.patientMrn}
                      </p>
                    </div>

                    <div className="text-right">
                      <span className="text-xs text-[#6B705C] block">{t('billing.item.copay_total')}:</span>
                      <span className="text-lg font-bold font-mono text-[#2D332D]">${inv.total}</span>
                      {inv.balanceDue > 0 ? (
                        <div className="text-xs text-[#976C24] font-mono font-semibold">
                          {t('billing.item.remains')}: ${inv.balanceDue}
                        </div>
                      ) : (
                        <div className="text-xs text-[#4A5D4E] font-mono flex items-center gap-1 justify-end font-semibold">
                          <CheckCircle2 className="w-3.5 h-3.5" /> {t('billing.item.settled')}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Items summary */}
                  <div className="mt-2.5 pt-2 border-t border-[#E9E9E2] flex items-center justify-between text-xs text-[#6B705C]">
                    <span>{inv.items.length} {t('billing.item.procedures_included')}</span>
                    <span>{t('billing.item.insurance_coverage')}: <strong className="text-[#4A5D4E] font-mono">${inv.insuranceCoverageAmount}</strong></span>
                    <span>{t('billing.item.date')}: {inv.date}</span>
                  </div>
                </div>
              );
            })}
          </div>

        </div>

        {/* Right Column (5 cols): Active Invoice Detail & POS Payment Terminal */}
        {selectedInvoice ? (
          <div className="xl:col-span-5 bg-white border border-[#E9E9E2] rounded-[32px] p-6 shadow-xs space-y-5">
            
            {/* Header */}
            <div className="flex items-center justify-between border-b border-[#E9E9E2] pb-3">
              <div>
                <span className="text-[10px] font-bold text-[#6B705C] uppercase tracking-wider">{t('billing.detail.title')}</span>
                <h3 className="text-lg font-serif font-bold text-[#4A5D4E]">{selectedInvoice.invoiceNumber}</h3>
              </div>

              <div className="flex items-center gap-2">
                <button
                  id="btn-export-csv-invoices"
                  onClick={() => exportService.exportInvoicesCsv(invoices)}
                  className="flex items-center gap-1.5 bg-[#F8F7F2] hover:bg-[#E9E9E2] text-[#2D332D] px-3.5 py-1.5 rounded-xl text-xs font-semibold border border-[#E9E9E2] transition-colors cursor-pointer"
                  title={language === 'en' ? 'Export CSV' : 'Exportar CSV'}
                >
                  <Download className="w-3.5 h-3.5 text-[#4A5D4E]" />
                  <span>CSV</span>
                </button>
                <button
                  id="btn-print-official-invoice"
                  onClick={() => setShowPrintModal(true)}
                  className="flex items-center gap-1.5 bg-[#F8F7F2] hover:bg-[#E9E9E2] text-[#2D332D] px-3.5 py-1.5 rounded-xl text-xs font-semibold border border-[#E9E9E2] transition-colors cursor-pointer"
                >
                  <Printer className="w-3.5 h-3.5 text-[#4A5D4E]" />
                  <span>{t('billing.detail.btn_print')}</span>
                </button>
              </div>
            </div>

            {/* Patient & Clinic Stamp */}
            <div className="bg-[#F8F7F2] p-4 rounded-2xl border border-[#E9E9E2] text-xs space-y-2">
              <div className="flex justify-between">
                <span className="text-[#6B705C]">{t('billing.detail.patient')}:</span>
                <strong className="text-[#2D332D]">{selectedInvoice.patientName}</strong>
              </div>
              <div className="flex justify-between">
                <span className="text-[#6B705C]">{t('billing.detail.campus')}:</span>
                <span className="text-[#2D332D]">{selectedInvoice.campusName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#6B705C]">{t('billing.detail.claim_id')}:</span>
                <span className="text-[#4A5D4E] font-mono font-bold">{selectedInvoice.insuranceClaimId || 'N/A'}</span>
              </div>
            </div>

            {/* Itemized Treatments Breakdown */}
            <div className="space-y-2">
              <span className="text-xs font-bold text-[#2D332D] uppercase tracking-wider block">
                {t('billing.detail.procedures_breakdown')}:
              </span>
              <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
                {selectedInvoice.items.map((item, idx) => (
                  <div key={idx} className="bg-[#F8F7F2] p-3 rounded-xl border border-[#E9E9E2] text-xs space-y-1">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <span className="font-mono text-[10px] bg-white text-[#4A5D4E] px-1.5 py-0.2 rounded border border-[#E9E9E2] mr-1.5">
                          {item.code}
                        </span>
                        <strong className="text-[#2D332D]">{item.description}</strong>
                      </div>
                      <span className="font-mono font-bold text-[#2D332D] shrink-0">${item.unitPrice}</span>
                    </div>
                    <div className="flex justify-between text-[11px] text-[#6B705C] pt-0.5">
                      <span>{item.phase}</span>
                      <span className="text-[#4A5D4E] font-mono">{t('billing.detail.insurance_cover')}: -${item.insuranceDiscount}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Calculations Totals Card */}
            <div className="bg-[#F8F7F2] p-4 rounded-2xl border border-[#E9E9E2] space-y-2 text-xs">
              <div className="flex justify-between text-[#6B705C]">
                <span>{t('billing.calc.subtotal')}:</span>
                <span className="font-mono">${selectedInvoice.subtotal}</span>
              </div>
              <div className="flex justify-between text-[#4A5D4E] font-medium">
                <span>{t('billing.calc.insurance_discount')}:</span>
                <span className="font-mono">-${selectedInvoice.insuranceCoverageAmount}</span>
              </div>
              <div className="flex justify-between text-[#6B705C]">
                <span>{t('billing.calc.vat')}:</span>
                <span className="font-mono">$0 ({t('billing.calc.tax_exempt')})</span>
              </div>
              <div className="border-t border-[#E9E9E2] pt-2 flex justify-between text-sm font-bold text-[#2D332D]">
                <span>{t('billing.calc.total_copay')}:</span>
                <span className="font-mono text-base text-[#4A5D4E]">${selectedInvoice.total}</span>
              </div>
              <div className="flex justify-between text-xs font-semibold text-[#4A5D4E]">
                <span>{t('billing.calc.paid_amount')}:</span>
                <span className="font-mono">${selectedInvoice.paidAmount}</span>
              </div>
              <div className="flex justify-between text-xs font-bold text-[#976C24] border-t border-[#E9E9E2] pt-1">
                <span>{t('billing.calc.balance_due')}:</span>
                <span className="font-mono text-sm">${selectedInvoice.balanceDue}</span>
              </div>
            </div>

            {/* AI Treatment Explainer Button */}
            <div className="bg-[#F4F7EE] border border-[#A3B18A]/50 p-4 rounded-2xl space-y-2.5">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-[#4A5D4E] flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-[#4A5D4E]" />
                  {t('billing.ai.title')}
                </span>
                <button
                  onClick={() => handleGenerateAIExplanation(selectedInvoice)}
                  disabled={isExplainingAI}
                  className="text-xs bg-[#4A5D4E] hover:bg-[#3E4D41] text-white font-semibold px-3 py-1 rounded-xl transition-colors cursor-pointer"
                >
                  {isExplainingAI ? t('billing.ai.generating') : t('billing.ai.btn')}
                </button>
              </div>
              {aiExplanationText && (
                <p className="text-xs text-[#2D332D] bg-white p-3 rounded-xl border border-[#E9E9E2] leading-relaxed">
                  "{aiExplanationText}"
                </p>
              )}
            </div>

            {/* Payment Terminal (POS Simulation) if balance > 0 */}
            {selectedInvoice.balanceDue > 0 ? (
              <div className="space-y-3 pt-2 border-t border-[#E9E9E2]">
                <span className="text-xs font-bold text-[#2D332D] uppercase tracking-wider block">
                  {t('billing.pos.title')}:
                </span>
                
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="text-[10px] text-[#6B705C] block mb-1 font-medium">{t('billing.pos.amount_label')} ($):</label>
                    <input
                      id="input-payment-amount"
                      type="number"
                      max={selectedInvoice.balanceDue}
                      value={paymentAmount || selectedInvoice.balanceDue}
                      onChange={(e) => setPaymentAmount(Number(e.target.value))}
                      className="w-full bg-[#F8F7F2] border border-[#E9E9E2] rounded-xl px-3 py-2 text-xs text-[#2D332D] font-mono font-bold focus:outline-none focus:border-[#4A5D4E]"
                    />
                  </div>

                  <div>
                    <label className="text-[10px] text-[#6B705C] block mb-1 font-medium">{t('billing.pos.method_label')}:</label>
                    <select
                      id="select-payment-method"
                      value={selectedPaymentMethod}
                      onChange={(e) => setSelectedPaymentMethod(e.target.value as any)}
                      className="w-full bg-[#F8F7F2] border border-[#E9E9E2] rounded-xl px-3 py-2 text-xs text-[#2D332D] focus:outline-none focus:border-[#4A5D4E]"
                    >
                      <option value="credit_card">{t('billing.pos.card')}</option>
                      <option value="wire_transfer">{t('billing.pos.wire')}</option>
                      <option value="installments">{t('billing.pos.installments')}</option>
                      <option value="cash">{t('billing.pos.cash')}</option>
                    </select>
                  </div>
                </div>

                <button
                  id="btn-confirm-payment"
                  onClick={handleExecutePayment}
                  className="w-full py-3 px-4 rounded-2xl bg-[#4A5D4E] hover:bg-[#3E4D41] text-white font-semibold text-xs shadow-xs flex items-center justify-center gap-2 transition-all cursor-pointer"
                >
                  <CheckCircle2 className="w-4 h-4 stroke-[2.5]" />
                  <span>{t('billing.pos.process_btn')} ${paymentAmount || selectedInvoice.balanceDue}</span>
                </button>
              </div>
            ) : (
              <div className="bg-[#DDE5B6] border border-[#A3B18A] p-3.5 rounded-2xl text-center text-xs text-[#4A5D4E] font-bold flex items-center justify-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#4A5D4E]" />
                <span>{t('billing.pos.fully_paid')}</span>
              </div>
            )}

          </div>
        ) : null}

      </div>

      {/* Official Printable Invoice Modal */}
      {showPrintModal && selectedInvoice && (
        <div className="fixed inset-0 z-50 bg-[#2D332D]/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white border border-[#E9E9E2] rounded-[32px] max-w-2xl w-full p-6 shadow-2xl space-y-6 max-h-[90vh] overflow-y-auto">
            
            <div className="flex items-center justify-between border-b border-[#E9E9E2] pb-4">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-[#4A5D4E] text-white flex items-center justify-center font-bold">
                  TC
                </div>
                <div>
                  <h3 className="text-base font-serif font-bold text-[#2D332D]">{t('billing.modal.official_title')}</h3>
                  <p className="text-xs text-[#6B705C]">Tresval Clinic HealthTech Core Network</p>
                </div>
              </div>

              <button
                onClick={() => setShowPrintModal(false)}
                className="text-[#6B705C] hover:text-[#2D332D] text-xl font-bold px-2 cursor-pointer"
              >
                ✕
              </button>
            </div>

            {/* Invoice Print Sheet */}
            <div className="bg-[#F8F7F2] p-6 rounded-2xl border border-[#E9E9E2] space-y-5 text-xs text-[#2D332D]">
              
              <div className="flex justify-between border-b border-[#E9E9E2] pb-4">
                <div>
                  <h4 className="font-serif font-bold text-[#2D332D] text-sm">Tresval Clinic Metropolitano S.L.</h4>
                  <p className="text-[#6B705C]">NIF: B-89218201 • Registro Sanitario CS-9941</p>
                  <p className="text-[#6B705C]">{selectedInvoice.campusName}</p>
                </div>
                <div className="text-right">
                  <span className="font-mono text-sm font-bold text-[#4A5D4E]">{selectedInvoice.invoiceNumber}</span>
                  <p className="text-[#6B705C]">{t('billing.item.date')}: {selectedInvoice.date}</p>
                  <p className="text-[#6B705C]">{language === 'en' ? 'Due Date' : 'Vencimiento'}: {selectedInvoice.dueDate}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 bg-white p-4 rounded-xl border border-[#E9E9E2]">
                <div>
                  <span className="text-[10px] text-[#6B705C] uppercase font-bold block">{t('billing.modal.patient_info')}:</span>
                  <strong className="text-[#2D332D] text-sm">{selectedInvoice.patientName}</strong>
                  <p className="font-mono text-[#6B705C]">{language === 'en' ? 'SSN/ID' : 'DNI'}: {maskNationalId(selectedInvoice.patientNationalId, isPrivacyMode)}</p>
                  <p className="font-mono text-[#6B705C]">MRN: {selectedInvoice.patientMrn}</p>
                </div>
                <div>
                  <span className="text-[10px] text-[#6B705C] uppercase font-bold block">{t('billing.modal.insurance_coverage')}:</span>
                  <strong className="text-[#4A5D4E]">Sanitas / Adeslas Dental Plena</strong>
                  <p className="font-mono text-[#6B705C]">{t('billing.modal.claim_id')}: {selectedInvoice.insuranceClaimId}</p>
                </div>
              </div>

              {/* Items Table */}
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-[#E9E9E2] text-[11px] font-bold text-[#6B705C]">
                    <th className="py-2">{t('billing.modal.th.code')}</th>
                    <th className="py-2">{t('billing.modal.th.desc')}</th>
                    <th className="py-2 text-right">{t('billing.modal.th.price')}</th>
                    <th className="py-2 text-right">{t('billing.modal.th.insurance')}</th>
                    <th className="py-2 text-right">{t('billing.modal.th.copay')}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E9E9E2]">
                  {selectedInvoice.items.map((it, idx) => (
                    <tr key={idx} className="text-xs">
                      <td className="py-2.5 font-mono text-[#4A5D4E]">{it.code}</td>
                      <td className="py-2.5 text-[#2D332D]">{it.description}</td>
                      <td className="py-2.5 text-right font-mono">${it.unitPrice}</td>
                      <td className="py-2.5 text-right font-mono text-[#4A5D4E]">-${it.insuranceDiscount}</td>
                      <td className="py-2.5 text-right font-mono font-bold text-[#2D332D]">
                        ${it.unitPrice - it.insuranceDiscount}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {/* Total Summary */}
              <div className="border-t border-[#E9E9E2] pt-3 flex justify-between items-center text-sm font-bold">
                <div>
                  <div className="text-[10px] text-[#6B705C] font-mono">{t('billing.modal.fiscal_stamp')}:</div>
                  <div className="text-[9px] font-mono text-[#6B705C] max-w-xs truncate">{selectedInvoice.fiscalStamp}</div>
                </div>
                <div className="text-right">
                  <span className="text-xs text-[#6B705C] block font-normal">{t('billing.modal.total_liquidated')}:</span>
                  <span className="text-xl font-mono text-[#4A5D4E]">${selectedInvoice.total}</span>
                </div>
              </div>

            </div>

            <div className="flex items-center justify-between text-xs text-[#6B705C]">
              <span className="flex items-center gap-1.5">
                <QrCode className="w-4 h-4 text-[#4A5D4E]" />
                {t('billing.modal.qr_verification')}
              </span>
              <button
                onClick={() => {
                  window.print();
                }}
                className="bg-[#4A5D4E] hover:bg-[#3E4D41] text-white font-semibold px-5 py-2.5 rounded-2xl transition-colors cursor-pointer shadow-xs"
              >
                {t('billing.modal.print_doc')}
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
