import styles from "./Profile.module.css";
import Contact from "./contact-info/Contact";
import Work from "./work/Work";

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
            <Contact currentUser={currentUser} />
            <Work currentUser={currentUser} />
        </section>
    );
};

export default Profile;
