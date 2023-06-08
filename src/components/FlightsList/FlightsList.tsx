import {Flight} from "../../models/flight.interface.ts";
import FlightsItem from "../FlightsItem/FlightsItem.tsx";
import styles from "./FlightsList.module.css";

interface FlightsListProps {
    flights: Flight[];
}

function FlightsList({ flights }: FlightsListProps) {
    return (
        <ul className={styles.flights}>
            {
                flights.map((flight) => (
                    <FlightsItem key={flight.id} flight={flight} />
                ))
            }
        </ul>
    );
}

export default FlightsList;
