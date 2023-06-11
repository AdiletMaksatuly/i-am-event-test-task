import {SelectOption} from "../Select/Select.tsx";

export const STOPS_VALUES = {
    0: '0',
    1: '1',
    2: '2',
    any: 'any',
} as const;


export const filterStopsOptions: Array<SelectOption<typeof STOPS_VALUES[keyof typeof STOPS_VALUES]>> = [
    {
        value: STOPS_VALUES["0"],
        label: 'Без пересадок',
    },
    {
        value: STOPS_VALUES["1"],
        label: 'Не больше 1 пересадки',
    },
    {
        value: STOPS_VALUES["2"],
        label: 'Не больше 2 пересадок',
    },
    {
        value: STOPS_VALUES.any,
        label: 'Любое количество пересадок',
    },
];
