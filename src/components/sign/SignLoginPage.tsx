import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { GoogleLogin, type CredentialResponse } from '@react-oauth/google';
import { ShieldCheck } from 'lucide-react';
import { AnimatedBackground } from '../ui/AnimatedBackground';
import { Card } from '../ui/Card';
import { useAuth } from '../../context/AuthContext';

export function SignLoginPage() {
  const { loginWithGoogle } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const from = (location.state as { from?: string } | null)?.from ?? '/sign/create';
  const googleClientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;
  const isGoogleConfigured = Boolean(googleClientId);

  const handleSuccess = async (response: CredentialResponse) => {
    if (!response.credential) {
      setError('No credential received from Google');
      return;
    }
    setLoading(true);
    setError(null);
    try {
      await loginWithGoogle(response.credential);
      navigate(from, { replace: true });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950 text-gray-100">
      <AnimatedBackground />
      <div className="max-w-md mx-auto px-6 py-16">
        <Card className="p-8 text-center">
          <ShieldCheck className="w-12 h-12 text-emerald-400 mx-auto mb-4" aria-hidden="true" />
          <h1 className="text-2xl font-bold mb-2 gradient-text">Document Sign Registry</h1>
          <p className="text-gray-400 mb-8 text-sm">
            Sign in with your Google account to register signed documents and generate verification QR codes.
          </p>

          {error && (
            <p className="text-red-400 text-sm mb-4" role="alert">
              {error}
            </p>
          )}

          {!isGoogleConfigured ? (
            <p className="text-amber-400 text-sm" role="alert">
              Google Sign-In is not configured. Set <code className="text-amber-200">VITE_GOOGLE_CLIENT_ID</code> at
              build time (see <code className="text-amber-200">.env.example</code>).
            </p>
          ) : loading ? (
            <p className="text-gray-400">Signing in...</p>
          ) : (
            <div className="flex justify-center">
              <GoogleLogin
                onSuccess={handleSuccess}
                onError={() => setError('Google sign-in failed')}
                useOneTap={false}
                theme="filled_black"
                size="large"
                text="signin_with"
                shape="rectangular"
              />
            </div>
          )}
        </Card>
      </div>
    </div>
  );
}
