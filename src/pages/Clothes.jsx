import React, { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useProducts, useProductsBySubCategory } from '../hooks/useProducts';
import { useCategories, useSubCategoriesByCategory } from '../hooks/useCategories';
import ProductCard from '../components/ProductCard';

const Clothes = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [sortBy, setSortBy] = useState('featured');
  const [priceRange, setPriceRange] = useState([0, 200]);
  const [maxPrice, setMaxPrice] = useState(200);
  const [showFilters, setShowFilters] = useState(false);

  const { data: productsData, isLoading: productsLoading } = useProducts();
  const { data: categoriesData = [] } = useCategories();

  const allProducts = useMemo(() => productsData?.products || [], [productsData]);
  useEffect(() => {
    if (allProducts.length > 0) {
      const computedMax = Math.ceil(Math.max(...allProducts.map(p => Number(p.price) || 0)) || 200);
      setMaxPrice(computedMax);
      setPriceRange(() => [0, computedMax]);
    }
  }, [allProducts]);
  const clothesCategoryNames = useMemo(() => ['T-Shirt', 'Hoodie', 'Trousers'], []);

  // Try to detect a backend 'Clothes' category
  const clothesCategory = useMemo(() => {
    return categoriesData.find(c => c.name === 'Clothes');
  }, [categoriesData]);

  // Load subcategories from backend for Clothes, if available
  const { data: clothesSubCategories = [] } = useSubCategoriesByCategory(clothesCategory?.id || undefined, { enabled: Boolean(clothesCategory?.id) });

  // Dynamic subcategory names from backend if present
  const clothesSubCategoryNames = useMemo(() => {
    return (clothesSubCategories || []).map(s => s.name);
  }, [clothesSubCategories]);

  // (Removed client-only grouping; backend subcategories are used when available)

  const clothesCategoryIds = useMemo(() => {
    if (clothesCategory?.id) return [clothesCategory.id];
    return categoriesData
      .filter(c => clothesCategoryNames.includes(c.name))
      .map(c => c.id);
  }, [categoriesData, clothesCategoryNames, clothesCategory]);

  useEffect(() => {
    let filtered = allProducts.filter(p => clothesCategoryIds.includes(p.categoryId));

    // Filter by category
    if (selectedCategory !== 'all') {
      // If backend Clothes subcategories exist, filter by subCategoryId
      const sub = clothesSubCategories.find(s => s.name === selectedCategory);
      if (sub) {
        filtered = filtered.filter(product => product.subCategoryId === sub.id);
      } else {
        filtered = filtered.filter(product => {
          const category = categoriesData.find(c => c.id === product.categoryId);
          return category?.name === selectedCategory;
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

    // normalize image fallback
    filtered = filtered.map(p => ({
      ...p,
      image: p.image || (Array.isArray(p.images) ? p.images[0] : undefined)
    }));

    setFilteredProducts(filtered);
  }, [allProducts, clothesCategoryIds, categoriesData, selectedCategory, sortBy, priceRange, clothesSubCategories]);

  const effectiveSubCategoryNames = clothesSubCategoryNames.length > 0 ? clothesSubCategoryNames : clothesCategoryNames;

  const clothesCategoriesFilter = [
    { name: 'All Clothes', value: 'all' },
    ...effectiveSubCategoryNames.map(n => ({ name: n.endsWith('s') ? n : `${n}s`, value: n }))
  ];

  // Child section to render products of a subcategory from backend
  const SubCategorySection = ({ subCategory }) => {
    const { data, isLoading } = useProductsBySubCategory(subCategory.id, { page: 1, limit: 6 });
    // Normalize images to align with ProductCard expectations
    const items = (data?.products || []).map(p => ({
      ...p,
      image: p.image || (Array.isArray(p.images) ? p.images[0] : undefined)
    }));
    if (isLoading || items.length === 0) return null;
    return (
      <div key={subCategory.id}>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl md:text-2xl font-semibold text-gray-800 font-display">{subCategory.name}s</h3>
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
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="bg-white text-gray-900 py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-3xl md:text-4xl font-bold font-display mb-2">
              Explore Our Latest Clothing Collection
            </h1>
            <p className="text-base md:text-lg text-gray-600 font-body max-w-3xl mx-auto">
              Find stylish outfits for men, women, and kids — made for comfort, crafted for confidence.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Filters and Sort */}
        <div className="flex flex-col lg:flex-row gap-6">
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

              <div className={`space-y-6 ${showFilters ? 'block' : 'hidden lg:block'}`}>
                {/* Category Filter */}
                <div>
                  <h4 className="text-base font-semibold text-gray-700 mb-2 font-body">Category</h4>
                  <div className="space-y-2">
                    {clothesCategoriesFilter.map((category) => (
                      <button
                        key={category.value}
                        onClick={() => setSelectedCategory(category.value)}
                        className={`w-full text-left px-3 py-2 rounded-lg transition-all duration-200 font-body ${
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
                  <div className="space-y-3">
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
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 font-body text-sm"
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
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-xl font-bold text-gray-800 font-display">
                  {selectedCategory === 'all' ? 'All Clothes' : selectedCategory}s
                </h2>
                <p className="text-gray-600 font-body text-sm">
                  {productsLoading ? 'Loading products...' : `${filteredProducts.length} products found`}
                </p>
              </div>
            </div>

            {/* Browse by Subcategory (from backend) */}
            {selectedCategory === 'all' && clothesSubCategoryNames.length > 0 && (
              <div className="space-y-8 mb-8">
                {clothesSubCategories.map((sub) => (
                  <SubCategorySection key={sub.id} subCategory={sub} />
                ))}
              </div>
            )}

            {/* Products Grid - hidden when showing subcategory sections to avoid duplicates */}
            {(selectedCategory !== 'all' || clothesSubCategoryNames.length === 0) && (
              productsLoading ? (
                <div className="flex items-center justify-center py-16">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
                </div>
              ) : filteredProducts.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
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
                  <h3 className="text-xl font-semibold text-gray-600 mb-2 font-body">No products found</h3>
                  <p className="text-gray-500 font-body">Try adjusting your filters to see more results.</p>
                </div>
              )
            )}
          </div>
        </div>
      </div>

      {/* Featured Categories Section */}
      <div className="bg-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl font-bold text-gray-800 font-display mb-3">
              Explore Fashion Categories
            </h2>
            <p className="text-gray-600 font-body text-sm max-w-2xl mx-auto">
              Discover the diverse world of Korean fashion with our carefully curated collections
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {clothesCategoriesFilter.slice(1).map((category) => (
              <Link
                key={category.value}
                to={`/clothes?category=${category.value}`}
                onClick={() => setSelectedCategory(category.value)}
                className="group"
              >
                <div className="bg-linear-to-br from-purple-50 to-pink-50 rounded-2xl p-6 text-center hover:shadow-xl transition-all duration-300 group-hover:scale-105">
                  <div className="w-14 h-14 bg-linear-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform duration-300">
                    <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-1 font-body group-hover:text-purple-600 transition-colors">
                    {category.name}
                  </h3>
                  <p className="text-gray-600 font-body text-sm">
                    {productsLoading ? '-' : allProducts.filter(p => {
                      const cat = categoriesData.find(c => c.id === p.categoryId);
                      return cat?.name === category.value;
                    }).length} items
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Clothes;
