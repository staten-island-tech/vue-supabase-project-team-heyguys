export default defineNuxtRouteMiddleware(async (to) => {
    const loginStore = useLoginStore()

    if (loginStore.loggedInUser === null) {
        await loginStore.loadUser()
    }

    if (!loginStore.loggedInUser && to.path !== '/login-page') {
        return navigateTo('/login-page')
    }
    
    if (loginStore.loggedInUser && to.path === '/login-page') {
        return navigateTo('/')
    }
})