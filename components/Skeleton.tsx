
import React from 'react';

export const ProductSkeleton: React.FC = () => (
  <div className="animate-pulse bg-gray-50 rounded-2xl overflow-hidden border border-gray-100">
    <div className="aspect-square bg-gray-200"></div>
    <div className="p-3 space-y-2">
      <div className="h-4 bg-gray-200 rounded w-3/4"></div>
      <div className="h-4 bg-gray-200 rounded w-1/2"></div>
    </div>
  </div>
);

export const BannerSkeleton: React.FC = () => (
  <div className="animate-pulse bg-gray-200 w-full h-48 rounded-2xl"></div>
);
