import { useState, useMemo } from "react";
import { Patient, TriageLevel, TriageRecord } from "../types";

export interface UseTriageQueueProps {
  patients: Patient[];
  onUpdatePatientStatus?: (patientId: string, status: Patient["currentStatus"]) => void;
}

export function useTriageQueue({ patients }: UseTriageQueueProps) {
  const [selectedLevelFilter, setSelectedLevelFilter] = useState<TriageLevel | "all">("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedQueuePatientId, setSelectedQueuePatientId] = useState<string | null>(null);

  // Extract all active triage records sorted by Manchester urgency level (Level 1 first, then Level 2, etc.)
  const activeTriageList = useMemo(() => {
    const list: Array<{ patient: Patient; triage: TriageRecord }> = [];

    patients.forEach((p) => {
      if (p.currentTriage && p.currentStatus !== "discharged") {
        list.push({ patient: p, triage: p.currentTriage });
      }
    });

    // Sort by level ascending (1 is highest priority), then by wait time descending
    return list.sort((a, b) => {
      if (a.triage.level !== b.triage.level) {
        return a.triage.level - b.triage.level;
      }
      return b.triage.estimatedWaitMinutes - a.triage.estimatedWaitMinutes;
    });
  }, [patients]);

  // Filtered by selected triage level and search query
  const filteredTriageList = useMemo(() => {
    return activeTriageList.filter(({ patient, triage }) => {
      const matchesLevel = selectedLevelFilter === "all" || triage.level === selectedLevelFilter;
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        patient.firstName.toLowerCase().includes(q) ||
        patient.lastName.toLowerCase().includes(q) ||
        patient.mrn.toLowerCase().includes(q) ||
        triage.chiefComplaint.toLowerCase().includes(q) ||
        triage.assignedBox.toLowerCase().includes(q);

      return matchesLevel && matchesSearch;
    });
  }, [activeTriageList, selectedLevelFilter, searchQuery]);

  // Aggregate metrics
  const metrics = useMemo(() => {
    const totalWaiting = activeTriageList.filter((item) => item.triage.status === "waiting").length;
    const inProgress = activeTriageList.filter((item) => item.triage.status === "in_progress").length;
    const criticalCount = activeTriageList.filter((item) => item.triage.level <= 2).length;
    const avgWaitMinutes =
      activeTriageList.length > 0
        ? Math.round(
            activeTriageList.reduce((acc, item) => acc + item.triage.estimatedWaitMinutes, 0) /
              activeTriageList.length
          )
        : 0;

    return {
      totalActive: activeTriageList.length,
      totalWaiting,
      inProgress,
      criticalCount,
      avgWaitMinutes,
    };
  }, [activeTriageList]);

  return {
    activeTriageList,
    filteredTriageList,
    selectedLevelFilter,
    setSelectedLevelFilter,
    searchQuery,
    setSearchQuery,
    selectedQueuePatientId,
    setSelectedQueuePatientId,
    metrics,
  };
}
