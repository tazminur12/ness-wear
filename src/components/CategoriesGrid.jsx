import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useCategories } from '../hooks/useCategories';

const nameToRoute = (name = '') => {
  const n = String(name).toLowerCase();
  if (n.includes('shoe')) return '/shoes';
  if (n.includes('cloth')) return '/clothes';
  if (n.includes('accessor')) return '/accessories';
  return '/products';
};

const CategoriesGrid = () => {
  const { data: categories = [], isLoading, isError } = useCategories();

  const uiCategories = useMemo(() => {
    const fallbackFor = (name) => {
      const n = String(name).toLowerCase();
      if (n.includes('shoe')) return '/public/vite.svg';
      if (n.includes('cloth')) return '/public/vite.svg';
      if (n.includes('accessor')) return '/public/vite.svg';
      return '/public/vite.svg';
    };
    return categories.map(c => ({
      id: c.id,
      name: c.name,
      route: nameToRoute(c.name),
      image: c.image || c.thumbnail || fallbackFor(c.name),
    }));
  }, [categories]);

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Shop by Category</h2>
          <p className="text-gray-600 mt-2">Explore our collections by category</p>
        </div>

        {isLoading && (
          <div className="flex justify-center py-10">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600" />
          </div>
        )}

        {isError && (
          <div className="text-center text-red-600 py-6">Failed to load categories.</div>
        )}

        {!isLoading && !isError && (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {uiCategories.map((c) => (
              <Link
                key={c.id}
                to={c.route}
                className="group rounded-2xl overflow-hidden border border-gray-200 bg-white hover:shadow-lg transition-all duration-200"
              >
                <div className="relative aspect-4/3 w-full bg-gray-100">
                  <img
                    src={c.image}
                    alt={c.name}
                    className="w-full h-full object-cover"
                    onError={(e) => { e.currentTarget.src = '/vite.svg'; }}
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-black/60 via-black/20 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-4 flex items-center justify-between">
                    <h3 className="text-white text-lg font-semibold">{c.name}</h3>
                    <span className="inline-flex items-center justify-center w-9 h-9 rounded-full bg-white/90 text-gray-800 group-hover:bg-white">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default CategoriesGrid;


