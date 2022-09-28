import { defineStore } from 'pinia'
import {useAuthStore} from "@/stores/auth";

export const useWikiDataStore = defineStore({
    id: 'wikiData',
    state: () => ({
        _data: {
            id: 0,
            title: '',
            content: '',
            alias: '',
            author: {}
        },
        _response: {}
    }),
    getters: {
        id: (state) => state._data.id,
        title: (state) => state._data.title,
        content: (state) => state._data.content,
        alias: (state) => state._data.alias,
        author: (state) => state._data.author,
        data: (state) => state._data,
        response: (state) => state._response,
    },
    actions: {
        setId(data: string) {
            this._data.id = data
        },

        setTitle(data: string) {
            this._data.title = data
        },

        setContent(data: string) {
            this._data.content = data
        },

        setAuthor(data: object) {
            this._data.author = data
        },

        setResponse(data: object) {
            this._response = data
        },

        clearData() {
            this._data = { title: '', content: '', alias: '', author: {} }
        },

        clearResponse() {
            this._response = {}
        },

        async fetchWikiData(projectId: string, alias: string) {
            const authStore = useAuthStore()

            await fetch(`/api/project/page-view/${projectId}/${alias}`, {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'X-XSRF-TOKEN': authStore.getToken()
                }
            })
                .then(async response => {
                    if (response.status === 200) {
                        const data = await response.json()
                        await this.setId(data.id)
                        await this.setTitle(data.name)
                        await this.setContent(data.content)
                        await this.setAuthor(data.author)
                    } else {
                        this.clearData()
                    }
                })
                .catch(error => {
                    this.clearData()
                })
        },

        async sendCreateOrEdit(data: object, method: string = 'POST') {
            const authStore = useAuthStore()

            await fetch(`/api/wiki`, {
                method: method,
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'X-XSRF-TOKEN': authStore.getToken()
                },
                body: JSON.stringify(data)
            })
                .then(async response => {
                    const data = await response.json()
                    await this.setResponse(data)
                    await setTimeout(() => {
                        this.clearResponse()
                    }, 3000)
                })
                .catch(error => {
                    // this.clearData()
                })
        },
    }
})
