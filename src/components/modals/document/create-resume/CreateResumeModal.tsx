import styles from "./CreateResumeModal.module.css";
import StaticModal from "@/components/static-modal/StaticModal";
import { redirect } from "next/navigation";
import Link from "next/link";
import { checkIcon, modernResumeIcon } from "@/components/icons/iconSVG";
import { validateRequest } from "@/lib/auth";
import { getUser } from "@/lib/user";
import FormLoading from "@/components/form-loading/FormLoading";
import { createResume } from "@/actions/resume";

type UpgradeModalProps = {
    returnUrl: string;
};
const CreateResumeModal = async ({ returnUrl }: UpgradeModalProps) => {
    const { user } = await validateRequest();
    if (!user) {
        redirect("/sign-in");
    }
    return (
        <StaticModal>
            <section className={styles.container}>
                <div className={styles.iconContainer}>{modernResumeIcon}</div>
                <h1 className={styles.title}>Create a new resume</h1>
                <section className={styles.benefitsContainer}>
                    <p className={styles.subTitle}>
                        Get started by filling out a few basic details for this
                        resume to make it <span>easy</span> to find later.
                    </p>
                </section>

                <form className={styles.form} action={createResume}>
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
                            Resume Name
                        </label>
                        <input
                            type="text"
                            name="name"
                            id="name"
                            placeholder="E.g. Resume for XYZ Company"
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

export default CreateResumeModal;
