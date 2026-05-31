export default defineNuxtRouteMiddleware(async () => {
    const loginStore = useLoginStore()

    if (!loginStore.loggedInUser) {
        await loginStore.loadUser()
    }

    if (!loginStore.loggedInUser) {
        return navigateTo('/login-page')
    }

})