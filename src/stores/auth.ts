import {defineStore} from 'pinia'

export const useAuthStore = defineStore({
    id: 'auth',
    state: () => ({
        _token: '',
        _user: {
            loggedIn: false,
            data: {}
        },
        _response:{}
    }),
    getters: {
        token: (state) => state._token,

        user: (state) => state._user,

        loggedIn: (state) => state._user.loggedIn,

        response: (state) => state._response,
    },
    actions: {
        getToken() {
            return this._token
        },

        setToken(data: string) {
            this._token = data
        },

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
            }).then(async response => {
                const name = 'XSRF-TOKEN'
                const matches = document.cookie.match(new RegExp(
                    "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
                ));
                const token = matches ? decodeURIComponent(matches[1]) : '';
                this.setToken(token)
            })
        },

        fetchUser: async function (): Promise<void> {
            await fetch("/api/user", {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'X-XSRF-TOKEN': this.getToken()
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
                method: "POST",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'X-XSRF-TOKEN': this.getToken()
                },
                body: JSON.stringify(data)
            })
                .then(async response => {
                    this.setResponse(response.json())

                    if (response.status === 200) {
                        this.setLoggedIn(true)
                    } else {
                        this.setLoggedIn(false)
                    }
                })
                .catch(error => {
                    console.log(error)
                    this.setResponse(error)
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
