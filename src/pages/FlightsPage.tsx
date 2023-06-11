import FlightsList from "../components/FlightsList/FlightsList.tsx";
import {Flight} from "../models/flight.interface.ts";
import styles from "./FlightsPage.module.css";
import {useEffect, useMemo, useState} from "react";
import {fetchFlights} from "../api/flights.api.ts";
import Select from "react-select";
import {GroupedOption, SortOption} from "../models/sort.model.ts";
import {defaultSortOption, sortOptions} from "../consts/sort.const.ts";
import SearchInput from "../components/SearchInput/SearchInput.tsx";
import FlightsFilter from "../components/FlightsFilter/FlightsFilter.tsx";
import {FlightsFilterType} from "../components/FlightsFilter/filter.type.ts";
import {STOPS_VALUES} from "../components/FlightsFilter/filter.const.ts";

const selectOptions: Array<GroupedOption | SortOption> = [defaultSortOption, ...sortOptions];

function FlightsPage() {
    const [flights, setFlights] = useState<Flight[]>([]);

    const [sortOption, setSortOption] = useState<SortOption>(defaultSortOption);

    const [searchQuery, setSearchQuery] = useState<string>('');

    const prices = useMemo(() => {
        const flightsPrices = flights.map((flight) => flight.price);

        return {
            min: Math.min(...flightsPrices),
            max: Math.max(...flightsPrices),
        }
    }, [flights]);

    const flightTimes = useMemo(() => {
        const flightsFlightTimes = flights.map((flight) => {
            const normalizedFlightTime = flight.totalFlightTime.replace("h", '');

            return Number(normalizedFlightTime);
        });

        return {
            min: Math.min(...flightsFlightTimes),
            max: Math.max(...flightsFlightTimes),
        };
    }, [flights]);

    const [filterOptions, setFilterOptions] = useState<FlightsFilterType>({
        price: {
            min: prices.min,
            max: prices.max,
        },
        flightTime: {
            min: flightTimes.min,
            max: flightTimes.max,
        },
        stops: STOPS_VALUES.any,
    });

    const sortedFlights = useMemo<Flight[]>(() => {
        if (sortOption.value === '') return flights;

        switch (sortOption.value) {
            case 'price-asc':
                return [...flights].sort((a, b) => a.price - b.price);
            case 'price-desc':
                return [...flights].sort((a, b) => b.price - a.price);
            case 'stops-asc':
                return [...flights].sort((a, b) => a.stops - b.stops);
            case 'stops-desc':
                return [...flights].sort((a, b) => b.stops - a.stops);
        }
    }, [flights, sortOption]);

    const filteredFlights = useMemo<Flight[]>(() => {
        const flightsBySearchQuery = sortedFlights.filter((flight) => {
            const loweredSearchQuery = searchQuery.toLowerCase();
            const loweredFlightOrigin = flight.origin.toLowerCase();
            const loweredFlightDest = flight.destination.toLowerCase();

            return loweredFlightOrigin.includes(loweredSearchQuery) || loweredFlightDest.includes(loweredSearchQuery);
        });

        return flightsBySearchQuery.filter(flight => {
            if (flight.price < filterOptions.price.min || flight.price > filterOptions.price.max) return;

            const normalizedFlightTime = Number(flight.totalFlightTime.replace("h", ''));
            if (normalizedFlightTime < filterOptions.flightTime.min || normalizedFlightTime > filterOptions.flightTime.max) return;

            switch (filterOptions.stops) {
                case STOPS_VALUES.any:
                    return true;
                case STOPS_VALUES['0']:
                    return flight.stops === 0;
                case STOPS_VALUES['1']:
                    return flight.stops <= 1;
                case STOPS_VALUES['2']:
                    return flight.stops <= 2;
            }

            return true;
        })
    }, [searchQuery, sortedFlights, filterOptions]);

    const filterHandler = (newFilterOptions: FlightsFilterType) => {
        setFilterOptions(newFilterOptions)
    }

    useEffect(() => {
        fetchFlights().then((flights: Flight[]) => setFlights(flights));
    }, []);

    useEffect(() => {
        setFilterOptions({
            price: {
                min: prices.min,
                max: prices.max,
            },
            flightTime: {
                min: flightTimes.min,
                max: flightTimes.max,
            },
            stops: STOPS_VALUES.any,
        });
    }, [prices, flightTimes])

    return (
        <section className={styles.flights}>
            <div className="container">
                <h1>Flights page</h1>

                <h2>Поиск:</h2>
                <SearchInput
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder={'Введите город отправки или прибытия'}
                />

                <h2>Фильтрация:</h2>
                <FlightsFilter filterOptions={filterOptions} onFilter={filterHandler}/>

                <h2>Сортировка:</h2>
                <Select
                    <SortOption, false, GroupedOption>
                    styles={{
                        option: (baseStyles) => ({
                            ...baseStyles,
                            color: '#000',
                        }),
                    }}
                    isSearchable={false}
                    value={sortOption}
                    onChange={(sortType) => setSortOption(sortType ?? defaultSortOption)}
                    options={selectOptions}
                    className={styles.sort}
                />
                <FlightsList flights={filteredFlights}/>
            </div>
        </section>
    );
}

export default FlightsPage;
