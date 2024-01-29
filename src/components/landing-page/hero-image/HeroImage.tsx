import styles from "./HeroImage.module.css";
import Image from "next/image";
import ResumeTicker from "@/components/landing-page/resume-ticker/ResumeTicker";

const HeroImage = () => {
    return (
        <section className={styles.imageSection}>
            <section className={styles.imageContainer}>
                <div className={styles.stars}></div>
                <Image
                    src="/images/landing-page/landing-page-main.png"
                    alt="Hero Image"
                    width={4896}
                    height={3264}
                    className={styles.image}
                />
                <Image
                    src="/images/landing-page/landing-page-main.png"
                    alt="Hero Image"
                    width={4896}
                    height={3264}
                    className={styles.imageSticker}
                />
            </section>
            <ResumeTicker />
        </section>
    );
};

export default HeroImage;
