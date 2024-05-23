import Link from "next/link";
import styles from "./Contact.module.css";
import "react-toastify/dist/ReactToastify.css";
import FormLoading from "@/components/form-loading/FormLoading";
import Card from "@/features/dashboard/components/cards/dashboard-cards/Card";
import { getSubstringEllipsis } from "@/lib/string";
import Upload from "./image-upload/Upload";
import Image from "next/image";
import { updateUserContactInfoAction } from "@/features/dashboard";

type ContactProps = {
    currentUser: any;
    searchParams?: { [key: string]: string | string[] | undefined };
};

const Contact = async ({ currentUser, searchParams }: ContactProps) => {
    const { imageUrl, basicInfo, firstName, lastName, email } = currentUser;
    const url =
        basicInfo && basicInfo.imageUrl
            ? basicInfo.imageUrl
            : "/images/icons/default-profile-picture.svg";
    const first = basicInfo ? basicInfo.firstName : firstName;
    const last = basicInfo ? basicInfo.lastName : lastName;
    const profileEmail = basicInfo ? basicInfo.email : email;
    const phone = basicInfo ? basicInfo.phone : "";
    const website = basicInfo ? basicInfo.website : "";
    const edit = searchParams?.contactEdit || false;
    const updateBasicInfo = updateUserContactInfoAction.bind(null, currentUser);

    return (
        <Card gridArea="profile" title="Contact" key="contact-card">
            <form className={styles.formContainer}>
                <div className={styles.profileSectionContent}>
                    <section className={styles.contactInfo}>
                        <section className={styles.fieldContainer}>
                            <label htmlFor="email" className={styles.label}>
                                email
                            </label>
                            {edit ? (
                                <input
                                    id="email"
                                    aria-label="email"
                                    type="text"
                                    name="email"
                                    className={styles.input}
                                    defaultValue={profileEmail}
                                    required
                                />
                            ) : (
                                <p className={styles.item}>
                                    {getSubstringEllipsis(email, 0, 25)}
                                </p>
                            )}
                        </section>
                        <section className={styles.fieldContainer}>
                            <label htmlFor="phone" className={styles.label}>
                                phone
                            </label>
                            {edit ? (
                                <input
                                    id="phone"
                                    aria-label="phone"
                                    type="text"
                                    name="phone"
                                    className={styles.input}
                                    defaultValue={phone}
                                    required
                                />
                            ) : (
                                <p className={styles.item}>
                                    {getSubstringEllipsis(phone, 0, 25)}
                                </p>
                            )}
                        </section>
                        <section className={styles.fieldContainer}>
                            <label htmlFor="website" className={styles.label}>
                                website
                            </label>
                            {edit ? (
                                <input
                                    id="website"
                                    aria-label="website"
                                    type="text"
                                    name="website"
                                    className={styles.input}
                                    defaultValue={website}
                                />
                            ) : (
                                <p className={styles.item}>
                                    {getSubstringEllipsis(website, 0, 25)}
                                </p>
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
                        href="/dashboard?menu=profile&contactEdit=true"
                        type="button"
                        className={styles.submitButton}
                    >
                        Edit
                    </Link>
                )}
                <FormLoading />
            </form>
        </Card>
    );
};

export default Contact;
