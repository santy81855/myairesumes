import styles from "./HeroImage.module.css";
import Image from "next/image";
import Resume from "@/components/landing-page/resume/Resume";
import Carousel from "@/components/landing-page/image-carousel/Carousel";

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
                <section className={styles.resumeContainer}>
                    <Carousel />
                </section>
            </section>
        </section>
    );
};

export default HeroImage;
