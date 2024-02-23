import { formatDateMonthYear, sortObjectArrayByDateEnd } from "@/lib/date";

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
                      summary: "Example summary.",
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
                      summary: "Example summary.",
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
        documentName: name,
        jobTitle: job,
        description,
        template: "basic",
        font: "Times-Roman",
        firstName: first,
        lastName: last,
        sectionOrder: [
            [
                "name",
                "position",
                "contactEmailPhoneWebsite",
                "summary",
                "experience",
                "education",
                "skills",
                "languages",
            ],
        ],
        numPages: 1,
        position: "Example Position",
        imageUrl,
        summary: "Example summary.",
        skillArray: [
            "Example Long Skill 1.",
            "Example Long Skill 2.",
            "Example Long Skill 3.",
        ],
        shortSkillArray: ["Skill 1", "Skill 2", "Skill 3"],
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
