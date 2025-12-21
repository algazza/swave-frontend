import { CircleGauge, Mail, ShoppingBag, Truck, User } from "lucide-vue-next";

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

export const accountLink = [
  {
    name: "Account Setting",
    url: "me"
  },
  {
    name: "Transaction",
    url: "transaction"
  },
  {
    name: "Address",
    url: "address"
  },
  {
    name: "Review Product",
    url: "review"
  },
]

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

export const statusType = ["pending", "delivery", "cancel", "success"];
