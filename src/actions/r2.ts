"use server";
import { r2 } from "@/lib/r2";
import { PutObjectCommand, DeleteObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

export const createSignedUrl = async (key: string, contentType: string) => {
    try {
        const command = new PutObjectCommand({
            Bucket: process.env.R2_BUCKET_NAME,
            Key: key,
            ContentType: contentType,
        });
        const url = getSignedUrl(r2, command, { expiresIn: 3600 });
        return url;
    } catch (e) {
        return null;
    }
};

export const deleteObject = async (key: string) => {
    const command = new DeleteObjectCommand({
        Bucket: process.env.R2_BUCKET_NAME,
        Key: key,
    });
    return r2.send(command);
};
