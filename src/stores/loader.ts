import { defineStore } from 'pinia'

export const useLoaderStore = defineStore({
    id: 'loader',
    state: () => ({
        appProgress: false,
        appProgressText: 'Загрузка'
    }),
    getters: {
        getAppProgress(): boolean {
            return this.appProgress
        },
        getAppProgressText(): string {
            return this.appProgressText
        }
    },
    actions: {
        startAppProgress(status: boolean): void {
            this.appProgress = status
        },
        setAppProgressText(text: string): void {
            this.appProgressText = text
        }
    }
})
