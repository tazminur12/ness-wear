import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const ProductCard = ({ product }) => {
  const [isHoveringImage, setIsHoveringImage] = useState(false);
  const [transformOrigin, setTransformOrigin] = useState('center');

  // Always show a single image on the card (first available)
  const images = Array.isArray(product?.images) ? product.images : (product?.image ? [product.image] : []);
  const mainImage = images[0] || '/vite.svg';

  const formatPrice = (price) => {
    return `৳${price.toFixed(0)}`;
  };

  

  return (
    <div
      className="group bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 overflow-hidden border border-gray-100"
    >
      {/* Image Container */}
      <div className="relative overflow-hidden bg-gray-50">
        <Link to={`/product/${product.id}`}>
          <div
            className="relative h-64 lg:h-72"
            onMouseEnter={() => setIsHoveringImage(true)}
            onMouseLeave={() => setIsHoveringImage(false)}
            onMouseMove={(e) => {
              const rect = e.currentTarget.getBoundingClientRect();
              const x = ((e.clientX - rect.left) / rect.width) * 100;
              const y = ((e.clientY - rect.top) / rect.height) * 100;
              setTransformOrigin(`${x}% ${y}%`);
            }}
          >
            <img
              src={mainImage}
              alt={product.name}
              className={`w-full h-full object-cover transition-transform duration-500 ease-out will-change-transform ${isHoveringImage ? 'cursor-zoom-out' : 'cursor-zoom-in'}`}
              style={{ transform: isHoveringImage ? 'scale(1.25)' : 'scale(1)', transformOrigin }}
            />
            
            {/* Badges */}
            <div className="absolute top-3 left-3 flex flex-col space-y-1">
              {product.isNew && (
                <span className="bg-cyan-500 text-white px-2 py-1 rounded-full text-xs font-semibold">
                  New
                </span>
              )}
              {product.isTrending && (
                <span className="bg-gray-800 text-white px-2 py-1 rounded-full text-xs font-semibold">
                  Trending
                </span>
              )}
              {product.originalPrice && (
                <span className="bg-red-500 text-white px-2 py-1 rounded-full text-xs font-semibold">
                  Sale
                </span>
              )}
              {product.colors.includes('White') && product.colors.length === 1 && (
                <span className="bg-white text-gray-800 px-2 py-1 rounded-full text-xs font-semibold border border-gray-200">
                  Pure White
                </span>
              )}
            </div>

            {/* View Details Button */}
            <div className={`absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100`}>
              <Link
                to={`/product/${product.id}`}
                className="bg-white text-gray-800 px-4 py-2 rounded-lg font-medium text-sm hover:bg-gray-100 transition-colors duration-200 shadow-lg"
              >
                View Details
              </Link>
            </div>
            {/* No thumbnails on card; single image display only */}
          </div>
        </Link>
      </div>

      {/* Product Info */}
      <div className="p-4">
        <div className="space-y-2">
          {/* Category */}
          <div className="text-xs text-gray-500 font-medium uppercase tracking-wide">
            {product.category}
          </div>

          {/* Product Name */}
          <Link to={`/product/${product.id}`}>
            <h3 className={`text-base font-semibold hover:text-cyan-500 transition-colors duration-200 line-clamp-2 ${
              product.colors.includes('White') && product.colors.length === 1 
                ? 'text-gray-800 font-bold' 
                : 'text-gray-900'
            }`}>
              {product.name}
            </h3>
          </Link>

          {/* Price */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <span className="text-lg font-bold text-gray-900">
                {formatPrice(product.price)}
              </span>
              {product.originalPrice && (
                <span className="text-sm text-gray-500 line-through">
                  {formatPrice(product.originalPrice)}
                </span>
              )}
            </div>
            
            {/* Colors */}
            <div className="flex space-x-1">
              {product.colors.slice(0, 3).map((color, index) => (
                <div
                  key={index}
                  className={`w-3 h-3 rounded-full border ${
                    color.toLowerCase() === 'white' ? 'border-gray-300 shadow-sm' : 'border-gray-300'
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
              {product.colors.length > 3 && (
                <span className="text-xs text-gray-500">+{product.colors.length - 3}</span>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
