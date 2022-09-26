import { useAuthStore } from '@/stores/auth';

export default async function wiki ({ next }){
    const authStore = useAuthStore()

    if(await !authStore.loggedIn) {
        return next({name: 'sign-in'})
    } else {
        return next()
    }
}
