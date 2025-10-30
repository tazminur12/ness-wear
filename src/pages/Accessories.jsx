import React, { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import { useProducts, useProductsBySubCategory } from '../hooks/useProducts';
import { useCategories, useSubCategoriesByCategory } from '../hooks/useCategories';

const Accessories = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [sortBy, setSortBy] = useState('featured');
  const [priceRange, setPriceRange] = useState([0, 100]);
  const [maxPrice, setMaxPrice] = useState(100);
  const [showFilters, setShowFilters] = useState(false);

  const { data: productsData, isLoading: productsLoading } = useProducts();
  const { data: categoriesData = [] } = useCategories();
  const allProducts = useMemo(() => productsData?.products || [], [productsData]);

  // Detect backend Accessories category and load its subcategories
  const accessoriesCategory = useMemo(() => categoriesData.find(c => c.name === 'Accessories'), [categoriesData]);
  const accessoriesCategoryId = accessoriesCategory?.id;
  const { data: accessoriesSubCategories = [] } = useSubCategoriesByCategory(accessoriesCategoryId || undefined, { enabled: Boolean(accessoriesCategoryId) });
  const accessoriesSubCategoryNames = useMemo(() => (accessoriesSubCategories || []).map(s => s.name), [accessoriesSubCategories]);

  useEffect(() => {
    if (allProducts.length > 0) {
      const computedMax = Math.ceil(Math.max(...allProducts.map(p => Number(p.price) || 0)) || 100);
      setMaxPrice(computedMax);
      setPriceRange(() => [0, computedMax]);
    }
  }, [allProducts]);

  useEffect(() => {
    let filtered = accessoriesCategoryId ? allProducts.filter(p => p.categoryId === accessoriesCategoryId) : [];

    // Filter by backend subcategory if selected matches a backend subcategory name
    if (selectedCategory !== 'all') {
      const sub = accessoriesSubCategories.find(s => s.name === selectedCategory);
      if (sub) {
        filtered = filtered.filter(product => product.subCategoryId === sub.id);
      } else {
        // Fallback to keyword type filters if no backend subcategory selected
        filtered = filtered.filter(product => {
          const name = (product.name || '').toLowerCase();
          if (selectedCategory === 'bags') return name.includes('bag') || name.includes('tote');
          if (selectedCategory === 'jewelry') return name.includes('jewelry') || name.includes('earring') || name.includes('necklace');
          if (selectedCategory === 'hair') return name.includes('hair') || name.includes('clip');
          if (selectedCategory === 'tech') return name.includes('phone') || name.includes('case');
          if (selectedCategory === 'eyewear') return name.includes('sunglass') || name.includes('glasses');
          if (selectedCategory === 'headwear') return name.includes('cap') || name.includes('hat');
          if (selectedCategory === 'belts') return name.includes('belt');
          if (selectedCategory === 'scarves') return name.includes('scarf');
          if (selectedCategory === 'wallets') return name.includes('wallet');
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

    filtered = filtered.map(p => ({
      ...p,
      image: p.image || (Array.isArray(p.images) ? p.images[0] : undefined)
    }));

    setFilteredProducts(filtered);
  }, [allProducts, accessoriesCategoryId, selectedCategory, sortBy, priceRange, accessoriesSubCategories]);

  const defaultAccessoryTypes = useMemo(() => ([
    { name: "Bags", value: "bags" },
    { name: "Jewelry", value: "jewelry" },
    { name: "Hair Accessories", value: "hair" },
    { name: "Tech Accessories", value: "tech" },
    { name: "Eyewear", value: "eyewear" },
    { name: "Headwear", value: "headwear" },
    { name: "Belts", value: "belts" },
    { name: "Scarves", value: "scarves" },
    { name: "Wallets", value: "wallets" }
  ]), []);

  const accessoriesCategoriesFilter = useMemo(() => {
    if (accessoriesSubCategoryNames.length > 0) {
      return [
        { name: "All Accessories", value: "all" },
        ...accessoriesSubCategoryNames.map(n => ({ name: n, value: n }))
      ];
    }
    return [ { name: "All Accessories", value: "all" }, ...defaultAccessoryTypes ];
  }, [accessoriesSubCategoryNames, defaultAccessoryTypes]);

  const SubCategorySection = ({ subCategory }) => {
    const { data, isLoading } = useProductsBySubCategory(subCategory.id, { page: 1, limit: 6 });
    const items = (data?.products || []).map(p => ({
      ...p,
      image: p.image || (Array.isArray(p.images) ? p.images[0] : undefined)
    }));
    if (isLoading || items.length === 0) return null;
    return (
      <div key={subCategory.id}>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl md:text-2xl font-semibold text-gray-800 font-display">{subCategory.name}</h3>
          <button onClick={() => setSelectedCategory(subCategory.name)} className="text-purple-600 hover:text-purple-700 font-medium">View all</button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {items.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-white text-gray-900 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold font-display mb-4">
              Accessories & Essentials
            </h1>
            <p className="text-base md:text-xl text-gray-600 font-body max-w-3xl mx-auto">
              Complete any outfit with curated bags, jewelry, eyewear, and more
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
                  <h4 className="text-base font-semibold text-gray-700 mb-2 font-body">Accessory Type</h4>
                  <div className="space-y-1.5 max-h-64 overflow-y-auto">
                    {accessoriesCategoriesFilter.map((category) => (
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
                  {selectedCategory === 'all' ? 'All Accessories' : selectedCategory.charAt(0).toUpperCase() + selectedCategory.slice(1)}
                </h2>
                <p className="text-gray-600 font-body">
                  {productsLoading ? 'Loading products...' : `${filteredProducts.length} products found`}
                </p>
              </div>
            </div>

            {/* Browse by Subcategory (from backend) */}
            {selectedCategory === 'all' && accessoriesSubCategoryNames.length > 0 && (
              <div className="space-y-12 mb-12">
                {accessoriesSubCategories.map((sub) => (
                  <SubCategorySection key={sub.id} subCategory={sub} />
                ))}
              </div>
            )}

            {/* Products Grid - hidden when showing subcategory sections to avoid duplicates */}
            {(selectedCategory !== 'all' || accessoriesSubCategoryNames.length === 0) && (
              productsLoading ? (
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
                  <h3 className="text-xl font-semibold text-gray-600 mb-2 font-body">No accessories found</h3>
                  <p className="text-gray-500 font-body">Try adjusting your filters to see more results.</p>
                </div>
              )
            )}
          </div>
        </div>
      </div>

      {/* Featured Categories Section */}
      <div className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 font-display mb-4">
              Accessory Categories
            </h2>
            <p className="text-gray-600 font-body max-w-2xl mx-auto">
              Discover the perfect accessories to complete your Korean fashion look
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {accessoriesCategoriesFilter.slice(1, 7).map((category) => (
              <Link
                key={category.value}
                to={`/accessories?category=${category.value}`}
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
                    {productsLoading ? '-' : (accessoriesCategoryId ? allProducts.filter(p => p.categoryId === accessoriesCategoryId).filter(p => {
                      const name = (p.name || '').toLowerCase();
                      if (category.value === 'bags') return name.includes('bag') || name.includes('tote');
                      if (category.value === 'jewelry') return name.includes('jewelry') || name.includes('earring') || name.includes('necklace');
                      if (category.value === 'hair') return name.includes('hair') || name.includes('clip');
                      if (category.value === 'tech') return name.includes('phone') || name.includes('case');
                      if (category.value === 'eyewear') return name.includes('sunglass') || name.includes('glasses');
                      if (category.value === 'headwear') return name.includes('cap') || name.includes('hat');
                      if (category.value === 'belts') return name.includes('belt');
                      if (category.value === 'scarves') return name.includes('scarf');
                      if (category.value === 'wallets') return name.includes('wallet');
                      return true;
                    }).length : 0)} items
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Korean Fashion Tips Section */}
      <div className="bg-linear-to-r from-purple-600 to-pink-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold font-display mb-4">
              Korean Accessory Styling Tips
            </h2>
            <p className="text-purple-100 font-body max-w-2xl mx-auto">
              Learn how to style Korean accessories for the perfect K-fashion look
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6">
              <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2 font-body">Minimalist Jewelry</h3>
              <p className="text-purple-100 font-body">
                Korean fashion favors delicate, minimalist jewelry pieces that add elegance without overwhelming your outfit.
              </p>
            </div>
            
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6">
              <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2 font-body">Hair Accessories</h3>
              <p className="text-purple-100 font-body">
                Cute hair clips and accessories are essential for Korean fashion, adding a playful and youthful touch to any look.
              </p>
            </div>
            
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6">
              <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 4V2a1 1 0 011-1h8a1 1 0 011 1v2m0 0V1a1 1 0 011-1h2a1 1 0 011 1v18a1 1 0 01-1 1H4a1 1 0 01-1-1V4a1 1 0 011-1h2a1 1 0 011 1v3m8-3H9m0 0V1a1 1 0 011-1h2a1 1 0 011 1v3" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2 font-body">Tech Accessories</h3>
              <p className="text-purple-100 font-body">
                Korean-style phone cases and tech accessories are both functional and fashionable, perfect for the modern lifestyle.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Accessories;
