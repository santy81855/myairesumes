import styles from "./Testimonials.module.css";

const Testimonials = () => {
    return (
        <section className={styles.testimonials}>
            <h2 className={styles.title}>Don't take our word for it</h2>
            <div className={styles.testimonialsGrid}>
                <div className={styles.testimonialItem}>
                    <p>
                        "Thanks to this app, I was able to make a very high
                        quality resume for my job applications."
                    </p>
                    <p className={styles.name}>- Paula, User</p>
                </div>
                <div className={styles.testimonialItem}>
                    <p>
                        "My Resume Hero helps me a ton with keeping track of my
                        applications, and being able to access my resumes and
                        cover letters for specific jobs from anywhere is a huge
                        plus to prepare for interviews."
                    </p>
                    <p className={styles.name}>- Carlos, User</p>
                </div>
                <div className={styles.testimonialItem}>
                    <p>
                        "I usually struggle with writing out the content of my
                        resume, but the AI assistant feature helps me finish a
                        fresh resume for an application in less than 5 minutes.
                        Seriously, this app is a game changer."
                    </p>
                    <p className={styles.name}>- Daniel, User</p>
                </div>
            </div>
        </section>
    );
};

export default Testimonials;
