import { defineStore } from 'pinia'
import {useAuthStore} from "@/stores/auth";

export const useProjectStore = defineStore({
    id: 'project',
    state: () => ({
        _project: {},
        _list: {},
        _response: {}
    }),
    getters: {
        list: (state) => state._list,
        project: (state) => state._project,
        projectId: (state) => state._project && state._project.id ? state._project.id : 0,
        response: (state) => state._response,
    },
    actions: {
        setList(data: object) {
            this._list = data
        },

        setProject(data: object) {
            this._project = data
        },

        setResponse(data: object) {
            this._response = data
        },

        async fetchList() {
            const authStore = useAuthStore()

            await fetch("/api/project/list", {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'X-XSRF-TOKEN': authStore.getToken()
                }
            })
                .then(async response => {
                    if (response.status === 200) {
                        const data = await response.json()
                        await this.setProject(data.active)
                        await this.setList(data.list)
                    } else {
                        this.setList({})
                    }
                })
                .catch(error => {
                    // console.log(error)
                    this.setList({})
                })
        },
    }
})
