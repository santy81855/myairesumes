"use client";
import styles from "./Avatar.module.css";
import { motion, AnimatePresence } from "framer-motion";
import React, { useState, useEffect } from "react";

const variants = {
    enter: (direction: number) => {
        return {
            x: direction > 0 ? 500 : -500,
            opacity: 0,
        };
    },
    center: {
        zIndex: 1,
        x: 0,
        opacity: 1,
    },
    exit: (direction: number) => {
        return {
            zIndex: 0,
            x: direction < 0 ? 500 : -500,
            opacity: 1,
        };
    },
};

const Avatar = () => {
    const images = [
        "/images/auth/account-1.svg",
        "/images/auth/account-2.svg",
        "/images/auth/account-3.svg",
        "/images/auth/account-4.svg",
    ];
    const names = ["John", "Jane", "Jake", "John"];
    const lastNames = ["Doe", "Doe", "Gold", "Smith"];
    const [[page, direction], setPage] = useState([0, 0]);
    const imageIndex = wrap(0, images.length, page);

    useEffect(() => {
        //Implementing the setInterval method
        const interval = setInterval(() => {
            paginate(1);
        }, 2000);

        //Clearing the interval
        return () => clearInterval(interval);
    }, [page]);

    const paginate = (newDirection: number) => {
        setPage([page + newDirection, newDirection]);
    };
    function wrap(min: number, max: number, value: number) {
        const range = max - min;
        return ((((value - min) % range) + range) % range) + min;
    }
    // create a motion div with a <p> element inside
    return (
        <section className={styles.container}>
            <AnimatePresence>
                <div className={styles.imageContainer}>
                    <motion.img
                        key={page}
                        src={images[imageIndex]}
                        custom={direction}
                        variants={variants}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        transition={{
                            x: {
                                type: "spring",
                                stiffness: 150,
                                damping: 15,
                            },
                            opacity: { duration: 0.2 },
                        }}
                        className={styles.image}
                    />
                    <div className={styles.nameContainer}>
                        <p className={styles.name}>{names[imageIndex]}</p>
                        <p className={styles.lastName}>
                            {lastNames[imageIndex]}
                        </p>
                    </div>
                </div>
            </AnimatePresence>
        </section>
    );
};

export default Avatar;
