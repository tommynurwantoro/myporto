import { useState } from 'react';
import { Copy, Check } from 'lucide-react';
import { Navigation } from './Navigation';
import { AnimatedBackground } from './ui/AnimatedBackground';
import { Card } from './ui/Card';
import { Button } from './ui/Button';
import type { PaymentMethod } from '../types';
import qrGopay from '../assets/qr-gopay.jpg';
import qrBri from '../assets/qr-brimo.jpg';
import logoBca from '../assets/logo-bca.jpg';

const paymentMethods: PaymentMethod[] = [
  {
    name: 'GoPay',
    accountNumber: '0852-5817-4772',
    accountName: 'Tommy Nurwantoro',
    qrImage: qrGopay,
  },
  {
    name: 'Bank BCA',
    accountNumber: '1980005051',
    accountName: 'Tommy Nurwantoro',
    qrImage: logoBca,
  },
  {
    name: 'Bank BRI',
    accountNumber: '004401093198507',
    accountName: 'Tommy Nurwantoro',
    qrImage: qrBri,
  },
];

export function PaymentPage() {
  const [copiedAccount, setCopiedAccount] = useState<string | null>(null);

  const copyToClipboard = async (text: string, name: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedAccount(name);
      setTimeout(() => setCopiedAccount(null), 2000);
    } catch (error) {
      console.error('Failed to copy to clipboard:', error);
      // Fallback for older browsers
      const textArea = document.createElement('textarea');
      textArea.value = text;
      textArea.style.position = 'fixed';
      textArea.style.opacity = '0';
      document.body.appendChild(textArea);
      textArea.select();
      try {
        document.execCommand('copy');
        setCopiedAccount(name);
        setTimeout(() => setCopiedAccount(null), 2000);
      } catch (err) {
        console.error('Fallback copy failed:', err);
      }
      document.body.removeChild(textArea);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950 text-gray-100">
      <AnimatedBackground />
      <Navigation />
      <div className="max-w-6xl mx-auto px-6 py-16 pt-32">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4 gradient-text">Support My Work</h1>
          <p className="text-gray-400 max-w-2xl mx-auto">
            If you find my work helpful and would like to support me, you can send me a tip using any
            of the payment methods below.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {paymentMethods.map((method) => (
            <Card key={method.name} hover className="p-6">
              <h2 className="text-xl font-bold mb-4 text-center gradient-text">{method.name}</h2>

              <div className="bg-white p-4 rounded-lg mb-4">
                {method.qrImage ? (
                  <img
                    src={method.qrImage}
                    alt={`${method.name} QR Code`}
                    className="w-full h-auto"
                    loading="lazy"
                  />
                ) : (
                  <div className="bg-gray-700 w-full aspect-square rounded" aria-label="QR code not available" />
                )}
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Account Name:</span>
                  <span className="font-medium">{method.accountName}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Account Number:</span>
                  <div className="flex items-center gap-2">
                    <span className="font-medium font-mono">{method.accountNumber}</span>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => copyToClipboard(method.accountNumber, method.name)}
                      aria-label={`Copy ${method.name} account number`}
                      className="p-1 h-auto min-w-0"
                    >
                      {copiedAccount === method.name ? (
                        <Check className="w-4 h-4 text-emerald-400" aria-hidden="true" />
                      ) : (
                        <Copy className="w-4 h-4" aria-hidden="true" />
                      )}
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-gray-400">Thank you for your support! 🙏</p>
        </div>
      </div>
    </div>
  );
}
