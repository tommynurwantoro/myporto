import { useEffect, useRef, useState } from 'react';
import QRCodeStyling from 'qr-code-styling';
import { motion } from 'framer-motion';
import { Copy, Download, Check, ShieldCheck } from 'lucide-react';
import { Button } from '../ui/Button';
import { Card } from '../ui/Card';
import type { SignatureRecord } from '../../types/sign';
import { getVerifyUrl } from '../../lib/signApi';
import qrLogo from '../../assets/T.png';

import { cn } from '../../utils/cn';

const BLUE = '#3b82f6';
const BLUE_DARK = '#2563eb';
const BLUE_DEEP = '#1d4ed8';

interface QRDisplayProps {
  record: SignatureRecord;
  className?: string;
  description?: string;
}

function createQRCode(data: string) {
  return new QRCodeStyling({
    width: 280,
    height: 280,
    type: 'canvas',
    data,
    image: qrLogo,
    margin: 6,
    qrOptions: { errorCorrectionLevel: 'H' },
    dotsOptions: { color: BLUE_DARK, type: 'rounded' },
    cornersSquareOptions: { color: BLUE_DEEP, type: 'extra-rounded' },
    cornersDotOptions: { color: BLUE, type: 'dot' },
    backgroundOptions: { color: '#ffffff' },
    imageOptions: {
      crossOrigin: 'anonymous',
      margin: 8,
      imageSize: 0.36,
      hideBackgroundDots: true,
    },
  });
}

async function buildBrandedDownload(
  qrCode: QRCodeStyling,
  record: SignatureRecord,
  verifyUrl: string
): Promise<string> {
  const qrBlob = await qrCode.getRawData('png');
  if (!qrBlob) throw new Error('Failed to generate QR');

  const qrBitmap = await createImageBitmap(qrBlob);
  const width = 420;
  const height = 560;
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d');
  if (!ctx) throw new Error('Canvas not supported');

  // Background
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(0, 0, width, height);

  // Top gradient bar
  const gradient = ctx.createLinearGradient(0, 0, width, 0);
  gradient.addColorStop(0, BLUE_DEEP);
  gradient.addColorStop(0.5, BLUE);
  gradient.addColorStop(1, BLUE_DARK);
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, width, 6);

  // Header text
  ctx.fillStyle = BLUE_DARK;
  ctx.font = 'bold 18px system-ui, sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText('VERIFIED SIGNATURE', width / 2, 44);

  ctx.fillStyle = '#6b7280';
  ctx.font = '13px system-ui, sans-serif';
  ctx.fillText('Scan to verify document authenticity', width / 2, 66);

  // QR with subtle shadow
  const qrSize = 280;
  const qrX = (width - qrSize) / 2;
  const qrY = 88;
  ctx.shadowColor = 'rgba(59, 130, 246, 0.25)';
  ctx.shadowBlur = 24;
  ctx.shadowOffsetY = 8;
  ctx.drawImage(qrBitmap, qrX, qrY, qrSize, qrSize);
  ctx.shadowColor = 'transparent';

  // Blue ring around QR
  ctx.strokeStyle = BLUE;
  ctx.lineWidth = 3;
  const ringPad = 10;
  ctx.beginPath();
  ctx.roundRect(qrX - ringPad, qrY - ringPad, qrSize + ringPad * 2, qrSize + ringPad * 2, 16);
  ctx.stroke();

  // Document details
  const textY = qrY + qrSize + 40;
  ctx.fillStyle = '#111827';
  ctx.font = 'bold 16px system-ui, sans-serif';
  const title = record.title.length > 42 ? `${record.title.slice(0, 39)}...` : record.title;
  ctx.fillText(title, width / 2, textY);

  ctx.fillStyle = '#4b5563';
  ctx.font = '14px system-ui, sans-serif';
  const signedDate = new Date(record.signed_at).toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
  ctx.fillText(`Signed by ${record.signer_name}`, width / 2, textY + 26);
  ctx.fillText(signedDate, width / 2, textY + 48);

  // Footer URL
  ctx.fillStyle = '#9ca3af';
  ctx.font = '11px system-ui, sans-serif';
  const shortUrl = verifyUrl.replace(/^https?:\/\//, '');
  ctx.fillText(shortUrl, width / 2, height - 28);

  ctx.fillStyle = BLUE;
  ctx.font = 'bold 11px system-ui, sans-serif';
  ctx.fillText('tommynurwantoro · document verification', width / 2, height - 12);

  return canvas.toDataURL('image/png');
}

