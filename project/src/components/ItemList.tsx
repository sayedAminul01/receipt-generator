import React from 'react';
import { Plus, Trash2 } from 'lucide-react';
import { Item } from '../types';

interface ItemListProps {
  items: Item[];
  currency: string;
  onItemAdd: () => void;
  onItemRemove: (index: number) => void;
  onItemUpdate: (index: number, field: keyof Item, value: string | number) => void;
}

export default function ItemList({
  items,
  currency,
  onItemAdd,
  onItemRemove,
  onItemUpdate,
}: ItemListProps) {
  return (
    <div className="space-y-4">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-50 dark:bg-gray-700">
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-600 dark:text-gray-200 w-2/4">Item</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-600 dark:text-gray-200 w-20">Qty</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-600 dark:text-gray-200 w-32">Price</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-600 dark:text-gray-200">Total</th>
              <th className="px-6 py-3 w-10"></th>
            </tr>
          </thead>
          <tbody>
            {items.map((item, index) => (
              <tr key={index} className="border-b border-gray-100 dark:border-gray-700">
                <td className="px-6 py-3">
                  <input
                    type="text"
                    value={item.name}
                    onChange={(e) => onItemUpdate(index, 'name', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-200 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    placeholder="Item name"
                  />
                </td>
                <td className="px-6 py-3">
                  <input
                    type="number"
                    min="1"
                    value={item.quantity}
                    onChange={(e) => onItemUpdate(index, 'quantity', parseInt(e.target.value) || 0)}
                    className="w-20 px-2 py-2 border border-gray-200 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  />
                </td>
                <td className="px-6 py-3">
                  <input
                    type="number"
                    min="0"
                    step="0.01"
                    value={item.price}
                    onChange={(e) => onItemUpdate(index, 'price', parseFloat(e.target.value) || 0)}
                    className="w-32 px-2 py-2 border border-gray-200 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  />
                </td>
                <td className="px-6 py-3 dark:text-white">
                  {currency}{(item.quantity * item.price).toFixed(2)}
                </td>
                <td className="px-6 py-3">
                  <button
                    onClick={() => onItemRemove(index)}
                    className="text-red-500 hover:text-red-700 transition-colors"
                  >
                    <Trash2 className="h-5 w-5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <button
        onClick={onItemAdd}
        className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
      >
        <Plus className="h-5 w-5" />
        Add Item
      </button>
    </div>
  );
}