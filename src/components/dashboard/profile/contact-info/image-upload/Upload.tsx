"use client";
import styles from "./Upload.module.css";
import { plusIconCircled } from "@/components/icons/iconSVG";
import { useState, useEffect } from "react";
import Image from "next/image";

const imageMimeType = /image\/(png|jpg|jpeg)/i;

type UploadProps = {
    url: string;
};

const Upload = ({ url }: UploadProps) => {
    const [file, setFile] = useState(null);
    const [fileDataURL, setFileDataURL] = useState(null);

    const changeHandler = (e: any) => {
        const file = e.target.files[0];
        if (!file.type.match(imageMimeType)) {
            alert("Image mime type is not valid");
            return;
        }
        setFile(file);
    };
    useEffect(() => {
        let fileReader: any,
            isCancel = false;
        if (file) {
            fileReader = new FileReader();
            fileReader.onload = (e: any) => {
                const { result } = e.target;
                if (result && !isCancel) {
                    setFileDataURL(result);
                }
            };
            fileReader.readAsDataURL(file);
        }
        return () => {
            isCancel = true;
            if (fileReader && fileReader.readyState === 1) {
                fileReader.abort();
            }
        };
    }, [file]);

    return (
        <section className={styles.profileImageEdit}>
            <div className={styles.iconContainer}>
                <Image
                    src={fileDataURL || url}
                    alt="profile image"
                    width={200}
                    height={200}
                    className={styles.image}
                />
                <input
                    type="file"
                    multiple={false}
                    accept=".png, .jpg, .jpeg"
                    name="image"
                    className={styles.imageInput}
                    onChange={changeHandler}
                />
                {plusIconCircled}
            </div>
        </section>
    );
};

export default Upload;
