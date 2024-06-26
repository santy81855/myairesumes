import styles from "./Profile.module.css";
import ProfilePic from "./profile-picture/ProfilePic";
import Contact from "./contact-info/Contact";
import Work from "./work/Work";
import Projects from "./projects/Projects";
import Skills from "./skills/Skills";
import { Education } from "./education-info/Education";
import Tutorial from "@/components/modals/tutorial/Tutorial";

type ProfileProps = {
    currentUser: any;
    searchParams?: { [key: string]: string | string[] | undefined };
};

const Profile = ({ currentUser, searchParams }: ProfileProps) => {
    const showTutorial = searchParams?.tutorial === "true";

    return (
        <section className={styles.container} id="profile-page">
            <ProfilePic currentUser={currentUser} />
            <Contact currentUser={currentUser} searchParams={searchParams} />
            <Work currentUser={currentUser} searchParams={searchParams} />
            <Education currentUser={currentUser} searchParams={searchParams} />
            <Skills currentUser={currentUser} searchParams={searchParams} />
            <Projects currentUser={currentUser} searchParams={searchParams} />
            {showTutorial && <Tutorial />}
        </section>
    );
};

export default Profile;
