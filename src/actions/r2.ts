"use server";
import { r2 } from "@/lib/r2";
import {
    PutObjectCommand,
    DeleteObjectCommand,
    CreateMultipartUploadCommand,
} from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { Upload } from "@aws-sdk/lib-storage";

export const getMultipartUploadId = async (key: string) => {
    const command = new CreateMultipartUploadCommand({
        Bucket: process.env.R2_BUCKET_NAME,
        Key: key,
    });
    return await r2.send(command);
};

export const createParallelUploads = async (body: any) => {
    try {
        const parallelUploads = new Upload({
            client: r2,
            partSize: 4 * 1024 * 1024,
            params: {
                Bucket: process.env.R2_BUCKET_NAME,
                Key: body.key,
                Body: body,
                ContentType: body.type,
            },
        });
        parallelUploads.on("httpUploadProgress", (progress) => {
            console.log(progress);
        });
        return await parallelUploads.done();
    } catch (e) {
        console.log(e);
    }
};

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
