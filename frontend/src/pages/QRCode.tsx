import React, {  useState } from 'react';
import { QRCodeSVG } from 'qrcode.react';

const QRCodePage: React.FC = () => {
  const [websiteUrl] = useState("https://shivmobile.netlify.app/");

  const handleDownload = () => {
    const element = document.getElementById('qr-code');
    if (!(element instanceof SVGElement)) {
      console.error('Element is not an SVG');
      return;
    }

    const serializer = new XMLSerializer();
    const svgData = serializer.serializeToString(element);
    const blob = new Blob([svgData], { type: 'image/svg+xml' });
    const url = URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.href = url;
    link.download = 'QRCode.svg';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-6 print:bg-white">
      <div className="bg-white shadow-xl rounded-xl p-8 max-w-md w-full text-center print:shadow-none print:border-none">
        <h1 className="text-2xl font-bold mb-4">Scan to Visit Our Website</h1>

        <QRCodeSVG
          value={websiteUrl}
          size={256}
          bgColor="#ffffff"
          fgColor="#000000"
          level="H"
          includeMargin={true}
          id="qr-code"
        />

        <p className="mt-4 text-gray-600">{websiteUrl}</p>

        <button
          onClick={handleDownload}
          className="mt-6 px-6 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition print:hidden"
        >
          Download QR Code
        </button>
      </div>
    </div>
  );
};

export default QRCodePage;
