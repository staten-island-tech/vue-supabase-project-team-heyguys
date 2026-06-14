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

    async createRobotRow(robotName: string): Promise<completedRobot> {
      const supabase = getSupabase()
      const user = await useLoginStore().getUserData()

      const { data, error } = await supabase
        .from('complete_robots')
        .insert({
          user_owned: user.user_id,
          robot_name: robotName,
        })
        .select() 
        .single() //return as obj 

    if (error) {
    console.error('Error creating robot:', error)
    throw new Error(
      error?.message ?? 'Could not create robot.',
    )
  }
  return data as completedRobot },

  async updateParts(
    item: itemBoxProp,
    robotId: string,
  ) {
    const supabase = getSupabase()
    const part = item.inventoryPart

    if (!part.part_id) {
        throw new Error('Cant use a completed robot as a part!')
      }

      if (part.completed_robot_id !== null) {
        throw new Error('This part already belongs to a robot!')
      }

    if (part.quantity > 1) {
      const { error: decreaseError } = await supabase //decreases quantity of part by 1
        .from('owned_robot_parts')
        .update({
          quantity: part.quantity - 1,
        })
        .eq('uuid', part.uuid)

      if (decreaseError) throw decreaseError

      const { error: insertError } = await supabase // Create a separate row for the singular item that you put in the robot :)
        .from('owned_robot_parts')
        .insert({
          part_id: part.part_id,
          user_id: part.user_id,
          completed_robot_id: robotId,
          quantity: 1,
        })

      if (insertError) throw insertError
    } else {
      const { error } = await supabase 
        .from('owned_robot_parts')
        .update({
          completed_robot_id: robotId,
        })
        .eq('uuid', part.uuid)

      if (error) throw error
    }
  },

    async refreshInventory() {
      this.inventory = []

      await this.fetchParts()
      await this.fetchCompletedRobots()

      this.initialized = true
    },

  async buildRobot(
      robotName: string,
      selectedParts: itemBoxProp[],
    ) {
      const finalname = robotName.trim() //remove white spacing from the name
      if (!finalname) {
        throw new Error('Please enter a robot name!')
      }

      if (selectedParts.length !== 6) {
        throw new Error(
          'You need one of every part to build a robot!',
        )
      }
      const robot = await this.createRobotRow(finalname)

      for (const part of selectedParts) {
        await this.updateParts(
          part,
          robot.completed_robot_id,
        )
      }
      await this.refreshInventory()
      return robot
    },

    async returnRobotParts(robotId: string) {
  const supabase = getSupabase()
  const user = await useLoginStore().getUserData()

  const { data: robotParts, error: fetchError } = await supabase
    .from('owned_robot_parts')
    .select('*')
    .eq('completed_robot_id', robotId)
    .eq('user_id', user.user_id)

  if (fetchError) {
    console.error('Error fetching robot parts:', fetchError)
    throw fetchError
  }

  for (const robotPart of robotParts ?? []) {
    const { data: availablePart, error: availableError } =
      await supabase
        .from('owned_robot_parts')
        .select('*')
        .eq('user_id', user.user_id)
        .eq('part_id', robotPart.part_id)
        .is('completed_robot_id', null)
        .maybeSingle()

    if (availableError) {
      console.error(
        'Error finding available part:',
        availableError,
      )
      throw availableError
    }

    if (availablePart) { // Add the returned quantity to the  row
      const { error: quantityError } = await supabase
        .from('owned_robot_parts')
        .update({
          quantity:
            availablePart.quantity + robotPart.quantity,
        })
        .eq('uuid', availablePart.uuid)
        .eq('user_id', user.user_id)

      if (quantityError) throw quantityError

      const { error: deletePartError } = await supabase  // Remove the extra row
        .from('owned_robot_parts')
        .delete()
        .eq('uuid', robotPart.uuid)
        .eq('user_id', user.user_id)

      if (deletePartError) throw deletePartError
    } else {
      const { error: releaseError } = await supabase
        .from('owned_robot_parts')
        .update({
          completed_robot_id: null,
        })
        .eq('uuid', robotPart.uuid)
        .eq('user_id', user.user_id)

      if (releaseError) throw releaseError
    }
  }
},
    async deleteRobot(robotId: string) {
  const supabase = getSupabase()
  const user = await useLoginStore().getUserData()

  await this.returnRobotParts(robotId)
  const { error } = await supabase // Return the robot's parts to the inventory
    .from('complete_robots')
    .delete()
    .eq('completed_robot_id', robotId)
    .eq('user_owned', user.user_id)

  if (error) {
    console.error('Error releasing robot parts:', error)
    throw error
  }
  await this.refreshInventory()
},

    async initialize() {
         if (this.initialized) return
         await this.refreshInventory()
        }
    }
})  