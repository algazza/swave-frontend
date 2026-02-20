import type { CheckoutProductType } from "~/types/checkout";

type CartState = {
  cart: CheckoutProductType[];
  selectedCart: CheckoutProductType[];
  checkoutProduct: CheckoutProductType[];
};

export const useCartStore = defineStore("counter", {
  state: (): CartState => ({
    cart: [],
    selectedCart: [],
    checkoutProduct: [],
  }),
  getters: {
    getQuantity: (state) => {
      return (id: number): number => {
        const item = state.cart.find((product) => product.id === id);
        return item ? item.quantity : 0;
      };
    },
  },
  actions: {
    loadCheckoutFromStorage() {
      if (process.client) {
        const stored = localStorage.getItem("checkoutProduct");
        if (stored) {
          try {
            this.checkoutProduct = JSON.parse(stored);
          } catch (e) {
            console.error("Failed to load checkout from storage", e);
            localStorage.removeItem("checkoutProduct");
          }
        }
      }
    },
    updateCart(id: number, updatedProduct: Partial<CheckoutProductType>) {
      this.cart = this.cart.map((item) =>
        item.id === id ? { ...item, ...updatedProduct } : item,
      );
      this.selectedCart = this.selectedCart.map((item) =>
        item.id === id ? { ...item, ...updatedProduct } : item,
      );
    },
    orderCart(product: CheckoutProductType) {
      const isSelected = this.selectedCart.some(
        (item) => item.id === product.id,
      );
      if (isSelected) {
        this.selectedCart = this.selectedCart.filter(
          (item) => item.id !== product.id,
        );
      } else {
        this.selectedCart.push(product);
      }
    },
    clearOrder() {
      this.selectedCart = [];
    },
    checkoutCart(newCart: CheckoutProductType[]) {
      this.checkoutProduct = newCart;
      if (process.client) {
        localStorage.setItem("checkoutProduct", JSON.stringify(newCart));
      }
    },
    clearCheckout() {
      this.checkoutProduct = [];
      if (process.client) {
        localStorage.removeItem("checkoutProduct");
      }
    },
  },
});
