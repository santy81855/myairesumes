"use client";

import ResumeTemplateLayout from "../shared/ResumeTemplateLayout";

type CrestProps = {
    document: any;
    isEditor?: boolean;
    isDownload?: boolean;
    isPreview?: boolean;
};

const Crest = (props: CrestProps) => (
    <ResumeTemplateLayout {...props} layout="single" />
);

export default Crest;
