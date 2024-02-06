import Link from "next/link";
import styles from "./Contact.module.css";
import { updateUserContactInfo } from "@/actions/user";
import "react-toastify/dist/ReactToastify.css";
import FormLoading from "@/components/form-loading/FormLoading";
import Card from "@/components/dashboard/cards/dashboard-cards/Card";

type ContactProps = {
    currentUser: any;
    searchParams?: { [key: string]: string | string[] | undefined };
};

const Contact = ({ currentUser, searchParams }: ContactProps) => {
    const { imageUrl, basicInfo, firstName, lastName, email } = currentUser;
    const url = imageUrl || "/images/icons/default-profile-picture.svg";
    const first = basicInfo ? basicInfo.firstName : firstName;
    const last = basicInfo ? basicInfo.lastName : lastName;
    const profileEmail = basicInfo ? basicInfo.email : email;
    const phone = basicInfo ? basicInfo.phone : "";
    const website = basicInfo ? basicInfo.website : "";
    const edit = searchParams?.profileEdit || false;
    const updateBasicInfo = updateUserContactInfo.bind(null, currentUser);

    return (
        <Card gridArea="profile" title="Profile" key="contact-card">
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
                        {edit ? (
                            <section className={styles.nameInputContainer}>
                                <section className={styles.nameInput}>
                                    <p className={styles.label}>first name</p>
                                    <input
                                        type="text"
                                        name="firstName"
                                        className={styles.input}
                                        defaultValue={first}
                                        autoFocus
                                        required
                                    />
                                </section>
                                <section className={styles.nameInput}>
                                    <p className={styles.label}>last name</p>
                                    <input
                                        type="text"
                                        name="lastName"
                                        className={styles.input}
                                        defaultValue={last}
                                        autoFocus
                                        required
                                    />
                                </section>
                            </section>
                        ) : (
                            <>
                                <p
                                    className={`${styles.label} ${styles.nameLabel}`}
                                >
                                    name
                                </p>
                                <p
                                    className={styles.name}
                                >{`${first} ${last}`}</p>
                            </>
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
                                defaultValue={profileEmail}
                                required
                            />
                        ) : (
                            <p className={styles.item}>{profileEmail}</p>
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
                                required
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
                <section className={styles.buttonContainer}>
                    <Link
                        href="/dashboard?menu=profile"
                        className={styles.cancelButton}
                    >
                        cancel
                    </Link>
                    <button
                        type="submit"
                        className={styles.submitButton}
                        formAction={updateBasicInfo}
                    >
                        Save
                    </button>
                </section>
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
        </Card>
    );
};

export default Contact;
