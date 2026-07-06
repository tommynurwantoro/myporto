import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { ShieldCheck, ShieldX, Calendar, User, FileText, QrCode, ChevronUp } from 'lucide-react';
import { AnimatedBackground } from '../ui/AnimatedBackground';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { QRDisplay } from './QRDisplay';
import { getSignature, getImageUrl } from '../../lib/signApi';
import type { SignatureRecord } from '../../types/sign';

export function VerifyPage() {
  const { id } = useParams<{ id: string }>();
  const [record, setRecord] = useState<SignatureRecord | null>(null);
  const [notFound, setNotFound] = useState(!id);
  const [loading, setLoading] = useState(!!id);
  const [showQR, setShowQR] = useState(false);

  useEffect(() => {
    if (!id) return;

    let cancelled = false;

    getSignature(id)
      .then((data) => {
        if (!cancelled) setRecord(data);
      })
      .catch(() => {
        if (!cancelled) setNotFound(true);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [id]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950 text-gray-100">
      <AnimatedBackground />
      <div className="max-w-2xl mx-auto px-6 py-16">
        {loading ? (
          <div className="text-center text-gray-400">Verifying document...</div>
        ) : notFound || !record ? (
          <Card className="p-8 text-center">
            <ShieldX className="w-16 h-16 text-red-400 mx-auto mb-4" aria-hidden="true" />
            <h1 className="text-2xl font-bold mb-2">Verification Failed</h1>
            <p className="text-gray-400">
              This document could not be verified. The QR code may be invalid or the record does not exist.
            </p>
          </Card>
        ) : (
          <>
            <Card className="p-8 mb-6 border-emerald-500/30">
              <div className="flex items-center gap-3 mb-4">
                <ShieldCheck className="w-10 h-10 text-emerald-400 flex-shrink-0" aria-hidden="true" />
                <div>
                  <h1 className="text-2xl font-bold text-emerald-400">Verified Document</h1>
                  <p className="text-gray-400 text-sm">
                    This document was registered as signed by {record.signer_name}
                  </p>
                </div>
              </div>

              <div className="space-y-4 mt-6">
                <div className="flex items-start gap-3">
                  <FileText className="w-5 h-5 text-gray-500 mt-0.5 flex-shrink-0" aria-hidden="true" />
                  <div>
                    <p className="text-xs text-gray-500 uppercase tracking-wide">Title</p>
                    <p className="text-lg font-medium">{record.title}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <User className="w-5 h-5 text-gray-500 mt-0.5 flex-shrink-0" aria-hidden="true" />
                  <div>
                    <p className="text-xs text-gray-500 uppercase tracking-wide">Signed by</p>
                    <p>{record.signer_name}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Calendar className="w-5 h-5 text-gray-500 mt-0.5 flex-shrink-0" aria-hidden="true" />
                  <div>
                    <p className="text-xs text-gray-500 uppercase tracking-wide">Signed on</p>
                    <p>{new Date(record.signed_at).toLocaleDateString(undefined, {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}</p>
                  </div>
                </div>

                {record.notes && (
                  <div className="pt-2 border-t border-gray-800">
                    <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">Notes</p>
                    <p className="text-gray-300 whitespace-pre-wrap">{record.notes}</p>
                  </div>
                )}
              </div>
            </Card>

            {record.image_url && (
              <Card className="p-4 overflow-hidden mb-6">
                <p className="text-xs text-gray-500 uppercase tracking-wide mb-3">Registered document image</p>
                <img
                  src={getImageUrl(record)}
                  alt={`Document: ${record.title}`}
                  className="w-full rounded-lg border border-gray-800"
                />
              </Card>
            )}

            <div className="flex justify-center mb-6">
              <Button
                variant={showQR ? 'secondary' : 'primary'}
                onClick={() => setShowQR((v) => !v)}
                aria-expanded={showQR}
              >
                {showQR ? (
                  <>
                    <ChevronUp className="w-4 h-4 mr-2" aria-hidden="true" />
                    Hide QR Code
                  </>
                ) : (
                  <>
                    <QrCode className="w-4 h-4 mr-2" aria-hidden="true" />
                    Show QR Code
                  </>
                )}
              </Button>
            </div>

            <AnimatePresence mode="wait">
              {showQR && (
                <motion.div
                  key="verify-qr"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <QRDisplay
                    record={record}
                    className="mt-0 mb-6"
                    description="Re-download or copy the verification QR code for this document."
                  />
                </motion.div>
              )}
            </AnimatePresence>

            <p className="text-center text-xs text-gray-600 mt-6">
              Verification ID: {record.id}
            </p>
          </>
        )}
      </div>
    </div>
  );
}
