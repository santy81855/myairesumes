"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import styles from "./Carousel.module.css";
import Resume from "../resume/Resume";

const Carousel = () => {
    const [positionIndexes, setPositionIndexes] = useState([0, 1, 2, 3, 4]);

    const handleNext = () => {
        console.log("here");
        setPositionIndexes((prevIndexes) => {
            const updatedIndexes = prevIndexes.map(
                (prevIndex) => (prevIndex + 1) % 5
            );
            return updatedIndexes;
        });
    };

    const handleBack = () => {
        setPositionIndexes((prevIndexes) => {
            const updatedIndexes = prevIndexes.map(
                (prevIndex) => (prevIndex + 4) % 5
            );

            return updatedIndexes;
        });
    };

    const images = [<Resume />, <Resume />, <Resume />, <Resume />, <Resume />];

    const positions = ["center", "left1", "left", "right", "right1"];

    const imageVariants = {
        center: { x: "0%", scale: 1, zIndex: 5 },
        left1: { x: "-50%", scale: 0.7, zIndex: 3 },
        left: { x: "-90%", scale: 0.5, zIndex: 2 },
        right: { x: "90%", scale: 0.5, zIndex: 1 },
        right1: { x: "50%", scale: 0.7, zIndex: 3 },
    };
    return (
        <div className={styles.container}>
            {images.map((image, index) => (
                <motion.div
                    key={index}
                    className={styles.image}
                    initial="center"
                    animate={positions[positionIndexes[index]]}
                    variants={imageVariants}
                    transition={{ duration: 0.5 }}
                    style={{ width: "40%", position: "absolute" }}
                >
                    {image}
                </motion.div>
            ))}
            <div className={styles.buttonContainer}>
                <button className={styles.button} onClick={handleBack}>
                    Back
                </button>
                <button className={styles.button} onClick={handleNext}>
                    Next
                </button>
            </div>
        </div>
    );
};

export default Carousel;
