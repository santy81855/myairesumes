"use client";
import React, { useEffect } from "react";
import styles from "./Testimonials.module.css";
import { motion, useAnimation, Variants } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { star, halfStar } from "@/components/icons/iconSVG";

const testimonialsData = [
    {
        stars: 5,
        text: "Thanks to this app, I was able to make a very high quality resume for my job applications.",
        name: "Paula, Beta Tester",
    },
    {
        stars: 4.5,
        text: "My Resume Hero helps me a ton with keeping track of my applications, and being able to access my resumes and cover letters for specific jobs from anywhere is a huge plus to prepare for interviews.",
        name: "Carlos, Beta Tester",
    },
    {
        stars: 5,
        text: "I usually struggle with writing out the content of my resume, but the AI assistant feature helps me finish a fresh resume for an application in less than 5 minutes. Seriously, this app is a game changer.",
        name: "Daniel, Beta Tester",
    },
];

const Testimonials: React.FC = () => {
    const testimonialVariants: Variants = {
        hidden: { opacity: 0, y: 50 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.5,
                ease: "easeOut",
            },
        },
    };

    return (
        <section className={styles.testimonials}>
            <h2 className={styles.title}>Don&apos;t take our word for it</h2>
            <div className={styles.testimonialsGrid}>
                <div className={styles.circle1}></div>
                <div className={styles.circle2}></div>
                <div className={styles.circle3}></div>
                {testimonialsData.map((testimonial, index) => (
                    <TestimonialItem
                        key={index}
                        testimonial={testimonial}
                        variants={testimonialVariants}
                    />
                ))}
            </div>
        </section>
    );
};

interface TestimonialItemProps {
    testimonial: {
        stars: number;
        text: string;
        name: string;
    };
    variants: Variants;
}

const TestimonialItem: React.FC<TestimonialItemProps> = ({
    testimonial,
    variants,
}) => {
    const controls = useAnimation();
    const [ref, inView] = useInView({
        triggerOnce: true,
        threshold: 0.1,
    });

    useEffect(() => {
        if (inView) {
            controls.start("visible");
        }
    }, [controls, inView]);

    const renderStars = (stars: number) => {
        const starArray = [];
        for (let i = 0; i < Math.floor(stars); i++) {
            starArray.push(<div className={styles.star}>{star}</div>);
        }
        if (stars % 1 !== 0) {
            starArray.push(<div className={styles.star}>{halfStar}</div>);
        }
        return <section className={styles.starContainer}>{starArray}</section>;
    };

    return (
        <motion.div
            ref={ref}
            initial="hidden"
            animate={controls}
            variants={variants}
            className={styles.testimonialItem}
        >
            <p>{testimonial.text}</p>
            {renderStars(testimonial.stars)}
            <p className={styles.name}>- {testimonial.name}</p>
        </motion.div>
    );
};

export default Testimonials;
