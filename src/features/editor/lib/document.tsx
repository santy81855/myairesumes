import { formatDateMonthYear, sortObjectArrayByDateEnd } from "@/lib/date";
import Basic from "@/components/resume-templates/basic/Basic";
import Nexus from "@/components/resume-templates/nexus/Nexus";
import Impact from "@/components/resume-templates/impact/Impact";
import Nova from "@/components/resume-templates/nova/Nova";

export const updateDocument = (
    document: any,
    template: string,
    changedTemplate: boolean
) => {
    // change the template field to the new template
    // search for any items in the document.information.sectionOrder that have the substring 'header', and replace the item with headerTemplate depending on the passed template
    let newSectionOrder = [] as any;
    if (template === "nova") {
        // if the template is nova, then the sectionOrder array for the first array should be: ['headerNova', 'summary', 'experience', 'colBreak' 'contactVertical', 'skills', 'education', 'languages']
        const newArr = [
            "headerNova",
            "summary",
            "experience",
            "colBreak",
            "contactVertical",
            "skillsBullet",
            "educationShort",
            "languages",
        ];
        // make the first array in sectionOrder equal to newArr
        // add the newArr to the newSectionOrder
        // check if the first array in sectionOrder contains 'colBreak' or an element that includes 'nova'
        console.log(document.information.sectionOrder[0]);
        if (!changedTemplate) {
            // make the newSectionOrder the same as the current array
            newSectionOrder = document.information.sectionOrder;
        } else {
            newSectionOrder = document.information.sectionOrder.map(
                (array: any, index: number) => {
                    return index === 0 ? newArr : array;
                }
            );
        }
    } else {
        if (changedTemplate) {
            newSectionOrder = document.information.sectionOrder.map(
                (array: any) =>
                    array.map((item: string) => {
                        //console.log(item);
                        if (item === "colBreak") {
                            return null;
                        }
                        if (item.includes("header")) {
                            // return 'header' + template but make the first letter of template capitalized
                            return `header${template
                                .charAt(0)
                                .toUpperCase()}${template.slice(1)}`;
                        }
                        return item;
                    })
            );
            // remove any null values from the first array in newSectionOrder
            newSectionOrder[0] = newSectionOrder[0].filter(
                (item: string | null) => item !== null
            );
        } else {
            newSectionOrder = document.information.sectionOrder;
        }
    }
    console.log(newSectionOrder);
    const updatedDocument = {
        ...document,
        information: {
            ...document.information,
            template,
            sectionOrder: newSectionOrder,
        },
    };
    return updatedDocument;
};

export const getAllResumeTemplates = (
    document: any,
    changedTemplate: boolean
) => {
    return {
        basic: {
            name: "Basic",
            description: "A simple and clean resume template.",
            keywords: [
                "basic",
                "simple",
                "clean",
                "professional",
                "smart",
                "ats",
            ],
            editorComponent: (
                <Basic
                    isEditor={true}
                    document={updateDocument(
                        document,
                        "basic",
                        changedTemplate
                    )}
                />
            ),
            downloadComponent: (
                <Basic
                    isDownload={true}
                    document={updateDocument(
                        document,
                        "basic",
                        changedTemplate
                    )}
                />
            ),
            previewComponent: (
                <Basic
                    isPreview={true}
                    document={updateDocument(
                        document,
                        "basic",
                        changedTemplate
                    )}
                />
            ),
        },
        nexus: {
            name: "Nexus",
            description: "A modern and sleek resume template.",
            keywords: [
                "nexus",
                "modern",
                "sleek",
                "professional",
                "smart",
                "ats",
            ],
            editorComponent: (
                <Nexus
                    isEditor={true}
                    document={updateDocument(
                        document,
                        "nexus",
                        changedTemplate
                    )}
                />
            ),
            downloadComponent: (
                <Nexus
                    isDownload={true}
                    document={updateDocument(
                        document,
                        "nexus",
                        changedTemplate
                    )}
                />
            ),
            previewComponent: (
                <Nexus
                    isPreview={true}
                    document={updateDocument(
                        document,
                        "nexus",
                        changedTemplate
                    )}
                />
            ),
        },
        impact: {
            name: "Impact",
            description: "A bold and impactful resume template.",
            keywords: ["impact", "bold", "professional", "smart", "ats"],
            editorComponent: (
                <Impact
                    isEditor={true}
                    document={updateDocument(
                        document,
                        "impact",
                        changedTemplate
                    )}
                />
            ),
            downloadComponent: (
                <Impact
                    isDownload={true}
                    document={updateDocument(
                        document,
                        "impact",
                        changedTemplate
                    )}
                />
            ),
            previewComponent: (
                <Impact
                    isPreview={true}
                    document={updateDocument(
                        document,
                        "impact",
                        changedTemplate
                    )}
                />
            ),
        },
        nova: {
            name: "Nova",
            description: "A modern and creative resume template.",
            keywords: ["nova", "unique", "creative", "modern", "art"],
            editorComponent: (
                <Nova
                    isEditor={true}
                    document={updateDocument(document, "nova", changedTemplate)}
                />
            ),
            downloadComponent: (
                <Nova
                    isDownload={true}
                    document={updateDocument(document, "nova", changedTemplate)}
                />
            ),
            previewComponent: (
                <Nova
                    isPreview={true}
                    document={updateDocument(document, "nova", changedTemplate)}
                />
            ),
        },
    };
};

export const updateDocumentArray = (updatedDocument: any, array: any) => {
    const { id } = updatedDocument;
    // update the documentArray with the new information
    const newDocumentArray = array.map((document: any) => {
        if (document.id === id) {
            return updatedDocument;
        }
        return document;
    });
    return newDocumentArray;
};

