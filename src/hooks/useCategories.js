import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import useAxiosSecure from './useAxiosSecure'

// Query Keys
const categoriesKey = ['categories']
const categoryKey = (id) => ['category', id]
const subCategoriesKey = ['subcategories']
const subCategoriesByCategoryKey = (categoryId) => ['subcategories', { categoryId }]
const subCategoryKey = (id) => ['subcategory', id]

export const useCategories = () => {
  const axiosSecure = useAxiosSecure()
  return useQuery({
    queryKey: categoriesKey,
    queryFn: async () => {
      const { data } = await axiosSecure.get('/categories')
      // Transform MongoDB _id to id for frontend compatibility
      return data.map(item => ({
        ...item,
        id: item._id,
        _id: undefined
      }))
    },
  })
}

export const useCategory = (id, options = {}) => {
  const axiosSecure = useAxiosSecure()
  return useQuery({
    queryKey: categoryKey(id),
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/categories/${id}`)
      // Transform MongoDB _id to id for frontend compatibility
      return {
        ...data,
        id: data._id,
        _id: undefined
      }
    },
    enabled: Boolean(id) && (options.enabled ?? true),
  })
}

export const useCreateCategory = () => {
  const axiosSecure = useAxiosSecure()
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (payload) => {
      const { data } = await axiosSecure.post('/categories', payload)
      // Transform MongoDB _id to id for frontend compatibility
      return {
        ...data,
        id: data._id,
        _id: undefined
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: categoriesKey })
    },
  })
}

export const useUpdateCategory = () => {
  const axiosSecure = useAxiosSecure()
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async ({ id, payload }) => {
      const { data } = await axiosSecure.put(`/categories/${id}`, payload)
      // Transform MongoDB _id to id for frontend compatibility
      return {
        ...data,
        id: data._id,
        _id: undefined
      }
    },
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({ queryKey: categoriesKey })
      if (variables?.id) queryClient.invalidateQueries({ queryKey: categoryKey(variables.id) })
    },
  })
}

export const useDeleteCategory = () => {
  const axiosSecure = useAxiosSecure()
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (id) => {
      const { data } = await axiosSecure.delete(`/categories/${id}`)
      return data
    },
    onSuccess: (_data, id) => {
      queryClient.invalidateQueries({ queryKey: categoriesKey })
      if (id) queryClient.invalidateQueries({ queryKey: categoryKey(id) })
      // Also invalidate all subcategories since deleting a category deletes its subcategories
      queryClient.invalidateQueries({ queryKey: subCategoriesKey })
      queryClient.invalidateQueries({ queryKey: ['subcategories'] })
    },
  })
}

export default useCategories

// ==========================
// SubCategory Hooks (CRUD)
// ==========================

export const useSubCategories = () => {
  const axiosSecure = useAxiosSecure()
  return useQuery({
    queryKey: subCategoriesKey,
    queryFn: async () => {
      const { data } = await axiosSecure.get('/subcategories')
      // Transform MongoDB _id to id for frontend compatibility
      return data.map(item => ({
        ...item,
        id: item._id,
        _id: undefined
      }))
    },
  })
}

export const useSubCategoriesByCategory = (categoryId, options = {}) => {
  const axiosSecure = useAxiosSecure()
  return useQuery({
    queryKey: subCategoriesByCategoryKey(categoryId),
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/categories/${categoryId}/subcategories`)
      // The API returns { category: {...}, subcategories: [...] }
      // Transform MongoDB _id to id for frontend compatibility
      return data.subcategories.map(item => ({
        ...item,
        id: item._id,
        _id: undefined
      }))
    },
    enabled: Boolean(categoryId) && (options.enabled ?? true),
  })
}

export const useSubCategory = (id, options = {}) => {
  const axiosSecure = useAxiosSecure()
  return useQuery({
    queryKey: subCategoryKey(id),
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/subcategories/${id}`)
      // Transform MongoDB _id to id for frontend compatibility
      return {
        ...data,
        id: data._id,
        _id: undefined
      }
    },
    enabled: Boolean(id) && (options.enabled ?? true),
  })
}

export const useCreateSubCategory = () => {
  const axiosSecure = useAxiosSecure()
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (payload) => {
      const { data } = await axiosSecure.post('/subcategories', payload)
      // Transform MongoDB _id to id for frontend compatibility
      return {
        ...data,
        id: data._id,
        _id: undefined
      }
    },
    onSuccess: (_data, variables) => {
      // Invalidate all subcategories queries
      queryClient.invalidateQueries({ queryKey: subCategoriesKey })
      queryClient.invalidateQueries({ queryKey: ['subcategories'] })
      
      // Invalidate subcategories by category for the parent category
      if (variables?.categoryId) {
        queryClient.invalidateQueries({ queryKey: subCategoriesByCategoryKey(variables.categoryId) })
      }
      
      // Also invalidate categories to refresh the subcategories array
      queryClient.invalidateQueries({ queryKey: categoriesKey })
      if (variables?.categoryId) {
        queryClient.invalidateQueries({ queryKey: categoryKey(variables.categoryId) })
      }
    },
  })
}

export const useUpdateSubCategory = () => {
  const axiosSecure = useAxiosSecure()
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async ({ id, payload }) => {
      const { data } = await axiosSecure.put(`/subcategories/${id}`, payload)
      // Transform MongoDB _id to id for frontend compatibility
      return {
        ...data,
        id: data._id,
        _id: undefined
      }
    },
    onSuccess: (_data, variables) => {
      // Invalidate all subcategories queries
      queryClient.invalidateQueries({ queryKey: subCategoriesKey })
      queryClient.invalidateQueries({ queryKey: ['subcategories'] })
      
      if (variables?.id) {
        queryClient.invalidateQueries({ queryKey: subCategoryKey(variables.id) })
      }
      
      // Invalidate subcategories by category for both old and new categoryId
      if (variables?.payload?.categoryId) {
        queryClient.invalidateQueries({ queryKey: subCategoriesByCategoryKey(variables.payload.categoryId) })
      }
      
      // Also invalidate categories to refresh the subcategories arrays
      queryClient.invalidateQueries({ queryKey: categoriesKey })
      if (variables?.payload?.categoryId) {
        queryClient.invalidateQueries({ queryKey: categoryKey(variables.payload.categoryId) })
      }
    },
  })
}

export const useDeleteSubCategory = () => {
  const axiosSecure = useAxiosSecure()
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (id) => {
      const { data } = await axiosSecure.delete(`/subcategories/${id}`)
      return data
    },
    onSuccess: (_data, id) => {
      // Invalidate all subcategories queries
      queryClient.invalidateQueries({ queryKey: subCategoriesKey })
      queryClient.invalidateQueries({ queryKey: ['subcategories'] })
      
      if (id) {
        queryClient.invalidateQueries({ queryKey: subCategoryKey(id) })
      }
      
      // Invalidate all subcategories by category queries since we don't know which category
      queryClient.invalidateQueries({ queryKey: ['subcategories'] })
      
      // Also invalidate categories to refresh the subcategories arrays
      queryClient.invalidateQueries({ queryKey: categoriesKey })
    },
  })
}


