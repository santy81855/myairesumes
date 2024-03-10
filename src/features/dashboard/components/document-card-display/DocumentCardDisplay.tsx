import {
    getAllResumeTemplates,
    getAllCoverLetterTemplates,
} from "@/features/editor";
import styles from "./DocumentCardDisplay.module.css";
import { UpdateUrl } from "@/lib/updateUrl";
import { DocumentCard } from "@/features/dashboard";
import { redirect } from "next/navigation";
import Link from "next/link";
import { nextIcon, previousIcon } from "@/components/icons/iconSVG";

type DocumentCardDisplayProps = {
    documents: any[];
    type: string;
    searchParams?: { [key: string]: string | string[] | undefined };
};

const DocumentCardDisplay = ({
    searchParams,
    documents,
    type,
}: DocumentCardDisplayProps) => {
    const maxDocuments = 10;
    const documentPage = searchParams?.documentPage || null;
    if (!documentPage) {
        redirect(
            UpdateUrl(
                searchParams ? searchParams : {},
                [{ key: "documentPage", value: "1" }],
                "/dashboard"
            )
        );
    }
    const start = documentPage
        ? (parseInt(documentPage as string) - 1) * maxDocuments
        : 0;
    const end = documentPage ? start + maxDocuments : maxDocuments;
    const paginatedDocuments =
        documents && documents.length > 0
            ? documents
                  .sort(
                      (a, b) =>
                          new Date(b.updatedAt).getTime() -
                          new Date(a.updatedAt).getTime()
                  )
                  .slice(start, end)
            : [];
    const pages = Array.from(
        { length: Math.ceil(documents.length / maxDocuments) },
        (_, i) => i + 1
    );
    const nextPage = parseInt(documentPage as string) + 1;
    const prevPage = parseInt(documentPage as string) - 1;

    return (
        <section className={styles.container}>
            <section className={styles.resumesContainer}>
                {paginatedDocuments.map((doc: any) => {
                    // update the resume object to include a 'currentPage' field set to 1
                    doc.currentPage = 1;
                    const templates =
                        type === "resume"
                            ? getAllResumeTemplates(doc, false)
                            : getAllCoverLetterTemplates(doc, false);
                    return (
                        <DocumentCard
                            key={doc.id}
                            templates={templates}
                            doc={doc}
                            type={type}
                        />
                    );
                })}
            </section>
            {pages.length > 1 && (
                <section className={styles.paginationContainer}>
                    <Link
                        href={UpdateUrl(
                            searchParams ? searchParams : {},
                            [{ key: "documentPage", value: "1" }],
                            "/dashboard"
                        )}
                        className={styles.longButton}
                    >
                        First
                    </Link>
                    <Link
                        href={UpdateUrl(
                            searchParams ? searchParams : {},
                            [
                                {
                                    key: "documentPage",
                                    value: (prevPage > 0
                                        ? prevPage
                                        : pages.length
                                    ).toString(),
                                },
                            ],
                            "/dashboard"
                        )}
                        className={styles.button}
                    >
                        <div className={styles.iconContainer}>
                            {previousIcon}
                        </div>
                    </Link>
                    {pages.map((page: number) => (
                        <Link
                            key={page}
                            href={UpdateUrl(
                                searchParams ? searchParams : {},
                                [
                                    {
                                        key: "documentPage",
                                        value: page.toString(),
                                    },
                                ],
                                "/dashboard"
                            )}
                            className={`${
                                parseInt(documentPage as string) === page
                                    ? styles.active
                                    : styles.buttonNumber
                            }`}
                        >
                            {page}
                        </Link>
                    ))}
                    <Link
                        href={UpdateUrl(
                            searchParams ? searchParams : {},
                            [
                                {
                                    key: "documentPage",
                                    value: (nextPage <= pages.length
                                        ? nextPage
                                        : 1
                                    ).toString(),
                                },
                            ],
                            "/dashboard"
                        )}
                        className={styles.button}
                    >
                        <div className={styles.iconContainer}>{nextIcon}</div>
                    </Link>
                    <Link
                        href={UpdateUrl(
                            searchParams ? searchParams : {},
                            [
                                {
                                    key: "documentPage",
                                    value: pages.length.toString(),
                                },
                            ],
                            "/dashboard"
                        )}
                        className={styles.longButton}
                    >
                        Last
                    </Link>
                </section>
            )}
        </section>
    );
};

export default DocumentCardDisplay;
