import React, { useState, useEffect } from 'react';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';
import { useNavigate, useParams } from 'react-router-dom';
import { useSubCategory, useCategories, useUpdateSubCategory } from '../../../hooks/useCategories';
import Swal from 'sweetalert2';

const EditSubCategory = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  
  const [formData, setFormData] = useState({
    categoryId: '',
    name: '',
    description: '',
    isActive: true,
  });

  const { data: subCategory, isLoading: initialLoading } = useSubCategory(id);
  const { data: categories = [] } = useCategories();
  const { mutateAsync: updateSubCategory, isPending: loading } = useUpdateSubCategory();

  useEffect(() => {
    if (subCategory) {
      setFormData({
        categoryId: subCategory.categoryId || '',
        name: subCategory.name || '',
        description: subCategory.description || '',
        isActive: Boolean(subCategory.isActive),
      });
    }
  }, [subCategory]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      await updateSubCategory({ id, payload: formData });
      await Swal.fire({
        title: 'Success!',
        text: 'SubCategory updated successfully!',
        icon: 'success',
        confirmButtonText: 'OK',
        confirmButtonColor: '#8b5cf6'
      });
      navigate('/dashboard/subcategories');
    } catch (error) {
      console.error('Error updating subcategory:', error);
      await Swal.fire({
        title: 'Error!',
        text: 'Failed to update subcategory. Please try again.',
        icon: 'error',
        confirmButtonText: 'OK',
        confirmButtonColor: '#ef4444'
      });
    }
  };

  if (initialLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Edit SubCategory</h1>
          <p className="text-gray-600 mt-2">Update subcategory information.</p>
        </div>
        <button
          onClick={() => navigate('/dashboard/subcategories')}
          className="flex items-center px-4 py-2 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors duration-200 font-medium"
        >
          <ArrowLeftIcon className="w-5 h-5 mr-2" />
          Back
        </button>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-lg p-8 space-y-6">
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
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          >
            <option value="">Select a category</option>
            {categories.map(category => (
              <option key={category.id} value={category.id}>{category.name}</option>
            ))}
          </select>
        </div>

        {/* SubCategory Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            SubCategory Name *
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            placeholder="Enter subcategory name"
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
            placeholder="Enter subcategory description"
          />
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
          <label className="text-sm font-medium text-gray-700">Active SubCategory</label>
        </div>

        {/* Footer Actions */}
        <div className="flex justify-end gap-3 pt-4 border-t border-gray-200">
          <button
            type="button"
            onClick={() => navigate('/dashboard/subcategories')}
            className="px-6 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors duration-200 font-medium"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={loading}
            className="px-6 py-3 bg-linear-to-r from-purple-600 to-pink-600 text-white rounded-xl hover:from-purple-700 hover:to-pink-700 transition-all duration-200 font-medium shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Updating...' : 'Update SubCategory'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditSubCategory;
