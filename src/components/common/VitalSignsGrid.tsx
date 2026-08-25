import React from "react";
import { Activity, Heart, Thermometer, Wind } from "lucide-react";
import { VitalSigns } from "../../types";

interface VitalSignsGridProps {
  vitals: VitalSigns;
  compact?: boolean;
}

export const VitalSignsGrid: React.FC<VitalSignsGridProps> = ({ vitals, compact = false }) => {
  return (
    <div className={`grid ${compact ? "grid-cols-2 gap-2" : "grid-cols-2 sm:grid-cols-4 gap-3"}`}>
      {/* Blood Pressure */}
      <div className="bg-[#F8F7F2] p-2.5 rounded-xl border border-[#E9E9E2]">
        <div className="flex items-center gap-1.5 text-xs text-[#6B705C] mb-1">
          <Activity className="w-3.5 h-3.5 text-[#4A5D4E]" />
          <span>PA (mmHg)</span>
        </div>
        <div className="font-semibold text-sm text-[#2D332D]">{vitals.bp || "120/80"}</div>
      </div>

      {/* Heart Rate */}
      <div className="bg-[#F8F7F2] p-2.5 rounded-xl border border-[#E9E9E2]">
        <div className="flex items-center gap-1.5 text-xs text-[#6B705C] mb-1">
          <Heart className="w-3.5 h-3.5 text-red-500" />
          <span>FC (lpm)</span>
        </div>
        <div className="font-semibold text-sm text-[#2D332D]">{vitals.hr || 75} bpm</div>
      </div>

      {/* Oxygen Saturation */}
      <div className="bg-[#F8F7F2] p-2.5 rounded-xl border border-[#E9E9E2]">
        <div className="flex items-center gap-1.5 text-xs text-[#6B705C] mb-1">
          <Wind className="w-3.5 h-3.5 text-blue-500" />
          <span>SatO₂ (%)</span>
        </div>
        <div className="font-semibold text-sm text-[#2D332D]">{vitals.spo2 || 98}%</div>
      </div>

      {/* Temperature */}
      <div className="bg-[#F8F7F2] p-2.5 rounded-xl border border-[#E9E9E2]">
        <div className="flex items-center gap-1.5 text-xs text-[#6B705C] mb-1">
          <Thermometer className="w-3.5 h-3.5 text-amber-500" />
          <span>Temp (°C)</span>
        </div>
        <div className="font-semibold text-sm text-[#2D332D]">{vitals.temp || 36.6}°C</div>
      </div>
    </div>
  );
};
