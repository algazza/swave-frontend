import {
  CircleGauge,
  Gem,
  Leaf,
  Lightbulb,
  Mail,
  ShoppingBag,
  Truck,
  User,
} from "lucide-vue-next";
import { Aaf, Cherish, Mey, Regas, Rijal } from "./image";

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
    url: "/account/me",
  },
  {
    name: "Transaction",
    url: "/account/transaction",
  },
  {
    name: "Address",
    url: "/account/address",
  },
  {
    name: "Review Product",
    url: "/account/review",
  },
];

export const filterArray = [
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

export const ourValues = [
  {
    icon: Gem,
    title: "Exceptional Quality",
    description:
      "We source only the finest materials and employ meticulous craftsmanship to ensure each piece exceeds expectations.",
  },
  {
    icon: Leaf,
    title: "Sustainability",
    description:
      "Our commitment to ethical sourcing and environmental responsibility shapes every aspect of our business.",
  },
  {
    icon: Lightbulb,
    title: "Innovation",
    description:
      "We continuously push boundaries, exploring new techniques and materials while honoring traditional craftsmanship.",
  },
];

export const theTeam = [
  {
    image: Cherish,
    name: "Cherish Putria Salsabilla",
    title: "Founder & CEO",
    description:
      "With a passion for fashion and a vision to create a brand that embodies elegance and sustainability, Cherish founded Swave.",
  },
  {
    image: Aaf,
    name: "Aafiyah Masuara Hanania",
    title: "Packaging",
    description:
      "With a strong commitment to quality and sustainability, Aafiyah ensures every Swave product is beautifully and responsibly packaged.",
  },
  {
    image: Mey,
    name: "May Putri Shobirina",
    title: "Marketing",
    description:
      "With creative strategies and a deep understanding of customers, May strengthens Swave’s brand presence and engagement.",
  },
  {
    image: Regas,
    name: "Fatih Fabregas",
    title: "Marketing & Logistic",
    description:
      "By combining marketing insight and logistics expertise, Regas ensures our products reach customers effectively and on time.",
  },
  {
    image: Rijal,
    name: "Rijal Bayu Prasojo",
    title: "Designer",
    description:
      "With creativity and attention to detail, Rijal shapes Swave’s visual identity and brings each design to life.",
  },
];