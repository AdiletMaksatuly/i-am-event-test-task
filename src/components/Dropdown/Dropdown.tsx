import {
    ReactNode,
    useEffect,
    useRef,
    useState
} from "react";
import styles from './Dropdown.module.css';
import {assertIsNode} from "../../utils/assertIsNode.util.ts";
import Select from "../Select/Select.tsx";
import Range from "../Range/Range.tsx";

interface DropdownProps {
    title: string;
    children: ReactNode;
}

function Dropdown(props: DropdownProps) {
    const [isActive, setIsActive] = useState<boolean>(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!isActive) return;

        const closeOnOutsideClick = (event: MouseEvent) => {
            assertIsNode(event.target);

            if (dropdownRef.current && dropdownRef.current.contains(event.target)) return;

            setIsActive(false)
        }

        document.addEventListener('click', closeOnOutsideClick, true);

        return () => document.removeEventListener('click', closeOnOutsideClick, true);
    }, [isActive]);

    return (
        <div ref={dropdownRef} className={styles.dropdown}>
            <button onClick={() => setIsActive(prev => !prev)} className={styles.trigger}>{props.title}</button>
            {
                isActive && (
                    <div className={styles.content}>
                        {props.children}
                    </div>
                )
            }
        </div>
    );
}

Dropdown.Range = Range;
Dropdown.Select = Select;

export default Dropdown;
