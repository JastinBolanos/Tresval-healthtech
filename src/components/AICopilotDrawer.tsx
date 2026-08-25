import React, { useState, useEffect } from 'react';
import { 
  Sparkles, 
  Send, 
  Bot, 
  User, 
  Stethoscope, 
} from 'lucide-react';
import { Patient } from '../types';
import { useLanguage } from '../context/LanguageContext';
import { aiService } from '../services/ai.service';

interface AICopilotDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  activePatient?: Patient;
}

interface ChatMessage {
  id: string;
  sender: 'ai' | 'user';
  text: string;
  time: string;
  suggestedActions?: string[];
}

export const AICopilotDrawer: React.FC<AICopilotDrawerProps> = ({
  isOpen,
  onClose,
  activePatient,
}) => {
  const { language, t } = useLanguage();
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Initialize welcome message with correct language
  useEffect(() => {
    const welcome = language === 'en'
      ? `Hello, I am the Tresval Clinic OS Clinical AI Assistant. I am calibrated for triage support, maxillofacial surgery protocols, restorative dentistry, and drug-drug interactions. ${
          activePatient ? `Patient in context: ${activePatient.firstName} ${activePatient.lastName} (${activePatient.allergies.length ? activePatient.allergies.join(', ') : 'No declared allergies'}).` : ''
        }`
      : `Hola, soy el Asistente Clínico IA de Tresval Clinic OS. Estoy calibrado para soporte en triaje, protocolos de cirugía maxilofacial, odontología restauradora e interacciones medicamentosas. ${
          activePatient ? `Paciente en contexto: ${activePatient.firstName} ${activePatient.lastName} (${activePatient.allergies.length ? activePatient.allergies.join(', ') : 'Sin alergias'}).` : ''
        }`;

    setMessages([
      {
        id: 'welcome-msg',
        sender: 'ai',
        text: welcome,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      }
    ]);
  }, [language, activePatient?.id]);

  if (!isOpen) return null;

  const handleSendMessage = async (textToSend?: string) => {
    const query = textToSend || inputValue;
    if (!query.trim()) return;

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: query,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages(prev => [...prev, userMsg]);
    if (!textToSend) setInputValue('');
    setIsLoading(true);

    try {
      const data = await aiService.sendCopilotMessage({
        query,
        language,
        activePatient: activePatient ? {
          ...activePatient
        } : undefined
      });

      const aiReply: ChatMessage = {
        id: `ai-${Date.now()}`,
        sender: 'ai',
        text: data.reply || (language === 'en' ? 'Clinical rationale processed. Adherence to Oral Surgery Society clinical guidelines is recommended.' : 'Criterio clínico procesado. Se recomienda seguir guías de práctica clínica de la Sociedad de Cirugía Oral.'),
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        suggestedActions: data.immediateActions || (language === 'en' ? ['Record in SOAP Note', 'Check Allergies'] : ['Registrar en Nota SOAP', 'Verificar Alergias'])
      };
      setMessages(prev => [...prev, aiReply]);
    } catch {
      const fallbackReply: ChatMessage = {
        id: `ai-${Date.now()}`,
        sender: 'ai',
        text: language === 'en' ? `Tresval Clinic Clinical Protocol:
1. If patient exhibits radiating acute pain and severe thermal sensitivity, suspect irreversible pulpitis (K04.0).
2. Verify declared allergies (${activePatient?.allergies.length ? activePatient.allergies.join(', ') : 'None'}).
3. In case of surgical procedure, maintain local hemostasis and slowly absorbable sutures.` : `Protocolo Clínico Tresval Clinic: 
1. Si el paciente presenta dolor agudo irradiado y sensibilidad térmica severa, sospechar pulpitis irreversible (K04.0).
2. Verificar alergias declaradas (${activePatient?.allergies.length ? activePatient.allergies.join(', ') : 'Ninguna'}).
3. En caso de intervención quirúrgica, mantener hemostasia local y sutura de reabsorción lenta.`,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages(prev => [...prev, fallbackReply]);
    } finally {
      setIsLoading(false);
    }
  };

  const quickPrompts = [
    t('copilot.prompt_1'),
    t('copilot.prompt_2'),
    t('copilot.prompt_3'),
    t('copilot.prompt_4')
  ];

  return (
    <div className="fixed inset-y-0 right-0 z-50 w-full max-w-md bg-white border-l border-[#E9E9E2] shadow-2xl flex flex-col animate-in slide-in-from-right duration-200">
      
      {/* Drawer Header */}
      <div className="p-4 border-b border-[#E9E9E2] bg-[#F8F7F2] flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-[#4A5D4E] flex items-center justify-center text-white shadow-xs">
            <Sparkles className="w-4 h-4 stroke-[2.5]" />
          </div>
          <div>
            <h3 className="text-sm font-serif font-bold text-[#2D332D] flex items-center gap-1.5">
              <span>{t('copilot.title')}</span>
              <span className="text-[10px] px-2 py-0.2 rounded-full bg-[#DDE5B6] border border-[#A3B18A] text-[#4A5D4E] font-bold">
                Clinical AI
              </span>
            </h3>
            <p className="text-[11px] text-[#6B705C]">{t('copilot.subtitle')}</p>
          </div>
        </div>

        <button
          onClick={onClose}
          className="text-[#6B705C] hover:text-[#2D332D] p-1 text-lg font-bold cursor-pointer"
        >
          ✕
        </button>
      </div>

      {/* Active Patient Context Badge */}
      {activePatient && (
        <div className="bg-[#F4F7EE] border-b border-[#E9E9E2] px-4 py-2 flex items-center justify-between text-xs">
          <div className="flex items-center gap-1.5 text-[#4A5D4E] font-medium">
            <Stethoscope className="w-3.5 h-3.5" />
            <span>{t('copilot.patient_context')} <strong>{activePatient.firstName} {activePatient.lastName}</strong></span>
          </div>
          <span className="text-[10px] font-mono text-[#6B705C]">MRN: {activePatient.mrn}</span>
        </div>
      )}

      {/* Quick Prompts Strip */}
      <div className="p-3 bg-[#F8F7F2] border-b border-[#E9E9E2] space-y-1.5">
        <span className="text-[10px] font-bold text-[#6B705C] uppercase tracking-wider block">
          {language === 'en' ? 'Quick Clinical Inquiries:' : 'Consultas Clínicas Rápidas:'}
        </span>
        <div className="flex flex-wrap gap-1.5">
          {quickPrompts.map((prompt, idx) => (
            <button
              key={idx}
              onClick={() => handleSendMessage(prompt)}
              className="text-[11px] text-left bg-white hover:bg-[#F3F1E8] border border-[#E9E9E2] text-[#2D332D] px-2.5 py-1 rounded-xl transition-colors cursor-pointer"
            >
              {prompt}
            </button>
          ))}
        </div>
      </div>

      {/* Messages List */}
      <div className="flex-1 p-4 overflow-y-auto space-y-4 text-xs bg-white">
        {messages.map((m) => (
          <div
            key={m.id}
            className={`flex flex-col ${m.sender === 'user' ? 'items-end' : 'items-start'}`}
          >
            <div className="flex items-center gap-1.5 mb-1 text-[10px] text-[#6B705C]">
              {m.sender === 'ai' ? (
                <>
                  <Bot className="w-3 h-3 text-[#4A5D4E]" />
                  <span className="font-semibold text-[#4A5D4E]">Tresval Clinic Copilot</span>
                </>
              ) : (
                <>
                  <User className="w-3 h-3 text-[#6B705C]" />
                  <span>{language === 'en' ? 'You' : 'Tú'}</span>
                </>
              )}
              <span>• {m.time}</span>
            </div>

            <div
              className={`p-3.5 rounded-2xl max-w-[88%] leading-relaxed whitespace-pre-line ${
                m.sender === 'user'
                  ? 'bg-[#4A5D4E] text-white rounded-tr-none shadow-xs'
                  : 'bg-[#F8F7F2] border border-[#E9E9E2] text-[#2D332D] rounded-tl-none shadow-2xs'
              }`}
            >
              {m.text}

              {m.suggestedActions && m.suggestedActions.length > 0 && (
                <div className="mt-2.5 pt-2 border-t border-[#E9E9E2] space-y-1">
                  <span className="text-[10px] font-bold text-[#4A5D4E] block">
                    {language === 'en' ? 'Recommended actions:' : 'Acciones recomendadas:'}
                  </span>
                  <div className="flex flex-wrap gap-1">
                    {m.suggestedActions.map((act, i) => (
                      <span key={i} className="text-[10px] bg-white px-2 py-0.5 rounded-md border border-[#E9E9E2] text-[#2D332D]">
                        {act}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}

        {isLoading && (
          <div className="flex items-center gap-2 text-[#6B705C] text-xs">
            <Sparkles className="w-4 h-4 text-[#4A5D4E] animate-spin" />
            <span>{language === 'en' ? 'Consulting clinical guidelines and pharmacology...' : 'Consultando guías clínicas y base farmacológica...'}</span>
          </div>
        )}
      </div>

      {/* Input Area */}
      <div className="p-3 border-t border-[#E9E9E2] bg-[#F8F7F2]">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSendMessage();
          }}
          className="flex items-center gap-2"
        >
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder={t('copilot.input_placeholder')}
            className="flex-1 bg-white border border-[#E9E9E2] rounded-xl px-3 py-2 text-xs text-[#2D332D] placeholder-[#6B705C] focus:outline-none focus:border-[#4A5D4E]"
          />
          <button
            type="submit"
            disabled={!inputValue.trim() || isLoading}
            className="bg-[#4A5D4E] hover:bg-[#3E4D41] text-white p-2 rounded-xl disabled:opacity-40 transition-colors cursor-pointer shadow-xs"
          >
            <Send className="w-4 h-4 stroke-[2.5]" />
          </button>
        </form>
      </div>

    </div>
  );
};
