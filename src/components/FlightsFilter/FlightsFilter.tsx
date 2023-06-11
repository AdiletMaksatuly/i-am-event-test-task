import Dropdown from "../Dropdown/Dropdown.tsx";
import styles from './FlightsFilter.module.css';
import {FlightsFilterType} from "./filter.type.ts";
import {filterStopsOptions, STOPS_VALUES} from "./filter.const.ts";

interface FlightsFilterProps {
    filterOptions: FlightsFilterType;
    onFilter: (filterOptions: FlightsFilterType) => void;
}

function FlightsFilter({ filterOptions, onFilter }: FlightsFilterProps) {
    const priceChangeHandler = (newValue: number, type: 'min' | 'max') => {
        changeHandler({
            ...filterOptions,
            price: {
                max: type === 'max' ? newValue : filterOptions.price.max,
                min: type === 'min' ? newValue : filterOptions.price.min,
            }
        });
    };

    const flightTimeChangeHandler = (newValue: number, type: 'min' | 'max') => {
        changeHandler({
            ...filterOptions,
            flightTime: {
                max: type === 'max' ? newValue : filterOptions.flightTime.max,
                min: type === 'min' ? newValue : filterOptions.flightTime.min,
            }
        });
    };

    const stopsChangeHandler = (newValue: typeof STOPS_VALUES[keyof typeof STOPS_VALUES]) => {
        changeHandler({
            ...filterOptions,
            stops: newValue,
        });
    };

    const changeHandler = (newFilterOptions: FlightsFilterType) => {
        onFilter(newFilterOptions);
    }

    return (
            <ul className={styles.filters}>
                <li>
                    <Dropdown title={'Цена'}>
                        <Dropdown.Range
                            min={filterOptions.price.min}
                            max={filterOptions.price.max}
                            onChange={priceChangeHandler}
                        />
                    </Dropdown>
                </li>
                <li>
                    <Dropdown title={'Время полета'}>
                        <Dropdown.Range
                            min={filterOptions.flightTime.min}
                            max={filterOptions.flightTime.max}
                            onChange={flightTimeChangeHandler}
                        />
                    </Dropdown>
                </li>
                <li>
                    <Dropdown title={'Количество пересадок'}>
                        <Dropdown.Select<typeof STOPS_VALUES[keyof typeof STOPS_VALUES]>
                            value={filterOptions.stops}
                            options={filterStopsOptions}
                            onChange={stopsChangeHandler}
                        />
                    </Dropdown>
                </li>
            </ul>
    );
}

export default FlightsFilter;
