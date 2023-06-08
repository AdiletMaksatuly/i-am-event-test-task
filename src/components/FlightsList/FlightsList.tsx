import {Flight} from "../../models/flight.interface.ts";
import FlightsItem from "../FlightsItem/FlightsItem.tsx";


interface FlightsListProps {
    flights: Flight[];
}

function FlightsList({ flights }: FlightsListProps) {
    return (
        <ul>
            {
                flights.map((flight) => (
                    <FlightsItem key={flight.id} flight={flight} />
                ))
            }
        </ul>
    );
}

export default FlightsList;
