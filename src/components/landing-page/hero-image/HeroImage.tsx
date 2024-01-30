import styles from "./HeroImage.module.css";
import Image from "next/image";
import ResumeTicker from "@/components/landing-page/resume-ticker/ResumeTicker";

const HeroImage = () => {
    return (
        <section className={styles.imageSection}>
            <section className={styles.imageContainer}>
                <Image
                    src="/images/landing-page/landing-page-main.png"
                    alt="Hero Image"
                    width={4896}
                    height={3264}
                    className={styles.image}
                    priority={true}
                />
                <Image
                    src="/images/landing-page/landing-page-main.png"
                    alt="Hero Image"
                    width={4896}
                    height={3264}
                    className={styles.imageSticker}
                    priority={true}
                />
            </section>
            <ResumeTicker />
            <div className={styles.stars}></div>
        </section>
    );
};

export default HeroImage;
