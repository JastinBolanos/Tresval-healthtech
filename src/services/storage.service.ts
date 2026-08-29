import { Appointment, Invoice, Patient } from "../types";

/**
 * Safe client-side storage service with fallback handling
 */
class StorageService {
  private static readonly KEYS = {
    PATIENTS: "tresval_patients_v1",
    APPOINTMENTS: "tresval_appointments_v2",
    INVOICES: "tresval_invoices_v1",
    LANGUAGE: "tresvalclinic_lang",
    LEGACY_LANG: "auraclinic_lang",
  };

  private isAvailable(): boolean {
    try {
      return typeof window !== "undefined" && typeof window.localStorage !== "undefined";
    } catch {
      return false;
    }
  }

  getItem<T>(key: string, defaultValue: T): T {
    if (!this.isAvailable()) return defaultValue;
    try {
      const item = window.localStorage.getItem(key);
      if (item === null) return defaultValue;
      return JSON.parse(item) as T;
    } catch {
      return defaultValue;
    }
  }

  setItem<T>(key: string, value: T): boolean {
    if (!this.isAvailable()) return false;
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
      return true;
    } catch {
      return false;
    }
  }

  removeItem(key: string): boolean {
    if (!this.isAvailable()) return false;
    try {
      window.localStorage.removeItem(key);
      return true;
    } catch {
      return false;
    }
  }

  // Strongly typed domain helpers
  getPatients(defaultValue: Patient[]): Patient[] {
    return this.getItem<Patient[]>(StorageService.KEYS.PATIENTS, defaultValue);
  }

  savePatients(patients: Patient[]): void {
    this.setItem(StorageService.KEYS.PATIENTS, patients);
  }

  getAppointments(defaultValue: Appointment[]): Appointment[] {
    return this.getItem<Appointment[]>(StorageService.KEYS.APPOINTMENTS, defaultValue);
  }

  saveAppointments(appointments: Appointment[]): void {
    this.setItem(StorageService.KEYS.APPOINTMENTS, appointments);
  }

  getInvoices(defaultValue: Invoice[]): Invoice[] {
    return this.getItem<Invoice[]>(StorageService.KEYS.INVOICES, defaultValue);
  }

  saveInvoices(invoices: Invoice[]): void {
    this.setItem(StorageService.KEYS.INVOICES, invoices);
  }

  getLanguage(defaultValue: "es" | "en" = "es"): "es" | "en" {
    if (!this.isAvailable()) return defaultValue;
    try {
      const lang =
        window.localStorage.getItem(StorageService.KEYS.LANGUAGE) ||
        window.localStorage.getItem(StorageService.KEYS.LEGACY_LANG);
      if (lang === "en" || lang === "es") return lang;
      return defaultValue;
    } catch {
      return defaultValue;
    }
  }

  saveLanguage(lang: "es" | "en"): void {
    if (!this.isAvailable()) return;
    try {
      window.localStorage.setItem(StorageService.KEYS.LANGUAGE, lang);
    } catch {
      // ignore
    }
  }
}

export const storageService = new StorageService();
