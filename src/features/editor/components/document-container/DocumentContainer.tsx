"use client";
import styles from "./DocumentContainer.module.css";
import Basic from "@/components/resume-templates/basic/Basic";
import { useEffect, useState, useRef } from "react";
import { useAppContext } from "@/app/providers";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import LoadingScreen from "@/components/loading-screen/LoadingScreen";

type DocumentContainerProps = {
    document: any;
};

const DocumentContainer = ({ document }: DocumentContainerProps) => {
    const templateRef = useRef<HTMLDivElement>(null);
    const id = document.id;
    const { documentArray, setDocumentArray, isDocumentLoading } =
        useAppContext();
    const [currentDocument, setCurrentDocument] = useState<any>(null);

    useEffect(() => {
        setCurrentDocument(
            documentArray.find((document) => document.id === id)
        );
    }, [documentArray]);

    useEffect(() => {
        // add the document to the document array if it is not already there
        const tempArray = [...documentArray];
        if (!tempArray.some((document: any) => document.id === id)) {
            tempArray.push({
                id,
                currentPage: 1,
                information: document.information,
            });
            setCurrentDocument({
                id,
                currentPage: 1,
                information: document.information,
            });
            setDocumentArray(tempArray);
        } else {
            const updatedDocument = documentArray.find(
                (document) => document.id === id
            );
            setCurrentDocument(updatedDocument);
        }
    }, []);

    useEffect(() => {
        const template = templateRef.current as HTMLDivElement;
        if (!template) return;
        const { width, height } = template.getBoundingClientRect();
        console.log(width);
        let size = 11 * (width / 610);
        template.style.fontSize = `${size}px`;

        // handle the text scaling
        function handleResize() {
            const template = templateRef.current as HTMLDivElement;
            if (!template) return;
            const { width, height } = template.getBoundingClientRect();
            let size = 11 * (width / 610);
            console.log(size);
            template.style.fontSize = `${size}px`;
        }

        window.addEventListener("resize", handleResize);

        return () => window.removeEventListener("resize", handleResize);
    }, []);

    // const documentPages =
    //     currentDocument &&
    //     Array.from({ length: currentDocument.information.numPages }).map(
    //         (_, index) => (
    //             <Basic
    //                 key={`page${index}`}
    //                 document={currentDocument}
    //                 isEditor={true}
    //             />
    //         )
    //     );
    /*
<DndProvider backend={HTML5Backend}>
                        {documentPages[currentDocument.currentPage - 1]}
                    </DndProvider>
*/
    return (
        <section className={styles.documentContainer}>
            <section className={styles.document}>
                {isDocumentLoading && <LoadingScreen />}
                {!currentDocument && <LoadingScreen />}

                <section className={styles.testDocument}>
                    <div className={styles.testContainer} ref={templateRef}>
                        <p>
                            rem ipsum dolor sit amet, consectetur adipiscing
                            elit. Integer nec odio. Praesent libero. Sed cursus
                            ante dapibus diam. Sed nisi. Nulla quis sem at nibh
                            elementum imperdiet. Duis sagittis ipsum. Praesent
                            mauris. Fusce nec tellus sed augue semper porta.
                            Mauris massa. Vestibulum lacinia arcu eget nulla.
                            Class aptent taciti sociosqu ad litora torquent per
                            conubia nostra, per inceptos himenaeos. Curabitur
                            sodales ligula in libero. Sed dignissim lacinia
                            nunc. Curabitur tortor. Pellentesque nibh. Aenean
                            quam. In scelerisque sem at dolor. Maecenas mattis.
                            Sed convallis tristique sem. Proin ut ligula vel
                            nunc egestas porttitor.
                        </p>
                        <p>
                            rem ipsum dolor sit amet, consectetur adipiscing
                            elit. Integer nec odio. Praesent libero. Sed cursus
                            ante dapibus diam. Sed nisi. Nulla quis sem at nibh
                            elementum imperdiet. Duis sagittis ipsum. Praesent
                            mauris. Fusce nec tellus sed augue semper porta.
                            Mauris massa. Vestibulum lacinia arcu eget nulla.
                            Class aptent taciti sociosqu ad litora torquent per
                            conubia nostra, per inceptos himenaeos. Curabitur
                            sodales ligula in libero. Sed dignissim lacinia
                            nunc. Curabitur tortor. Pellentesque nibh. Aenean
                            quam. In scelerisque sem at dolor. Maecenas mattis.
                            Sed convallis tristique sem. Proin ut ligula vel
                            nunc egestas porttitor.
                        </p>
                        <p>
                            rem ipsum dolor sit amet, consectetur adipiscing
                            elit. Integer nec odio. Praesent libero. Sed cursus
                            ante dapibus diam. Sed nisi. Nulla quis sem at nibh
                            elementum imperdiet. Duis sagittis ipsum. Praesent
                            mauris. Fusce nec tellus sed augue semper porta.
                            Mauris massa. Vestibulum lacinia arcu eget nulla.
                            Class aptent taciti sociosqu ad litora torquent per
                            conubia nostra, per inceptos himenaeos. Curabitur
                            sodales ligula in libero. Sed dignissim lacinia
                            nunc. Curabitur tortor. Pellentesque nibh. Aenean
                            quam. In scelerisque sem at dolor. Maecenas mattis.
                            Sed convallis tristique sem. Proin ut ligula vel
                            nunc egestas porttitor.
                        </p>
                        <p>
                            rem ipsum dolor sit amet, consectetur adipiscing
                            elit. Integer nec odio. Praesent libero. Sed cursus
                            ante dapibus diam. Sed nisi. Nulla quis sem at nibh
                            elementum imperdiet. Duis sagittis ipsum. Praesent
                            mauris. Fusce nec tellus sed augue semper porta.
                            Mauris massa. Vestibulum lacinia arcu eget nulla.
                            Class aptent taciti sociosqu ad litora torquent per
                            conubia nostra, per inceptos himenaeos. Curabitur
                            sodales ligula in libero. Sed dignissim lacinia
                            nunc. Curabitur tortor. Pellentesque nibh. Aenean
                            quam. In scelerisque sem at dolor. Maecenas mattis.
                            Sed convallis tristique sem. Proin ut ligula vel
                            nunc egestas porttitor.
                        </p>
                        <p>
                            rem ipsum dolor sit amet, consectetur adipiscing
                            elit. Integer nec odio. Praesent libero. Sed cursus
                            ante dapibus diam. Sed nisi. Nulla quis sem at nibh
                            elementum imperdiet. Duis sagittis ipsum. Praesent
                            mauris. Fusce nec tellus sed augue semper porta.
                            Mauris massa. Vestibulum lacinia arcu eget nulla.
                            Class aptent taciti sociosqu ad litora torquent per
                            conubia nostra, per inceptos himenaeos. Curabitur
                            sodales ligula in libero. Sed dignissim lacinia
                            nunc. Curabitur tortor. Pellentesque nibh. Aenean
                            quam. In scelerisque sem at dolor. Maecenas mattis.
                            Sed convallis tristique sem. Proin ut ligula vel
                            nunc egestas porttitor.
                        </p>
                        <p>
                            rem ipsum dolor sit amet, consectetur adipiscing
                            elit. Integer nec odio. Praesent libero. Sed cursus
                            ante dapibus diam. Sed nisi. Nulla quis sem at nibh
                            elementum imperdiet. Duis sagittis ipsum. Praesent
                            mauris. Fusce nec tellus sed augue semper porta.
                            Mauris massa. Vestibulum lacinia arcu eget nulla.
                            Class aptent taciti sociosqu ad litora torquent per
                            conubia nostra, per inceptos himenaeos. Curabitur
                            sodales ligula in libero. Sed dignissim lacinia
                            nunc. Curabitur tortor. Pellentesque nibh. Aenean
                            quam. In scelerisque sem at dolor. Maecenas mattis.
                            Sed convallis tristique sem. Proin ut ligula vel
                            nunc egestas porttitor.
                        </p>
                        <p>
                            rem ipsum dolor sit amet, consectetur adipiscing
                            elit. Integer nec odio. Praesent libero. Sed cursus
                            ante dapibus diam. Sed nisi. Nulla quis sem at nibh
                            elementum imperdiet. Duis sagittis ipsum. Praesent
                            mauris. Fusce nec tellus sed augue semper porta.
                            Mauris massa. Vestibulum lacinia arcu eget nulla.
                            Class aptent taciti sociosqu ad litora torquent per
                            conubia nostra, per inceptos himenaeos. Curabitur
                            sodales ligula in libero. Sed dignissim lacinia
                            nunc. Curabitur tortor. Pellentesque nibh. Aenean
                            quam. In scelerisque sem at dolor. Maecenas mattis.
                            Sed convallis tristique sem. Proin ut ligula vel
                            nunc egestas porttitor.
                        </p>
                        <p>
                            rem ipsum dolor sit amet, consectetur adipiscing
                            elit. Integer nec odio. Praesent libero. Sed cursus
                            ante dapibus diam. Sed nisi. Nulla quis sem at nibh
                            elementum imperdiet. Duis sagittis ipsum. Praesent
                            mauris. Fusce nec tellus sed augue semper porta.
                            Mauris massa. Vestibulum lacinia arcu eget nulla.
                            Class aptent taciti sociosqu ad litora torquent per
                            conubia nostra, per inceptos himenaeos. Curabitur
                            sodales ligula in libero. Sed dignissim lacinia
                            nunc. Curabitur tortor. Pellentesque nibh. Aenean
                            quam. In scelerisque sem at dolor. Maecenas mattis.
                            Sed convallis tristique sem. Proin ut ligula vel
                            nunc egestas porttitor.
                        </p>
                    </div>
                </section>
            </section>
        </section>
    );
};

export default DocumentContainer;
