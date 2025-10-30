// Categories and SubCategories data
export const categories = [
  {
    id: 1,
    name: "T-Shirt",
    slug: "t-shirt",
    description: "Comfortable and stylish t-shirts for everyday wear",
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500&h=600&fit=crop&bg=white",
    isActive: true,
    createdAt: "2024-01-15",
    updatedAt: "2024-01-15"
  },
  {
    id: 2,
    name: "Hoodie",
    slug: "hoodie",
    description: "Warm and cozy hoodies for casual wear",
    image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=500&h=600&fit=crop",
    isActive: true,
    createdAt: "2024-01-15",
    updatedAt: "2024-01-15"
  },
  {
    id: 3,
    name: "Trousers",
    slug: "trousers",
    description: "Comfortable trousers for various occasions",
    image: "https://images.unsplash.com/photo-1542272604-787c3835535d?w=500&h=600&fit=crop",
    isActive: true,
    createdAt: "2024-01-15",
    updatedAt: "2024-01-15"
  },
  {
    id: 4,
    name: "Shoes",
    slug: "shoes",
    description: "Stylish and comfortable footwear",
    image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=500&h=600&fit=crop",
    isActive: true,
    createdAt: "2024-01-15",
    updatedAt: "2024-01-15"
  },
  {
    id: 5,
    name: "Accessories",
    slug: "accessories",
    description: "Fashion accessories to complete your look",
    image: "https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=500&h=600&fit=crop",
    isActive: true,
    createdAt: "2024-01-15",
    updatedAt: "2024-01-15"
  }
];

export const subCategories = [
  // T-Shirt SubCategories
  {
    id: 1,
    categoryId: 1,
    name: "Basic Tees",
    slug: "basic-tees",
    description: "Simple and comfortable basic t-shirts",
    isActive: true,
    createdAt: "2024-01-15",
    updatedAt: "2024-01-15"
  },
  {
    id: 2,
    categoryId: 1,
    name: "Graphic Tees",
    slug: "graphic-tees",
    description: "T-shirts with designs and graphics",
    isActive: true,
    createdAt: "2024-01-15",
    updatedAt: "2024-01-15"
  },
  {
    id: 3,
    categoryId: 1,
    name: "Oversized Tees",
    slug: "oversized-tees",
    description: "Relaxed fit oversized t-shirts",
    isActive: true,
    createdAt: "2024-01-15",
    updatedAt: "2024-01-15"
  },

  // Hoodie SubCategories
  {
    id: 4,
    categoryId: 2,
    name: "Zip Hoodies",
    slug: "zip-hoodies",
    description: "Hoodies with zipper closure",
    isActive: true,
    createdAt: "2024-01-15",
    updatedAt: "2024-01-15"
  },
  {
    id: 5,
    categoryId: 2,
    name: "Pullover Hoodies",
    slug: "pullover-hoodies",
    description: "Classic pullover style hoodies",
    isActive: true,
    createdAt: "2024-01-15",
    updatedAt: "2024-01-15"
  },
  {
    id: 6,
    categoryId: 2,
    name: "Cropped Hoodies",
    slug: "cropped-hoodies",
    description: "Trendy cropped length hoodies",
    isActive: true,
    createdAt: "2024-01-15",
    updatedAt: "2024-01-15"
  },

  // Trousers SubCategories
  {
    id: 7,
    categoryId: 3,
    name: "Jeans",
    slug: "jeans",
    description: "Classic denim jeans",
    isActive: true,
    createdAt: "2024-01-15",
    updatedAt: "2024-01-15"
  },
  {
    id: 8,
    categoryId: 3,
    name: "Wide Leg Pants",
    slug: "wide-leg-pants",
    description: "Comfortable wide leg trousers",
    isActive: true,
    createdAt: "2024-01-15",
    updatedAt: "2024-01-15"
  },
  {
    id: 9,
    categoryId: 3,
    name: "Cargo Pants",
    slug: "cargo-pants",
    description: "Functional cargo style pants",
    isActive: true,
    createdAt: "2024-01-15",
    updatedAt: "2024-01-15"
  },

  // Shoes SubCategories
  {
    id: 10,
    categoryId: 4,
    name: "Sneakers",
    slug: "sneakers",
    description: "Comfortable athletic and casual sneakers",
    isActive: true,
    createdAt: "2024-01-15",
    updatedAt: "2024-01-15"
  },
  {
    id: 11,
    categoryId: 4,
    name: "Boots",
    slug: "boots",
    description: "Stylish boots for various occasions",
    isActive: true,
    createdAt: "2024-01-15",
    updatedAt: "2024-01-15"
  },
  {
    id: 12,
    categoryId: 4,
    name: "Canvas Shoes",
    slug: "canvas-shoes",
    description: "Lightweight canvas footwear",
    isActive: true,
    createdAt: "2024-01-15",
    updatedAt: "2024-01-15"
  },

  // Accessories SubCategories
  {
    id: 13,
    categoryId: 5,
    name: "Caps & Hats",
    slug: "caps-hats",
    description: "Headwear accessories",
    isActive: true,
    createdAt: "2024-01-15",
    updatedAt: "2024-01-15"
  },
  {
    id: 14,
    categoryId: 5,
    name: "Bags",
    slug: "bags",
    description: "Various types of bags and totes",
    isActive: true,
    createdAt: "2024-01-15",
    updatedAt: "2024-01-15"
  },
  {
    id: 15,
    categoryId: 5,
    name: "Jewelry",
    slug: "jewelry",
    description: "Fashion jewelry and accessories",
    isActive: true,
    createdAt: "2024-01-15",
    updatedAt: "2024-01-15"
  }
];

