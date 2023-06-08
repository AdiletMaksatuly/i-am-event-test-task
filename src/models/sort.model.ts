

export interface PriceOption {
    label: string;
    value: "price-asc" | "price-desc";
}

export interface StopsOption {
    label: string;
    value: "stops-asc" | "stops-desc";
}

export type SortOption = PriceOption | StopsOption | {
    label: 'Не выбрано';
    value: '';
};

export interface GroupedOption {
    readonly label: string;
    readonly options: readonly SortOption[];
}
