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
    }),
    getters: {
        id: (state) => state._data.id,
        title: (state) => state._data.title,
        content: (state) => state._data.content,
        alias: (state) => state._data.alias,
        author: (state) => state._data.author,
        data: (state) => state._data,
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

        clearData() {
            this._data = { title: '', content: '', alias: '', author: {} }
        },

        async fetchWikiData(projectId: string ,alias: string) {
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
    }
})
