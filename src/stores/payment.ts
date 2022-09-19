import { defineStore } from 'pinia'

export const usePaymentStore = defineStore({
    id: 'payment',
    state: () => ({
        viewPaymentId: 0,
    }),
    getters: {
        getViewPaymentId(): number {
            return this.viewPaymentId
        },
    },
    actions: {
        setViewPaymentId(paymentId: Number): void {
            // @ts-ignore
            this.viewPaymentId = paymentId
        },

        clearViewPaymentId(): void {
            this.viewPaymentId = 0
        },
    }
})
