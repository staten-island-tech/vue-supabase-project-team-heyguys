import { defineStore } from 'pinia'
import {getSupabase} from '../lib/supabaseClient'

export interface RobotPart {
  id: string     
  part_id: string 
  user_id: string
  completed_robot_id: string | null
  quantity: number
}


export const useInventoryStore = defineStore('inventory', {
    state: () => ({
        inventory: [] as any[],
    }),
    actions: {
        async fetchInventory() {
            const supabase = getSupabase()
            if (!supabase) {
                console.error('Supabase client is not available')
                return
            }
            const { data, error } = await supabase
                .from('inventory')
                .select('*')
            if (error) {
                console.error('Error fetching inventory:', error)
            } else {
                this.inventory = data || []
            }
        },
    },
}) 