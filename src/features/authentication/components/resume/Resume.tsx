"use client";
import styles from "./Resume.module.css";
import { motion, AnimatePresence } from "framer-motion";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import FakeText from "@/components/fake-text/FakeText";

const variants = {
    enter: (direction: number) => {
        // make the object rotate when it's entering
        return {
            x: 500,
            rotate: 90,
            opacity: 0,
        };
    },
    center: {
        zIndex: 1,
        rotate: 0,
        x: 0,
        opacity: 1,
    },
};

const Resume = () => {
    const images = [
        "/images/auth/account-1.svg",
        "/images/auth/account-2.svg",
        "/images/auth/account-3.svg",
        "/images/auth/account-4.svg",
        "/images/auth/account-5.svg",
    ];
    const names = ["John", "Jane", "Jake", "John", "James"];
    const lastNames = ["Doe", "Doe", "Gold", "Smith", "Bond"];
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
    const getPreviousIndex = () => {
        const range = images.length;
        var index = imageIndex;
        if (imageIndex === 0) {
            index = range - 1;
        }
        if (imageIndex > 0) {
            index = imageIndex - 1;
        }
        return index;
    };
    // create a motion div with a <p> element inside
    return (
        <section className={styles.container}>
            <div className={styles.staticResumeSlanted2}></div>
            <div className={styles.staticResumeSlanted}></div>
            <div className={styles.staticResume}>
                <div className={styles.rowContainer}>
                    <Image
                        src={images[getPreviousIndex()]}
                        alt="Resume Image"
                        width={200}
                        height={200}
                        className={styles.image}
                    />
                    <div className={styles.nameContainer}>
                        <p className={styles.name}>
                            {names[getPreviousIndex()]}
                        </p>
                        <p className={styles.lastName}>
                            {lastNames[getPreviousIndex()]}
                        </p>
                    </div>
                </div>
                <FakeText numLines={10} lineHeight="10px" spacing="10px" />
            </div>
            <AnimatePresence>
                <div className={styles.imageContainer}>
                    <motion.div
                        key={page}
                        custom={direction}
                        variants={variants}
                        initial="enter"
                        animate="center"
                        transition={{
                            x: {
                                type: "spring",
                                stiffness: 180,
                                damping: 23,
                            },
                            rotate: { duration: 0.4 },
                            opacity: { duration: 0.2 },
                        }}
                        className={styles.resume}
                    >
                        <div className={styles.rowContainer}>
                            <Image
                                src={images[imageIndex]}
                                alt="Resume Image"
                                width={200}
                                height={200}
                                className={styles.image}
                            />
                            <div className={styles.nameContainer}>
                                <p className={styles.name}>
                                    {names[imageIndex]}
                                </p>
                                <p className={styles.lastName}>
                                    {lastNames[imageIndex]}
                                </p>
                            </div>
                        </div>
                        <FakeText
                            numLines={10}
                            lineHeight="10px"
                            spacing="10px"
                        />
                    </motion.div>
                </div>
            </AnimatePresence>
        </section>
    );
};

export default Resume;
