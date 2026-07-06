export interface SignatureRecord {
  id: string;
  title: string;
  signed_at: string;
  signer_name: string;
  notes?: string;
  created_at: string;
  verify_url?: string;
  image_url?: string;
}

export interface AuthSession {
  token: string;
  email: string;
  name: string;
  expiresIn: number;
}

export type CreateSignatureResponse = SignatureRecord;

export interface ListSignaturesResponse {
  items: SignatureRecord[];
  total: number;
  limit: number;
  offset: number;
}
