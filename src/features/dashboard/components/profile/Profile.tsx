import styles from "./Profile.module.css";
import ProfilePic from "./profile-picture/ProfilePic";
import Contact from "./contact-info/Contact";
import Work from "./work/Work";
import Projects from "./projects/Projects";
import { Education } from "./education-info/Education";

type ProfileProps = {
    currentUser: any;
    searchParams?: { [key: string]: string | string[] | undefined };
};

const Profile = ({ currentUser, searchParams }: ProfileProps) => {
    return (
        <section className={styles.container}>
            <ProfilePic currentUser={currentUser} />
            <Contact currentUser={currentUser} searchParams={searchParams} />
            <Work currentUser={currentUser} searchParams={searchParams} />
            <Education currentUser={currentUser} searchParams={searchParams} />
            <Projects currentUser={currentUser} searchParams={searchParams} />
        </section>
    );
};

export default Profile;
