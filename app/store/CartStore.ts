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
    cartLength(): number {
      return this.cart.length;
    },
  },
  actions: {
    addToCart(product: CheckoutProductType) {
      this.cart.unshift(product);
    },
    updateCart(id: number, updatedProduct: Partial<CheckoutProductType>) {
      this.cart = this.cart.map((item) =>
        item.id === id ? { ...item, ...updatedProduct } : item
      );
      this.selectedCart = this.selectedCart.map((item) =>
        item.id === id ? { ...item, ...updatedProduct } : item
      );
    },
    removeCart(id: number) {
      this.cart = this.cart.filter((c) => {
        return c.id !== id;
      });
      this.selectedCart = this.selectedCart.filter((c) => {
        return c.id !== id;
      });
    },
    orderCart(product: CheckoutProductType) {
      const isSelected = this.selectedCart.some(
        (item) => item.id === product.id
      );
      if (isSelected) {
        this.selectedCart = this.selectedCart.filter(
          (item) => item.id !== product.id
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
    },
    clearCheckout() {
      this.checkoutProduct = [];
    },
  },
});
