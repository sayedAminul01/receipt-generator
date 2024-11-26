import React from 'react';
import { currencies } from '../utils/currencies';

interface CurrencySelectProps {
  selectedCurrency: string;
  onCurrencyChange: (currency: string) => void;
}

export default function CurrencySelect({ selectedCurrency, onCurrencyChange }: CurrencySelectProps) {
  return (
    <select
      value={selectedCurrency}
      onChange={(e) => onCurrencyChange(e.target.value)}
      className="px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white"
    >
      {currencies.map((currency) => (
        <option key={currency.code} value={currency.symbol}>
          {currency.symbol} - {currency.name}
        </option>
      ))}
    </select>
  );
}