import {ChangeEvent} from "react";

export interface SelectOption<T> {
    value: T;
    label: string;
}
export interface SelectProps<T> {
    value?: string;
    options: Array<SelectOption<T>>;
    onChange?: (newValue: T) => void;
}

function Select<T extends string | number>({ onChange, value, options }: SelectProps<T>) {
    const changeHandler = (event: ChangeEvent<HTMLSelectElement>) => {
        if (!onChange) return;

        onChange(event.target.value as unknown as T);
    }

    return (
        <select defaultValue={value} onChange={changeHandler}>
            {
                options.map((option) => (
                    <option key={option.value} value={option.value}>{option.label}</option>
                ))
            }
        </select>
    );
}

export default Select;
