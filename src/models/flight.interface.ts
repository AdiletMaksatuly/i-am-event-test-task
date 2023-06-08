import {Layover} from "./layover.interface.ts";

export interface Flight {
    id: number;
    origin: string;
    destination: string;
    price: number;
    stops: number;
    layovers: Layover[];
    totalFlightTime: string;
}