// API Functions for Categories
export const categoryAPI = {
  // Get all categories
  getAll: () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(categories);
      }, 500);
    });
  },

  // Get category by ID
  getById: (id) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const category = categories.find(cat => cat.id === parseInt(id));
        if (category) {
          resolve(category);
        } else {
          reject(new Error('Category not found'));
        }
      }, 300);
    });
  },

  // Create new category
  create: (categoryData) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const newCategory = {
          id: categories.length + 1,
          ...categoryData,
          slug: categoryData.name.toLowerCase().replace(/\s+/g, '-'),
          createdAt: new Date().toISOString().split('T')[0],
          updatedAt: new Date().toISOString().split('T')[0]
        };
        categories.push(newCategory);
        resolve(newCategory);
      }, 500);
    });
  },

  // Update category
  update: (id, categoryData) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const index = categories.findIndex(cat => cat.id === parseInt(id));
        if (index !== -1) {
          categories[index] = {
            ...categories[index],
            ...categoryData,
            slug: categoryData.name.toLowerCase().replace(/\s+/g, '-'),
            updatedAt: new Date().toISOString().split('T')[0]
          };
          resolve(categories[index]);
        } else {
          reject(new Error('Category not found'));
        }
      }, 500);
    });
  },

  // Delete category
  delete: (id) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const index = categories.findIndex(cat => cat.id === parseInt(id));
        if (index !== -1) {
          categories.splice(index, 1);
          resolve({ success: true });
        } else {
          reject(new Error('Category not found'));
        }
      }, 500);
    });
  }
};

// API Functions for SubCategories
export const subCategoryAPI = {
  // Get all subcategories
  getAll: () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(subCategories);
      }, 500);
    });
  },

  // Get subcategories by category ID
  getByCategoryId: (categoryId) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const filteredSubCategories = subCategories.filter(sub => sub.categoryId === parseInt(categoryId));
        resolve(filteredSubCategories);
      }, 300);
    });
  },

  // Get subcategory by ID
  getById: (id) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const subCategory = subCategories.find(sub => sub.id === parseInt(id));
        if (subCategory) {
          resolve(subCategory);
        } else {
          reject(new Error('SubCategory not found'));
        }
      }, 300);
    });
  },

  // Create new subcategory
  create: (subCategoryData) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const newSubCategory = {
          id: subCategories.length + 1,
          ...subCategoryData,
          slug: subCategoryData.name.toLowerCase().replace(/\s+/g, '-'),
          createdAt: new Date().toISOString().split('T')[0],
          updatedAt: new Date().toISOString().split('T')[0]
        };
        subCategories.push(newSubCategory);
        resolve(newSubCategory);
      }, 500);
    });
  },

  // Update subcategory
  update: (id, subCategoryData) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const index = subCategories.findIndex(sub => sub.id === parseInt(id));
        if (index !== -1) {
          subCategories[index] = {
            ...subCategories[index],
            ...subCategoryData,
            slug: subCategoryData.name.toLowerCase().replace(/\s+/g, '-'),
            updatedAt: new Date().toISOString().split('T')[0]
          };
          resolve(subCategories[index]);
        } else {
          reject(new Error('SubCategory not found'));
        }
      }, 500);
    });
  },

  // Delete subcategory
  delete: (id) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const index = subCategories.findIndex(sub => sub.id === parseInt(id));
        if (index !== -1) {
          subCategories.splice(index, 1);
          resolve({ success: true });
        } else {
          reject(new Error('SubCategory not found'));
        }
      }, 500);
    });
  }
};

// Helper functions
export const getCategoryName = (categoryId) => {
  const category = categories.find(cat => cat.id === parseInt(categoryId));
  return category ? category.name : 'Unknown';
};

export const getSubCategoryName = (subCategoryId) => {
  const subCategory = subCategories.find(sub => sub.id === parseInt(subCategoryId));
  return subCategory ? subCategory.name : 'Unknown';
};
