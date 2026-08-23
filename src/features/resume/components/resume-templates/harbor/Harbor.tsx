"use client";

import ResumeTemplateLayout from "../shared/ResumeTemplateLayout";

type HarborProps = {
    document: any;
    isEditor?: boolean;
    isDownload?: boolean;
    isPreview?: boolean;
};

const Harbor = (props: HarborProps) => (
    <ResumeTemplateLayout {...props} layout="sidebar" />
);

export default Harbor;
