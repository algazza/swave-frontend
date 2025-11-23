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
import type { CheckoutProductType } from "~/types/checkout";

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