export const getAllUserResumes = async (userId: string) => {
    const response = await fetch(
        `${process.env.APP_DOMAIN}/api/resumes?userId=${userId}`,
        {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        }
    );
    if (!response.ok) {
        return null;
    }
    return await response.json();
};

export const getResume = async (userId: string, resumeId: string) => {
    const response = await fetch(
        `${process.env.APP_DOMAIN}/api/resume?resumeId=${resumeId}&userId=${userId}`,
        {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
            //next: { tags: ["currentResume"] },
        }
    );
    if (!response.ok) {
        return null;
    }
    return await response.json();
};

export const initializeNewResume = (
    user: any,
    name: string,
    job: string,
    description: string
) => {
    const { basicInfo } = user;
    const imageUrl =
        basicInfo && basicInfo.imageUrl
            ? basicInfo.imageUrl
            : "/images/icons/default-profile-picture.svg";
    const experienceArray = basicInfo
        ? sortObjectArrayByDateEnd(basicInfo.work, basicInfo.workOrder)
        : [];
    const newExperienceArray =
        experienceArray.length === 0
            ? [
                  {
                      id: 1,
                      company: "Example Company",
                      position: "Example Position",
                      startDate: "2020-01-01",
                      endDate: "2023-01-01",
                      summary:
                          "Experienced professional with a strong background in example industry. Proven track record of delivering high-quality results and exceeding expectations. Skilled in problem-solving, communication, and teamwork.",
                      currentEmployment: false,
                      bullets: [
                          "Example bullet 1.",
                          "Example bullet 2.",
                          "Example bullet 3.",
                      ],
                  },
                  {
                      id: 2,
                      company: "Example Company 2",
                      position: "Example Position 2",
                      startDate: "2023-01-01",
                      endDate: "Present",
                      summary:
                          "Experienced professional with a strong background in example industry. Proven track record of delivering high-quality results and exceeding expectations. Skilled in problem-solving, communication, and teamwork.",
                      currentEmployment: true,
                      bullets: [
                          "Example bullet 1.",
                          "Example bullet 2.",
                          "Example bullet 3.",
                      ],
                  },
              ]
            : experienceArray.map((item) => {
                  return {
                      ...item,
                      summary: "Example summary.",
                      bullets: [
                          "Example bullet 1.",
                          "Example bullet 2.",
                          "Example bullet 3.",
                      ],
                  };
              });
    const educationArray = basicInfo
        ? sortObjectArrayByDateEnd(
              basicInfo.education,
              basicInfo.educationOrder
          )
        : [];
    const newEducationArray =
        educationArray.length === 0
            ? [
                  {
                      id: 1,
                      currentEnrollment: false,
                      schoolName: "Example University",
                      degreeType: "Bachelor's Degree",
                      degreeField: "Business Administration",
                      startDate: "2016-01-01",
                      endDate: "2020-01-01",
                      gpa: "3.7",
                      bullets: [
                          "Example bullet 1.",
                          "Example bullet 2.",
                          "Example bullet 3.",
                      ],
                  },
              ]
            : educationArray.map((item) => {
                  return {
                      ...item,
                      gpa: "3.7",
                      bullets: [
                          "Example bullet 1.",
                          "Example bullet 2.",
                          "Example bullet 3.",
                      ],
                  };
              });

    const first = basicInfo ? basicInfo.firstName : user.firstName;
    const last = basicInfo ? basicInfo.lastName : user.lastName;
    const email = basicInfo && basicInfo.email ? basicInfo.email : user.email;
    const phone =
        basicInfo && basicInfo.phone ? basicInfo.phone : "(123) 456-7890";
    const website =
        basicInfo && basicInfo.website
            ? basicInfo.website
            : "https://example-website.com";
    const data = {
        currentPage: 1,
        style: {
            baseFontSize: 11,
            baseMarginSize: 11,
            baseSectionGap: 11,
            backgroundColor: "#ffffff",
            textColor: "#000000",
            accentBackgroundColor: "#5B7FC5",
            accentTextColor: "white",
        },
        documentName: name,
        jobTitle: job,
        description,
        template: "basic",
        font: "Times-Roman",
        firstName: first,
        lastName: last,
        sectionOrder: [
            [
                "headerBasic",
                "summary",
                "experience",
                "educationDetailed",
                "skillsBullet",
                "languages",
            ],
        ],
        numPages: 1,
        position: "Example Position",
        imageUrl,
        summary:
            "At Example Company, excelled in the role of Example Position, leveraging innovative strategies to drive impactful results. Demonstrated strong leadership and collaboration skills, contributing to the achievement of organizational objectives and fostering team success",
        summaryConfig: {
            fontSizeRatio: 1,
            isBold: false,
            isItalic: false,
            isUnderline: false,
            textColor: "#000000",
            sectionTitle: "Summary",
        },
        skillArray: [
            "Example Long Skill 1.",
            "Example Long Skill 2.",
            "Example Long Skill 3.",
        ],
        experienceArray: newExperienceArray,
        educationArray: newEducationArray,
        languageArray: ["langauge 1", "language 2", "language 3"],
        interestArray: ["interest 1", "interest 2", "interest 3"],
        contactInfo: {
            email,
            phone,
            website,
        },
        projectArray: [
            {
                name: "Example Project Name",
                demo: "https://example-demo-link.com",
                source: "https://example-source-link.com",
                summary: "Example summary.",
                bullets: [
                    "Example bullet 1.",
                    "Example bullet 2.",
                    "Example bullet 3.",
                ],
            },
        ],
        customSectionArray: [],
    };
    return data;
};
