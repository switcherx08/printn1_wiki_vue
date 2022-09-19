import { defineStore } from 'pinia'

export const usePageStore = defineStore({
    id: 'page',
    state: () => ({
        useContentInnerContainer: true
    }),
    getters: {},
    actions: {
        setUseContentInnerContainer(status: boolean): void {
            this.useContentInnerContainer = status
        },
    }
})