export function QRDisplay({
  record,
  className,
  description = 'Add this branded QR to your signed document. Scanners open your official verification page.',
}: QRDisplayProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const qrCodeRef = useRef<QRCodeStyling | null>(null);
  const [copied, setCopied] = useState(false);
  const [downloading, setDownloading] = useState(false);
  const verifyUrl = record.verify_url ?? getVerifyUrl(record.id);

  useEffect(() => {
    if (!containerRef.current) return;

    const qr = createQRCode(verifyUrl);
    qrCodeRef.current = qr;
    containerRef.current.innerHTML = '';
    qr.append(containerRef.current);

    return () => {
      containerRef.current?.replaceChildren();
    };
  }, [verifyUrl]);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(verifyUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = async () => {
    if (!qrCodeRef.current) return;
    setDownloading(true);
    try {
      const dataUrl = await buildBrandedDownload(qrCodeRef.current, record, verifyUrl);
      const link = document.createElement('a');
      link.download = `verify-${record.id.slice(0, 8)}.png`;
      link.href = dataUrl;
      link.click();
    } finally {
      setDownloading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <Card className={cn('p-8 text-center mt-8 overflow-hidden relative', className)}>
        <div
          className="absolute inset-0 opacity-[0.04] pointer-events-none"
          style={{
            background: `radial-gradient(circle at 50% 30%, ${BLUE} 0%, transparent 60%)`,
          }}
          aria-hidden="true"
        />

        <div className="relative">
          <div className="flex items-center justify-center gap-2 mb-2">
            <ShieldCheck className="w-5 h-5 text-blue-400" aria-hidden="true" />
            <h2 className="text-xl font-semibold text-blue-400">Verification QR Code</h2>
          </div>
          <p className="text-gray-400 text-sm mb-6 max-w-md mx-auto">
            {description}
          </p>

          <div className="inline-block relative mb-4">
            <div
              className="absolute -inset-1 rounded-2xl opacity-60 blur-sm"
              style={{ background: `linear-gradient(135deg, ${BLUE}, ${BLUE_DARK})` }}
              aria-hidden="true"
            />
            <div className="relative bg-white p-3 rounded-2xl shadow-lg shadow-blue-500/10 ring-1 ring-blue-500/20">
              <div
                ref={containerRef}
                className="rounded-xl overflow-hidden"
                aria-label={`QR code for ${verifyUrl}`}
              />
            </div>
          </div>

          <p className="text-sm font-medium text-gray-300 mb-1">{record.title}</p>
          <p className="text-xs text-gray-500 break-all mb-6 max-w-sm mx-auto">{verifyUrl}</p>

          <div className="flex flex-wrap gap-3 justify-center">
            <Button variant="secondary" onClick={handleCopy}>
              {copied ? (
                <>
                  <Check className="w-4 h-4 mr-2" aria-hidden="true" />
                  Copied!
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4 mr-2" aria-hidden="true" />
                  Copy URL
                </>
              )}
            </Button>
            <Button variant="primary" onClick={handleDownload} disabled={downloading}>
              <Download className="w-4 h-4 mr-2" aria-hidden="true" />
              {downloading ? 'Preparing...' : 'Download Branded PNG'}
            </Button>
          </div>
        </div>
      </Card>
    </motion.div>
  );
}
