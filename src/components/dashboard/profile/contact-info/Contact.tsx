import styles from "./Contact.module.css";

type ContactProps = {
    currentUser: any;
};

const Contact = ({ currentUser }: ContactProps) => {
    const { imageUrl, basicInfo, firstName, lastName, email } = currentUser;
    const url = imageUrl || "/images/icons/default-profile-picture.svg";
    const name = `${firstName} ${lastName}`;
    const phone = basicInfo ? basicInfo.phone : "(123) 456-7890";
    const website = basicInfo ? basicInfo.website : "www.example.com";

    return (
        <section className={styles.profileSection}>
            <p className={styles.title}>Profile</p>
            <div className={styles.profileSectionContent}>
                <section className={styles.profileImagecontainer}>
                    <section
                        className={styles.profileImage}
                        style={{
                            background: `url(${url})`,
                            backgroundSize: "cover",
                            backgroundPosition: "center",
                        }}
                    ></section>
                    <section className={styles.nameInfo}>
                        <p className={styles.name}>{name}</p>
                    </section>
                </section>
                <section className={styles.contactInfo}>
                    <p className={styles.label}>email</p>
                    <p className={styles.item}>{email}</p>
                    <p className={styles.label}>phone</p>
                    <p className={styles.item}>{phone}</p>
                    <p className={styles.label}>website</p>
                    <p className={styles.item}>{website}</p>
                </section>
            </div>
        </section>
    );
};

export default Contact;
