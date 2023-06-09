import {InputHTMLAttributes, useState} from "react";
import styles from './SearchInput.module.css';

interface SearchInputProps extends InputHTMLAttributes<HTMLInputElement> {
    defaultValue?: string;
}

function SearchInput({ defaultValue, onChange, ...props }: SearchInputProps) {
    const [value, setValue] = useState<string>(defaultValue ?? '');

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setValue(event.target.value);

        if (onChange) onChange(event);
    }

    return (
        <input {...props} className={styles.input} value={value} onChange={handleChange} type="text"/>
    );
}

export default SearchInput;
