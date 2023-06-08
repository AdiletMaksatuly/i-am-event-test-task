import {Flight} from "../../models/flight.interface.ts";
import styles from "./FlightsItem.module.css";

interface FlightsItemProps {
    flight: Flight;
}

function FlightsItem({ flight }: FlightsItemProps) {
    return (
        <li className={styles.flight}>
            <div className={styles.cities}>
                <strong className={styles.origin}>{ flight.origin }</strong>
                <span className={styles.separator}>—</span>
                <strong className={styles.destination}>{ flight.destination }</strong>
            </div>
            <div className={styles['flight-time']}>
                <span className={styles.total}>{ flight.totalFlightTime } в пути</span>
                <span className={styles.stops}>
                    <mark className={styles.highlight}>Пересадки: { flight.stops }</mark>
                </span>
            </div>
            <strong className={styles.price}>Цена билета: { flight.price }</strong>
        </li>
    );
}

export default FlightsItem;
