import { supabase } from '../supabase'

export const supabaseUserService = {
  // Get user profile from users table
  async getUserProfile(userId) {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('uid', userId)
      .single()
    
    if (error && error.code !== 'PGRST116') throw error
    return data
  },

  // Create or update user profile
  async upsertUserProfile(userData) {
    const { data, error } = await supabase
      .from('users')
      .upsert(userData)
      .select()
      .single()
    
    if (error) throw error
    return data
  },

  // Update user profile
  async updateUserProfile(userId, updates) {
    const { data, error } = await supabase
      .from('users')
      .update(updates)
      .eq('uid', userId)
      .select()
      .single()
    
    if (error) throw error
    return data
  },

  // Get all users (for admin)
  async getAllUsers() {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .order('created_at', { ascending: false })
    
    if (error) throw error
    return data
  },

  // Delete user
  async deleteUser(userId) {
    const { error } = await supabase
      .from('users')
      .delete()
      .eq('uid', userId)
    
    if (error) throw error
    
    // Also delete from auth
    const { error: authError } = await supabase.auth.admin.deleteUser(userId)
    if (authError) console.error('Auth delete error:', authError)
  },

  // Update user role
  async updateUserRole(userId, role) {
    const { data, error } = await supabase
      .from('users')
      .update({ role })
      .eq('uid', userId)
      .select()
      .single()
    
    if (error) throw error
    return data
  },

  // Listen to user profile changes
  onUserProfileChange(userId, callback) {
    return supabase
      .channel(`user-${userId}`)
      .on('postgres_changes', {
        event: '*',
        schema: 'public',
        table: 'users',
        filter: `uid=eq.${userId}`,
      }, (payload) => callback(payload.new))
      .subscribe()
  },
}
