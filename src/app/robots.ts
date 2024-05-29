import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
    return {
        rules: {
            userAgent: "*",
            allow: "/",
            disallow: [
                "/dashboard",
                "/editor",
                "/email-verification",
                "/password-reset",
            ],
        },
        sitemap: "https://myresumehero.com/sitemap.xml",
    };
}
