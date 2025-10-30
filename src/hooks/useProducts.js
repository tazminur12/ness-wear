import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import useAxiosSecure from './useAxiosSecure'

// Query Keys
const productsKey = ['products']
const productKey = (id) => ['product', id]
const productsByCategoryKey = (categoryId) => ['products', { categoryId }]
const productsBySubCategoryKey = (subCategoryId) => ['products', { subCategoryId }]
const trendingProductsKey = ['products', 'trending']
const newArrivalProductsKey = ['products', 'new-arrivals']
const searchProductsKey = (query) => ['products', 'search', query]

// ==========================
// Get all products with filtering and pagination
// ==========================
export const useProducts = (params = {}) => {
  const axiosSecure = useAxiosSecure()
  
  const {
    page = 1,
    limit = 10,
    categoryId,
    subCategoryId,
    isActive,
    isTrending,
    isNewArrival,
    search,
    sortBy = 'createdAt',
    sortOrder = 'desc'
  } = params

  return useQuery({
    queryKey: [...productsKey, params],
    queryFn: async () => {
      const queryParams = new URLSearchParams()
      
      if (page) queryParams.append('page', page)
      if (limit) queryParams.append('limit', limit)
      if (categoryId) queryParams.append('categoryId', categoryId)
      if (subCategoryId) queryParams.append('subCategoryId', subCategoryId)
      if (isActive !== undefined) queryParams.append('isActive', isActive)
      if (isTrending !== undefined) queryParams.append('isTrending', isTrending)
      if (isNewArrival !== undefined) queryParams.append('isNewArrival', isNewArrival)
      if (search) queryParams.append('search', search)
      if (sortBy) queryParams.append('sortBy', sortBy)
      if (sortOrder) queryParams.append('sortOrder', sortOrder)

      const { data } = await axiosSecure.get(`/products?${queryParams.toString()}`)

      // Normalize various possible backend shapes
      // Case A: { products: [...] }
      // Case B: [ ... ]
      const rawProducts = Array.isArray(data) ? data : (data.products || [])

      const normalized = rawProducts.map(product => ({
        ...product,
        id: product.id || product._id,
        _id: undefined,
        image: product.image || (Array.isArray(product.images) ? product.images[0] || null : null)
      }))

      return Array.isArray(data)
        ? { products: normalized }
        : { ...data, products: normalized }
    },
  })
}

// ==========================
// Get single product by ID
// ==========================
export const useProduct = (id, options = {}) => {
  const axiosSecure = useAxiosSecure()
  
  return useQuery({
    queryKey: productKey(id),
    queryFn: async () => {
      if (!id || id === 'undefined') {
        throw new Error('Valid product ID required')
      }
      
      const { data } = await axiosSecure.get(`/products/${id}`)
      
      // Transform MongoDB _id to id for frontend compatibility
      return {
        ...data,
        id: data._id,
        _id: undefined,
        image: data.image || (Array.isArray(data.images) ? data.images[0] || null : null)
      }
    },
    enabled: Boolean(id) && (options.enabled ?? true),
  })
}

// ==========================
// Create new product
// ==========================
export const useCreateProduct = () => {
  const axiosSecure = useAxiosSecure()
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: async (productData) => {
      const {
        name,
        description,
        price,
        offerPrice,
        discountPercentage,
        categoryId,
        subCategoryId,
        colors = [],
        sizes = [],
        image,
        images = [],
        sku,
        material,
        care,
        stock = 0,
        isActive = true,
        isTrending = false,
        isNewArrival = false
      } = productData

      // Validation
      if (!name || name.trim() === '') {
        throw new Error('Product name is required')
      }

      if (!description || description.trim() === '') {
        throw new Error('Product description is required')
      }

      if (!price || price <= 0) {
        throw new Error('Valid price is required')
      }

      if (!categoryId) {
        throw new Error('Category ID is required')
      }

      if (!subCategoryId) {
        throw new Error('Subcategory ID is required')
      }

      const { data } = await axiosSecure.post('/products', {
        name: name.trim(),
        description: description.trim(),
        price: parseFloat(price),
        offerPrice: offerPrice ? parseFloat(offerPrice) : null,
        discountPercentage: discountPercentage ? parseFloat(discountPercentage) : null,
        categoryId,
        subCategoryId,
        colors: Array.isArray(colors) ? colors : [],
        sizes: Array.isArray(sizes) ? sizes : [],
        image: image || (Array.isArray(images) ? images[0] || null : null),
        images: Array.isArray(images) ? images : [],
        sku: sku || undefined,
        material: material || undefined,
        care: care || undefined,
        stock: parseInt(stock) || 0,
        isActive: Boolean(isActive),
        isTrending: Boolean(isTrending),
        isNewArrival: Boolean(isNewArrival)
      })

      // Transform MongoDB _id to id for frontend compatibility
      return {
        ...data,
        product: {
          ...data.product,
          id: data.product._id,
          _id: undefined,
          image: data.product.image || (Array.isArray(data.product.images) ? data.product.images[0] || null : null)
        }
      }
    },
    onSuccess: () => {
      // Invalidate and refetch products queries
      queryClient.invalidateQueries({ queryKey: productsKey })
      queryClient.invalidateQueries({ queryKey: trendingProductsKey })
      queryClient.invalidateQueries({ queryKey: newArrivalProductsKey })
    },
  })
}

