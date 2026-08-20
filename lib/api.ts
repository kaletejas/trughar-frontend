import { WizardInput, RecommendResponse, EnquiryInput } from './types';

const API_BASE = '';

// ── Get property recommendations ──────────────────────────────────────────────
export async function getRecommendations(input: WizardInput): Promise<RecommendResponse> {
  const res = await fetch(`${API_BASE}/api/recommend`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(input),
  });

  if (!res.ok) throw new Error('API error');
  const data = await res.json();
  if (!data.success) throw new Error(data.error || 'No results');
  return data;
}

// ── Submit an enquiry ─────────────────────────────────────────────────────────
export async function submitEnquiry(input: EnquiryInput): Promise<{ success: boolean; message: string }> {
  const res = await fetch(`${API_BASE}/api/enquiry`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(input),
  });

  if (!res.ok) throw new Error('API error');
  return res.json();
}
