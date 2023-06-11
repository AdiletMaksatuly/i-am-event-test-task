import {ChangeEvent, useState} from "react";
import styles from "../Dropdown/Dropdown.module.css";

export interface RangeProps {
    min: number;
    max: number;
    onChange?: (newValue: number, type: 'min' | 'max') => void;
}

function Range({onChange, min, max}: RangeProps) {
    const [minValue, setMinValue] = useState<number>(min);
    const [maxValue, setMaxValue] = useState<number>(max);

    const handleChange = (event: ChangeEvent<HTMLInputElement>, type: 'min' | 'max') => {
        if (type === 'min') setMinValue(Number(event.target.value));

        if (type === 'max') setMaxValue(Number(event.target.value));

        if (onChange) onChange(Number(event.target.value), type);
    }

    const correctValues = (type: 'min' | 'max') => {
        if (type === 'min') {
            if (minValue > maxValue) setMinValue(maxValue);
            if (minValue < min) setMinValue(min);
        }

        if (type === 'max') {
            if (maxValue < minValue) setMaxValue(minValue);
            if (maxValue > max) setMaxValue(max);
        }
    }

    return (
        <div className={styles.range}>
            <span>От:
                <input type="number" onBlur={() => correctValues('min')} value={minValue}
                       onChange={(e) => handleChange(e, 'min')}/>
            </span>
            <span>До:
                <input type="number" onBlur={() => correctValues('max')} value={maxValue}
                       onChange={(e) => handleChange(e, 'max')}/>
            </span>
        </div>
    );
}

export default Range;
