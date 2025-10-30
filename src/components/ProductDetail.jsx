import React, { useMemo, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useProduct } from '../hooks/useProducts';
import { useCategories, useSubCategoriesByCategory } from '../hooks/useCategories';
import { EyeIcon } from '@heroicons/react/24/outline';

const ProductDetail = () => {
  const { id } = useParams();
  const { data: product, isLoading, error } = useProduct(id);
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  

  const images = useMemo(() => {
    if (Array.isArray(product?.images) && product.images.length > 0) return product.images;
    if (product?.image) return [product.image];
    return ['/vite.svg'];
  }, [product]);
  const safeSelected = Math.min(Math.max(selectedImage, 0), images.length - 1);

  const formatPrice = (price) => {
    const n = Number(price) || 0;
    return `৳${n.toFixed(2)}`;
  };

  // Derived pricing aligned with AddProduct fields
  const regularPrice = Number(product?.price) || 0;
  const offerPrice = product?.offerPrice != null ? Number(product.offerPrice) : null;
  const currentPrice = offerPrice != null ? offerPrice : regularPrice;
  const explicitDiscountPct = product?.discountPercentage != null ? Number(product.discountPercentage) : null;
  const computedDiscountPct = offerPrice != null && regularPrice > 0
    ? Math.max(0, Math.round(((regularPrice - offerPrice) / regularPrice) * 100))
    : null;
  const discountPctToShow = explicitDiscountPct != null ? explicitDiscountPct : computedDiscountPct;

  // Category/SubCategory names from IDs
  const { data: categories = [] } = useCategories();
  const categoryId = product?.categoryId;
  const { data: subCategories = [] } = useSubCategoriesByCategory(categoryId, { enabled: Boolean(categoryId) });

  const categoryName = useMemo(() => {
    if (product?.category && typeof product.category === 'string') return product.category;
    if (!categories || !categoryId) return undefined;
    return categories.find(c => String(c.id) === String(categoryId))?.name;
  }, [categories, product, categoryId]);

  const subCategoryName = useMemo(() => {
    if (product?.subCategory && typeof product.subCategory === 'string') return product.subCategory;
    const subCategoryId = product?.subCategoryId;
    if (!subCategories || !subCategoryId) return undefined;
    return subCategories.find(sc => String(sc.id) === String(subCategoryId))?.name;
  }, [subCategories, product]);

  // Live viewers indicator (simulated)
  const [viewerCount, setViewerCount] = useState(() => {
    // Start with a semi-random realistic number
    return 50 + Math.floor(Math.random() * 70); // 50-119
  });
  useEffect(() => {
    const interval = setInterval(() => {
      setViewerCount((prev) => {
        const delta = Math.floor(Math.random() * 7) - 3; // -3..+3
        const next = Math.max(12, Math.min(180, prev + delta));
        return next;
      });
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  // Share links
  const DEFAULT_SITE_URL = 'https://nesswearforyou.netlify.app';
  const pageUrl = (() => {
    if (typeof window === 'undefined') return DEFAULT_SITE_URL;
    const { origin, pathname, search } = window.location;
    const base = origin.includes('localhost') ? DEFAULT_SITE_URL : origin;
    return `${base}${pathname}${search}`;
  })();
  const shareText = `${product?.name || 'Product'} - ${pageUrl}`;
  // Owner WhatsApp number in international format without '+' (Bangladesh: +880...)
  const ownerWhatsApp = '8801645460095';
  const whatsappShare = `https://wa.me/${ownerWhatsApp}?text=${encodeURIComponent(shareText)}`;
  const facebookShare = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(pageUrl)}`;

  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Failed to load product</h2>
          <p className="text-gray-600">Please try again.</p>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Product not found</h2>
          <p className="text-gray-600">The product you're looking for doesn't exist.</p>
        </div>
      </div>
    );
  }

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <svg key={i} className="w-5 h-5 text-yellow-400 fill-current" viewBox="0 0 20 20">
          <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
        </svg>
      );
    }

    if (hasHalfStar) {
      stars.push(
        <svg key="half" className="w-5 h-5 text-yellow-400 fill-current" viewBox="0 0 20 20">
          <defs>
            <linearGradient id="half">
              <stop offset="50%" stopColor="currentColor" />
              <stop offset="50%" stopColor="transparent" />
            </linearGradient>
          </defs>
          <path fill="url(#half)" d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
        </svg>
      );
    }

    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(
        <svg key={`empty-${i}`} className="w-5 h-5 text-gray-300 fill-current" viewBox="0 0 20 20">
          <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
        </svg>
      );
    }

    return stars;
  };

  

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Product Images */}
        <div className="space-y-3">
          {/* Main Image */}
          <div className="aspect-square overflow-hidden rounded-lg bg-gray-100">
            <img
              src={images[safeSelected]}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Thumbnail Images */}
          {images.length > 1 && (
            <div className="grid grid-cols-4 gap-4">
              {images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`aspect-square overflow-hidden rounded-lg border-2 ${
                    selectedImage === index ? 'border-purple-600' : 'border-gray-200'
                  }`}
                >
                  <img
                    src={image}
                    alt={`${product.name} ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Product Info */}
        <div className="space-y-6">
          {/* Badges */}
          <div className="flex space-x-2">
            {product.isNewArrival && (
              <span className="bg-green-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                New
              </span>
            )}
            {product.isTrending && (
              <span className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                Trending
              </span>
            )}
            {offerPrice != null && offerPrice < regularPrice && (
              <span className="bg-purple-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                {discountPctToShow != null ? `${discountPctToShow}% OFF` : 'Sale'}
              </span>
            )}
            {product.isActive === false && (
              <span className="bg-gray-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                Inactive
              </span>
            )}
          </div>

          {/* Product Name */}
          <h1 className="text-2xl font-bold text-gray-900">{product.name}</h1>

          {/* Rating (stars only) */}
          <div className="flex items-center">
            <div className="flex items-center">
              {renderStars(product.rating || 0)}
            </div>
          </div>

          {/* Live viewers */}
          <div className="flex items-center gap-2 text-gray-800">
            <EyeIcon className="w-5 h-5" aria-hidden="true" />
            <span className="text-sm">
              {viewerCount} People viewing this right now
            </span>
          </div>

          {/* Share / Contact */}
          <div className="flex items-center gap-3 pt-2">
            <a
              href={whatsappShare}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-3 py-2 rounded-md bg-green-500 hover:bg-green-600 text-white text-sm font-semibold transition-colors duration-200"
              aria-label="Share on WhatsApp"
            >
              {/* WhatsApp icon */}
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" className="w-4 h-4 fill-current" aria-hidden="true">
                <path d="M19.11 17.27c-.29-.15-1.69-.83-1.95-.92-.26-.1-.45-.15-.64.15-.19.3-.74.92-.9 1.11-.16.19-.34.21-.63.08-.29-.15-1.22-.45-2.33-1.44-.86-.76-1.44-1.7-1.61-1.99-.17-.3-.02-.46.13-.6.14-.14.3-.34.45-.51.15-.17.19-.3.29-.5.1-.19.05-.37-.03-.52-.08-.15-.64-1.53-.88-2.09-.23-.56-.47-.48-.64-.48-.17 0-.37-.02-.57-.02-.2 0-.52.08-.79.37-.27.3-1.04 1.02-1.04 2.49 0 1.47 1.07 2.9 1.22 3.1.15.19 2.1 3.21 5.09 4.5.71.31 1.27.49 1.7.63.71.23 1.35.2 1.86.12.57-.08 1.69-.69 1.93-1.36.24-.66.24-1.23.17-1.36-.07-.13-.26-.21-.55-.36zM16.03 3C8.84 3 3 8.84 3 16.03c0 2.29.61 4.43 1.68 6.28L3 29l6.86-1.8c1.79.98 3.85 1.54 6.16 1.54 7.19 0 13.03-5.84 13.03-13.03C29.05 8.84 23.22 3 16.03 3zm0 23.76c-2.16 0-4.16-.64-5.83-1.75l-.41-.26-4.07 1.07 1.09-3.97-.27-.41a10.52 10.52 0 01-1.61-5.7c0-5.83 4.75-10.58 10.58-10.58 5.83 0 10.58 4.75 10.58 10.58 0 5.83-4.75 10.58-10.58 10.58z"/>
              </svg>
              WhatsApp
            </a>
            <a
              href={facebookShare}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-3 py-2 rounded-md bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold transition-colors duration-200"
              aria-label="Share on Facebook"
            >
              {/* Facebook icon */}
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-4 h-4 fill-current" aria-hidden="true">
                <path d="M22 12.06C22 6.48 17.52 2 11.94 2S2 6.48 2 12.06c0 5.01 3.66 9.16 8.44 9.94v-7.03H7.9v-2.91h2.54V9.84c0-2.5 1.49-3.88 3.77-3.88 1.09 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.62.77-1.62 1.56v1.87h2.77l-.44 2.91h-2.33V22c4.78-.78 8.44-4.93 8.44-9.94z"/>
              </svg>
              Facebook
            </a>
          </div>

          {/* Price */}
          <div className="flex items-center space-x-3">
            <span className="text-2xl font-bold text-gray-900">
              {formatPrice(currentPrice)}
            </span>
            {offerPrice != null && offerPrice < regularPrice && (
              <span className="text-lg text-gray-500 line-through">
                {formatPrice(regularPrice)}
              </span>
            )}
            {offerPrice != null && offerPrice < regularPrice && (
              <span className="text-sm text-red-600 font-semibold">
                Save {formatPrice(regularPrice - offerPrice)}
              </span>
            )}
          </div>

          {/* Description */}
          <div>
            <h3 className="text-base font-semibold text-gray-900 mb-2">Description</h3>
            <p className="text-sm text-gray-600 leading-relaxed">{product.description}</p>
          </div>

          {/* Colors */}
          <div>
            <h3 className="text-base font-semibold text-gray-900 mb-2">Colors</h3>
            <div className="flex space-x-2">
              {(Array.isArray(product.colors) ? product.colors : []).map((color, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedColor(color)}
                  className={`w-10 h-10 rounded-full border-2 ${
                    selectedColor === color ? 'border-purple-600' : 'border-gray-300'
                  }`}
                  style={{
                    backgroundColor: color.toLowerCase() === 'white' ? '#ffffff' :
                                   color.toLowerCase() === 'black' ? '#000000' :
                                   color.toLowerCase() === 'red' ? '#ef4444' :
                                   color.toLowerCase() === 'blue' ? '#3b82f6' :
                                   color.toLowerCase() === 'green' ? '#10b981' :
                                   color.toLowerCase() === 'gray' ? '#6b7280' :
                                   color.toLowerCase() === 'navy' ? '#1e3a8a' :
                                   color.toLowerCase() === 'pink' ? '#ec4899' :
                                   color.toLowerCase() === 'lavender' ? '#a78bfa' :
                                   color.toLowerCase() === 'cream' ? '#fef3c7' :
                                   color.toLowerCase() === 'beige' ? '#d2b48c' :
                                   color.toLowerCase() === 'olive' ? '#84cc16' :
                                   color.toLowerCase() === 'khaki' ? '#a3a3a3' :
                                   color.toLowerCase() === 'brown' ? '#8b4513' :
                                   color.toLowerCase() === 'tan' ? '#d2b48c' :
                                   '#6b7280'
                  }}
                  title={color}
                />
              ))}
            </div>
            {selectedColor && (
              <p className="text-xs text-gray-600 mt-1">Selected: {selectedColor}</p>
            )}
          </div>

          {/* Sizes */}
          <div>
            <h3 className="text-base font-semibold text-gray-900 mb-2">Sizes</h3>
            <div className="grid grid-cols-6 gap-1">
              {(Array.isArray(product.sizes) ? product.sizes : []).map((size, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedSize(size)}
                  className={`py-1.5 px-3 border-2 rounded-md font-medium transition-colors duration-200 text-sm ${
                    selectedSize === size
                      ? 'border-purple-600 bg-purple-100 text-purple-700'
                      : 'border-gray-300 text-gray-700 hover:border-purple-300'
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
            {selectedSize && (
              <p className="text-xs text-gray-600 mt-1">Selected: {selectedSize}</p>
            )}
          </div>

          

          

          {/* Additional Info */}
          <div className="border-t border-gray-200 pt-4">
            <div className="grid grid-cols-2 gap-3 text-xs text-gray-600">
              <div>
                <span className="font-semibold">Category:</span> {categoryName || '—'}
              </div>
              <div>
                <span className="font-semibold">SKU:</span> {product.sku || (product.id ? `NW-${product.id.toString().padStart(3, '0')}` : '—')}
              </div>
              <div>
                <span className="font-semibold">Material:</span> {product.material || '100% Cotton'}
              </div>
              <div>
                <span className="font-semibold">Care:</span> {product.care || 'Machine Wash'}
              </div>
              <div>
                <span className="font-semibold">Stock:</span> {product.stock != null ? product.stock : '—'}
              </div>
              <div>
                <span className="font-semibold">SubCategory:</span> {subCategoryName || '—'}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
