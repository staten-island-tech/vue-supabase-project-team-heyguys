import { defineStore } from 'pinia'
import {getSupabase} from '../lib/supabaseClient'
import type { User } from '@supabase/supabase-js'

export const useLoginStore = defineStore('loginDetails',{
    state: () => ({
        loginDetails: {email: '', password: ''} as loginData,
        loggedInUser: null as User | null,
        logInErrorMessage: null as null | string,
        supabase: getSupabase()
    }), 
    actions: {
        changeValues(loginInfo:loginData) {
            this.loginDetails = loginInfo
        },
        async login() {
            const { data, error } = await this.supabase.auth.signInWithPassword(this.loginDetails)
            if(error) {
                this.logInErrorMessage = error.message
            } else {
                this.loggedInUser = data.user
                this.logInErrorMessage = null
                navigateTo("/")
            }
        },
        async register() {
            const { data, error } = await this.supabase.auth.signUp(this.loginDetails)
            if(error) {
                this.logInErrorMessage = error.message
            } else {
                this.loggedInUser = data.user
                this.logInErrorMessage = null
                navigateTo("/")
            }
        },

        async logOut() {
            const { error } = await this.supabase.auth.signOut()
            if(error) {
                this.logInErrorMessage = error.message
            } else if (this.loggedInUser) {
                this.logInErrorMessage = null
                location.reload()
            }
        },

        async loadUser() {
            const supabase = getSupabase()
            const { data: { user } } = await supabase.auth.getUser()
            this.loggedInUser = user
        },

        async getUserData() {
            const { data, error } = await this.supabase
            .from('users')
            .select("*")
            .eq('user_id', this.loggedInUser?.id)
            .single()

            if(error) {
                console.error("ERROR:" + error.message)
                return null
            } return data
        },
        
        async updateUserData(columnName:string, newData:any) {

            const { data, error } = await this.supabase
            .from("users")
            .update({
                [columnName]: newData
            })
            .eq('user_id', this.loggedInUser?.id)
            .select()

            if(error) console.error("ERROR:" + error.message)
        }
    }
})