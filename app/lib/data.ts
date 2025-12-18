import type { ProductDetailType, ProductType } from "~/types/product";
import {
  ModelPick,
  NecklessDragon,
  NecklessEpidemic,
  NecklessStrawberry,
  PickDragon,
  PickEpidemic,
  PickHarmonight,
  PickJagoan,
  PickStrawberry,
} from "./image";
import type { CheckoutProductType, CheckoutTableType } from "~/types/checkout";
import { Banknote, Package, PackageOpen, ReceiptText, Truck } from "lucide-vue-next";
import type { AddressType } from "~/types/user";

export const dummyProduct: ProductType[] = [
  {
    id: 4,
    name: "Dragon Riff",
    price: 5000,
    product_image: PickDragon,
    categories: "Pick",
    star: 5.0,
  },
  {
    id: 4,
    name: "Epidemic Groove",
    price: 5000,
    product_image: PickEpidemic,
    categories: "Pick",
    star: 4.0,
  },
  {
    id: 4,
    name: "Harmonight",
    price: 5000,
    product_image: PickHarmonight,
    categories: "Pick",
    star: 4.5,
  },
  {
    id: 4,
    name: "Jagoan",
    price: 5000,
    product_image: PickJagoan,
    categories: "Pick",
    star: 5.0,
  },
  {
    id: 4,
    name: "Strawberry",
    price: 5000,
    product_image: PickStrawberry,
    categories: "Pick",
    star: 4.5,
  },
  {
    id: 4,
    name: "Neckless Dragon",
    price: 7000,
    product_image: NecklessDragon,
    categories: "Neckless",
    star: 4.5,
  },
  {
    id: 4,
    name: "Neckless Epidemic",
    price: 7000,
    product_image: NecklessEpidemic,
    categories: "Neckless",
    star: 5.0,
  },
  {
    id: 4,
    name: "Neckless Strawberry",
    price: 7000,
    product_image: NecklessStrawberry,
    categories: "Neckless",
    star: 4.5,
  },
];

export const reviewArray = [
  {
    star: 5,
    name: "Petter Durry",
    description:
      "The little boy from Rosario, Argentina on behalf of every little boy wearing his shirt, Greatest Of All Time.",
  },
  {
    star: 4,
    name: "Steven Gerrard",
    description:
      "He was so unpredictable. What a game, what a match, and what a player!",
  },
];

export const productData: ProductDetailType = {
  id: 4,
  name: "Epidemic Groove",
  price: 5000,
  stock: 30,
  sold: 200,
  star: 4.5,
  product_image: [PickEpidemic, ModelPick, NecklessEpidemic],
  categories: "Pick",
  description:
    "A product short description is a concise and brief overview of a product, providing key information to potential customers. Typically, it is a brief summary that highlights the most important features, benefits,",
  variants: [
    {
      id: 1,
      variant: "Pick",
      price: 5000,
      stock: 10,
    },
    {
      id: 2,
      variant: "Keychain",
      price: 7000,
      stock: 20,
    },
    {
      id: 3,
      variant: "Necklace",
      price: 10000,
      stock: 90,
    },
  ],
  reviews: [
    {
      star: 5,
      name: "Petter Durry",
      description:
        "The little boy from Rosario, Argentina on behalf of every little boy wearing his shirt, Greatest Of All Time.",
    },
    {
      star: 4,
      name: "Steven Gerrard",
      description:
        "He was so unpredictable. What a game, what a match, and what a player!",
    },
  ],
};

export const addressSingle = {
  id: 2,
  recipient: "Sultan ken",
  label: "Home",
  city: "Kota Semarang",
  subdistrict: "Semarang Selatan",
  zip_code: 50249,
  address: "Jl. Pandanaran 2 No.12",
  main_address: true,
};

export const addressArray: AddressType[] = [
  {
    id: 2,
    recipient: "Sultan ken",
    label: "Home",
    city: "Kota Semarang",
    subdistrict: "Semarang Selatan",
    zip_code: 50249,
    address: "Jl. Pandanaran 2 No.12",
    main_address: true,
  },
  {
    id: 3,
    recipient: "Sultan ken",
    label: "Kos",
    city: "Kota Semarang",
    subdistrict: "Semarang Selatan",
    zip_code: 50249,
    address: "Jl. Pandanaran 2 No.12",
    main_address: false,
  },
  {
    id: 4,
    recipient: "Sultan ken",
    label: "Home",
    city: "Kota Semarang",
    subdistrict: "Semarang Selatan",
    zip_code: 50249,
    address: "Jl. Pandanaran 2 No.12",
    main_address: false,
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
    status: "packaged",
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
  {
    order_id: 1011,
    name: "Ghaza Fadhil",
    status: "pending",
    type: "delivery",
    amount: 150000,
  },
  {
    order_id: 1012,
    name: "Wahid Kurnia",
    status: "delivery",
    type: "delivery",
    amount: 275000,
  },
  {
    order_id: 1013,
    name: "Nathan Pradana",
    status: "packaged",
    type: "pickup",
    amount: 98000,
  },
  {
    order_id: 1014,
    name: "Maheswara Putra",
    status: "success",
    type: "pickup",
    amount: 320000,
  },
  {
    order_id: 1015,
    name: "Aisyah Ramadhani",
    status: "pending",
    type: "delivery",
    amount: 187500,
  },
  {
    order_id: 1016,
    name: "Budi Santoso",
    status: "success",
    type: "delivery",
    amount: 420000,
  },
  {
    order_id: 1017,
    name: "Ratna Sari",
    status: "cancel",
    type: "pickup",
    amount: 67000,
  },
  {
    order_id: 1018,
    name: "Hendra Wijaya",
    status: "delivery",
    type: "delivery",
    amount: 258000,
  },
  {
    order_id: 1019,
    name: "Indah Permata",
    status: "pending",
    type: "pickup",
    amount: 134000,
  },
  {
    order_id: 1020,
    name: "Rama Saputra",
    status: "packaged",
    type: "delivery",
    amount: 365000,
  },
];

export const stepsArray = [
  {
    step: 1,
    title: "Order Placed",
    description: "01 Jul 20:00",
    icon: ReceiptText,
  },
  {
    step: 2,
    title: "Order Packaged",
    description: "01 Jul 20:00",
    icon: Package,
  },
  {
    step: 3,
    title: "Order Shipped",
    description: "01 Jul 20:00",
    icon: Truck,
  },
  {
    step: 4,
    title: "Order Received",
    description: "???",
    icon: PackageOpen,
  },
];

export const checkoutDetail = {
  order_id: 1202102,
  total_price: 30000,
  estimation: "02/01/2025",
  description: "Minta tolong kalo ketemu dia tampar aja mas",
  gift_card: true,
  gift_description: "Hai maniez",
  delivery: {
    delivery_type: "pickup",
    pickup_date: "09/12/2025",
    pickup_hour: "12:08",
    delivery_price: 10000,
    address: {
      recipient: "Sultan",
      label: "rumah",
      city: "Semarang",
      subdistrict: "Semarang Barat",
      zip_code: 50123,
      address: "deket rats game",
    },
  },
  status: [
    {
      status_type: "pending",
      created_at: "02/01/2025",
    },
    {
      status_type: "delivery",
      created_at: "03/01/2025",
    },
    {
      status_type: "pending",
      created_at: "01/01/2025",
    },
  ],
  user: {
    id: 3,
    username: "jonathan1212",
    name: "jonathan iatsa",
    phone: "+627893",
  },
};
