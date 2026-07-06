import { useState, useRef, type FormEvent, type ChangeEvent } from 'react';
import { FileText, List, LogOut, Upload, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import { AnimatedBackground } from '../ui/AnimatedBackground';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { QRDisplay } from './QRDisplay';
import { useAuth } from '../../context/AuthContext';
import { createSignature } from '../../lib/signApi';
import type { SignatureRecord } from '../../types/sign';

export function SignCreatePage() {
  const { session, logout } = useAuth();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [title, setTitle] = useState('');
  const [signedAt, setSignedAt] = useState(() => new Date().toISOString().slice(0, 10));
  const [notes, setNotes] = useState('');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<SignatureRecord | null>(null);

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith('image/')) {
      setError('Please select an image file');
      return;
    }
    setImageFile(file);
    setPreview(URL.createObjectURL(file));
    setError(null);
  };

  const clearImage = () => {
    setImageFile(null);
    if (preview) URL.revokeObjectURL(preview);
    setPreview(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    setLoading(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append('title', title);
      formData.append('signed_at', signedAt);
      formData.append('notes', notes);
      if (imageFile) {
        formData.append('image', imageFile);
      }

      const record = await createSignature(formData);
      setResult(record);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create signature');
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setResult(null);
    setTitle('');
    setSignedAt(new Date().toISOString().slice(0, 10));
    setNotes('');
    clearImage();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950 text-gray-100">
      <AnimatedBackground />
      <div className="max-w-2xl mx-auto px-6 py-16">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold gradient-text">Register Signed Document</h1>
            {session && (
              <p className="text-gray-400 text-sm mt-1">Signed in as {session.email}</p>
            )}
          </div>
          <div className="flex items-center gap-2">
            <Link to="/sign/documents">
              <Button variant="secondary" size="sm">
                <List className="w-4 h-4 mr-2" aria-hidden="true" />
                All documents
              </Button>
            </Link>
            <Button variant="ghost" size="sm" onClick={logout} aria-label="Sign out">
              <LogOut className="w-4 h-4 mr-2" aria-hidden="true" />
              Sign out
            </Button>
          </div>
        </div>

        {result ? (
          <>
            <Card className="p-6">
              <div className="flex items-center gap-3 text-emerald-400 mb-2">
                <FileText className="w-5 h-5" aria-hidden="true" />
                <span className="font-semibold">Document registered successfully</span>
              </div>
              <p className="text-gray-300 font-medium">{result.title}</p>
              <p className="text-gray-500 text-sm mt-1">
                Signed {new Date(result.signed_at).toLocaleDateString()} by {result.signer_name}
              </p>
            </Card>
            <QRDisplay record={result} />
            <div className="mt-6 text-center">
              <Button variant="secondary" onClick={handleReset}>
                Register another document
              </Button>
            </div>
          </>
        ) : (
          <Card className="p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="title" className="block text-sm font-medium text-gray-300 mb-2">
                  Document title *
                </label>
                <input
                  id="title"
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Employment Contract with Acme Corp"
                  className="w-full px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-emerald-400"
                />
              </div>

              <div>
                <label htmlFor="signed_at" className="block text-sm font-medium text-gray-300 mb-2">
                  Signed date *
                </label>
                <input
                  id="signed_at"
                  type="date"
                  required
                  value={signedAt}
                  onChange={(e) => setSignedAt(e.target.value)}
                  className="w-full px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 text-gray-100 focus:outline-none focus:ring-2 focus:ring-emerald-400"
                />
              </div>

              <div>
                <label htmlFor="notes" className="block text-sm font-medium text-gray-300 mb-2">
                  Notes (optional)
                </label>
                <textarea
                  id="notes"
                  rows={3}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Counterparty, reference number, etc."
                  className="w-full px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-emerald-400 resize-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Document image (optional)
                </label>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/jpeg,image/png,image/webp,image/gif"
                  onChange={handleImageChange}
                  className="hidden"
                  id="image-upload"
                />
                {preview ? (
                  <div className="relative inline-block">
                    <img
                      src={preview}
                      alt="Document preview"
                      className="max-h-48 rounded-lg border border-gray-700"
                    />
                    <button
                      type="button"
                      onClick={clearImage}
                      className="absolute -top-2 -right-2 p-1 bg-gray-800 rounded-full text-gray-400 hover:text-red-400"
                      aria-label="Remove image"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ) : (
                  <label
                    htmlFor="image-upload"
                    className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-700 rounded-lg cursor-pointer hover:border-emerald-400/50 transition-colors"
                  >
                    <Upload className="w-8 h-8 text-gray-500 mb-2" aria-hidden="true" />
                    <span className="text-sm text-gray-400">Click to upload document image (optional)</span>
                  </label>
                )}
              </div>

              {error && (
                <p className="text-red-400 text-sm" role="alert">
                  {error}
                </p>
              )}

              <Button type="submit" variant="primary" size="lg" className="w-full" disabled={loading}>
                {loading ? 'Registering...' : 'Register & Generate QR Code'}
              </Button>
            </form>
          </Card>
        )}
      </div>
    </div>
  );
}
