import { useState } from 'react';
import { Copy, Check } from 'lucide-react';

interface PaymentMethod {
  name: string;
  accountNumber: string;
  accountName: string;
  qrImage: string;
}

export function PaymentPage() {
  const [copiedAccount, setCopiedAccount] = useState<string | null>(null);

  const paymentMethods: PaymentMethod[] = [
    {
      name: "GoPay",
      accountNumber: "0812-8740-9875",
      accountName: "Tommy Nurwantoro",
      qrImage: "/assets/qr-gopay.png"
    },
    {
      name: "OVO",
      accountNumber: "0812-8740-9875",
      accountName: "Tommy Nurwantoro",
      qrImage: "/assets/qr-ovo.png"
    },
    {
      name: "Bank BCA",
      accountNumber: "0123456789",
      accountName: "Tommy Nurwantoro",
      qrImage: "/assets/qr-bca.png"
    }
  ];

  const copyToClipboard = (text: string, name: string) => {
    navigator.clipboard.writeText(text);
    setCopiedAccount(name);
    setTimeout(() => setCopiedAccount(null), 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950 text-gray-100">
      <div className="fixed inset-0 opacity-20">
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/10 via-blue-500/10 to-purple-500/10 animate-gradient-x"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_500px_at_50%_50%,rgba(16,185,129,0.05),transparent)] animate-pulse"></div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4 gradient-text">Support My Work</h1>
          <p className="text-gray-400 max-w-2xl mx-auto">
            If you find my work helpful and would like to support me, you can send me a tip using any of the payment methods below.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {paymentMethods.map((method) => (
            <div 
              key={method.name}
              className="bg-gray-800/50 rounded-lg p-6 border border-gray-700 hover-card-effect"
            >
              <h2 className="text-xl font-bold mb-4 text-center gradient-text">{method.name}</h2>
              
              <div className="bg-white p-4 rounded-lg mb-4">
                <img 
                  src={method.qrImage} 
                  alt={`${method.name} QR Code`}
                  className="w-full h-auto"
                />
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Account Name:</span>
                  <span className="font-medium">{method.accountName}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Account Number:</span>
                  <div className="flex items-center gap-2">
                    <span className="font-medium">{method.accountNumber}</span>
                    <button
                      onClick={() => copyToClipboard(method.accountNumber, method.name)}
                      className="text-emerald-400 hover:text-emerald-300 transition-colors"
                      title="Copy account number"
                    >
                      {copiedAccount === method.name ? (
                        <Check className="w-4 h-4" />
                      ) : (
                        <Copy className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-gray-400">
            Thank you for your support! 🙏
          </p>
        </div>
      </div>
    </div>
  );
} 