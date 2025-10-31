import React, { useState, useEffect, useRef } from 'react';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';
import { useNavigate, useParams } from 'react-router-dom';
import { useCategory, useUpdateCategory } from '../../../hooks/useCategories';
import Swal from 'sweetalert2';

const EditCategory = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    image: '',
    isActive: true,
  });

  const [loading, setLoading] = useState(false);
  const { data: category, isLoading: initialLoading, error } = useCategory(id);
  const { mutateAsync: updateCategory, isPending: updating } = useUpdateCategory();
  const fileInputRef = useRef(null);

  useEffect(() => {
    if (category) {
      setFormData({
        name: category.name || '',
        description: category.description || '',
        image: category.image || '',
        isActive: Boolean(category.isActive),
      });
    }
  }, [category]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleImageFile = (e) => {
    const file = e.target.files && e.target.files[0];
    if (!file) return;

    const compressImage = (fileToCompress, maxWidth = 1200, maxHeight = 1200, quality = 0.8) => {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onerror = () => reject(new Error('Failed to read file'));
        reader.onload = () => {
          const img = new Image();
          img.onload = () => {
            let { width, height } = img;
            const aspect = width / height;
            if (width > maxWidth || height > maxHeight) {
              if (aspect > 1) {
                width = maxWidth;
                height = Math.round(maxWidth / aspect);
              } else {
                height = maxHeight;
                width = Math.round(maxHeight * aspect);
              }
            }
            const canvas = document.createElement('canvas');
            canvas.width = width;
            canvas.height = height;
            const ctx = canvas.getContext('2d');
            ctx.drawImage(img, 0, 0, width, height);
            // Prefer JPEG to greatly reduce size; fall back to PNG if transparency is needed
            const mimeType = 'image/jpeg';
            const dataUrl = canvas.toDataURL(mimeType, quality);
            resolve(dataUrl);
          };
          img.onerror = () => reject(new Error('Invalid image file'));
          img.src = reader.result;
        };
        reader.readAsDataURL(fileToCompress);
      });
    };

    compressImage(file)
      .then((dataUrl) => {
        // Block if still too large (> 500KB)
        const byteString = atob(dataUrl.split(',')[1] || '');
        const sizeKb = Math.round(byteString.length / 1024);
        if (sizeKb > 500) {
          Swal.fire({
            title: 'Image too large',
            text: 'Please choose a smaller image or use an external image URL. (Max ~500KB)',
            icon: 'warning',
            confirmButtonText: 'OK',
            confirmButtonColor: '#8b5cf6'
          });
          if (fileInputRef.current) fileInputRef.current.value = '';
          return;
        }
        setFormData(prev => ({ ...prev, image: dataUrl }));
      })
      .catch(() => {
        Swal.fire({
          title: 'Upload failed',
          text: 'Could not process the selected image. Please try another file.',
          icon: 'error',
          confirmButtonText: 'OK',
          confirmButtonColor: '#ef4444'
        });
        if (fileInputRef.current) fileInputRef.current.value = '';
      });
  };

  const handleRemoveImage = () => {
    setFormData(prev => ({ ...prev, image: '' }));
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      await updateCategory({ id, payload: formData });
      await Swal.fire({
        title: 'Success!',
        text: 'Category updated successfully!',
        icon: 'success',
        confirmButtonText: 'OK',
        confirmButtonColor: '#8b5cf6'
      });
      navigate('/dashboard/categories');
    } catch (error) {
      console.error('Error updating category:', error);
      await Swal.fire({
        title: 'Error!',
        text: 'Failed to update category. Please try again.',
        icon: 'error',
        confirmButtonText: 'OK',
        confirmButtonColor: '#ef4444'
      });
    } finally {
      setLoading(false);
    }
  };

  if (initialLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <div className="bg-red-50 border border-red-200 rounded-xl p-6 text-center">
          <h2 className="text-xl font-bold text-red-800 mb-2">Error Loading Category</h2>
          <p className="text-red-600 mb-4">
            {error.response?.data?.error || error.message || 'Failed to load category data'}
          </p>
          <button
            onClick={() => navigate('/dashboard/categories')}
            className="px-4 py-2 bg-red-600 text-white rounded-xl hover:bg-red-700 transition-colors duration-200"
          >
            Back to Categories
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
          <h1 className="text-3xl font-bold text-gray-900">Edit Category</h1>
          <p className="text-gray-600 mt-2">Update category information.</p>
        </div>
        <button
          onClick={() => navigate('/dashboard/categories')}
          className="flex items-center px-4 py-2 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors duration-200 font-medium"
        >
          <ArrowLeftIcon className="w-5 h-5 mr-2" />
          Back
        </button>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-lg p-8 space-y-6">
        {/* Category Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Category Name *
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            placeholder="Enter category name"
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
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            placeholder="Enter category description"
          />
        </div>

        {/* Image URL */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Image URL
          </label>
          <input
            type="url"
            name="image"
            value={formData.image}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            placeholder="https://example.com/image.jpg"
          />
          <div className="mt-3">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Or upload image
            </label>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleImageFile}
              className="block w-full text-sm text-gray-700 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-sm file:font-semibold file:bg-purple-50 file:text-purple-700 hover:file:bg-purple-100"
            />
          </div>
        </div>

        {/* Status Toggle */}
        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            name="isActive"
            checked={formData.isActive}
            onChange={handleChange}
            className="w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
          />
          <label className="text-sm font-medium text-gray-700">Active Category</label>
        </div>

        {/* Preview */}
        {formData.image && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Preview
            </label>
            <img
              src={formData.image}
              alt="Category preview"
              className="w-full h-64 object-cover rounded-xl border border-gray-200"
            />
            <div className="mt-3 flex justify-end">
              <button
                type="button"
                onClick={handleRemoveImage}
                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors duration-200 font-medium"
              >
                Remove image
              </button>
            </div>
          </div>
        )}

        {/* Footer Actions */}
        <div className="flex justify-end gap-3 pt-4 border-t border-gray-200">
          <button
            type="button"
            onClick={() => navigate('/dashboard/categories')}
            className="px-6 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors duration-200 font-medium"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={loading || updating}
            className="px-6 py-3 bg-linear-to-r from-purple-600 to-pink-600 text-white rounded-xl hover:from-purple-700 hover:to-pink-700 transition-all duration-200 font-medium shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading || updating ? 'Updating...' : 'Update Category'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditCategory;
