# Authentic template previews

These PNGs are browser captures of My Resume Hero's existing template components, not generated artwork or redesigned mock interfaces.

| Asset | Source component |
| --- | --- |
| basic.png | src/features/resume/components/resume-templates/basic/Basic.tsx |
| triumph.png | src/features/resume/components/resume-templates/triumph/Triumph.tsx |
| nova.png | src/features/resume/components/resume-templates/nova/Nova.tsx |
| cover-letter.png | src/features/cover-letter/components/templates/basic/Basic.tsx |

Captured at 610 CSS pixels wide, 2× device scale, using each component's `isPreview` branch and fictional Emma Johnson content based on `sampleResumesArray[0]` in `src/features/authentication/lib/document.ts`. The accent background is #758267, accent text is white, and font is Times-Roman. Resumes include three marketing roles, education, and skills for a balanced single-page preview; the cover letter uses an illustrative application to Example Marketing Studio.

The captures contain no dashboard or editor chrome. Update them by rendering the source templates with a sample document and capturing the document element at the same dimensions. Do not substitute invented UI or stock résumé illustrations.

Static captures deliberately keep the editor's circular barrel imports and PDF renderer out of the public landing page's browser bundle. The template selector switches between these genuine product captures.
