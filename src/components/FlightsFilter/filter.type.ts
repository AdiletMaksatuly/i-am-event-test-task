import {STOPS_VALUES} from "./filter.const.ts";

export type FlightsFilterType = {
    flightTime: {
        min: number,
        max: number,
    },
    price: {
        min: number,
        max: number,
    },
    stops: typeof STOPS_VALUES[keyof typeof STOPS_VALUES],
}
