import Link from "next/link";
import styles from "./Contact.module.css";
import { updateUserContactInfo } from "@/actions/user";
import "react-toastify/dist/ReactToastify.css";
import FormLoading from "@/components/form-loading/FormLoading";
import Card from "@/components/dashboard/cards/dashboard-cards/Card";
import { getSubstringEllipsis } from "@/lib/string";
import Upload from "./image-upload/Upload";
import Image from "next/image";
import { GetObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { r2 } from "@/lib/r2";

type ContactProps = {
    currentUser: any;
    searchParams?: { [key: string]: string | string[] | undefined };
};

const Contact = async ({ currentUser, searchParams }: ContactProps) => {
    const { imageUrl, basicInfo, firstName, lastName, email } = currentUser;
    const url = basicInfo
        ? basicInfo.imageUrl
        : "/images/icons/default-profile-picture.svg";
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
                    {edit ? (
                        <Upload url={url} />
                    ) : (
                        <section className={styles.profileImage}>
                            <Image
                                src={url || ""}
                                alt="profile image"
                                width={200}
                                height={200}
                                className={styles.image}
                            />
                        </section>
                    )}
                    <section className={styles.nameInfo}>
                        {edit ? (
                            <section className={styles.nameInputContainer}>
                                <section className={styles.nameInput}>
                                    <p className={styles.label}>first name</p>
                                    <input
                                        aria-label="first name"
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
                                        aria-label="last name"
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
                                <p className={styles.name}>
                                    {getSubstringEllipsis(first, 0, 20)}
                                </p>
                                <p className={styles.name}>
                                    {getSubstringEllipsis(last, 0, 20)}
                                </p>
                            </>
                        )}
                    </section>
                </section>
                <section className={styles.contactInfo}>
                    <section className={styles.fieldContainer}>
                        <p className={styles.label}>email</p>
                        {edit ? (
                            <input
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
                        <p className={styles.label}>phone</p>
                        {edit ? (
                            <input
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
                        <p className={styles.label}>website</p>
                        {edit ? (
                            <input
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
