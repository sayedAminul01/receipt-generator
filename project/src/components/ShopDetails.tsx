import React from 'react';
import { Building2, MapPin } from 'lucide-react';

interface ShopDetailsProps {
  shopName: string;
  shopAddress: string;
  onShopNameChange: (value: string) => void;
  onShopAddressChange: (value: string) => void;
}

export default function ShopDetails({
  shopName,
  shopAddress,
  onShopNameChange,
  onShopAddressChange,
}: ShopDetailsProps) {
  return (
    <div className="space-y-4">
      <div className="relative">
        <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
        <input
          type="text"
          placeholder="Shop Name"
          value={shopName}
          onChange={(e) => onShopNameChange(e.target.value)}
          className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>
      <div className="relative">
        <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
        <input
          type="text"
          placeholder="Shop Address"
          value={shopAddress}
          onChange={(e) => onShopAddressChange(e.target.value)}
          className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>
    </div>
  );
}