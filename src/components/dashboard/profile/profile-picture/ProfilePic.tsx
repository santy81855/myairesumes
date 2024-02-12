"use client";

import styles from "./ProfilePic.module.css";
import Upload from "@/components/dashboard/profile/contact-info/image-upload/Upload";
import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { getSubstringEllipsis } from "@/lib/string";
import { editIcon } from "@/components/icons/iconSVG";
import { updateUserNameInfo } from "@/actions/user";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LoadingScreen from "@/components/loading-screen/LoadingScreen";
import { useState } from "react";
import {
    createSignedUrl,
    deleteObject,
    createParallelUploads,
    getMultipartUploadId,
} from "@/actions/r2";
import {
    S3Client,
    CreateMultipartUploadCommand,
    UploadPartCommand,
    CompleteMultipartUploadCommand,
} from "@aws-sdk/client-s3";
import fs from "fs";
import { Buffer } from "node:buffer";

type ProfilePicProps = {
    currentUser: any;
};

const ProfilePic = ({ currentUser }: ProfilePicProps) => {
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();
    const searchParams = useSearchParams();
    const { id, imageUrl, basicInfo, firstName, lastName } = currentUser;
    const [url, setUrl] = useState(
        basicInfo && basicInfo.imageUrl
            ? basicInfo.imageUrl
            : "/images/icons/default-profile-picture.svg"
    );
    const first =
        basicInfo && basicInfo.firstName ? basicInfo.firstName : firstName;
    const last =
        basicInfo && basicInfo.lastName ? basicInfo.lastName : lastName;
    const edit = searchParams.has("nameEdit") || false;

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        setIsLoading(true);
        // get form data
        const formData = new FormData(e.target);
        // if they have a file uploaded, then upload it to get a url
        const image = formData.get("image") as File;
        // remove the image from the form data
        formData.delete("image");
        let newUrl = imageUrl;
        let updatedImage = false;
        if (image && image.size > 0) {
            try {
                // if the user has an image already, delete it
                if (currentUser.numImageUploads > 0) {
                    await deleteObject(`${id}-${currentUser.numImageUploads}`);
                }
                // create a signed url using a server action
                const signedUrl = await createSignedUrl(
                    `${id}-${currentUser.numImageUploads + 1}`,
                    image.type
                );
                console.log("signed url: ", signedUrl);
                if (!signedUrl) {
                    toast.error("An error occurred uploading your image.");
                    setIsLoading(false);
                    return;
                }
                console.log("about to upload");
                const response = await fetch(signedUrl, {
                    method: "PUT",
                    body: image,
                });
                console.log("just uploaded");
                updatedImage = true;
                // update the url
                newUrl = `https://r2.myairesumes.com/${id}-${
                    currentUser.numImageUploads + 1
                }`;
                console.log(newUrl);
                setUrl(newUrl);
            } catch (error) {
                toast.error("An error occurred.");
                return {
                    error: "An unknown error occurred. Please try again.",
                };
            }
        }
        const response = await updateUserNameInfo(
            currentUser,
            newUrl,
            formData,
            updatedImage
        );
        if (response.error) {
            toast.error(response.error);
            setIsLoading(false);
            return;
        } else {
            router.push("/dashboard?menu=profile");
            toast.success(response.success);
            setIsLoading(false);
        }
    };

    return (
        <form
            className={styles.form}
            style={edit ? { backgroundColor: "white" } : {}}
            onSubmit={handleSubmit}
        >
            <section className={styles.profileImagecontainer}>
                {edit ? (
                    <Upload url={url} setUrl={setUrl} />
                ) : (
                    <section className={styles.profileImage}>
                        <Image
                            src={url || ""}
                            alt="profile image"
                            width={200}
                            height={200}
                            className={styles.image}
                        />
                        <Link
                            href="/dashboard?menu=profile&nameEdit=true"
                            className={styles.iconContainer}
                        >
                            {editIcon}
                        </Link>
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
            {edit && (
                <section className={styles.buttonContainer}>
                    <Link
                        href="/dashboard?menu=profile"
                        className={styles.cancelButton}
                    >
                        cancel
                    </Link>
                    <button type="submit" className={styles.submitButton}>
                        Save
                    </button>
                </section>
            )}
            {isLoading && <LoadingScreen />}
        </form>
    );
};

export default ProfilePic;
