import {Flight} from "../../models/flight.interface.ts";
import styles from "./FlightsItem.module.css";
import {Tooltip} from "react-tooltip";
import ReactDOMServer from 'react-dom/server';

interface FlightsItemProps {
    flight: Flight;
}

function FlightsItem({ flight }: FlightsItemProps) {
    const TooltipContent = ReactDOMServer.renderToStaticMarkup((
        <div>
            <strong>Пересадки:</strong>
            <ul>
                {
                    flight.layovers.map((layover) => (
                        <li key={layover.airport}>
                            <strong>{ layover.airport }</strong>
                            <span>{ layover.duration }</span>
                        </li>
                    ))
                }
            </ul>
        </div>
    ));

    return (
        <li className={styles.flight}>
            <div className={styles.cities}>
                <strong className={styles.origin}>{ flight.origin }</strong>
                <span className={styles.separator}>—</span>
                <strong className={styles.destination}>{ flight.destination }</strong>
            </div>
            <div className={styles['flight-time']}>
                <span className={styles.total}>{ flight.totalFlightTime } в пути</span>
                <span
                    data-tooltip-html={TooltipContent}
                    data-tooltip-id="stops">
                    {
                        flight.stops &&
                            <mark
                                className={styles.highlight}>
                                    Пересадки: { flight.stops }
                            </mark>
                    }
                </span>
            </div>
            <strong className={styles.price}>Цена билета: { flight.price }</strong>
            <Tooltip id="stops" />
        </li>
    );
}

export default FlightsItem;
