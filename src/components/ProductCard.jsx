import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const ProductCard = ({ product }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setCurrentImageIndex(0);
  };

  const handleImageHover = (index) => {
    setCurrentImageIndex(index);
  };

  const formatPrice = (price) => {
    return `$${price.toFixed(0)}`;
  };

  return (
    <div
      className="group bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 overflow-hidden border border-gray-100"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Image Container */}
      <div className="relative overflow-hidden bg-gray-50">
        <Link to={`/product/${product.id}`}>
          <div className="relative h-64 lg:h-72">
            <img
              src={product.images[currentImageIndex]}
              alt={product.name}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
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
            <div className={`absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center ${isHovered ? 'opacity-100' : 'opacity-0'}`}>
              <Link
                to={`/product/${product.id}`}
                className="bg-white text-gray-800 px-4 py-2 rounded-lg font-medium text-sm hover:bg-gray-100 transition-colors duration-200 shadow-lg"
              >
                View Details
              </Link>
            </div>

            {/* Image Thumbnails */}
            {product.images.length > 1 && (
              <div className={`absolute bottom-3 left-1/2 transform -translate-x-1/2 flex space-x-1 transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'}`}>
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`w-6 h-6 rounded-full border-2 overflow-hidden ${
                      currentImageIndex === index ? 'border-white' : 'border-gray-300'
                    }`}
                    onMouseEnter={() => handleImageHover(index)}
                  >
                    <img src={image} alt={`${product.name} ${index + 1}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
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
