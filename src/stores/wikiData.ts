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
            files: {},
            author: {},
            is_archive: false
        },
        _response: {},
        _responseArchive: {}
    }),
    getters: {
        id: (state) => state._data.id,
        title: (state) => state._data.title,
        content: (state) => state._data.content,
        alias: (state) => state._data.alias,
        author: (state) => state._data.author,
        files: (state) => state._data.files,
        is_archive: (state) => state._data.is_archive,
        data: (state) => state._data,
        response: (state) => state._response,
        response_archive: (state) => state._responseArchive,
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

        setFiles(data: object) {
            this._data.files = data
        },

        setIsArchive(status: boolean) {
            this._data.is_archive = status
        },

        setResponse(data: object) {
            this._response = data
        },

        setResponseArchive(data: object) {
            this._responseArchive = data
        },

        clearData() {
            this._data = { title: '', content: '', alias: '', author: {} }
        },

        clearResponse() {
            this._response = {}
        },

        clearResponseArchive() {
            this._responseArchive = {}
        },

        async fetchWikiData(id: string) {
            const authStore = useAuthStore()

            await fetch(`/api/project/page-view/${id}`, {
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

        async fetchWikiFiles(id: string) {
            const authStore = useAuthStore()

            await fetch(`/api/files/${id}`, {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'X-XSRF-TOKEN': authStore.getToken()
                }
            })
                .then(async response => {
                    const data = await response.json()

                    await this.setFiles(data)
                })
                .catch(error => {
                    console.log(error)
                })
        },

        async fetchWikiSaveFiles(id: string, files: object) {
            const authStore = useAuthStore()
            const data = { id: id, files: files }

            await fetch(`/api/wiki/save-file`, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'X-XSRF-TOKEN': authStore.getToken()
                },
                body: JSON.stringify(data)
            })
                .then(async response => {
                    const data = await response.json()
                })
                .catch(error => {
                    console.log(error)
                })
        },

        async moveToArchive(id: string) {
            const authStore = useAuthStore()
            const data = { id: id }

            await fetch(`/api/wiki`, {
                method: 'delete',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'X-XSRF-TOKEN': authStore.getToken()
                },
                body: JSON.stringify(data)
            })
                .then(async response => {
                    const data = await response.json()
                    this.setIsArchive(true)
                    this.setResponseArchive(data)
                })
                .catch(error => {
                    console.log(error)
                })
        }
    }
})
