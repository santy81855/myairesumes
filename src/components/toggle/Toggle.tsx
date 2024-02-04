import styles from "./Toggle.module.css";

type ToggleProps = {
    name: string;
    defaultChecked?: boolean;
};
const Toggle = ({ name, defaultChecked }: ToggleProps) => {
    return (
        <>
            <input
                type="checkbox"
                className={styles.toggleSwitchCheckbox}
                name={name}
                id={name}
                defaultChecked={defaultChecked}
            />
            <label className={styles.toggleSwitchLabel} htmlFor={name}>
                <span className={styles.toggleSwitchInner} />
                <span className={styles.toggleSwitchSwitch} />
            </label>
        </>
    );
};

export default Toggle;
