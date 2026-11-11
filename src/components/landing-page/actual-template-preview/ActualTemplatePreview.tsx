import Image from "next/image";
import styles from "./ActualTemplatePreview.module.css";

type PreviewProps = {
    template?: "basic" | "triumph" | "nova";
    type?: "resume" | "cover-letter";
};

/** Captures of the application's actual templates, using fictional sample content.
 * Static assets keep editor/PDF dependencies out of the public landing bundle.
 * See public/images/template-previews/README.md for provenance.
 */
export default function ActualTemplatePreview({ template = "basic", type = "resume" }: PreviewProps) {
    const name = type === "cover-letter" ? "cover-letter" : template;
    return (
        <div className={styles.preview}>
            <Image
                src={`/images/template-previews/${name}.png`}
                alt={`${type === "cover-letter" ? "Basic cover letter" : `${template[0].toUpperCase()}${template.slice(1)} resume`} template from My Resume Hero, with fictional sample content`}
                width={1220}
                height={1579}
                sizes="(max-width: 600px) 85vw, (max-width: 1000px) 45vw, 520px"
                className={styles.image}
            />
        </div>
    );
}
