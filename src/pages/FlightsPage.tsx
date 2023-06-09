import FlightsList from "../components/FlightsList/FlightsList.tsx";
import {Flight} from "../models/flight.interface.ts";
import styles from "./FlightsPage.module.css";
import {useEffect, useMemo, useState} from "react";
import {fetchFlights} from "../api/flights.api.ts";
import Select from "react-select";
import {GroupedOption, SortOption} from "../models/sort.model.ts";
import {sortOptions} from "../consts/sort.const.ts";
import SearchInput from "../components/SearchInput/SearchInput.tsx";

const defaultSortOption: SortOption = {
    label: 'Не выбрано',
    value: '',
}

const selectOptions: Array<GroupedOption | SortOption> = [defaultSortOption, ...sortOptions];

function FlightsPage() {
    const [flights, setFlights] = useState<Flight[]>([]);

    const [sortOption, setSortOption] = useState<SortOption>(defaultSortOption);

    const [searchQuery, setSearchQuery] = useState<string>('');

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
        return sortedFlights.filter((flight) => {
            const loweredSearchQuery = searchQuery.toLowerCase();
            const loweredFlightOrigin = flight.origin.toLowerCase();
            const loweredFlightDest = flight.destination.toLowerCase();

            return loweredFlightOrigin.includes(loweredSearchQuery) || loweredFlightDest.includes(loweredSearchQuery);
        });
    }, [searchQuery, sortedFlights]);


    useEffect(() => {
        fetchFlights().then((flights: Flight[]) => setFlights(flights));
    }, []);

    return (
        <section className={styles.flights}>
            <div className="container">
                <h1>Flights page</h1>

                <h2>Поиск:</h2>
                <SearchInput
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder={'Введите город отправки или прибытия'}
                />

                <h2>Сортировка:</h2>
                <Select
                    <SortOption, false, GroupedOption>
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
