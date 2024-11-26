import React, { useRef } from 'react';
import { Share2, Printer, Download } from 'lucide-react';
import { Item } from '../types';
import { toPng } from 'html-to-image';

interface ReceiptProps {
  shopName: string;
  shopAddress: string;
  items: Item[];
  currency: string;
  onPrint: () => void;
}

export default function Receipt({
  shopName,
  shopAddress,
  items,
  currency,
  onPrint,
}: ReceiptProps) {
  const receiptRef = useRef<HTMLDivElement>(null);
  const total = items.reduce((sum, item) => sum + item.quantity * item.price, 0);
  const currentDate = new Date().toLocaleDateString();
  const currentTime = new Date().toLocaleTimeString();

  const handleShare = async () => {
    if (!receiptRef.current) return;
    
    try {
      const dataUrl = await toPng(receiptRef.current);
      const blob = await (await fetch(dataUrl)).blob();
      const file = new File([blob], 'receipt.png', { type: 'image/png' });
      
      if (navigator.share && navigator.canShare?.({ files: [file] })) {
        try {
          await navigator.share({
            title: `Receipt from ${shopName}`,
            text: `Receipt from ${shopName}\nTotal: ${currency}${total.toFixed(2)}`,
            files: [file],
          });
        } catch (error) {
          downloadReceipt(dataUrl);
        }
      } else {
        downloadReceipt(dataUrl);
      }
    } catch (error) {
      console.error('Error processing receipt:', error);
    }
  };

  const downloadReceipt = (dataUrl: string) => {
    const link = document.createElement('a');
    link.href = dataUrl;
    link.download = `receipt-${shopName.toLowerCase().replace(/\s+/g, '-')}-${new Date().toISOString().split('T')[0]}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div ref={receiptRef} className="print-receipt bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 print:shadow-none print:p-0 print:mt-0">
      <div className="hidden print:block text-center mb-8">
        <h1 className="text-3xl font-bold">Receipt</h1>
      </div>
      
      <div className="flex justify-between items-start mb-8">
        <div>
          <h2 className="text-2xl font-bold dark:text-white">{shopName || 'Shop Name'}</h2>
          <p className="text-gray-600 dark:text-gray-300 mt-2">{shopAddress || 'Shop Address'}</p>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
            Date: {currentDate}
            <br />
            Time: {currentTime}
          </p>
        </div>
        <div className="flex gap-2 print:hidden">
          <button
            onClick={handleShare}
            className="inline-flex items-center gap-1 px-3 py-2 text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400 transition-colors"
            title="Share or Download Receipt"
          >
            <Share2 className="h-4 w-4" />
            <span>Share</span>
          </button>
          <button
            onClick={onPrint}
            className="inline-flex items-center gap-1 px-3 py-2 text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400 transition-colors"
            title="Print Receipt"
          >
            <Printer className="h-4 w-4" />
            <span>Print</span>
          </button>
        </div>
      </div>

      <div className="border-t border-b border-gray-200 dark:border-gray-700 py-4 my-4">
        <table className="w-full">
          <thead>
            <tr className="text-left dark:text-gray-200">
              <th className="py-2 px-6 w-2/4">Item</th>
              <th className="py-2 px-6 text-right w-20">Qty</th>
              <th className="py-2 px-6 text-right w-32">Price</th>
              <th className="py-2 px-6 text-right">Total</th>
            </tr>
          </thead>
          <tbody className="dark:text-gray-300">
            {items.map((item, index) => (
              <tr key={index} className="border-t border-gray-100 dark:border-gray-700">
                <td className="py-2 px-6">{item.name}</td>
                <td className="py-2 px-6 text-right">{item.quantity}</td>
                <td className="py-2 px-6 text-right">{currency}{item.price.toFixed(2)}</td>
                <td className="py-2 px-6 text-right">
                  {currency}{(item.quantity * item.price).toFixed(2)}
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr className="border-t border-gray-200 dark:border-gray-700 font-bold dark:text-white">
              <td colSpan={3} className="py-2 px-6">Total</td>
              <td className="py-2 px-6 text-right">{currency}{total.toFixed(2)}</td>
            </tr>
          </tfoot>
        </table>
      </div>

      <div className="text-center text-sm text-gray-500 dark:text-gray-400 footer-text">
        Thank you for your business!
      </div>
    </div>
  );
}