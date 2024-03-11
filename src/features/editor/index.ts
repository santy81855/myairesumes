export { default as AddSectionModal } from "./components/add-section-modal/AddSectionModal";
export { default as DocumentContainer } from "./components/document-container/DocumentContainer";
export { default as MenuContainer } from "./components/side-menu/menu-container/MenuContainer";
export { default as DraggableContainer } from "./components/draggable-section-container/DraggableContainer";
export { default as PageUtilBar } from "./components/page-util-bar/PageUtilBar";
export { default as PageCounter } from "./components/page-counter/PageCounter";
export { default as PageButtons } from "./components/page-add-delete-buttons/PageButtons";
export { default as LastSavedDisplay } from "./components/last-saved-display/LastSavedDisplay";
export { default as SideMenu } from "./components/side-menu/SideMenu";
export { default as TitleBar } from "./components/title-bar/TitleBar";
export { default as SubTitleBar } from "./components/sub-title-bar/SubTitleBar";
export { SectionConfig } from "./lib/sectionConfig";
export { CoverLetterSectionConfig } from "./lib/coverLetterSectionConfig";
export { default as getSectionTitleComponent } from "./lib/section-variants/titleVariants";
export {
    getAccentEmailIcon,
    getAccentPhoneIcon,
    getAccentWebsiteIcon,
} from "./lib/section-icons/SectionIcons";
export { default as getSectionStyles } from "./lib/section-styles/getSectionStyles";
export { default as getHeaderVariants } from "./lib/section-variants/headerVariants";
export { default as getEducationVariants } from "./lib/section-variants/educationVariants";
export { default as getNameVariants } from "./lib/section-variants/nameVariants";
export { default as getPositionVariants } from "./lib/section-variants/positionVariants";
export { default as getContactVariants } from "./lib/section-variants/contactVariants";
export { default as getSkillsVariants } from "./lib/section-variants/skillsVariants";
export { default as getLanguagesVariants } from "./lib/section-variants/languagesVariants";
export { default as getInterestsVariants } from "./lib/section-variants/interestsVariants";
export { default as getExperienceVariants } from "./lib/section-variants/experienceVariants";
export { default as getSummaryVariants } from "./lib/section-variants/summaryVariants";
export { default as getProjectsVariants } from "./lib/section-variants/projectsVariants";
export { default as getSalutationVariants } from "./lib/section-variants/salutationVariants";
export { default as getClosingVariants } from "./lib/section-variants/closingVariants";
export { default as getBodyVariants } from "./lib/section-variants/bodyVariants";
export {
    updateDocumentArray,
    getResume,
    getCoverLetter,
    initializeNewResume,
    initializeNewCoverLetter,
    getAllUserJobs,
    getAllUserResumes,
    getAllUserCoverLetters,
    getAllResumeTemplates,
    getAllCoverLetterTemplates,
    updateDocument,
    updateCoverLetter,
} from "./lib/document";
export { getPrompt } from "./lib/ai";
export { createResume as createResumeAction } from "./actions/document";
export { updateResume as updateResumeAction } from "./actions/document";
export { createJob as createJobAction } from "./actions/document";
export { createCoverLetter as createCoverLetterAction } from "./actions/document";
export { updateCoverLetter as updateCoverLetterAction } from "./actions/document";
export { deleteJob as deleteJobAction } from "./actions/document";
export { deleteResume as deleteResumeAction } from "./actions/document";
export { deleteCoverLetter as deleteCoverLetterAction } from "./actions/document";
