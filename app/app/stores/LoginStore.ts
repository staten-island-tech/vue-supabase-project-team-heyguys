import { defineStore } from 'pinia'
import {getSupabase} from '../lib/supabaseClient'

export const useLoginStore = defineStore('loginDetails',{
    state: () => ({
        loginDetails: {email: '', password: ''} as loginData,
        loggedInUser: null as null | object,
        supabase: getSupabase()
    }), 
    actions: {
        changeValues(loginInfo:loginData) {
            this.loginDetails = loginInfo
        },
        async login() {
            const { data, error } = await this.supabase.auth.signInWithPassword(this.loginDetails)
            if(error) {
                console.error("ERROR:" + error.message)
            } else {
                this.loggedInUser = data.user
                navigateTo('/') 
            }
        },
        async register() {
            const { data, error } = await this.supabase.auth.signUp(this.loginDetails)
            if(error) {
                console.error("ERROR:" + error.message)
            } else {
                this.loggedInUser = data.user
                navigateTo('/')  
            }
        },

        async loadUser() {
            const supabase = getSupabase()
            const { data: { user } } = await supabase.auth.getUser()
            this.loggedInUser = user
        },
    }
})