// ==========================
// Update product
// ==========================
export const useUpdateProduct = () => {
  const axiosSecure = useAxiosSecure()
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: async ({ id, ...productData }) => {
      if (!id || id === 'undefined') {
        throw new Error('Valid product ID required')
      }

      const {
        name,
        description,
        price,
        offerPrice,
        discountPercentage,
        categoryId,
        subCategoryId,
        colors,
        sizes,
        image,
        images,
        sku,
        material,
        care,
        stock,
        isActive,
        isTrending,
        isNewArrival
      } = productData

      // Validation
      if (name !== undefined && (!name || name.trim() === '')) {
        throw new Error('Product name cannot be empty')
      }

      if (description !== undefined && (!description || description.trim() === '')) {
        throw new Error('Product description cannot be empty')
      }

      if (price !== undefined && price <= 0) {
        throw new Error('Price must be greater than 0')
      }

      const updateData = {}
      
      if (name !== undefined) updateData.name = name.trim()
      if (description !== undefined) updateData.description = description.trim()
      if (price !== undefined) updateData.price = parseFloat(price)
      if (offerPrice !== undefined) updateData.offerPrice = offerPrice ? parseFloat(offerPrice) : null
      if (discountPercentage !== undefined) updateData.discountPercentage = discountPercentage ? parseFloat(discountPercentage) : null
      if (categoryId !== undefined) updateData.categoryId = categoryId
      if (subCategoryId !== undefined) updateData.subCategoryId = subCategoryId
      if (colors !== undefined) updateData.colors = Array.isArray(colors) ? colors : []
      if (sizes !== undefined) updateData.sizes = Array.isArray(sizes) ? sizes : []
      if (image !== undefined) updateData.image = image || null
      if (images !== undefined) {
        const normalizedImages = Array.isArray(images) ? images : []
        updateData.images = normalizedImages
        if (image === undefined) {
          updateData.image = normalizedImages[0] || null
        }
      }
      if (sku !== undefined) updateData.sku = sku
      if (material !== undefined) updateData.material = material
      if (care !== undefined) updateData.care = care
      if (stock !== undefined) updateData.stock = parseInt(stock) || 0
      if (isActive !== undefined) updateData.isActive = Boolean(isActive)
      if (isTrending !== undefined) updateData.isTrending = Boolean(isTrending)
      if (isNewArrival !== undefined) updateData.isNewArrival = Boolean(isNewArrival)

      const { data } = await axiosSecure.put(`/products/${id}`, updateData)
      
      // Transform MongoDB _id to id for frontend compatibility
      return {
        ...data,
        product: {
          ...data.product,
          id: data.product._id,
          _id: undefined,
          image: data.product.image || (Array.isArray(data.product.images) ? data.product.images[0] || null : null)
        }
      }
    },
    onSuccess: (data, variables) => {
      // Invalidate and refetch products queries
      queryClient.invalidateQueries({ queryKey: productsKey })
      queryClient.invalidateQueries({ queryKey: productKey(variables.id) })
      queryClient.invalidateQueries({ queryKey: trendingProductsKey })
      queryClient.invalidateQueries({ queryKey: newArrivalProductsKey })
    },
  })
}

// ==========================
// Delete product
// ==========================
export const useDeleteProduct = () => {
  const axiosSecure = useAxiosSecure()
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: async (id) => {
      if (!id || id === 'undefined') {
        throw new Error('Valid product ID required')
      }

      const { data } = await axiosSecure.delete(`/products/${id}`)
      return data
    },
    onSuccess: () => {
      // Invalidate and refetch products queries
      queryClient.invalidateQueries({ queryKey: productsKey })
      queryClient.invalidateQueries({ queryKey: trendingProductsKey })
      queryClient.invalidateQueries({ queryKey: newArrivalProductsKey })
    },
  })
}

