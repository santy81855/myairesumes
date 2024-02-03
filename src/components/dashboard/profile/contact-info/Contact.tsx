import Link from "next/link";
import styles from "./Contact.module.css";
import { updateUserContactInfo } from "@/actions/user";
import "react-toastify/dist/ReactToastify.css";
import FormLoading from "@/components/form-loading/FormLoading";

type ContactProps = {
    currentUser: any;
    searchParams?: { [key: string]: string | string[] | undefined };
};

const Contact = ({ currentUser, searchParams }: ContactProps) => {
    //const [isLoading, setIsLoading] = useState(false);
    const { imageUrl, basicInfo, firstName, lastName, email } = currentUser;
    const url = imageUrl || "/images/icons/default-profile-picture.svg";
    const name = basicInfo ? basicInfo.name : `${firstName} ${lastName}`;
    const phone = basicInfo ? basicInfo.phone : "";
    const website = basicInfo ? basicInfo.website : "";
    const edit = searchParams?.profileEdit || false;
    const updateBasicInfo = updateUserContactInfo.bind(null, currentUser);

    return (
        <form className={styles.profileSection} action={updateBasicInfo}>
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
                        <p className={`${styles.label} ${styles.nameLabel}`}>
                            name
                        </p>
                        {edit ? (
                            <input
                                type="text"
                                name="name"
                                className={styles.input}
                                defaultValue={name}
                            />
                        ) : (
                            <p className={styles.name}>{name}</p>
                        )}
                    </section>
                </section>
                <section className={styles.contactInfo}>
                    <section className={styles.fieldContainer}>
                        <p className={styles.label}>email</p>
                        {edit ? (
                            <input
                                type="text"
                                name="email"
                                className={styles.input}
                                defaultValue={email}
                            />
                        ) : (
                            <p className={styles.item}>{email}</p>
                        )}
                    </section>
                    <section className={styles.fieldContainer}>
                        <p className={styles.label}>phone</p>
                        {edit ? (
                            <input
                                type="text"
                                name="phone"
                                className={styles.input}
                                defaultValue={phone}
                            />
                        ) : (
                            <p className={styles.item}>{phone}</p>
                        )}
                    </section>
                    <section className={styles.fieldContainer}>
                        <p className={styles.label}>website</p>
                        {edit ? (
                            <input
                                type="text"
                                name="website"
                                className={styles.input}
                                defaultValue={website}
                            />
                        ) : (
                            <p className={styles.item}>{website}</p>
                        )}
                    </section>
                </section>
            </div>
            {edit ? (
                <button type="submit" className={styles.submitButton}>
                    Save
                </button>
            ) : (
                <Link
                    href="/dashboard?menu=profile&profileEdit=true"
                    type="button"
                    className={styles.submitButton}
                >
                    Edit
                </Link>
            )}
            <FormLoading />
        </form>
    );
};

export default Contact;
