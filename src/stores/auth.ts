import {defineStore} from 'pinia'

export const useAuthStore = defineStore({
    id: 'auth',
    state: () => ({
        _user: {
            loggedIn: false,
            data: {}
        },
        _response:{}
    }),
    getters: {
        user: (state) => state._user,

        loggedIn: (state) => state._user.loggedIn,

        response: (state) => state._response,
    },
    actions: {
        setLoggedIn(status: boolean) {
            this._user.loggedIn = status
        },

        setUserData(user: object) {
            this._user.data = user
        },

        async setResponse(data: object) {
            this._response = await data
        },

        fetchToken: async function (): Promise<void> {
            await fetch("/sanctum/csrf-cookie", {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
            })
        },

        fetchUser: async function (): Promise<void> {
            await this.fetchToken()
            await fetch("/api/user", {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
            })
                .then(async response => {
                    if (response.status === 200 && !response.redirected) {
                        const data = await response.json();

                        if (Object.keys(data).length !== 0) {
                            this.setLoggedIn(true)
                            this.setUserData(data)
                        }
                    } else {
                        this.setLoggedIn(false)
                        this.setUserData({})
                    }
                })
                .catch(error => {
                    this.setLoggedIn(false)
                    this.setUserData({})
                });
        },

        signIn: async function (data: object): Promise<void> {
            await fetch("/api/sign-in", {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            })
                .then(async response => {
                    if (response.status === 200) {
                        this.setLoggedIn(true)
                    } else {
                        this.setLoggedIn(false)
                    }

                    this.setResponse(response.json())
                })
                .catch(error => {
                    console.log(error)
                })
        },

        // async logout() {
        //     await axios.post('/logout', data)
        //         .then((response) => {
        //             if (response.status === 200) {
        //                 commit('SET_LOGGED_IN', false)
        //                 commit('SET_USER_DATA', {})
        //             }
        //         })
        // }

    }
})