// ==========================
// Get products by category
// ==========================
export const useProductsByCategory = (categoryId, params = {}) => {
  const axiosSecure = useAxiosSecure()
  
  const { page = 1, limit = 10, subCategoryId } = params

  return useQuery({
    queryKey: [...productsByCategoryKey(categoryId), params],
    queryFn: async () => {
      const queryParams = new URLSearchParams()
      if (page) queryParams.append('page', page)
      if (limit) queryParams.append('limit', limit)
      if (subCategoryId) queryParams.append('subCategoryId', subCategoryId)

      const { data } = await axiosSecure.get(`/categories/${categoryId}/products?${queryParams.toString()}`)
      
      // Transform MongoDB _id to id for frontend compatibility
      return {
        ...data,
        products: data.products?.map(product => ({
          ...product,
          id: product._id,
          _id: undefined,
          image: product.image || (Array.isArray(product.images) ? product.images[0] || null : null)
        })) || []
      }
    },
    enabled: Boolean(categoryId),
  })
}

// ==========================
// Get products by subcategory
// ==========================
export const useProductsBySubCategory = (subCategoryId, params = {}) => {
  const axiosSecure = useAxiosSecure()
  
  const { page = 1, limit = 10 } = params

  return useQuery({
    queryKey: [...productsBySubCategoryKey(subCategoryId), params],
    queryFn: async () => {
      const queryParams = new URLSearchParams()
      if (page) queryParams.append('page', page)
      if (limit) queryParams.append('limit', limit)

      const { data } = await axiosSecure.get(`/subcategories/${subCategoryId}/products?${queryParams.toString()}`)
      
      // Transform MongoDB _id to id for frontend compatibility
      return {
        ...data,
        products: data.products?.map(product => ({
          ...product,
          id: product._id,
          _id: undefined,
          image: product.image || (Array.isArray(product.images) ? product.images[0] || null : null)
        })) || []
      }
    },
    enabled: Boolean(subCategoryId),
  })
}

// ==========================
// Get trending products
// ==========================
export const useTrendingProducts = (limit = 8) => {
  const axiosSecure = useAxiosSecure()
  
  return useQuery({
    queryKey: [...trendingProductsKey, limit],
    queryFn: async () => {
      const queryParams = new URLSearchParams()
      if (limit) queryParams.append('limit', limit)

      const { data } = await axiosSecure.get(`/products/trending?${queryParams.toString()}`)
      
      // Transform MongoDB _id to id for frontend compatibility
      return data.map(product => ({
        ...product,
        id: product._id,
        _id: undefined,
        image: product.image || (Array.isArray(product.images) ? product.images[0] || null : null)
      }))
    },
  })
}

// ==========================
// Get new arrival products
// ==========================
export const useNewArrivalProducts = (limit = 8) => {
  const axiosSecure = useAxiosSecure()
  
  return useQuery({
    queryKey: [...newArrivalProductsKey, limit],
    queryFn: async () => {
      const queryParams = new URLSearchParams()
      if (limit) queryParams.append('limit', limit)

      const { data } = await axiosSecure.get(`/products/new-arrivals?${queryParams.toString()}`)
      
      // Transform MongoDB _id to id for frontend compatibility
      return data.map(product => ({
        ...product,
        id: product._id,
        _id: undefined,
        image: product.image || (Array.isArray(product.images) ? product.images[0] || null : null)
      }))
    },
  })
}

// ==========================
// Search products
// ==========================
export const useSearchProducts = (query, params = {}) => {
  const axiosSecure = useAxiosSecure()
  
  const { page = 1, limit = 10 } = params

  return useQuery({
    queryKey: [...searchProductsKey(query), params],
    queryFn: async () => {
      if (!query || query.trim() === '') {
        throw new Error('Search query is required')
      }

      const queryParams = new URLSearchParams()
      queryParams.append('q', query)
      if (page) queryParams.append('page', page)
      if (limit) queryParams.append('limit', limit)

      const { data } = await axiosSecure.get(`/products/search?${queryParams.toString()}`)
      
      // Transform MongoDB _id to id for frontend compatibility
      return {
        ...data,
        products: data.products?.map(product => ({
          ...product,
          id: product._id,
          _id: undefined,
          image: product.image || (Array.isArray(product.images) ? product.images[0] || null : null)
        })) || []
      }
    },
    enabled: Boolean(query && query.trim()),
  })
}

// Default export for backward compatibility
export default {
  useProducts,
  useProduct,
  useCreateProduct,
  useUpdateProduct,
  useDeleteProduct,
  useProductsByCategory,
  useProductsBySubCategory,
  useTrendingProducts,
  useNewArrivalProducts,
  useSearchProducts
}