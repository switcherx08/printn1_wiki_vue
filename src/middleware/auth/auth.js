import { useAuthStore } from '@/stores/auth';

export default function auth ({ next }){
    const authStore = useAuthStore()
    authStore.fetchToken()
    authStore.fetchUser()

    if(!authStore.loggedIn) {
        return next({name: 'signin'})
    } else {
        return next()
    }
}
