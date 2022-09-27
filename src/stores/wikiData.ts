import { defineStore } from 'pinia'
import {useAuthStore} from "@/stores/auth";

export const useWikiDataStore = defineStore({
    id: 'wikiData',
    state: () => ({
        _data: {
            title: '',
            content: '',
            author: {}
        },
    }),
    getters: {
        title: (state) => state._data.title,
        content: (state) => state._data.content,
        author: (state) => state._data.author,
        data: (state) => state._data,
    },
    actions: {
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
            this._data = { title: '', content: '', author: {} }
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
                        await this.setTitle(data.name)
                        await this.setContent(data.content)
                        await this.setAuthor(data.author)
                    } else {
                        // this.setList({})
                    }
                })
                .catch(error => {
                    // console.log(error)
                    // this.setList({})
                })
        },
    }
})