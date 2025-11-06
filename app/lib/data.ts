import type { ProductType } from "~/types/product";
import {
  NecklessDragon,
  NecklessEpidemic,
  NecklessStrawberry,
  PickDragon,
  PickEpidemic,
  PickHarmonight,
  PickJagoan,
  PickStrawberry,
} from "./image";

export const dummyProduct: ProductType[] = [
  {
    name: "Dragon Riff",
    price: 5000,
    product_image: PickDragon,
    categories: "Pick",
    review: 5.0,
  },
  {
    name: "Epidemic Groove",
    price: 5000,
    product_image: PickEpidemic,
    categories: "Pick",
    review: 4.0,
  },
  {
    name: "Harmonight",
    price: 5000,
    product_image: PickHarmonight,
    categories: "Pick",
    review: 4.5,
  },
  {
    name: "Jagoan",
    price: 5000,
    product_image: PickJagoan,
    categories: "Pick",
    review: 5.0,
  },
  {
    name: "Strawberry",
    price: 5000,
    product_image: PickStrawberry,
    categories: "Pick",
    review: 4.5,
  },
  {
    name: "Neckless Dragon",
    price: 7000,
    product_image: NecklessDragon,
    categories: "Neckless",
    review: 4.5,
  },
  {
    name: "Neckless Epidemic",
    price: 7000,
    product_image: NecklessEpidemic,
    categories: "Neckless",
    review: 5.0,
  },
  {
    name: "Neckless Strawberry",
    price: 7000,
    product_image: NecklessStrawberry,
    categories: "Neckless",
    review: 4.5,
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

export const addressSingle = {
  recipient: "Sultan ken",
  label: "Home",
  city: "Kota Semarang",
  subdistrict: "Semarang Selatan",
  zip_code: 50249,
  address: "Jl. Pandanaran 2 No.12",
  main_address: true,
};

export const checkoutArray = [
  {
    id: 9,
    quantity: 2,
    total_price: 20000,
    variant: "Pick",
    product: {
      image: PickEpidemic,
      name: "Dragon Fruit",
      price: 10000,
      categories: "Pick"
    },
  },
  {
    id: 120,
    quantity: 2,
    total_price: 20000,
    variant: "Keychain",
    product: {
      id: 9,
      image: PickDragon,
      name: "Epidemic Grove",
      price: 10000,
      categories: "Pick"
    },
  },
];
