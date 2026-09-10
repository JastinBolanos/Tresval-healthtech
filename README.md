# 🏥 Tresval Clinic OS — Enterprise HealthTech Suite (v3.2.0-ENT)

![Build Status](https://img.shields.io/badge/build-passing-brightgreen)
![Deployment](https://img.shields.io/badge/deployment-production-blue)
![Compliance](https://img.shields.io/badge/compliance-HIPAA%20%7C%20GDPR-success)
![Security](https://img.shields.io/badge/security-TLS_1.3-orange)

> **Comprehensive Clinical Management and AI-Assisted Triage System.** 
> Enterprise platform deployed for the digitization and operational orchestration of hospital networks and specialized clinics. Combines an advanced electronic health record (EHR), an interactive digital odontogram, an emergency triage desk with clinical inference, and multi-campus billing under strict data privacy protocols.

🌍 **[View Live Platform (Production) 🟢]** *https://tresval.vercel.app/*

![Tresval Clinic OS Preview](https://github.com/user-attachments/assets/d17eac7c-cf43-43d6-b990-8ae29a76e1bd)

---

## 🎥 Clinical Ecosystem Demonstration

**🎬 Medical Dashboard & Clinical Tools**  
HealthTech interface walkthrough: from emergency triage and the interactive odontogram, to electronic health record (EHR) management and Data Masking for HIPAA compliance.

https://github.com/user-attachments/assets/afbf8d26-8bbe-40db-81d0-51f9e79af174

---

## 🏗️ System Architecture & Tech Stack

This repository contains the architecture for the client application (Web/Edge) and the internal API Gateway, optimized for mission-critical, fault-tolerant environments. *(Note: Due to healthcare data privacy regulations - HIPAA/GDPR, patient database repositories, PACS/DICOM, and fiscal billing microservices remain private).*

- **Core & Runtime (Edge-Optimized):**
  - `react` (`^19.0.1`) & `react-dom` for reactive, low-latency medical interfaces.
  - `typescript` (`~5.8.2`) ensuring type safety across clinical data models.
  - `vite` (`^6.2.3`) for high-performance compilation and client bundling.
- **Backend & Secure Proxy:**
  - `express` (`^4.21.2`) as an intermediate API Gateway to obfuscate credentials.
  - `esbuild` (`^0.25.0`) for ultra-fast server bundling to `dist/server.cjs`.
- **User Interface (UI) & "Natural Tones" Design:**
  - `tailwindcss` (`^4.1.14`) structuring a low-contrast visual design to prevent medical screen fatigue.
  - `motion` (`^12.23.24`) for fluid micro-interactions across critical workflows.
  - `lucide-react` for standardized medical iconography.
- **Clinical Inference Engine (AI):**
  - Native integration with `@google/genai` (`^2.4.0`) leveraging the `gemini-2.5-flash` model alongside a local fallback heuristic engine for offline resilience.

---

## 🚀 Operational Modules (Deployed)

### 🚨 1. Emergency Triage Desk (Manchester System)
* **Vital Signs Monitoring:** Intake of vital signs (HR, SpO₂, BP, Temperature, VAS Pain Scale).
* **Assisted Classification:** Automatic assignment of 5 priority levels, suggested diagnostic codes (ICD-10), and projected wait times.

### 🦷 2. Interactive Digital Odontogram (FDI Notation)
* **3D-Like Anatomical Mapping:** Full control over 32 teeth across 4 quadrants with surface-level granularity (occlusal, mesial, distal, vestibular, lingual).
* **Pathology Tracking:** Real-time logging of caries, root canals, implants, crowns, and periodontal assessments.

### 📋 3. Electronic Health Record (EHR) & SOAP Notes
* **Medical Timeline:** Immutable traceability of patient history featuring automatic allergy alerts (Red Flags).
* **SOAP Structuring:** Standardized clinical documentation (Subjective, Objective, Assessment, Plan) with **JSON** export capability.

### 💳 4. Billing, Copays & Insurance
* **Phased Estimates:** Structured treatment planning (Sanitation, Restoration, Aesthetics).
* **Clearinghouse & Reconciliation:** Automated insurance coverage settlements, copay calculation, and audit exports to **CSV**.

### 🤖 5. Clinical Copilot & Regulatory Compliance (HIPAA)
* **Contextual AI:** Conversational assistant for clinicians (contraindication checks) and generator of patient-friendly post-op instructions.
* **Data Masking (Privacy):** One-click masking of sensitive personal data (national ID, phone numbers, policy numbers) for visual protection in examination rooms or telemedicine.

---

## 💻 Deployment & Audit Guide (Local Environment)

For clinical engineers, QA auditors, or authorized developers setting up the interface environment in *Sandbox* mode:

### 1. Environment Preparation (Node.js v20+)
```bash
git clone https://github.com/tu-usuario/tresval-healthtech.git
cd tresval-healthtech
npm install
```

### 2. Credential Configuration
To enable the inference engine (Copilot and Triage AI), configure the environment variables. (Note: The system includes a fallback heuristic engine if no API Key is provided).

```bash
cp .env.example .env
# Edit .env with your credentials
```

### 3. Local Development Server
```bash
npm run dev
```
The audit environment will be available at `http://localhost:3000`.

### ⚙️ 4. Integration & Deployment Tools (CI/CD)

| Command | Pipeline Operation Description |
| :--- | :--- |
| `npm run dev` | Starts dual environment (Vite client + Express server) with hot reloading. |
| `npm run build` | Compiles static frontend and bundles optimized backend to `dist/server.cjs`. |
| `npm start` | Starts the production server serving the generated production artifacts. |
| `npm run lint` | Runs strict type verification (`tsc --noEmit`) for clinical quality assurance. |

---
*Software Architecture Property - Jastin Bolaños © 2026. Technical Demonstration Project.*
