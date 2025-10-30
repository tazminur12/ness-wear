import React, { useState } from 'react';
import { ArrowLeftIcon, PencilIcon, TrashIcon } from '@heroicons/react/24/outline';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { useCategory, useDeleteCategory, useSubCategoriesByCategory } from '../../../hooks/useCategories';
import Swal from 'sweetalert2';

const CategoryDetail = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  
  const { data: category, isLoading } = useCategory(id);
  const { data: subCategories = [], isLoading: subCategoriesLoading } = useSubCategoriesByCategory(id);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const { mutateAsync: deleteCategory, isPending: deleting } = useDeleteCategory();

  const handleDelete = async () => {
    try {
      await deleteCategory(id);
      await Swal.fire({
        title: 'Success!',
        text: 'Category deleted successfully!',
        icon: 'success',
        confirmButtonText: 'OK',
        confirmButtonColor: '#8b5cf6'
      });
      navigate('/dashboard/categories');
    } catch (error) {
      console.error('Error deleting category:', error);
      await Swal.fire({
        title: 'Error!',
        text: 'Failed to delete category. Please try again.',
        icon: 'error',
        confirmButtonText: 'OK',
        confirmButtonColor: '#ef4444'
      });
    }
  };

  if (isLoading || subCategoriesLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
      </div>
    );
  }

  if (!category) {
    return (
      <div className="text-center py-12">
        <h3 className="text-lg font-medium text-gray-900 mb-2">Category not found</h3>
        <button
          onClick={() => navigate('/dashboard/categories')}
          className="text-purple-600 hover:text-purple-700 font-medium"
        >
          Back to Categories
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <button
            onClick={() => navigate('/dashboard/categories')}
            className="flex items-center px-4 py-2 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors duration-200 font-medium"
          >
            <ArrowLeftIcon className="w-5 h-5 mr-2" />
            Back
          </button>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">{category.name}</h1>
            <p className="text-gray-600 mt-2">Category Details</p>
          </div>
        </div>
        
        <div className="flex space-x-3">
          <Link
            to={`/dashboard/categories/edit/${category.id}`}
            className="flex items-center px-4 py-2 bg-yellow-600 text-white rounded-xl hover:bg-yellow-700 transition-colors duration-200 font-medium"
          >
            <PencilIcon className="w-5 h-5 mr-2" />
            Edit
          </Link>
          <button
            onClick={() => setShowDeleteModal(true)}
            className="flex items-center px-4 py-2 bg-red-600 text-white rounded-xl hover:bg-red-700 transition-colors duration-200 font-medium"
          >
            <TrashIcon className="w-5 h-5 mr-2" />
            {deleting ? 'Deleting...' : 'Delete'}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Category Info */}
        <div className="lg:col-span-2 space-y-6">
          {/* Category Image */}
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
            <div className="h-64 overflow-hidden">
              <img
                src={category.image}
                alt={category.name}
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Category Details */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Category Information</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                <p className="text-gray-900">{category.name}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Slug</label>
                <p className="text-gray-900 font-mono text-sm">{category.slug}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <p className="text-gray-900">{category.description}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                <span className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${
                  category.isActive 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-red-100 text-red-800'
                }`}>
                  {category.isActive ? 'Active' : 'Inactive'}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Quick Stats */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Quick Stats</h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">SubCategories</span>
                <span className="font-semibold text-gray-900">{subCategories.length}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Created</span>
                <span className="font-semibold text-gray-900">{category.createdAt}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Updated</span>
                <span className="font-semibold text-gray-900">{category.updatedAt}</span>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Quick Actions</h3>
            <div className="space-y-3">
              <Link
                to={`/dashboard/subcategories/add?category=${category.id}`}
                className="block w-full text-center px-4 py-2 bg-linear-to-r from-purple-600 to-pink-600 text-white rounded-xl hover:from-purple-700 hover:to-pink-700 transition-all duration-200 font-medium"
              >
                Add SubCategory
              </Link>
              <Link
                to={`/dashboard/subcategories?category=${category.id}`}
                className="block w-full text-center px-4 py-2 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors duration-200 font-medium"
              >
                View All SubCategories
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* SubCategories Section */}
      {subCategories.length > 0 && (
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-900">SubCategories</h2>
            <Link
              to={`/dashboard/subcategories?category=${category.id}`}
              className="text-purple-600 hover:text-purple-700 font-medium"
            >
              View All
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {subCategories.slice(0, 6).map((subCategory) => (
              <div key={subCategory.id} className="border border-gray-200 rounded-xl p-4 hover:shadow-md transition-shadow duration-200">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold text-gray-900">{subCategory.name}</h3>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    subCategory.isActive 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {subCategory.isActive ? 'Active' : 'Inactive'}
                  </span>
                </div>
                <p className="text-sm text-gray-600 mb-2">{subCategory.description}</p>
                <div className="flex space-x-2">
                  <Link
                    to={`/dashboard/subcategories/edit/${subCategory.id}`}
                    className="text-xs text-blue-600 hover:text-blue-700 font-medium"
                  >
                    Edit
                  </Link>
                  <Link
                    to={`/dashboard/subcategories/${subCategory.id}`}
                    className="text-xs text-gray-600 hover:text-gray-700 font-medium"
                  >
                    View
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full mx-4">
            <h3 className="text-lg font-bold text-gray-900 mb-2">Delete Category</h3>
            <p className="text-gray-600 mb-6">
              Are you sure you want to delete "{category.name}"? This will also delete all associated subcategories. This action cannot be undone.
            </p>
            <div className="flex space-x-3">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors duration-200 font-medium"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="flex-1 px-4 py-2 bg-red-600 text-white rounded-xl hover:bg-red-700 transition-colors duration-200 font-medium"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CategoryDetail;
