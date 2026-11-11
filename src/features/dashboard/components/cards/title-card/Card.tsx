import styles from "./Card.module.css";
import Link from "next/link";
import { jobIcon, resumeIcon, coverLetterIcon } from "@/components/icons/iconSVG";

type CardProps = { title:string; number:number; url:string; gridArea:string; };
const Card = ({ title, number }: CardProps) => {
    const label = title === "Jobs" ? "Applications" : title;
    return <Link href={`/dashboard?menu=${title.toLowerCase().split(" ").join("-")}&documentPage=1`} className={styles.container}>
        <span className={styles.icon} aria-hidden="true">{title === "Jobs" ? jobIcon : title === "Resumes" ? resumeIcon : coverLetterIcon}</span>
        <span className={styles.info}><span className={styles.tabTitle}>{label}</span><span className={styles.tabNumber}>{number ?? 0}</span></span><span className={styles.arrow} aria-hidden="true">↗</span>
    </Link>;
};
export default Card;
