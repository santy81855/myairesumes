"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import styles from "./Carousel.module.css";
import Resume from "../resume/Resume";

const Carousel = () => {
    const [positionIndexes, setPositionIndexes] = useState([0, 1, 2, 3, 4]);

    useEffect(() => {
        //Implementing the setInterval method
        const interval = setInterval(() => {
            handleNext();
        }, 3000);

        //Clearing the interval
        return () => clearInterval(interval);
    }, [positionIndexes]);

    const handleNext = () => {
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

    const images = [
        <Resume key={"resume1"} />,
        <Resume key={"resume2"} />,
        <Resume key={"resume3"} />,
        <Resume key={"resume4"} />,
        <Resume key={"resume5"} />,
    ];

    const positions = ["center", "left1", "left", "right", "right1"];

    const imageVariants = {
        center: { x: "0%", scale: 1, zIndex: 5 },
        left1: { x: "-70%", scale: 0.7, zIndex: 3 },
        left: { x: "-110%", scale: 0.5, zIndex: 2 },
        right: { x: "110%", scale: 0.5, zIndex: 1 },
        right1: { x: "70%", scale: 0.7, zIndex: 3 },
    };
    return (
        <div className={styles.container}>
            {images.map((image, index) => (
                <motion.div
                    key={index}
                    className={styles.resume}
                    initial="center"
                    animate={positions[positionIndexes[index]]}
                    variants={imageVariants}
                    transition={{ duration: 2 }}
                    style={{ position: "absolute" }}
                >
                    {image}
                </motion.div>
            ))}
        </div>
    );
};

export default Carousel;
