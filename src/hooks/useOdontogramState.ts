import { useState, useMemo } from "react";
import { Patient, ToothCondition, ToothState } from "../types";
import { clinicalService } from "../services/clinical.service";

export type OdontogramSurfaceKey = "occlusal" | "mesial" | "distal" | "vestibular" | "lingual";

export interface UseOdontogramStateProps {
  selectedPatient?: Patient;
  onUpdateTooth?: (patientId: string, toothNumber: number, state: Partial<ToothState>) => void;
}

export function useOdontogramState({ selectedPatient, onUpdateTooth }: UseOdontogramStateProps) {
  const [selectedToothNumber, setSelectedToothNumber] = useState<number>(16);
  const [selectedSurface, setSelectedSurface] = useState<OdontogramSurfaceKey>("occlusal");
  const [activeTool, setActiveTool] = useState<ToothCondition | "inspect">("inspect");

  // Retrieve current active tooth object
  const activeTooth = useMemo(() => {
    if (!selectedPatient) return undefined;
    return selectedPatient.dentalChart.find((t) => t.toothNumber === selectedToothNumber);
  }, [selectedPatient, selectedToothNumber]);

  // Overall chart stats
  const chartStats = useMemo(() => {
    if (!selectedPatient) return null;
    return clinicalService.computeChartStats(selectedPatient.dentalChart);
  }, [selectedPatient]);

  // Tooth quadrant information
  const quadrantInfo = useMemo(() => {
    return clinicalService.getQuadrant(selectedToothNumber);
  }, [selectedToothNumber]);

  // Apply condition tool to active tooth or specific tooth
  const applyToolToTooth = (toothNumber: number, toolName: ToothCondition | "inspect" = activeTool) => {
    if (!selectedPatient || !onUpdateTooth || toolName === "inspect") return;

    if (toolName === "healthy") {
      onUpdateTooth(selectedPatient.id, toothNumber, {
        condition: "healthy",
        surfaces: {
          occlusal: false,
          mesial: false,
          distal: false,
          vestibular: false,
          lingual: false,
        },
      });
      return;
    }

    onUpdateTooth(selectedPatient.id, toothNumber, {
      condition: toolName,
    });
  };

  return {
    selectedToothNumber,
    setSelectedToothNumber,
    selectedSurface,
    setSelectedSurface,
    activeTool,
    setActiveTool,
    activeTooth,
    chartStats,
    quadrantInfo,
    applyToolToTooth,
  };
}
