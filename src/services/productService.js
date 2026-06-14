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
