import { useState, useMemo } from "react";
import { Patient } from "../types";

export interface UsePatientsProps {
  patients: Patient[];
  initialSelectedId?: string;
}

export function usePatients({ patients, initialSelectedId }: UsePatientsProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<Patient["currentStatus"] | "all">("all");
  const [selectedPatientId, setSelectedPatientId] = useState<string>(
    initialSelectedId || (patients.length > 0 ? patients[0].id : "")
  );

  // Filtered patients
  const filteredPatients = useMemo(() => {
    return patients.filter((p) => {
      const matchesStatus = statusFilter === "all" || p.currentStatus === statusFilter;
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        p.firstName.toLowerCase().includes(q) ||
        p.lastName.toLowerCase().includes(q) ||
        p.mrn.toLowerCase().includes(q) ||
        p.nationalId.toLowerCase().includes(q) ||
        p.allergies.some((all) => all.toLowerCase().includes(q)) ||
        p.chronicConditions.some((cond) => cond.toLowerCase().includes(q));

      return matchesStatus && matchesSearch;
    });
  }, [patients, statusFilter, searchQuery]);

  const selectedPatient = useMemo(() => {
    return patients.find((p) => p.id === selectedPatientId) || patients[0];
  }, [patients, selectedPatientId]);

  return {
    filteredPatients,
    selectedPatient,
    selectedPatientId,
    setSelectedPatientId,
    searchQuery,
    setSearchQuery,
    statusFilter,
    setStatusFilter,
  };
}
