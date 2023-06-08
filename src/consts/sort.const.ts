import {GroupedOption, PriceOption, StopsOption} from "../models/sort.model.ts";


export const priceOptions: PriceOption[] = [
    {
        label: "Цена по возрастанию",
        value: "price-asc"
    },
    {
        label: "Цена по убыванию",
        value: "price-desc"
    }
];

export const stopsOptions: StopsOption[] = [
    {
        label: "Пересадки по возрастанию",
        value: "stops-asc"
    },
    {
        label: "Пересадки по убыванию",
        value: "stops-desc"
    }
];

export const sortOptions: GroupedOption[] = [
    {
        label: "Цена",
        options: priceOptions
    },
    {
        label: "Кол. пересадок",
        options: stopsOptions
    },
]
