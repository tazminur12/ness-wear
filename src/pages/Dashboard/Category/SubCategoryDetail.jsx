import React, { useState } from 'react';
import { ArrowLeftIcon, PencilIcon, TrashIcon } from '@heroicons/react/24/outline';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { useSubCategory, useCategory, useDeleteSubCategory } from '../../../hooks/useCategories';
import Swal from 'sweetalert2';

const SubCategoryDetail = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  
  const { data: subCategory, isLoading } = useSubCategory(id);
  const { data: category } = useCategory(subCategory?.categoryId, { enabled: Boolean(subCategory?.categoryId) });
  const { mutateAsync: deleteSubCategory, isPending: deleting } = useDeleteSubCategory();
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const handleDelete = async () => {
    try {
      await deleteSubCategory({ id });
      await Swal.fire({
        title: 'Success!',
        text: 'SubCategory deleted successfully!',
        icon: 'success',
        confirmButtonText: 'OK',
        confirmButtonColor: '#8b5cf6'
      });
      navigate('/dashboard/subcategories');
    } catch (error) {
      console.error('Error deleting subcategory:', error);
      await Swal.fire({
        title: 'Error!',
        text: 'Failed to delete subcategory. Please try again.',
        icon: 'error',
        confirmButtonText: 'OK',
        confirmButtonColor: '#ef4444'
      });
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
      </div>
    );
  }

  if (!subCategory) {
    return (
      <div className="text-center py-12">
        <h3 className="text-lg font-medium text-gray-900 mb-2">SubCategory not found</h3>
        <button
          onClick={() => navigate('/dashboard/subcategories')}
          className="text-purple-600 hover:text-purple-700 font-medium"
        >
          Back to SubCategories
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
            onClick={() => navigate('/dashboard/subcategories')}
            className="flex items-center px-4 py-2 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors duration-200 font-medium"
          >
            <ArrowLeftIcon className="w-5 h-5 mr-2" />
            Back
          </button>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">{subCategory.name}</h1>
            <p className="text-gray-600 mt-2">SubCategory Details</p>
          </div>
        </div>
        
        <div className="flex space-x-3">
          <Link
            to={`/dashboard/subcategories/edit/${subCategory.id}`}
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
            Delete
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* SubCategory Info */}
        <div className="lg:col-span-2 space-y-6">
          {/* SubCategory Details */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">SubCategory Information</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                <p className="text-gray-900">{subCategory.name}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Slug</label>
                <p className="text-gray-900 font-mono text-sm">{subCategory.slug}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                <Link
                  to={`/dashboard/categories/${subCategory.categoryId}`}
                  className="text-purple-600 hover:text-purple-700 font-medium"
                >
                  {category?.name || 'Unknown'}
                </Link>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <p className="text-gray-900">{subCategory.description}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                <span className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${
                  subCategory.isActive 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-red-100 text-red-800'
                }`}>
                  {subCategory.isActive ? 'Active' : 'Inactive'}
                </span>
              </div>
            </div>
          </div>

          {/* Parent Category Info */}
          {category && (
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Parent Category</h2>
              <div className="flex items-center space-x-4">
                <div className="h-16 w-16 overflow-hidden rounded-xl">
                  <img
                    src={category.image}
                    alt={category.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">{category.name}</h3>
                  <p className="text-gray-600 text-sm">{category.description}</p>
                  <Link
                    to={`/dashboard/categories/${category.id}`}
                    className="text-purple-600 hover:text-purple-700 text-sm font-medium"
                  >
                    View Category Details →
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Quick Stats */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Quick Stats</h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Category ID</span>
                <span className="font-semibold text-gray-900">{subCategory.categoryId}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Created</span>
                <span className="font-semibold text-gray-900">{subCategory.createdAt}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Updated</span>
                <span className="font-semibold text-gray-900">{subCategory.updatedAt}</span>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Quick Actions</h3>
            <div className="space-y-3">
              <Link
                to={`/dashboard/subcategories/edit/${subCategory.id}`}
                className="block w-full text-center px-4 py-2 bg-linear-to-r from-purple-600 to-pink-600 text-white rounded-xl hover:from-purple-700 hover:to-pink-700 transition-all duration-200 font-medium"
              >
                Edit SubCategory
              </Link>
              <Link
                to={`/dashboard/categories/${subCategory.categoryId}`}
                className="block w-full text-center px-4 py-2 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors duration-200 font-medium"
              >
                View Parent Category
              </Link>
              <Link
                to={`/dashboard/subcategories?category=${subCategory.categoryId}`}
                className="block w-full text-center px-4 py-2 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors duration-200 font-medium"
              >
                View Related SubCategories
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full mx-4">
            <h3 className="text-lg font-bold text-gray-900 mb-2">Delete SubCategory</h3>
            <p className="text-gray-600 mb-6">
              Are you sure you want to delete "{subCategory.name}"? This action cannot be undone.
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
                {deleting ? 'Deleting...' : 'Delete'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SubCategoryDetail;
