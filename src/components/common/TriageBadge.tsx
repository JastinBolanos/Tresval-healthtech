import React from "react";
import { TriageLevel } from "../../types";
import { getTriageConfig } from "../../utils/clinical";
import { useLanguage } from "../../context/LanguageContext";

interface TriageBadgeProps {
  level: TriageLevel;
  showDetails?: boolean;
  language?: "es" | "en";
  className?: string;
}

export const TriageBadge: React.FC<TriageBadgeProps> = ({
  level,
  showDetails = true,
  language: propLanguage,
  className = "",
}) => {
  const { language: contextLanguage } = useLanguage();
  const activeLanguage = propLanguage || contextLanguage || "es";
  const config = getTriageConfig(level);
  const name = activeLanguage === "en" ? config.nameEn : config.nameEs;

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold border ${config.badgeBg} ${config.badgeText} ${config.badgeBorder} ${className}`}
    >
      <span className={`w-2 h-2 rounded-full ${config.dotColor} shrink-0 animate-pulse`} />
      <span>{showDetails ? name : (activeLanguage === "en" ? `Level ${level}` : `Nivel ${level}`)}</span>
    </span>
  );
};
