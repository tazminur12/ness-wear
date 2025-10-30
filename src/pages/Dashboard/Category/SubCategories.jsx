import React, { useState, useMemo, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { 
  PlusIcon, 
  PencilIcon, 
  TrashIcon, 
  EyeIcon,
  MagnifyingGlassIcon,
  FunnelIcon,
  ArrowLeftIcon
} from '@heroicons/react/24/outline';
import { useSubCategories, useCategories, useDeleteSubCategory } from '../../../hooks/useCategories';
import Swal from 'sweetalert2';

const SubCategories = () => {
  const [searchParams] = useSearchParams();
  const categoryId = searchParams.get('category');
  
  const { data: subCategories = [], isLoading: loading } = useSubCategories();
  const { data: categories = [] } = useCategories();
  const { mutateAsync: deleteSubCategory, isPending: deleting } = useDeleteSubCategory();

  // Helper function to get category name from API data
  const getCategoryName = (categoryId) => {
    const category = categories.find(cat => cat.id === categoryId);
    return category ? category.name : 'Unknown';
  };
  
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState(() => {
    // Use categoryId directly as string, default to 'all' if not provided
    return categoryId || 'all';
  });
  const [filterStatus, setFilterStatus] = useState('all');
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [subCategoryToDelete, setSubCategoryToDelete] = useState(null);

  // Update filterCategory when URL categoryId changes
  useEffect(() => {
    setFilterCategory(categoryId || 'all');
  }, [categoryId]);

  const handleDelete = async (subCategoryId) => {
    try {
      await deleteSubCategory(subCategoryId);
      await Swal.fire({
        title: 'Success!',
        text: 'SubCategory deleted successfully!',
        icon: 'success',
        confirmButtonText: 'OK',
        confirmButtonColor: '#8b5cf6'
      });
      setShowDeleteModal(false);
      setSubCategoryToDelete(null);
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

  const filteredSubCategories = useMemo(() => subCategories.filter(subCategory => {
    const matchesSearch = subCategory.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        subCategory.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    // Ensure proper comparison for category filtering
    const matchesCategory = filterCategory === 'all' || 
                           (filterCategory !== 'all' && subCategory.categoryId === filterCategory);
    
    const matchesStatus = filterStatus === 'all' || 
                         (filterStatus === 'active' && subCategory.isActive) ||
                         (filterStatus === 'inactive' && !subCategory.isActive);
    
    return matchesSearch && matchesCategory && matchesStatus;
  }), [subCategories, searchTerm, filterCategory, filterStatus]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Link
            to="/dashboard/categories"
            className="flex items-center px-4 py-2 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors duration-200 font-medium"
          >
            <ArrowLeftIcon className="w-5 h-5 mr-2" />
            Back to Categories
          </Link>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">SubCategories</h1>
            <p className="text-gray-600 mt-2">Manage your product subcategories</p>
          </div>
        </div>
        <Link
          to={`/dashboard/subcategories/add${categoryId ? `?category=${categoryId}` : ''}`}
          className="flex items-center px-4 py-2 bg-linear-to-r from-purple-600 to-pink-600 text-white rounded-xl hover:from-purple-700 hover:to-pink-700 transition-all duration-200 font-medium shadow-lg"
        >
          <PlusIcon className="w-5 h-5 mr-2" />
          Add SubCategory
        </Link>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Search */}
          <div className="relative">
            <MagnifyingGlassIcon className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search subcategories..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
          </div>

          {/* Category Filter */}
          <div className="relative">
            <FunnelIcon className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="pl-10 pr-8 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent appearance-none bg-white w-full"
            >
              <option value="all">All Categories</option>
              {categories.map(category => (
                <option key={category.id} value={category.id}>{category.name}</option>
              ))}
            </select>
          </div>

          {/* Status Filter */}
          <div className="relative">
            <FunnelIcon className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="pl-10 pr-8 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent appearance-none bg-white w-full"
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>

          {/* Clear Filters */}
          <button
            onClick={() => {
              setSearchTerm('');
              // Reset to the original categoryId from URL or 'all'
              setFilterCategory(categoryId || 'all');
              setFilterStatus('all');
            }}
            className="px-4 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors duration-200 font-medium"
          >
            Clear Filters
          </button>
        </div>
      </div>

      {/* SubCategories Table */}
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Created</th>
                <th className="px-6 py-4 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredSubCategories.map((subCategory) => (
                <tr key={subCategory.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{subCategory.name}</div>
                    <div className="text-sm text-gray-500">{subCategory.slug}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-sm text-gray-900">{getCategoryName(subCategory.categoryId)}</span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-900 max-w-xs truncate">{subCategory.description}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${
                      subCategory.isActive 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {subCategory.isActive ? 'Active' : 'Inactive'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {subCategory.createdAt}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex items-center justify-end space-x-2">
                      <Link
                        to={`/dashboard/subcategories/${subCategory.id}`}
                        className="text-gray-400 hover:text-blue-600 transition-colors duration-200"
                        title="View Details"
                      >
                        <EyeIcon className="w-4 h-4" />
                      </Link>
                      <Link
                        to={`/dashboard/subcategories/edit/${subCategory.id}`}
                        className="text-gray-400 hover:text-yellow-600 transition-colors duration-200"
                        title="Edit SubCategory"
                      >
                        <PencilIcon className="w-4 h-4" />
                      </Link>
                      <button
                        onClick={() => {
                          setSubCategoryToDelete(subCategory);
                          setShowDeleteModal(true);
                        }}
                        className="text-gray-400 hover:text-red-600 transition-colors duration-200"
                        title="Delete SubCategory"
                      >
                        <TrashIcon className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Empty State */}
      {filteredSubCategories.length === 0 && !loading && (
        <div className="text-center py-12">
          <div className="w-24 h-24 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
            <FunnelIcon className="w-12 h-12 text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No subcategories found</h3>
          <p className="text-gray-600 mb-6">
            {searchTerm || filterCategory !== 'all' || filterStatus !== 'all'
              ? 'Try adjusting your search or filter criteria.'
              : 'Get started by creating your first subcategory.'
            }
          </p>
          {!searchTerm && filterCategory === 'all' && filterStatus === 'all' && (
            <Link
              to="/dashboard/subcategories/add"
              className="inline-flex items-center px-4 py-2 bg-linear-to-r from-purple-600 to-pink-600 text-white rounded-xl hover:from-purple-700 hover:to-pink-700 transition-all duration-200 font-medium"
            >
              <PlusIcon className="w-5 h-5 mr-2" />
              Add SubCategory
            </Link>
          )}
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full mx-4">
            <h3 className="text-lg font-bold text-gray-900 mb-2">Delete SubCategory</h3>
            <p className="text-gray-600 mb-6">
              Are you sure you want to delete "{subCategoryToDelete?.name}"? This action cannot be undone.
            </p>
            <div className="flex space-x-3">
              <button
                onClick={() => {
                  setShowDeleteModal(false);
                  setSubCategoryToDelete(null);
                }}
                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors duration-200 font-medium"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDelete(subCategoryToDelete.id)}
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

export default SubCategories;
