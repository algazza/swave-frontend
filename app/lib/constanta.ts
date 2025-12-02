import { CircleGauge, Mail, ShoppingBag, Truck, User } from "lucide-vue-next";
import type { CheckoutTableType } from "~/types/checkout";

export const navLink = [
  {
    name: "Home",
    url: "/",
  },
  {
    name: "About",
    url: "/about",
  },
  {
    name: "Product",
    url: "/product",
  },
  {
    name: "Contact",
    url: "/",
  },
];

export const filterArray = [
  "Most Visited",
  "Best Selling",
  "Average Rating",
  "A - Z",
  "Z - A",
  "Cheap",
  "Expensive",
];

export const adminNavLink = [
  {
    title: "Dashboard",
    url: "/admin",
    icon: CircleGauge,
  },
  {
    title: "Checkout",
    url: "/admin/checkout",
    icon: Truck,
  },
  {
    title: "Product",
    url: "/admin/product",
    icon: ShoppingBag,
  },
  {
    title: "User",
    url: "/admin/user",
    icon: User,
  },
  {
    title: "Contact",
    url: "/admin/contact",
    icon: Mail,
  },
];

export const checkoutData: CheckoutTableType[] = [
  {
    order_id: 1001,
    name: "Ghaza Fadhil",
    status: "pending",
    type: "delivery",
    amount: 150000,
  },
  {
    order_id: 1002,
    name: "Wahid Kurnia",
    status: "delivery",
    type: "delivery",
    amount: 275000,
  },
  {
    order_id: 1003,
    name: "Nathan Pradana",
    status: "cancel",
    type: "pickup",
    amount: 98000,
  },
  {
    order_id: 1004,
    name: "Maheswara Putra",
    status: "success",
    type: "pickup",
    amount: 320000,
  },
  {
    order_id: 1005,
    name: "Aisyah Ramadhani",
    status: "pending",
    type: "delivery",
    amount: 187500,
  },
  {
    order_id: 1006,
    name: "Budi Santoso",
    status: "success",
    type: "delivery",
    amount: 420000,
  },
  {
    order_id: 1007,
    name: "Ratna Sari",
    status: "cancel",
    type: "pickup",
    amount: 67000,
  },
  {
    order_id: 1008,
    name: "Hendra Wijaya",
    status: "delivery",
    type: "delivery",
    amount: 258000,
  },
  {
    order_id: 1009,
    name: "Indah Permata",
    status: "pending",
    type: "pickup",
    amount: 134000,
  },
  {
    order_id: 1010,
    name: "Rama Saputra",
    status: "success",
    type: "delivery",
    amount: 365000,
  },
];
