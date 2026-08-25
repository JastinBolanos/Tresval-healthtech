import { useState, useMemo } from "react";
import { Invoice } from "../types";
import { exportService } from "../services/export.service";

export interface UseInvoicesProps {
  invoices: Invoice[];
  initialFilter?: Invoice["status"] | "all";
}

export function useInvoices({ invoices, initialFilter = "all" }: UseInvoicesProps) {
  const [statusFilter, setStatusFilter] = useState<Invoice["status"] | "all">(initialFilter);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedInvoiceId, setSelectedInvoiceId] = useState<string | null>(null);

  // Filtered invoices
  const filteredInvoices = useMemo(() => {
    return invoices.filter((inv) => {
      const matchesStatus = statusFilter === "all" || inv.status === statusFilter;
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        inv.invoiceNumber.toLowerCase().includes(q) ||
        inv.patientName.toLowerCase().includes(q) ||
        inv.patientMrn.toLowerCase().includes(q) ||
        inv.campusName.toLowerCase().includes(q);

      return matchesStatus && matchesSearch;
    });
  }, [invoices, statusFilter, searchQuery]);

  // Aggregate billing metrics
  const metrics = useMemo(() => {
    const totalBilled = invoices.reduce((acc, inv) => acc + inv.subtotal, 0);
    const totalInsuranceDiscount = invoices.reduce((acc, inv) => acc + inv.insuranceCoverageAmount, 0);
    const totalCopayAmount = invoices.reduce((acc, inv) => acc + inv.total, 0);
    const totalCollected = invoices.reduce((acc, inv) => acc + inv.paidAmount, 0);
    const totalOutstanding = invoices.reduce((acc, inv) => acc + inv.balanceDue, 0);
    const paidCount = invoices.filter((inv) => inv.status === "paid").length;
    const pendingCount = invoices.filter((inv) => inv.status === "pending" || inv.status === "partially_paid").length;

    return {
      totalBilled,
      totalInsuranceDiscount,
      totalCopayAmount,
      totalCollected,
      totalOutstanding,
      paidCount,
      pendingCount,
    };
  }, [invoices]);

  const exportBillingCsv = () => {
    exportService.exportInvoicesCsv(invoices);
  };

  return {
    filteredInvoices,
    statusFilter,
    setStatusFilter,
    searchQuery,
    setSearchQuery,
    selectedInvoiceId,
    setSelectedInvoiceId,
    metrics,
    exportBillingCsv,
  };
}
