import React from 'react';
import ProductCard from './ProductCard';
import { useNewArrivalProducts } from '../hooks/useProducts';

const NewArrivals = ({ limit = 6 }) => {
  const { data: products = [], isLoading, error } = useNewArrivalProducts(limit);

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">New Arrivals</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Fresh styles just dropped! Be the first to rock these new pieces
          </p>
        </div>

        {isLoading && (
          <div className="flex justify-center py-10">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600" />
          </div>
        )}

        {error && (
          <div className="text-center text-red-600 py-6">Failed to load new arrivals.</div>
        )}

        {!isLoading && !error && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.slice(0, limit).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default NewArrivals;


