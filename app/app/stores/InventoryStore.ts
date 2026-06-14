import { defineStore } from 'pinia'
import {getSupabase} from '../lib/supabaseClient'
import { useLoginStore, type completedRobot } from '#imports'

export const useInventoryStore = defineStore('inventory', {
    state: () => ({
        inventory: [] as (inventoryPart)[],
        initialized: false as boolean
    }),
    actions: {
        async fetchParts() { 
            const supabase = getSupabase()
            const user = await useLoginStore().getUserData()
            
            const { data, error } = await supabase
                .from('owned_robot_parts')
                .select('*')

            if (error) {
                console.error('Error fetching owned parts:', error)
            } else {
                let userParts = data.filter((item:inventoryPart) => item.user_id === user.user_id) ?? []
                userParts.forEach((part:inventoryPart) => {
                    this.inventory.push(part)
                })
            } 
        },

    async fetchCompletedRobots() {
    const supabase = getSupabase()
    const user = await useLoginStore().getUserData()

    const { data, error } = await supabase
        .from('complete_robots')
        .select('*')
        .eq('user_owned', user.user_id)

    if (error) {
        console.error('Error fetching complete robots:', error)
        return
    }

    data?.forEach((robot: completedRobot) => {
        this.inventory.push({
        uuid: robot.completed_robot_id,
        user_id: robot.user_owned,
        part_id: null,
        completed_robot_id: robot.completed_robot_id,
        quantity: 1,
        robot_name: robot.robot_name,
    } as inventoryPart)
  })},

    async initialize() {
            await this.fetchParts()
            await this.fetchCompletedRobots()
            this.initialized = true
        }
    },
}) 