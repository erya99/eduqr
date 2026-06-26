import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
    return {
        rules: {
            userAgent: "*",
            allow: "/",
            disallow: ["/admin/", "/super-admin/"], // Yönetim panellerini gizle
        },
        sitemap: "https://eduqr.tr/sitemap.xml",
    };
}
