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
    getQuantity: (state) => {
      return (id: number): number => {
        const item = state.cart.find((product) => product.id === id);
        return item ? item.quantity : 0;
      };
    },
  },
  actions: {
    addToCart(product: CheckoutProductType) {
      const existingIndex = this.cart.findIndex(
        (item) =>
          item.product.id === product.product.id &&
          item.variant.id === product.variant.id,
      );

      if (existingIndex === -1) {
        this.cart.unshift(product);
        return;
      }

      const existing = this.cart[existingIndex] as CheckoutProductType;

      const maxStock = existing.variant.stock;
      const newQuantity = existing.quantity + product.quantity;

      this.cart[existingIndex]!.quantity =
        newQuantity > maxStock ? maxStock : newQuantity;
    },
    updateCart(id: number, updatedProduct: Partial<CheckoutProductType>) {
      this.cart = this.cart.map((item) =>
        item.id === id ? { ...item, ...updatedProduct } : item,
      );
      this.selectedCart = this.selectedCart.map((item) =>
        item.id === id ? { ...item, ...updatedProduct } : item,
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
    },
    clearCheckout() {
      this.checkoutProduct = [];
    },
  },
});
