import React, { useState } from 'react';
import { 
  Lock, 
  Mail, 
  Eye, 
  EyeOff, 
  AlertCircle, 
  X, 
  Loader2, 
  ShieldAlert,
  ArrowRight,
  KeyRound,
  Sparkles,
  Play
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onExploreDemo?: (targetView?: string) => void;
}

export const LoginModal: React.FC<LoginModalProps> = ({ isOpen, onClose, onExploreDemo }) => {
  const { language } = useLanguage();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [attempts, setAttempts] = useState(0);
  const [forgotMsg, setForgotMsg] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() && !password.trim()) {
      setHasError(true);
      return;
    }

    setIsLoading(true);
    setHasError(false);
    setForgotMsg(false);

    // Realistic verification delay, always returning invalid credentials
    setTimeout(() => {
      setIsLoading(false);
      setHasError(true);
      setAttempts(prev => prev + 1);
    }, 700);
  };

  const handleClose = () => {
    setHasError(false);
    setForgotMsg(false);
    setIsLoading(false);
    onClose();
  };

  const handleLaunchDemo = (view: string = 'triage') => {
    handleClose();
    if (onExploreDemo) {
      onExploreDemo(view);
    }
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/50 backdrop-blur-xs overflow-y-auto animate-in fade-in duration-200"
      onClick={(e) => {
        if (e.target === e.currentTarget) handleClose();
      }}
    >
      <div 
        className="bg-white rounded-3xl max-w-md w-full p-5 sm:p-6 shadow-2xl border border-[#E9E9E2] relative text-[#2D332D] my-auto max-h-[88vh] flex flex-col overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          id="btn-close-login-modal"
          onClick={handleClose}
          className="absolute top-4 right-4 z-10 p-2 rounded-full text-[#6B705C] hover:text-[#2D332D] hover:bg-[#F8F7F2] transition-colors cursor-pointer"
          aria-label="Cerrar"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-3.5 mb-4 shrink-0 pr-8">
          <div className="w-11 h-11 rounded-2xl bg-[#4A5D4E]/10 border border-[#4A5D4E]/20 flex items-center justify-center text-[#4A5D4E] shrink-0">
            <KeyRound className="w-5 h-5 text-[#4A5D4E]" />
          </div>
          <div>
            <h2 className="text-lg font-bold tracking-tight text-[#2D332D]">
              {language === 'en' ? 'System Sign In' : 'Iniciar Sesión'}
            </h2>
            <p className="text-xs text-[#6B705C]">
              {language === 'en' 
                ? 'Authorized clinical workstation access' 
                : 'Acceso seguro a la estación clínica autorizada'}
            </p>
          </div>
        </div>

        {/* Scrollable Content Body */}
        <div className="overflow-y-auto pr-1 -mr-1 space-y-3.5 flex-1">
          {/* Error Alert Box */}
          {hasError && (
            <div 
              id="login-error-alert"
              className="p-3 rounded-2xl bg-rose-50 border border-rose-200 text-rose-800 flex items-start gap-2.5 text-xs animate-in slide-in-from-top-2 duration-200"
            >
              <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
              <div className="flex-1">
                <p className="font-bold text-rose-900 mb-0.5">
                  {language === 'en' ? 'Authentication Failed' : 'Credenciales Incorrectas'}
                </p>
                <p className="text-rose-700 leading-relaxed text-[11px]">
                  {language === 'en'
                    ? 'The email address, username, or password entered is incorrect. Please verify your credentials and try again.'
                    : 'Los datos, correo electrónico o contraseña ingresados son incorrectos. Por favor, verifique sus datos de acceso.'}
                </p>
                {attempts > 1 && (
                  <p className="mt-1 font-semibold text-[10px] text-rose-800">
                    {language === 'en' 
                      ? `Failed attempts: ${attempts}` 
                      : `Intentos fallidos: ${attempts}`}
                  </p>
                )}
              </div>
            </div>
          )}

          {/* Forgot Password Notification */}
          {forgotMsg && (
            <div className="p-3 rounded-2xl bg-amber-50 border border-amber-200 text-amber-900 flex items-start gap-2 text-xs">
              <ShieldAlert className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
              <p className="text-[11px] leading-relaxed">
                {language === 'en'
                  ? 'For security reasons, contact the Tresval Systems Administrator to reset clinical station credentials.'
                  : 'Por motivos de seguridad y cumplimiento HIPAA, contacte al Administrador de Sistemas de Tresval Clinic para restablecer sus credenciales.'}
              </p>
            </div>
          )}

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-3">
            {/* Email / User Field */}
            <div>
              <label className="block text-xs font-semibold text-[#2D332D] mb-1">
                {language === 'en' ? 'Professional Email / ID' : 'Correo Electrónico / Identificador'}
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#A3B18A]">
                  <Mail className="w-4 h-4" />
                </div>
                <input
                  id="input-login-email"
                  type="text"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (hasError) setHasError(false);
                  }}
                  placeholder={language === 'en' ? 'doctor@tresvalclinic.com' : 'facultativo@tresvalclinic.com'}
                  className={`w-full pl-10 pr-4 py-2.5 bg-[#F8F7F2] rounded-xl text-xs sm:text-sm border transition-all focus:outline-none ${
                    hasError 
                      ? 'border-rose-400 focus:border-rose-500 focus:ring-2 focus:ring-rose-200 bg-rose-50/20' 
                      : 'border-[#E9E9E2] focus:border-[#4A5D4E] focus:ring-2 focus:ring-[#4A5D4E]/15'
                  }`}
                  autoFocus
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="block text-xs font-semibold text-[#2D332D]">
                  {language === 'en' ? 'Password' : 'Contraseña'}
                </label>
                <button
                  type="button"
                  onClick={() => setForgotMsg(true)}
                  className="text-[11px] font-medium text-[#4A5D4E] hover:underline cursor-pointer"
                >
                  {language === 'en' ? 'Forgot password?' : '¿Olvidó su contraseña?'}
                </button>
              </div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#A3B18A]">
                  <Lock className="w-4 h-4" />
                </div>
                <input
                  id="input-login-password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    if (hasError) setHasError(false);
                  }}
                  placeholder="••••••••••••"
                  className={`w-full pl-10 pr-11 py-2.5 bg-[#F8F7F2] rounded-xl text-xs sm:text-sm border transition-all focus:outline-none ${
                    hasError 
                      ? 'border-rose-400 focus:border-rose-500 focus:ring-2 focus:ring-rose-200 bg-rose-50/20' 
                      : 'border-[#E9E9E2] focus:border-[#4A5D4E] focus:ring-2 focus:ring-[#4A5D4E]/15'
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-[#6B705C] hover:text-[#2D332D] cursor-pointer"
                  tabIndex={-1}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Remember me option */}
            <div className="flex items-center gap-2 pt-0.5">
              <input
                id="checkbox-remember-me"
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="w-3.5 h-3.5 rounded border-[#E9E9E2] text-[#4A5D4E] focus:ring-[#4A5D4E] cursor-pointer"
              />
              <label htmlFor="checkbox-remember-me" className="text-xs text-[#6B705C] cursor-pointer select-none">
                {language === 'en' ? 'Keep clinical session active' : 'Mantener sesión clínica activa'}
              </label>
            </div>

            {/* Action Buttons */}
            <div className="pt-2 space-y-1.5">
              <button
                id="btn-submit-login"
                type="submit"
                disabled={isLoading}
                className="w-full py-3 px-5 bg-[#4A5D4E] hover:bg-[#3E4D41] text-white rounded-xl font-semibold text-xs sm:text-sm transition-all flex items-center justify-center gap-2 shadow-md shadow-[#4A5D4E]/15 cursor-pointer disabled:opacity-75"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin text-white" />
                    <span>{language === 'en' ? 'Verifying credentials...' : 'Verificando credenciales...'}</span>
                  </>
                ) : (
                  <>
                    <span>{language === 'en' ? 'Sign In to Portal' : 'Iniciar Sesión'}</span>
                    <ArrowRight className="w-4 h-4 text-white" />
                  </>
                )}
              </button>

              <button
                id="btn-cancel-login"
                type="button"
                onClick={handleClose}
                className="w-full py-1.5 px-4 text-xs font-semibold text-[#6B705C] hover:text-[#2D332D] hover:bg-[#F8F7F2] rounded-xl transition-colors cursor-pointer"
              >
                {language === 'en' ? 'Cancel' : 'Cancelar'}
              </button>
            </div>
          </form>

          {/* Workflow Demo Button inside Modal */}
          <div className="pt-2 border-t border-[#E9E9E2]">
            <button
              id="btn-explore-demo-modal"
              type="button"
              onClick={() => handleLaunchDemo('triage')}
              className="w-full p-3 rounded-2xl bg-gradient-to-br from-[#F4F6F0] via-[#FAF9F5] to-[#E9ECE0] hover:from-[#EDF1E7] hover:to-[#E2E7D5] border border-[#D5D8CB] transition-all flex items-center justify-between gap-3 text-left group cursor-pointer shadow-2xs hover:shadow-xs"
            >
              <div className="flex items-center gap-2.5 min-w-0">
                <div className="w-8 h-8 rounded-xl bg-[#4A5D4E] text-white flex items-center justify-center shrink-0 shadow-2xs group-hover:scale-105 transition-transform">
                  <Sparkles className="w-4 h-4 text-[#DDE5B6]" />
                </div>
                <div className="min-w-0">
                  <p className="text-xs font-bold text-[#2D332D] group-hover:text-[#4A5D4E] transition-colors truncate">
                    {language === 'en' 
                      ? 'Not an administrator?' 
                      : '¿No eres administrador?'}
                  </p>
                  <p className="text-[10px] text-[#6B705C] truncate">
                    {language === 'en'
                      ? 'You can view a workflow demonstration here'
                      : 'Puedes ver una demostración del flujo de trabajo aquí'}
                  </p>
                </div>
              </div>
              <div className="w-6 h-6 rounded-lg bg-white/80 border border-[#D5D8CB] flex items-center justify-center text-[#4A5D4E] group-hover:bg-[#4A5D4E] group-hover:text-white transition-all shrink-0">
                <Play className="w-3 h-3 fill-current" />
              </div>
            </button>
          </div>
        </div>

        {/* Security badge footer */}
        <div className="mt-3 pt-2.5 border-t border-[#E9E9E2] flex items-center justify-center gap-1.5 text-[10px] text-[#A3B18A] shrink-0">
          <Lock className="w-3 h-3" />
          <span>{language === 'en' ? '256-Bit SSL Encrypted Station • HIPAA Ready' : 'Estación Encriptada SSL 256-Bit • Cumplimiento HIPAA'}</span>
        </div>
      </div>
    </div>
  );
};
