import styles from "./CreateCoverLetterModal.module.css";
import StaticModal from "@/components/static-modal/StaticModal";
import { redirect } from "next/navigation";
import Link from "next/link";
import { checkIcon, modernResumeIcon } from "@/components/icons/iconSVG";
import { validateRequest } from "@/features/authentication/lib/auth";
import FormLoading from "@/components/form-loading/FormLoading";
import { createCoverLetterAction } from "@/features/editor";

type UpgradeModalProps = {
    returnUrl: string;
};
const CreateCoverLetterModal = async ({ returnUrl }: UpgradeModalProps) => {
    const { user } = await validateRequest();
    if (!user) {
        redirect("/sign-in");
    }
    return (
        <StaticModal>
            <section className={styles.container}>
                <div className={styles.iconContainer}>{modernResumeIcon}</div>
                <h1 className={styles.title}>Create a new cover letter</h1>
                <section className={styles.benefitsContainer}>
                    <p className={styles.subTitle}>
                        Get started by filling out a few basic details for this
                        cover letter to make it <span>easy</span> to find later.
                    </p>
                </section>

                <form className={styles.form} action={createCoverLetterAction}>
                    <section className={styles.inputContainer}>
                        <label htmlFor="job" className={styles.label}>
                            Job Title
                        </label>
                        <input
                            type="text"
                            name="job"
                            id="job"
                            placeholder="E.g. Data analyst"
                            className={styles.input}
                            required
                        />
                    </section>
                    <section className={styles.inputContainer}>
                        <label htmlFor="name" className={styles.label}>
                            Cover Letter Name
                        </label>
                        <input
                            type="text"
                            name="name"
                            id="name"
                            placeholder="E.g. Cover letter for XYZ Company"
                            className={styles.input}
                            required
                        />
                    </section>
                    <section className={styles.inputContainer}>
                        <label htmlFor="description" className={styles.label}>
                            Description
                        </label>
                        <input
                            type="text"
                            name="description"
                            id="description"
                            placeholder="E.g. Applying for a data analyst position at XYZ Company"
                            className={styles.input}
                            required
                        />
                    </section>
                    <Link href={returnUrl} className={styles.cancelButton}>
                        Cancel
                    </Link>
                    <button type="submit" className={styles.button}>
                        Continue
                    </button>
                    <FormLoading />
                </form>
            </section>
        </StaticModal>
    );
};

export default CreateCoverLetterModal;
