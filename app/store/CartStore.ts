import { PickEpidemic } from "~/lib/image";
import type { CheckoutType } from "~/types/checkout";

type CartState = {
  cart: CheckoutType[];
  selectedCart: CheckoutType[];
};

export const useCartStore = defineStore("counter", {
  state: (): CartState => ({
    cart: [],
    selectedCart: [],
  }),
  getters: {
    cartLength(): number {
      return this.cart.length;
    },
  },
  actions: {
    addToCart(product: CheckoutType) {
      this.cart.push(product);
    },
    updateCart(id: number, updatedProduct: CheckoutType) {
      this.cart = this.cart.map((item) =>
        item.id === id ? { ...item, ...updatedProduct } : item
      );
    },
    removeCart(id: number) {
      this.cart = this.cart.filter((c) => {
        return c.id !== id;
      });
    },
    orderCart(product: CheckoutType) {
      const isSelected = this.selectedCart.some((item) => item.id === product.id);
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
  },
});
