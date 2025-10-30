import React, { useState, useEffect } from "react";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useCategories, useCreateSubCategory } from "../../../hooks/useCategories";
import Swal from "sweetalert2";

const AddSubCategory = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const categoryIdParam = searchParams.get("category");

  const [formData, setFormData] = useState({
    categoryId: categoryIdParam || "",
    name: "",
    description: "",
    image: "",
    isActive: true,
  });

  const { data: categories = [], isLoading: categoriesLoading } = useCategories();
  const { mutateAsync: createSubCategory, isPending: loading } = useCreateSubCategory();


  // Update categoryId when URL parameter changes
  useEffect(() => {
    setFormData((prev) => ({
      ...prev,
      categoryId: categoryIdParam || "",
    }));
  }, [categoryIdParam]);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.categoryId || formData.categoryId === "") {
      return Swal.fire({
        title: "Missing Field!",
        text: "Please select a valid category before submitting.",
        icon: "warning",
        confirmButtonColor: "#facc15",
      });
    }

    if (!formData.name || formData.name.trim() === "") {
      return Swal.fire({
        title: "Missing Field!",
        text: "Please enter a subcategory name.",
        icon: "warning",
        confirmButtonColor: "#facc15",
      });
    }

    if (!formData.description || formData.description.trim() === "") {
      return Swal.fire({
        title: "Missing Field!",
        text: "Please enter a subcategory description.",
        icon: "warning",
        confirmButtonColor: "#facc15",
      });
    }

    const payload = {
      name: formData.name,
      description: formData.description,
      image: formData.image || null,
      isActive: formData.isActive,
      categoryId: String(formData.categoryId),
    };

    try {
      await createSubCategory(payload);

      await Swal.fire({
        title: "Success!",
        text: "SubCategory created successfully!",
        icon: "success",
        confirmButtonText: "OK",
        confirmButtonColor: "#8b5cf6",
      });

      navigate("/dashboard/subcategories");
    } catch (error) {
      const errorMessage = error.response?.data?.message || 
                          error.response?.data?.error || 
                          "Failed to create subcategory. Please try again.";
      
      await Swal.fire({
        title: "Error!",
        text: errorMessage,
        icon: "error",
        confirmButtonText: "OK",
        confirmButtonColor: "#ef4444",
      });
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Add New SubCategory</h1>
          <p className="text-gray-600 mt-2">Create a new product subcategory.</p>
        </div>
        <button
          onClick={() => navigate("/dashboard/subcategories")}
          className="flex items-center px-4 py-2 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors duration-200 font-medium"
        >
          <ArrowLeftIcon className="w-5 h-5 mr-2" />
          Back
        </button>
      </div>

      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-2xl shadow-lg p-8 space-y-6"
      >
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
            <option key="default" value="">
              {categoriesLoading ? "Loading categories..." : "Select a category"}
            </option>
            {categories.map((category) => (
              <option key={category._id || category.id} value={category._id || category.id}>
                {category.name}
              </option>
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
            placeholder="Enter subcategory name"
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
            placeholder="Enter subcategory description"
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
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
            placeholder="Enter image URL (optional)"
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
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
          <label className="text-sm font-medium text-gray-700">
            Active SubCategory
          </label>
        </div>

        {/* Footer Actions */}
        <div className="flex justify-end gap-3 pt-4 border-t border-gray-200">
          <button
            type="button"
            onClick={() => navigate("/dashboard/subcategories")}
            className="px-6 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors duration-200 font-medium"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={loading}
            className="px-6 py-3 bg-linear-to-r from-purple-600 to-pink-600 text-white rounded-xl hover:from-purple-700 hover:to-pink-700 transition-all duration-200 font-medium shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Creating..." : "Create SubCategory"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddSubCategory;
