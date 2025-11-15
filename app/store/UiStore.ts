export const useUiStore = defineStore("ui", {
    state: () => ({
        isCartOpen: false as boolean
    }),
    actions: {
        toggleCart(){
            this.isCartOpen = !this.isCartOpen
        }
    }
})