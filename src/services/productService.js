import { supabase } from '../supabase'

export const getProducts = async () => {
  try {
    const { data, error } = await supabase
      .from('foods')
      .select('*')
      .order('created_at', { ascending: false })
    
    if (error) throw error
    return data
  } catch (error) {
    console.error('Error fetching products:', error)
    return []
  }
}

export const getProductById = async (id) => {
  try {
    const { data, error } = await supabase
      .from('foods')
      .select('*')
      .eq('id', id)
      .single()
    
    if (error) throw error
    return data
  } catch (error) {
    console.error('Error fetching product:', error)
    return null
  }
}

export const getProductsByCategory = async (categoryId) => {
  try {
    const { data, error } = await supabase
      .from('foods')
      .select('*')
      .eq('category_id', categoryId)
      .order('created_at', { ascending: false })
    
    if (error) throw error
    return data
  } catch (error) {
    console.error('Error fetching products by category:', error)
    return []
  }
}

export const searchProducts = async (query) => {
  try {
    const { data, error } = await supabase
      .from('foods')
      .select('*')
      .ilike('name', `%${query}%`)
      .order('created_at', { ascending: false })
    
    if (error) throw error
    return data
  } catch (error) {
    console.error('Error searching products:', error)
    return []
  }
}

export const createProduct = async (product) => {
  try {
    const { data, error } = await supabase
      .from('foods')
      .insert([product])
      .select()
      .single()
    
    if (error) throw error
    return data
  } catch (error) {
    console.error('Error creating product:', error)
    throw error
  }
}

export const updateProduct = async (id, updates) => {
  try {
    const { data, error } = await supabase
      .from('foods')
      .update(updates)
      .eq('id', id)
      .select()
      .single()
    
    if (error) throw error
    return data
  } catch (error) {
    console.error('Error updating product:', error)
    throw error
  }
}

export const deleteProduct = async (id) => {
  try {
    const { error } = await supabase
      .from('foods')
      .delete()
      .eq('id', id)
    
    if (error) throw error
    return true
  } catch (error) {
    console.error('Error deleting product:', error)
    throw error
  }
}
