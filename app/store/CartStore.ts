import { PickEpidemic } from "~/lib/image";
import type { CheckoutType } from "~/types/checkout";

type CartState = {
  cart: CheckoutType[];
  selectedCart: CheckoutType[];
  checkoutProduct: CheckoutType[];
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
    addToCart(product: CheckoutType) {
      this.cart.unshift(product);
    },
    updateCart(id: number, updatedProduct: Partial<CheckoutType>) {
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
        return c.id !== id
      })
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
    checkoutCart(newCart: CheckoutType[]){
      this.checkoutProduct = newCart  
    },
    clearCheckout(){
      this.checkoutProduct = []
    }
  },
});
