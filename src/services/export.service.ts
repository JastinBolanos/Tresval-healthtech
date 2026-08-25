import { Invoice, Patient, TriageRecord } from "../types";

class ExportService {
  /**
   * Export JSON data to user download
   */
  downloadJson(data: unknown, filename: string): void {
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }

  /**
   * Export CSV data to user download
   */
  downloadCsv(rows: string[][], filename: string): void {
    const csvContent = rows.map((row) => row.map((cell) => `"${cell.replace(/"/g, '""')}"`).join(",")).join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }

  /**
   * Export Patient Clinical Dossier
   */
  exportPatientDossier(patient: Patient): void {
    const filename = `tresval-dossier-${patient.mrn}-${new Date().toISOString().split("T")[0]}.json`;
    this.downloadJson(patient, filename);
  }

  /**
   * Export Invoices to CSV summary
   */
  exportInvoicesCsv(invoices: Invoice[]): void {
    const headers = [
      "Numero Factura",
      "Paciente",
      "MRN",
      "Fecha",
      "Vencimiento",
      "Sede",
      "Subtotal",
      "Descuento Seguro",
      "Total Copago",
      "Estado",
      "Estampa Fiscal",
    ];

    const dataRows = invoices.map((inv) => [
      inv.invoiceNumber,
      inv.patientName,
      inv.patientMrn,
      inv.date,
      inv.dueDate,
      inv.campusName,
      inv.subtotal.toString(),
      inv.insuranceCoverageAmount.toString(),
      inv.total.toString(),
      inv.status,
      inv.fiscalStamp || "",
    ]);

    this.downloadCsv([headers, ...dataRows], `tresval-facturacion-${new Date().toISOString().split("T")[0]}.csv`);
  }

  /**
   * Export Triage queue summary to CSV
   */
  exportTriageQueueCsv(patientsWithTriage: Array<{ patient: Patient; triage: TriageRecord }>): void {
    const headers = [
      "MRN",
      "Paciente",
      "Nivel Triaje",
      "Motivo de Consulta",
      "Dolor EVA",
      "Box Asignado",
      "Tiempo Espera Est. (min)",
      "Doctor Asignado",
      "Estado",
    ];

    const dataRows = patientsWithTriage.map(({ patient, triage }) => [
      patient.mrn,
      `${patient.firstName} ${patient.lastName}`,
      `Nivel ${triage.level}`,
      triage.chiefComplaint,
      triage.vitals.painScore.toString(),
      triage.assignedBox,
      triage.estimatedWaitMinutes.toString(),
      triage.assignedDoctorName || "Sin asignar",
      triage.status,
    ]);

    this.downloadCsv([headers, ...dataRows], `tresval-triaje-guardia-${new Date().toISOString().split("T")[0]}.csv`);
  }
}

export const exportService = new ExportService();
