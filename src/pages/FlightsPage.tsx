import FlightsList from "../components/FlightsList/FlightsList.tsx";
import {Flight} from "../models/flight.interface.ts";
import styles from "./FlightsPage.module.css";

function FlightsPage() {
    const flights: Flight[] = [
        {
            id: 1,
            origin: "Almaty",
            destination: "Moscow",
            price: 500,
            stops: 0,
            layovers: [],
            totalFlightTime: "4h",
        },
        {
            id: 2,
            origin: "Almaty",
            destination: "Astana",
            price: 100,
            stops: 0,
            layovers: [],
            totalFlightTime: "2h",
        },
    ];


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
