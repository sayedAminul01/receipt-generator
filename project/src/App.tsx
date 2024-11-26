import React, { useState, useEffect } from 'react';
import { Receipt as ReceiptIcon } from 'lucide-react';
import ShopDetails from './components/ShopDetails';
import ItemList from './components/ItemList';
import Receipt from './components/Receipt';
import ThemeToggle from './components/ThemeToggle';
import CurrencySelect from './components/CurrencySelect';
import { Item } from './types';

export default function App() {
  const [shopName, setShopName] = useState('');
  const [shopAddress, setShopAddress] = useState('');
  const [items, setItems] = useState<Item[]>([]);
  const [isDark, setIsDark] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('theme') === 'dark' ||
        (!localStorage.getItem('theme') && window.matchMedia('(prefers-color-scheme: dark)').matches);
    }
    return false;
  });
  const [currency, setCurrency] = useState('$');

  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDark);
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
  }, [isDark]);

  const handleAddItem = () => {
    setItems([...items, { name: '', quantity: 1, price: 0 }]);
  };

  const handleRemoveItem = (index: number) => {
    setItems(items.filter((_, i) => i !== index));
  };

  const handleUpdateItem = (index: number, field: keyof Item, value: string | number) => {
    setItems(
      items.map((item, i) =>
        i === index ? { ...item, [field]: value } : item
      )
    );
  };

  const handlePrint = () => {
    window.print();
  };

  const handleShare = async () => {
    // Sharing is handled in the Receipt component
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
      <ThemeToggle isDark={isDark} onToggle={() => setIsDark(!isDark)} />
      
      <div className="max-w-4xl mx-auto p-4 sm:p-6 lg:p-8">
        <header className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-2">
            <ReceiptIcon className="h-8 w-8 text-blue-500" />
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Receipt Generator</h1>
          </div>
          <p className="text-gray-600 dark:text-gray-400">Create professional receipts in seconds</p>
        </header>

        <div className="mb-6">
          <CurrencySelect selectedCurrency={currency} onCurrencyChange={setCurrency} />
        </div>

        <div className="grid gap-8 md:grid-cols-2">
          <div className="space-y-6">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
              <h2 className="text-xl font-semibold mb-4 dark:text-white">Shop Information</h2>
              <ShopDetails
                shopName={shopName}
                shopAddress={shopAddress}
                onShopNameChange={setShopName}
                onShopAddressChange={setShopAddress}
              />
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
              <h2 className="text-xl font-semibold mb-4 dark:text-white">Items</h2>
              <ItemList
                items={items}
                currency={currency}
                onItemAdd={handleAddItem}
                onItemRemove={handleRemoveItem}
                onItemUpdate={handleUpdateItem}
              />
            </div>
          </div>

          <div className="print:w-full">
            <div className="sticky top-6">
              <h2 className="text-xl font-semibold mb-4 print:hidden dark:text-white">Receipt Preview</h2>
              <Receipt
                shopName={shopName}
                shopAddress={shopAddress}
                items={items}
                currency={currency}
                onPrint={handlePrint}
                onShare={handleShare}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}