import {Flight} from "../models/flight.interface.ts";
import {FlightsResponse} from "./flights.response.ts";

const API_URL = "./fly.json";

export const fetchFlights = async (): Promise<Flight[]> =>  {
    try {
        const response = await fetch(API_URL);

        const result: FlightsResponse = await response.json();

        return result.flights;
    } catch (e) {
        console.error(e);
        return [];
    }
}
