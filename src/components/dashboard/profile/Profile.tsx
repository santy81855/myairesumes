import styles from "./Profile.module.css";
import Contact from "./contact-info/Contact";
import Work from "./work/Work";

type ProfileProps = {
    currentUser: any;
    searchParams?: { [key: string]: string | string[] | undefined };
};

const Profile = ({ currentUser, searchParams }: ProfileProps) => {
    return (
        <section className={styles.container}>
            <Contact currentUser={currentUser} searchParams={searchParams} />
            <Work currentUser={currentUser} searchParams={searchParams} />
        </section>
    );
};

export default Profile;
