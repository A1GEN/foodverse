import { supabase } from '../supabase/index'

export const getCategories = async () => {
  try {
    const { data, error } = await supabase
      .from('category')
      .select('*')
    
    if (error) throw error
    return data || []
  } catch (error) {
    console.error('Error fetching categories:', error)
    throw error
  }
}
