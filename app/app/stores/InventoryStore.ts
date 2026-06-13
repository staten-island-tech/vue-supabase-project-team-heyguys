import { defineStore } from 'pinia'
import {getSupabase} from '../lib/supabaseClient'
import { useLoginStore, type completedRobot } from '#imports'
import { useGachaStore } from '#imports'

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

            if (error) {
                console.error('Error fetching complete robots:', error)
            } else {
                let userRobots = data.filter((robot:dbRobot) => robot.user_id === user.user_id) ?? []
                userRobots.forEach((robot:dbRobot) => {
                    this.inventory.push({
                        uuid: robot.uuid,
                        user_id: robot.user_id,
                        part_id: null, // string for parts, null for robots
                        completed_robot_id: null,
                        quantity: 1
                    } as inventoryPart)
                })
            } 
        },

        async initialize() {
            await this.fetchParts()
            await this.fetchCompletedRobots()

            this.initialized = true
        }
    },
}) 