import React, { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import { useProducts } from '../hooks/useProducts';
import { useCategories, useSubCategoriesByCategory } from '../hooks/useCategories';

const Shoes = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [sortBy, setSortBy] = useState('featured');
  const [priceRange, setPriceRange] = useState([0, 200]);
  const [maxPrice, setMaxPrice] = useState(200);
  const [showFilters, setShowFilters] = useState(false);

  const { data: productsData, isLoading: productsLoading } = useProducts();
  const { data: categoriesData = [] } = useCategories();
  const allProducts = useMemo(() => productsData?.products || [], [productsData]);
  const shoesCategory = useMemo(() => categoriesData.find(c => c.name === 'Shoes'), [categoriesData]);
  const shoesCategoryId = shoesCategory?.id;
  const { data: shoesSubCategories = [] } = useSubCategoriesByCategory(shoesCategoryId || undefined, { enabled: Boolean(shoesCategoryId) });
  const shoesSubCategoryNames = useMemo(() => (shoesSubCategories || []).map(s => s.name), [shoesSubCategories]);

  useEffect(() => {
    if (allProducts.length > 0) {
      const computedMax = Math.ceil(Math.max(...allProducts.map(p => Number(p.price) || 0)) || 200);
      setMaxPrice(computedMax);
      setPriceRange(() => [0, computedMax]);
    }
  }, [allProducts]);

  useEffect(() => {
    let filtered = shoesCategoryId ? allProducts.filter(p => p.categoryId === shoesCategoryId) : [];

    // Filter by backend subcategory when available, otherwise fallback to keyword buckets
    if (selectedCategory !== 'all') {
      const sub = shoesSubCategories.find(s => s.name === selectedCategory);
      if (sub) {
        filtered = filtered.filter(product => product.subCategoryId === sub.id);
      } else {
        filtered = filtered.filter(product => {
          const name = (product.name || '').toLowerCase();
          if (selectedCategory === 'sneakers') return name.includes('sneaker') || name.includes('canvas');
          if (selectedCategory === 'boots') return name.includes('boot');
          if (selectedCategory === 'slip-on') return name.includes('slip-on');
          return true;
        });
      }
    }

    // Filter by price range
    filtered = filtered.filter(product => 
      product.price >= priceRange[0] && product.price <= priceRange[1]
    );

    // Sort products
    switch (sortBy) {
      case 'price-low':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case 'newest':
        filtered.sort((a, b) => b.isNew - a.isNew);
        break;
      default:
        filtered.sort((a, b) => b.isTrending - a.isTrending);
    }

    // normalize image
    filtered = filtered.map(p => ({
      ...p,
      image: p.image || (Array.isArray(p.images) ? p.images[0] : undefined)
    }));

    setFilteredProducts(filtered);
  }, [allProducts, shoesCategoryId, selectedCategory, sortBy, priceRange, shoesSubCategories]);

  const shoesCategoriesFilter = useMemo(() => {
    if (shoesSubCategoryNames.length > 0) {
      return [
        { name: 'All Shoes', value: 'all' },
        ...shoesSubCategoryNames.map(n => ({ name: n, value: n }))
      ];
    }
    return [
      { name: 'All Shoes', value: 'all' },
      { name: 'Sneakers', value: 'sneakers' },
      { name: 'Boots', value: 'boots' },
      { name: 'Slip-On', value: 'slip-on' }
    ];
  }, [shoesSubCategoryNames]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-white text-gray-900 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold font-display mb-4">
              Trendy Footwear Collection
            </h1>
            <p className="text-base md:text-xl text-gray-600 font-body max-w-3xl mx-auto">
              Step into comfort and style with curated sneakers, boots, and slip-ons for every day.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Filters and Sort */}
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Filters */}
          <div className="lg:w-1/4">
            <div className="bg-white rounded-2xl shadow p-4 sticky top-28">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-800 font-body">Filters</h3>
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className="lg:hidden p-2 text-gray-500 hover:text-purple-600"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.207A1 1 0 013 6.5V4z" />
                  </svg>
                </button>
              </div>

              <div className={`space-y-4 ${showFilters ? 'block' : 'hidden lg:block'}`}>
                {/* Category Filter */}
                <div>
                  <h4 className="text-base font-semibold text-gray-700 mb-2 font-body">Shoe Type</h4>
                  <div className="space-y-1.5">
                    {shoesCategoriesFilter.map((category) => (
                      <button
                        key={category.value}
                        onClick={() => setSelectedCategory(category.value)}
                        className={`w-full text-left px-3 py-1.5 rounded-lg transition-all duration-200 font-body ${
                          selectedCategory === category.value
                            ? 'bg-purple-100 text-purple-700 font-semibold'
                            : 'text-gray-600 hover:bg-gray-100'
                        }`}
                      >
                        {category.name}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Size Filter */}
                <div>
                  <h4 className="text-base font-semibold text-gray-700 mb-2 font-body">Size</h4>
                  <div className="grid grid-cols-4 gap-2">
                    {Array.from({ length: 12 }, (_, i) => String(36 + i)).map((size) => (
                      <button
                        key={size}
                        className="px-2.5 py-1.5 text-xs border border-gray-200 rounded-lg hover:bg-purple-50 hover:border-purple-300 transition-all duration-200 font-body"
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Price Range */}
                <div>
                  <h4 className="text-base font-semibold text-gray-700 mb-2 font-body">Price Range</h4>
                  <div className="space-y-2">
                    <input
                      type="range"
                      min="0"
                      max={maxPrice}
                      value={priceRange[1]}
                      onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                      className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                    />
                    <div className="flex justify-between text-xs text-gray-600 font-body">
                      <span>৳{priceRange[0]}</span>
                      <span>৳{priceRange[1]}</span>
                    </div>
                  </div>
                </div>

                {/* Sort Options */}
                <div>
                  <h4 className="text-base font-semibold text-gray-700 mb-2 font-body">Sort By</h4>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="w-full px-3 py-1.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 font-body text-sm"
                  >
                    <option value="featured">Featured</option>
                    <option value="newest">Newest</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                    <option value="rating">Highest Rated</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* Products Grid */}
          <div className="lg:w-3/4">
            {/* Results Header */}
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-2xl font-bold text-gray-800 font-display">
                  {selectedCategory === 'all' ? 'All Shoes' : selectedCategory.charAt(0).toUpperCase() + selectedCategory.slice(1)}s
                </h2>
                <p className="text-gray-600 font-body">
                  {productsLoading ? 'Loading products...' : `${filteredProducts.length} products found`}
                </p>
              </div>
            </div>

            {/* Products Grid */}
            {productsLoading ? (
              <div className="flex items-center justify-center py-16">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
              </div>
            ) : filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-600 mb-2 font-body">No shoes found</h3>
                <p className="text-gray-500 font-body">Try adjusting your filters to see more results.</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Featured Categories Section */}
      <div className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 font-display mb-4">
              Popular Shoe Styles
            </h2>
            <p className="text-gray-600 font-body max-w-2xl mx-auto">
              Discover the latest trends in sneakers, boots, and more
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {shoesCategoriesFilter.slice(1).map((category) => (
              <Link
                key={category.value}
                to={`/shoes?category=${category.value}`}
                onClick={() => setSelectedCategory(category.value)}
                className="group"
              >
                <div className="bg-linear-to-br from-purple-50 to-pink-50 rounded-2xl p-8 text-center hover:shadow-xl transition-all duration-300 group-hover:scale-105">
                  <div className="w-16 h-16 bg-linear-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-2 font-body group-hover:text-purple-600 transition-colors">
                    {category.name}
                  </h3>
                  <p className="text-gray-600 font-body">
                    {productsLoading ? '-' : (shoesCategoryId ? allProducts.filter(p => p.categoryId === shoesCategoryId).filter(p => {
                      const name = (p.name || '').toLowerCase();
                      if (category.value === 'sneakers') return name.includes('sneaker') || name.includes('canvas');
                      if (category.value === 'boots') return name.includes('boot');
                      if (category.value === 'slip-on') return name.includes('slip-on');
                      return true;
                    }).length : 0)} items
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Style Tips Section */}
      <div className="bg-linear-to-r from-purple-600 to-pink-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold font-display mb-4">
              Shoe Styling Tips
            </h2>
            <p className="text-purple-100 font-body max-w-2xl mx-auto">
              Learn how to style your footwear for the perfect everyday and weekend looks
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6">
              <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2 font-body">Street Style</h3>
              <p className="text-purple-100 font-body">
                Pair chunky sneakers with oversized tops and wide-leg pants for an effortless street look.
              </p>
            </div>
            
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6">
              <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2 font-body">Minimalist</h3>
              <p className="text-purple-100 font-body">
                Clean white sneakers work with everything - from casual jeans to elegant dresses.
              </p>
            </div>
            
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6">
              <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 4V2a1 1 0 011-1h8a1 1 0 011 1v2m0 0V1a1 1 0 011-1h2a1 1 0 011 1v18a1 1 0 01-1 1H4a1 1 0 01-1-1V4a1 1 0 011-1h2a1 1 0 011 1v3m8-3H9m0 0V1a1 1 0 011-1h2a1 1 0 011 1v3" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2 font-body">Seasonal</h3>
              <p className="text-purple-100 font-body">
                Switch to boots in autumn and winter for warmth while keeping your style sharp.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Shoes;
