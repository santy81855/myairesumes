"use client";
import React, { useEffect } from "react";
import styles from "./Features.module.css";
import {
    templateIcon,
    brainIcon,
    coloredJobIcon,
    searchIcon,
    cloudIcon,
    paletteIconColor,
} from "@/components/icons/iconSVG";
import { motion, useAnimation, Variants } from "framer-motion";
import { useInView } from "react-intersection-observer";

interface Feature {
    icon: React.ReactNode;
    title: string;
    description: string;
}

const features: Feature[] = [
    {
        icon: coloredJobIcon,
        title: "Organized Applications",
        description:
            "Store all your applications in one place, and keep them organized and color coded. Never lose track of an application again.",
    },
    {
        icon: templateIcon,
        title: "Customizable Templates",
        description:
            "Create stunning resumes and cover letters with ease using our diverse range of customizable templates to suit any style.",
    },
    {
        icon: brainIcon,
        title: "AI Generated Content",
        description:
            "Use AI to generate full sections or enhance existing content, ensuring your resume is professional and compelling.",
    },
    {
        icon: paletteIconColor,
        title: "Customizable Content",
        description:
            "Change every aspect of the resume or cover letter to fit your needs. Change things like font, font size, margin, colors, and more.",
    },
    {
        icon: searchIcon,
        title: "Live Preview",
        description:
            "See real-time previews of your resume as you make changes, ensuring everything looks perfect before you apply.",
    },
    {
        icon: cloudIcon,
        title: "Cloud Storage",
        description:
            "Save and access your resumes and cover letters from anywhere, ensuring you’re always ready to apply on the go.",
    },
];

const Features: React.FC = () => {
    const featureVariants: Variants = {
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
        <section className={styles.features}>
            <h2 className={styles.title}>
                Level Up Your Applications With My Resume Hero
            </h2>
            <div className={styles.featuresGrid}>
                {features.map((feature, index) => (
                    <FeatureItem
                        key={index}
                        feature={feature}
                        variants={featureVariants}
                    />
                ))}
            </div>
        </section>
    );
};

interface FeatureItemProps {
    feature: Feature;
    variants: Variants;
}

const FeatureItem: React.FC<FeatureItemProps> = ({ feature, variants }) => {
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

    return (
        <motion.div
            ref={ref}
            initial="hidden"
            animate={controls}
            variants={variants}
            className={styles.featureItem}
        >
            <svg className={styles.icon}>{feature.icon}</svg>
            <p className={styles.featureTitle}>{feature.title}</p>
            <p className={styles.featureDescription}>{feature.description}</p>
        </motion.div>
    );
};

export default Features;
