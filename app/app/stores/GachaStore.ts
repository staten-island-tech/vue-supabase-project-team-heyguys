import { defineStore } from 'pinia'
import { getSupabase } from '../lib/supabaseClient'
import { Howl, Howler } from 'howler'

const supabase = getSupabase() 

const ecstasy = new Howl({
    src: ['/sounds/ecstasy.mp3']
})

export const useGachaStore = defineStore("gacha", {
  state: () => ({
    initialized: false as boolean,
    rewardData: null as null| robotPart[],
    probabilityTable: [
        { // legend
            max: 1,
            min: 1, 
            rarityName: "Legendary",
            pieces: []
        },
        { // epic
            max: 10,
            min: 2, 
            rarityName: "Epic",
            pieces: []
        },
        { // rare
            max: 40,
            min: 11, 
            rarityName: "Rare",
            pieces: []
        },
        { // common
            max: 100,
            min: 41, 
            rarityName: "Common",
            pieces: []
        },
    ] as Rarity[]
  }),
  actions: {
    async populateRewardData() {
      const { data, error } = await supabase
        .from('robot_parts')
        .select("*")

      if (error) {
        console.error(error.message)
      } else {
        this.rewardData = data
      }
    },
    populateProbabilityTable() {
        this.rewardData?.forEach((item) => {
            if(item.rarity_val === 1) {
                this.probabilityTable[0]?.pieces.push(item)
            } else if (item.rarity_val === 9) {
                this.probabilityTable[1]?.pieces.push(item)
            } else if (item.rarity_val === 30) {
                this.probabilityTable[2]?.pieces.push(item)
            } else {
                this.probabilityTable[3]?.pieces.push(item)
            }
        })
    },

    async initialize() {
        await this.populateRewardData().then(() => {
            this.populateProbabilityTable()
            this.initialized = true
        })
    },

    getRandomItem() {
        let rarityNumber:number = Math.floor(100*Math.random())
        let pulledRarity = this.probabilityTable[3]
        this.probabilityTable.forEach((tier) => {
            if((tier.min <= rarityNumber) && (tier.max >= rarityNumber)) {
                pulledRarity = tier
            }
        })

        if(pulledRarity?.max === 1) {
            ecstasy.play()
        }

        let pieceNumber:number =  Math.floor(Math.random()*(pulledRarity?.pieces.length ?? 0))
        let part = pulledRarity?.pieces[pieceNumber]
        
        function getClass(rarityName:string) {
            const rarityClasses: Record<string, string> = {
                Legendary: "bg-yellow-300",
                Epic: "bg-purple-300",
                Rare: "bg-sky-300",
            }

            return rarityClasses[rarityName] ?? "bg-white"
        }

        return {
            part_id: (part as any).part_id,
            item: {
            name: part?.name,
            body_part: part?.body_part,
            sprite_url: part?.sprite_url,
            rarity_val: part?.rarity_val,
            stat: part?.stat
            } as robotPart,
            rarityName: pulledRarity?.rarityName,
            class: getClass(pulledRarity?.rarityName as string)
        } as ResultType
    },
    getRarity(part:robotPart | undefined) {
        let returnedRarity:(null | string) = null
        if(part) {
            this.probabilityTable.forEach((rarity:Rarity) => {
            if(rarity.pieces.find((piece) => piece.name === part.name)) {
                returnedRarity = rarity.rarityName
            }
        }) 
        } 
        if(returnedRarity) return returnedRarity
        else return "NO VALID RARITY"
    }
}
})
