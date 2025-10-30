import React, { useState, useEffect } from 'react';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';
import { useNavigate, useParams } from 'react-router-dom';
import { useCategories, useSubCategoriesByCategory } from '../../../hooks/useCategories';
import { useProduct, useUpdateProduct } from '../../../hooks/useProducts';
import Swal from 'sweetalert2';

const EditProduct = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    offerPrice: '',
    discountPercentage: '',
    categoryId: '',
    subCategoryId: '',
    colors: [],
    sizes: [],
    images: [],
    stock: '',
    isActive: true,
    isTrending: false,
    isNewArrival: false,
  });

  const [imageUploading, setImageUploading] = useState(false);
  const [availableColors] = useState([
    'Black', 'White', 'Red', 'Blue', 'Green', 'Yellow', 'Purple', 'Pink', 
    'Orange', 'Brown', 'Gray', 'Navy', 'Maroon', 'Teal', 'Cream'
  ]);
  const [availableSizes] = useState([
    'XS', 'S', 'M', 'L', 'XL', 'XXL', 'XXXL'
  ]);

  const { data: product, isLoading: productLoading, error: productError } = useProduct(id);
  const { data: categories = [], isLoading: categoriesLoading } = useCategories();
  const { data: subCategories = [], isLoading: subCategoriesLoading } = useSubCategoriesByCategory(formData.categoryId);
  const { mutateAsync: updateProduct, isPending: loading } = useUpdateProduct();

  // Load product data when product is fetched
  useEffect(() => {
    if (product) {
      setFormData({
        name: product.name || '',
        description: product.description || '',
        price: product.price || '',
        offerPrice: product.offerPrice || '',
        discountPercentage: product.discountPercentage || '',
        categoryId: product.categoryId || '',
        subCategoryId: product.subCategoryId || '',
        colors: product.colors || [],
        sizes: product.sizes || [],
        images: product.images || [],
        stock: product.stock || '',
        isActive: product.isActive !== undefined ? product.isActive : true,
        isTrending: product.isTrending || false,
        isNewArrival: product.isNewArrival || false,
      });
    }
  }, [product]);

  // ImgBB API upload function
  const uploadImageToImgBB = async (file) => {
    const formData = new FormData();
    formData.append('image', file);
    
    const response = await fetch('https://api.imgbb.com/1/upload?key=2a0c20d29536bdc9800b74a56126caa1', {
      method: 'POST',
      body: formData,
    });
    
    const data = await response.json();
    
    if (data.success) {
      return data.data.url;
    } else {
      throw new Error(data.error?.message || 'Image upload failed');
    }
  };

  // Handle multiple image file upload
  const handleImageUpload = async (e) => {
    const files = Array.from(e.target.files);
    if (!files.length) return;

    // Validate file types
    const invalidFiles = files.filter(file => !file.type.startsWith('image/'));
    if (invalidFiles.length > 0) {
      await Swal.fire({
        title: 'Invalid Files!',
        text: 'Please select only image files.',
        icon: 'error',
        confirmButtonColor: '#ef4444',
      });
      // Reset file input
      e.target.value = '';
      return;
    }

    // Validate file sizes (max 10MB each)
    const oversizedFiles = files.filter(file => file.size > 10 * 1024 * 1024);
    if (oversizedFiles.length > 0) {
      await Swal.fire({
        title: 'Files Too Large!',
        text: 'Please select images smaller than 10MB each.',
        icon: 'error',
        confirmButtonColor: '#ef4444',
      });
      // Reset file input
      e.target.value = '';
      return;
    }

    setImageUploading(true);
    try {
      const uploadPromises = files.map(file => uploadImageToImgBB(file));
      const uploadedUrls = await Promise.all(uploadPromises);
      
      setFormData(prev => ({ 
        ...prev, 
        images: [...prev.images, ...uploadedUrls] 
      }));
      
      await Swal.fire({
        title: 'Success!',
        text: `${files.length} image(s) uploaded successfully!`,
        icon: 'success',
        confirmButtonColor: '#8b5cf6',
      });
    } catch (error) {
      console.error('Image upload error:', error);
      await Swal.fire({
        title: 'Upload Failed!',
        text: error.message || 'Failed to upload images. Please try again.',
        icon: 'error',
        confirmButtonColor: '#ef4444',
      });
    } finally {
      setImageUploading(false);
      // Reset file input to allow selecting the same files again
      e.target.value = '';
    }
  };

  // Handle removing individual images
  const handleRemoveImage = (indexToRemove) => {
    setFormData(prev => ({
      ...prev,
      images: prev.images.filter((_, index) => index !== indexToRemove)
    }));
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
      // Reset subCategoryId when category changes
      ...(name === 'categoryId' && { subCategoryId: '' })
    }));
  };

  // Handle color selection
  const handleColorChange = (color) => {
    setFormData(prev => ({
      ...prev,
      colors: prev.colors.includes(color)
        ? prev.colors.filter(c => c !== color)
        : [...prev.colors, color]
    }));
  };

  // Handle size selection
  const handleSizeChange = (size) => {
    setFormData(prev => ({
      ...prev,
      sizes: prev.sizes.includes(size)
        ? prev.sizes.filter(s => s !== size)
        : [...prev.sizes, size]
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.categoryId) {
      return Swal.fire({
        title: 'Missing Field!',
        text: 'Please select a category.',
        icon: 'warning',
        confirmButtonColor: '#facc15',
      });
    }

    if (!formData.subCategoryId) {
      return Swal.fire({
        title: 'Missing Field!',
        text: 'Please select a subcategory.',
        icon: 'warning',
        confirmButtonColor: '#facc15',
      });
    }

    if (!formData.name || formData.name.trim() === '') {
      return Swal.fire({
        title: 'Missing Field!',
        text: 'Please enter a product name.',
        icon: 'warning',
        confirmButtonColor: '#facc15',
      });
    }

    if (!formData.price || formData.price <= 0) {
      return Swal.fire({
        title: 'Missing Field!',
        text: 'Please enter a valid price.',
        icon: 'warning',
        confirmButtonColor: '#facc15',
      });
    }

    const payload = {
      name: formData.name,
      description: formData.description,
      price: parseFloat(formData.price),
      offerPrice: formData.offerPrice ? parseFloat(formData.offerPrice) : null,
      discountPercentage: formData.discountPercentage ? parseFloat(formData.discountPercentage) : null,
      categoryId: formData.categoryId,
      subCategoryId: formData.subCategoryId,
      colors: formData.colors,
      sizes: formData.sizes,
      images: formData.images,
      stock: parseInt(formData.stock) || 0,
      isActive: formData.isActive,
      isTrending: formData.isTrending,
      isNewArrival: formData.isNewArrival,
    };

    try {
      await updateProduct({ id, ...payload });

      await Swal.fire({
        title: 'Success!',
        text: 'Product updated successfully!',
        icon: 'success',
        confirmButtonText: 'OK',
        confirmButtonColor: '#8b5cf6',
      });

      navigate('/dashboard/products');
    } catch (error) {
      const errorMessage = error.response?.data?.message || 
                          error.response?.data?.error || 
                          'Failed to update product. Please try again.';
      
      await Swal.fire({
        title: 'Error!',
        text: errorMessage,
        icon: 'error',
        confirmButtonText: 'OK',
        confirmButtonColor: '#ef4444',
      });
    }
  };

  // Loading state
  if (productLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
      </div>
    );
  }

  // Error state
  if (productError) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <div className="text-center py-12">
          <div className="w-24 h-24 mx-auto mb-4 bg-red-100 rounded-full flex items-center justify-center">
            <span className="text-4xl text-red-500">⚠️</span>
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">Error Loading Product</h3>
          <p className="text-gray-600 mb-6">
            {productError.message || 'Failed to load product data. Please try again.'}
          </p>
          <button
            onClick={() => navigate('/dashboard/products')}
            className="px-4 py-2 bg-purple-600 text-white rounded-xl hover:bg-purple-700 transition-colors duration-200 font-medium"
          >
            Back to Products
          </button>
        </div>
      </div>
    );
  }

  // Product not found
  if (!product) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <div className="text-center py-12">
          <div className="w-24 h-24 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
            <span className="text-4xl text-gray-400">🔍</span>
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">Product Not Found</h3>
          <p className="text-gray-600 mb-6">
            The product you're looking for doesn't exist or has been removed.
          </p>
          <button
            onClick={() => navigate('/dashboard/products')}
            className="px-4 py-2 bg-purple-600 text-white rounded-xl hover:bg-purple-700 transition-colors duration-200 font-medium"
          >
            Back to Products
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Edit Product</h1>
          <p className="text-gray-600 mt-2">Update product information.</p>
        </div>
        <button
          onClick={() => navigate('/dashboard/products')}
          className="flex items-center px-4 py-2 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors duration-200 font-medium"
        >
          <ArrowLeftIcon className="w-5 h-5 mr-2" />
          Back
        </button>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-lg p-8 space-y-6">
        {/* Product Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Product Name *
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            placeholder="Enter product name"
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          />
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Description *
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
            rows="4"
            placeholder="Enter product description"
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          />
        </div>

        {/* Category Selection */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Category *
          </label>
          <select
            name="categoryId"
            value={formData.categoryId}
            onChange={handleChange}
            required
            disabled={categoriesLoading}
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <option value="">
              {categoriesLoading ? 'Loading categories...' : 'Select a category'}
            </option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>

        {/* SubCategory Selection */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            SubCategory *
          </label>
          <select
            name="subCategoryId"
            value={formData.subCategoryId}
            onChange={handleChange}
            required
            disabled={!formData.categoryId || subCategoriesLoading}
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <option value="">
              {!formData.categoryId 
                ? 'Select a category first' 
                : subCategoriesLoading 
                  ? 'Loading subcategories...' 
                  : 'Select a subcategory'
              }
            </option>
            {subCategories.map((subCategory) => (
              <option key={subCategory.id} value={subCategory.id}>
                {subCategory.name}
              </option>
            ))}
          </select>
        </div>

        {/* Price */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Regular Price *
            </label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              required
              min="0"
              step="0.01"
              placeholder="Enter regular price"
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Offer Price
            </label>
            <input
              type="number"
              name="offerPrice"
              value={formData.offerPrice}
              onChange={handleChange}
              min="0"
              step="0.01"
              placeholder="Enter offer price"
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Discount %
            </label>
            <input
              type="number"
              name="discountPercentage"
              value={formData.discountPercentage}
              onChange={handleChange}
              min="0"
              max="100"
              step="0.01"
              placeholder="Enter discount %"
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
          </div>
        </div>

        {/* Stock */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Stock Quantity
          </label>
          <input
            type="number"
            name="stock"
            value={formData.stock}
            onChange={handleChange}
            min="0"
            placeholder="Enter stock quantity"
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          />
        </div>

        {/* Colors */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Available Colors
          </label>
          <div className="flex flex-wrap gap-2">
            {availableColors.map((color) => (
              <button
                key={color}
                type="button"
                onClick={() => handleColorChange(color)}
                className={`px-3 py-2 rounded-lg border text-sm font-medium transition-colors duration-200 ${
                  formData.colors.includes(color)
                    ? 'bg-purple-600 text-white border-purple-600'
                    : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                }`}
              >
                {color}
              </button>
            ))}
          </div>
          {formData.colors.length > 0 && (
            <p className="text-sm text-gray-500 mt-2">
              Selected: {formData.colors.join(', ')}
            </p>
          )}
        </div>

        {/* Sizes */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Available Sizes
          </label>
          <div className="flex flex-wrap gap-2">
            {availableSizes.map((size) => (
              <button
                key={size}
                type="button"
                onClick={() => handleSizeChange(size)}
                className={`px-3 py-2 rounded-lg border text-sm font-medium transition-colors duration-200 ${
                  formData.sizes.includes(size)
                    ? 'bg-purple-600 text-white border-purple-600'
                    : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                }`}
              >
                {size}
              </button>
            ))}
          </div>
          {formData.sizes.length > 0 && (
            <p className="text-sm text-gray-500 mt-2">
              Selected: {formData.sizes.join(', ')}
            </p>
          )}
        </div>

        {/* Image Upload */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Product Images
          </label>
          
          {/* File Upload */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-600 mb-2">
              Upload Multiple Images
            </label>
            <input
              id="image-upload"
              type="file"
              accept="image/*"
              multiple
              onChange={handleImageUpload}
              disabled={imageUploading}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed"
            />
            {imageUploading && (
              <p className="text-sm text-blue-600 mt-2">Uploading images...</p>
            )}
            <p className="text-sm text-gray-500 mt-2">
              You can select multiple images at once. Each image should be smaller than 10MB. 
              <br />
              <span className="text-purple-600 font-medium">You can upload images multiple times to add more images to your product.</span>
            </p>
          </div>
        </div>

        {/* Image Previews */}
        {formData.images.length > 0 && (
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="block text-sm font-medium text-gray-700">
                Uploaded Images ({formData.images.length})
              </label>
              <button
                type="button"
                onClick={() => document.getElementById('image-upload').click()}
                disabled={imageUploading}
                className="px-3 py-1 text-sm bg-purple-100 text-purple-700 rounded-lg hover:bg-purple-200 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                + Add More Images
              </button>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {formData.images.map((imageUrl, index) => (
                <div key={index} className="relative group">
                  <img
                    src={imageUrl}
                    alt={`Product preview ${index + 1}`}
                    className="w-full h-32 object-cover rounded-xl border border-gray-200"
                  />
                  <button
                    type="button"
                    onClick={() => handleRemoveImage(index)}
                    className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm hover:bg-red-600 transition-colors duration-200 opacity-0 group-hover:opacity-100"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Product Flags */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              name="isActive"
              checked={formData.isActive}
              onChange={handleChange}
              className="w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
            />
            <label className="text-sm font-medium text-gray-700">
              Active Product
            </label>
          </div>
          
          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              name="isTrending"
              checked={formData.isTrending}
              onChange={handleChange}
              className="w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
            />
            <label className="text-sm font-medium text-gray-700">
              Trending Now
            </label>
          </div>
          
          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              name="isNewArrival"
              checked={formData.isNewArrival}
              onChange={handleChange}
              className="w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
            />
            <label className="text-sm font-medium text-gray-700">
              New Arrival
            </label>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="flex justify-end gap-3 pt-4 border-t border-gray-200">
          <button
            type="button"
            onClick={() => navigate('/dashboard/products')}
            className="px-6 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors duration-200 font-medium"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={loading}
            className="px-6 py-3 bg-linear-to-r from-purple-600 to-pink-600 text-white rounded-xl hover:from-purple-700 hover:to-pink-700 transition-all duration-200 font-medium shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Updating...' : 'Update Product'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditProduct;
