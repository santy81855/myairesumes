import styles from "./Features.module.css";
import {
    templateIcon,
    brainIcon,
    styleIcon,
    coloredJobIcon,
    searchIcon,
    cloudIcon,
    paletteIconColor,
} from "@/components/icons/iconSVG";

const Features = () => {
    return (
        <section className={styles.features}>
            <h2 className={styles.title}>
                Level Up Your Applications With My Resume Hero
            </h2>
            <div className={styles.featuresGrid}>
                <div className={styles.featureItem}>
                    <svg className={styles.icon}>{coloredJobIcon}</svg>
                    <p className={styles.featureTitle}>
                        Organized Applications
                    </p>
                    <p className={styles.featureDescription}>
                        Store all your applications in one place, and keep them
                        organized and color coded. Never lose track of an
                        application again.
                    </p>
                </div>
                <div className={styles.featureItem}>
                    <svg className={styles.icon}>{templateIcon}</svg>
                    <p className={styles.featureTitle}>
                        Customizable Templates
                    </p>
                    <p className={styles.featureDescription}>
                        Create stunning resumes and cover letters with ease
                        using our diverse range of customizable templates to
                        suit any style.
                    </p>
                </div>
                <div className={styles.featureItem}>
                    <svg className={styles.icon}>{brainIcon}</svg>
                    <p className={styles.featureTitle}>AI Generated Content</p>
                    <p className={styles.featureDescription}>
                        Use AI to generate full sections or enhance existing
                        content, ensuring your resume is professional and
                        compelling.
                    </p>
                </div>
                <div className={styles.featureItem}>
                    <svg className={styles.icon}>{paletteIconColor}</svg>
                    <p className={styles.featureTitle}>Customizable Content</p>
                    <p className={styles.featureDescription}>
                        Change every aspect of the resume or cover letter to fit
                        your needs. Change things like font, font size, margin,
                        colors, and more.
                    </p>
                </div>
                <div className={styles.featureItem}>
                    <svg className={styles.icon}>{searchIcon}</svg>
                    <p className={styles.featureTitle}>Live Preview</p>
                    <p className={styles.featureDescription}>
                        See real-time previews of your resume as you make
                        changes, ensuring everything looks perfect before you
                        apply.
                    </p>
                </div>
                <div className={styles.featureItem}>
                    <svg className={styles.icon}>{cloudIcon}</svg>
                    <p className={styles.featureTitle}>Cloud Storage</p>
                    <p className={styles.featureDescription}>
                        Save and access your resumes and cover letters from
                        anywhere, ensuring you’re always ready to apply on the
                        go.
                    </p>
                </div>
            </div>
        </section>
    );
};

export default Features;
