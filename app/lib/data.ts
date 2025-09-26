import { NecklessDragon, NecklessEpidemic, NecklessStrawberry, PickDragon, PickEpidemic, PickHarmonight, PickJagoan, PickStrawberry } from "./image";

export const dummyProduct = [
    {
        name: 'Dragon Riff',
        price: 5000,
        product_image: PickDragon,
        categories: "Pick",
        review: 5.0
    },
    {
        name: 'Epidemic Groove',
        price: 5000,
        product_image: PickEpidemic,
        categories: "Pick",
        review: 4.0
    },
    {
        name: 'Harmonight',
        price: 5000,
        product_image: PickHarmonight,
        categories: "Pick",
        review: 4.5
    },
    {
        name: 'Jagoan',
        price: 5000,
        product_image: PickJagoan,
        categories: "Pick",
        review: 5.0
    },
    {
        name: 'Strawberry',
        price: 5000,
        product_image: PickStrawberry,
        categories: "Pick",
        review: 4.5
    },
    {
        name: 'Neckless Dragon',
        price: 7000,
        product_image: NecklessDragon,
        categories: "Neckless",
        review: 4.5
    },
    {
        name: 'Neckless Epidemic',
        price: 7000,
        product_image: NecklessEpidemic,
        categories: "Neckless",
        review: 5.0
    },
    {
        name: 'Neckless Strawberry',
        price: 7000,
        product_image: NecklessStrawberry,
        categories: "Neckless",
        review: 4.5
    },
]

export const filterArray = ['Most Visited',
'Best Selling',
'Average Rating',
'A - Z',
'Z - A',
'Cheap',
'Expensive',]