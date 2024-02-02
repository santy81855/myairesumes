import styles from "./Profile.module.css";
import Image from "next/image";

type ProfileProps = {
    currentUser: any;
};

const Profile = ({ currentUser }: ProfileProps) => {
    const { imageUrl, basicInfo, firstName, lastName, email } = currentUser;
    const url = imageUrl || "/images/icons/default-profile-picture.svg";
    const name = `${firstName} ${lastName}`;
    const phone = basicInfo ? basicInfo.phone : "(123) 456-7890";
    const website = basicInfo ? basicInfo.website : "www.example.com";

    return (
        <section className={styles.container}>
            <section className={styles.profileSection}>
                <div className={styles.profileSectionContent}>
                    <p className={styles.title}>Profile</p>
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
            <section className={styles.workSection}>work</section>
        </section>
    );
};

export default Profile;
