/**
 * HIPAA & GDPR Sensitive Data Masking Utility
 * Allows instant masking when presenting on screens, recording, or sharing.
 */

export function maskNationalId(id: string, isMasked: boolean): string {
  if (!isMasked || !id) return id;
  // e.g. "48.912.834-K" -> "** *** 834-*"
  const clean = id.trim();
  if (clean.length < 5) return '••••••';
  return `••.•••.${clean.slice(-5, -2)}-${clean.slice(-1)}`;
}

export function maskPhone(phone: string, isMasked: boolean): string {
  if (!isMasked || !phone) return phone;
  // e.g. "+34 654 220 918" -> "+34 ••• ••0 918"
  return phone.replace(/(\d{3})\s*(\d{2})/, '••• ••');
}

export function maskEmail(email: string, isMasked: boolean): string {
  if (!isMasked || !email) return email;
  const parts = email.split('@');
  if (parts.length !== 2) return '•••••@••••.com';
  const name = parts[0];
  const domain = parts[1];
  const maskedName = name.length > 2 ? `${name[0]}••••${name[name.length - 1]}` : '••••';
  return `${maskedName}@${domain}`;
}

export function maskAddress(address: string, isMasked: boolean): string {
  if (!isMasked || !address) return address;
  return 'C/ ••••••••••••, [Dirección Protegida]';
}

export function maskPolicy(policy: string, isMasked: boolean): string {
  if (!isMasked || !policy) return policy;
  return `POL-•••••-${policy.slice(-2)}`;
}
