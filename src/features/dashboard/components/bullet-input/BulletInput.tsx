// BulletList.tsx
"use client";

import { useState } from "react";
import styles from "./BulletInput.module.css";

type BulletListProps = {
    info: string[];
};

const BulletList = ({ info }: BulletListProps) => {
    const [bullets, setBullets] = useState<string[]>(info);

    const handleAddBullet = () => {
        // set a limit of 10 bullet points
        if (bullets.length >= 10) {
            return;
        }
        setBullets([...bullets, ""]);
    };

    const handleRemoveBullet = (index: number) => {
        const newBullets = bullets.filter((_, i) => i !== index);
        setBullets(newBullets);
    };

    const handleBulletChange = (index: number, value: string) => {
        const newBullets = bullets.map((bullet, i) =>
            i === index ? value : bullet
        );
        setBullets(newBullets);
    };

    return (
        <section className={styles.bulletItemContainer}>
            <p className={styles.bulletTitle}>Bullet Points</p>
            {bullets.map((bullet, index) => (
                <div key={index} className={styles.bulletItem}>
                    <button
                        type="button"
                        onClick={() => handleRemoveBullet(index)}
                        className={styles.removeButton}
                        title="Remove bullet point"
                    >
                        &#10005; {/* Unicode for X (remove icon) */}
                    </button>
                    <section className={styles.bulletRow}>
                        <label
                            htmlFor={`bullet${index}`}
                            className={styles.bullet}
                        ></label>
                        <input
                            type="text"
                            id={`bullet${index}`}
                            name={`bullet${index}`}
                            value={bullet}
                            onChange={(e) =>
                                handleBulletChange(index, e.target.value)
                            }
                            className={styles.input}
                        />
                    </section>
                </div>
            ))}
            <button
                type="button"
                onClick={handleAddBullet}
                className={styles.addButton}
            >
                Add Bullet Point
            </button>
        </section>
    );
};

export default BulletList;
