import { useAuthStore } from '@/stores/auth';

export default function auth ({ next }){
    const authStore = useAuthStore()

    if(!authStore.loggedIn) {
        fetch("http://lara2-crm.loc/sanctum/csrf-cookie", {
            headers:{"Content-type":"application/json"}
        })
        // Get a user by API
        fetch("http://lara2-crm.loc/api/user", {
            headers:{"Content-type":"application/json"}
        })
            .then(async response => {
                if(response.status === 200 && !response.redirected) {
                    const data = await response.json();
                    if(Object.keys(data).length !== 0) {
                        authStore.setLoggedIn(true)
                        authStore.setUserData(data)
                    }
                } else {
                    authStore.setLoggedIn(false)
                    return next({name: 'signin'})
                }
            })
            .catch(error => {
                console.log(error)
                authStore.setLoggedIn(false)
                return next({name: 'signin'})
            });
    } else {
        return next()
    }
}
