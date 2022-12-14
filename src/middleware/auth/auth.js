import { useAuthStore } from '@/stores/auth';

export default async function auth ({ next }){
    const authStore = useAuthStore()

    if(await !authStore.loggedIn) {
        await authStore.fetchUser()
    }

    if(await !authStore.loggedIn) {
        return next({name: 'sign-in'})
    } else {
        return next()
    }
}
