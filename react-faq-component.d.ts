// src/types/react-faq-component.d.ts

declare module "react-faq-component" {
    import { ComponentType } from "react";

    interface FAQRow {
        title: string;
        content: string;
    }

    interface FAQData {
        title: string;
        rows: FAQRow[];
    }

    interface FAQProps {
        data: FAQData;
        styles?: {
            bgColor?: string;
            titleTextColor?: string;
            rowTitleColor?: string;
            rowContentColor?: string;
            arrowColor?: string;
        };
        config?: {
            animate?: boolean;
            arrowIcon?: string;
            tabFocus?: boolean;
        };
    }

    const Faq: ComponentType<FAQProps>;

    export default Faq;
}
