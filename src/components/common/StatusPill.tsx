import React from "react";
import { useLanguage } from "../../context/LanguageContext";

export type StatusType =
  | "waiting"
  | "in_chair"
  | "in_progress"
  | "completed"
  | "discharged"
  | "paid"
  | "pending"
  | "partially_paid"
  | "overdue"
  | "scheduled";

interface StatusPillProps {
  status: StatusType | string;
  label?: string;
  className?: string;
}

export const StatusPill: React.FC<StatusPillProps> = ({ status, label, className = "" }) => {
  const { language } = useLanguage();

  const getStatusStyles = (st: string) => {
    switch (st) {
      case "paid":
      case "completed":
        return "bg-emerald-500/10 text-emerald-800 border-emerald-500/30";
      case "in_chair":
      case "in_progress":
        return "bg-blue-500/10 text-blue-800 border-blue-500/30 animate-pulse";
      case "waiting":
      case "pending":
      case "scheduled":
        return "bg-amber-500/10 text-amber-800 border-amber-500/30";
      case "partially_paid":
        return "bg-purple-500/10 text-purple-800 border-purple-500/30";
      case "overdue":
      case "discharged":
        return "bg-red-500/10 text-red-800 border-red-500/30";
      default:
        return "bg-[#E9E9E2] text-[#6B705C] border-[#E9E9E2]";
    }
  };

  const getDisplayLabel = (st: string) => {
    if (label) return label;
    if (language === "en") {
      switch (st) {
        case "paid":
          return "Paid";
        case "completed":
          return "Completed";
        case "in_chair":
          return "In Chair";
        case "in_progress":
          return "In Progress";
        case "waiting":
          return "Waiting";
        case "pending":
          return "Pending";
        case "scheduled":
          return "Scheduled";
        case "partially_paid":
          return "Partially Paid";
        case "overdue":
          return "Overdue";
        case "discharged":
          return "Discharged";
        default:
          return st;
      }
    }
    switch (st) {
      case "paid":
        return "Pagado";
      case "completed":
        return "Completado";
      case "in_chair":
        return "En Sillón";
      case "in_progress":
        return "En Atención";
      case "waiting":
        return "En Espera";
      case "pending":
        return "Pendiente";
      case "scheduled":
        return "Programado";
      case "partially_paid":
        return "Pago Parcial";
      case "overdue":
        return "Vencido";
      case "discharged":
        return "Alta Médica";
      default:
        return st;
    }
  };

  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getStatusStyles(
        status
      )} ${className}`}
    >
      {getDisplayLabel(status)}
    </span>
  );
};
