import { defineStore } from 'pinia'
import {useAuthStore} from "@/stores/auth";

export const useProjectStore = defineStore({
    id: 'project',
    state: () => ({
        _project: {},
        _list: {}
    }),
    getters: {
        list: (state) => state._list,
        project: (state) => state._project,
        projectId: (state) => state._project.id,
    },
    actions: {
        setList(data: object) {
            this._list = data
        },

        setProject(data: object) {
            this._project = data
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
