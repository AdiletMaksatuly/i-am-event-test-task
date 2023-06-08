import {Flight} from "../../models/flight.interface.ts";

interface FlightsItemProps {
    flight: Flight;
}

function FlightsItem({ flight }: FlightsItemProps) {
    return (
        <li>
            { flight.id }
            { flight.origin } - { flight.destination }
        </li>
    );
}

export default FlightsItem;
