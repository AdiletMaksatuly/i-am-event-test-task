import FlightsList from "../components/FlightsList/FlightsList.tsx";
import {Flight} from "../models/flight.interface.ts";
import styles from "./FlightsPage.module.css";
import {useEffect, useState} from "react";
import {fetchFlights} from "../api/flights.api.ts";

function FlightsPage() {
    const [flights, setFlights] = useState<Flight[]>([]);

    useEffect(() => {
       fetchFlights().then((flights: Flight[]) => setFlights(flights));
    }, []);

    return (
        <section className={styles.flights}>
            <div className="container">
                <h1>Flights page</h1>
                <FlightsList flights={flights} />
            </div>
        </section>
    );
}

export default FlightsPage;
