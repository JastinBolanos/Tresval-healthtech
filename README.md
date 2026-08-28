# 🏥 Tresval Clinic OS — Enterprise HealthTech Suite (v3.2.0-ENT)

![Build Status](https://img.shields.io/badge/build-passing-brightgreen)
![Deployment](https://img.shields.io/badge/deployment-production-blue)
![Compliance](https://img.shields.io/badge/compliance-HIPAA%20%7C%20GDPR-success)
![Security](https://img.shields.io/badge/security-TLS_1.3-orange)

> **Sistema Integral de Gestión Clínica y Triaje Asistido por IA.** 
> Plataforma empresarial desplegada para la digitalización y orquestación operativa de redes hospitalarias y clínicas especializadas. Combina un expediente clínico electrónico (EHR) avanzado, odontograma digital interactivo, mesa de urgencias con inferencia clínica y facturación multi-sede bajo estrictos protocolos de privacidad de datos.

🌍 **[Ver Plataforma en Vivo (Producción) 🟢]** *(Enlace a Vercel/Netlify)*

---

## 🏗️ Arquitectura de Sistema y Stack Tecnológico

Este repositorio contiene la arquitectura de la aplicación cliente (Web/Edge) y el API Gateway interno, optimizados para entornos de misión crítica con tolerancia a fallos. *(Nota: Por normativas de protección de datos de salud - HIPAA/RGPD, los repositorios de bases de datos de pacientes, PACS/Dicom y microservicios de facturación fiscal permanecen privados).*

- **Core & Runtime (Edge-Optimized):**
  - `react` (`^19.0.1`) & `react-dom` para interfaces médicas reactivas y de baja latencia.
  - `typescript` (`~5.8.2`) garantizando seguridad de tipos en modelos de datos clínicos.
  - `vite` (`^6.2.3`) para compilación y empaquetado de alto rendimiento en el cliente.
- **Backend & Proxy Seguro:**
  - `express` (`^4.21.2`) como API Gateway intermedio para ofuscar credenciales.
  - `esbuild` (`^0.25.0`) para la transpilación ultrarrápida del servidor a `dist/server.cjs`.
- **Interfaz de Usuario (UI) & Diseño "Natural Tones":**
  - `tailwindcss` (`^4.1.14`) estructurando un diseño de bajo contraste visual para prevenir fatiga médica.
  - `motion` (`^12.23.24`) para microinteracciones fluidas en flujos de trabajo críticos.
  - `lucide-react` para iconografía médica estandarizada.
- **Motor de Inferencia Clínica (IA):**
  - Integración nativa con `@google/genai` (`^2.4.0`) implementando el modelo `gemini-2.5-flash` con un motor heurístico local de respaldo ante caídas de red.

---

## 🚀 Módulos Operativos (Desplegados)

### 🚨 1. Mesa de Triaje de Urgencias (Sistema Manchester)
* **Monitorización Vital:** Ingesta de signos vitales (FC, SpO₂, TA, Temperatura, Dolor EVA).
* **Clasificación Asistida:** Asignación automática de los 5 niveles de prioridad, sugerencia de códigos diagnósticos (CIE-10/ICD-10) y proyección de tiempos de espera.

### 🦷 2. Odontograma Digital Interactivo (Notación FDI)
* **Mapeo Anatómico 3D-Like:** Control de 32 piezas en 4 cuadrantes con granularidad por superficies (oclusal, mesial, distal, vestibular, lingual).
* **Registro Patológico:** Trazabilidad de caries, endodoncias, implantes, coronas y evaluación periodontal en tiempo real.

### 📋 3. Expediente Clínico Electrónico (EHR) & Notas SOAP
* **Línea Temporal Médica:** Trazabilidad inmutable de la historia del paciente con alertas automáticas de alergias (Red Flags).
* **Estructuración SOAP:** Formulación médica estandarizada (Subjetivo, Objetivo, Análisis, Plan) con descargas en formato **JSON**.

### 💳 4. Facturación, Copagos y Aseguradoras
* **Presupuestos por Fases:** Estructuración de tratamientos clínicos (Saneamiento, Restauración, Estética).
* **Cámara de Compensación:** Liquidación automática de coberturas de seguros, cálculo de copagos y exportación de auditorías a **CSV**.

### 🤖 5. Copiloto Clínico y Cumplimiento Normativo (HIPAA)
* **IA Contextual:** Asistente conversacional para doctores (resolución de contraindicaciones) y generador de pautas postoperatorias amigables para el paciente.
* **Data Masking (Privacidad):** Enmascaramiento a un clic de información sensible (DNI, teléfonos, pólizas) para protección visual en consultorios o telemedicina.

---

## 💻 Guía de Despliegue y Auditoría (Entorno Local)

Para ingenieros clínicos, auditores de QA o desarrolladores autorizados que requieran levantar el entorno de la interfaz en modo *Sandbox*:

### 1. Preparación del Entorno (Node.js v20+)
```bash
git clone [https://github.com/tu-usuario/tresval-healthtech.git](https://github.com/tu-usuario/tresval-healthtech.git)
cd tresval-healthtech
npm install
```
### 2. Configuración de Credenciales
Para habilitar el motor de inferencia (Copiloto e IA de Triaje), configure las variables de entorno. (Nota: El sistema incluye un motor heurístico de contingencia si no se provee API Key).

```Bash
cp .env.example .env
Edite .env
```
### 3. Servidor de Desarrollo Local
```Bash
npm run dev
El entorno de auditoría estará disponible en http://localhost:3000.
```

### ⚙️ 4. Herramientas de Integración y Despliegue (CI/CD)

| Comando | Descripción de la Operación Pipeline |
| :--- | :--- |
| `npm run dev` | Inicia el entorno dual (Cliente Vite + Servidor Express) con Hot-Reloading. |
| `npm run build` | Compila el frontend estático y empaqueta el backend optimizado en `dist/server.cjs`. |
| `npm start` | Inicia el servidor de producción renderizando los artefactos generados. |
| `npm run lint` | Ejecuta verificación estricta de tipos (`tsc --noEmit`) para control de calidad clínico. |

---
*Propiedad de Arquitectura de Software - Jastin Bolaños © 2026. Proyecto de Demostración Técnica.*
