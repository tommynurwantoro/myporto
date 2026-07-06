const API_BASE = import.meta.env.VITE_API_BASE_URL || '/api';

function getToken(): string | null {
  try {
    const raw = sessionStorage.getItem('sign_auth');
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    return parsed.token ?? null;
  } catch {
    return null;
  }
}

async function request<T>(
  path: string,
  options: RequestInit = {},
  auth = false
): Promise<T> {
  const headers = new Headers(options.headers);

  if (auth) {
    const token = getToken();
    if (!token) throw new Error('Not authenticated');
    headers.set('Authorization', `Bearer ${token}`);
  }

  const res = await fetch(`${API_BASE}${path}`, { ...options, headers });

  if (!res.ok) {
    let message = res.statusText;
    try {
      const body = await res.json();
      message = body.error ?? message;
    } catch {
      // ignore
    }
    throw new Error(message);
  }

  return res.json() as Promise<T>;
}

export async function exchangeGoogleCredential(credential: string) {
  return request<{ token: string; expires_in: number; email: string; name: string }>(
    '/v1/auth/google',
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ credential }),
    }
  );
}

export async function createSignature(formData: FormData) {
  return request<import('../types/sign').CreateSignatureResponse>(
    '/v1/signatures',
    { method: 'POST', body: formData },
    true
  );
}

export async function getSignature(id: string) {
  return request<import('../types/sign').SignatureRecord>(`/v1/signatures/${id}`);
}

export async function listSignatures(limit = 10, offset = 0) {
  return request<import('../types/sign').ListSignaturesResponse>(
    `/v1/signatures?limit=${limit}&offset=${offset}`,
    {},
    true
  );
}

export function getImageUrl(record: { id: string; image_url?: string }): string {
  if (record.image_url?.startsWith('http')) return record.image_url;
  const path = record.image_url ?? `/v1/signatures/${record.id}/image`;
  return `${API_BASE}${path.startsWith('/') ? path : `/${path}`}`;
}

export function getVerifyUrl(id: string): string {
  const base = import.meta.env.VITE_VERIFY_BASE_URL || window.location.origin;
  return `${base.replace(/\/$/, '')}/verify/${id}`;
}
