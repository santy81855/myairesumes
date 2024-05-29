/** @type {import('next-sitemap').IConfig} */
module.exports = {
    siteUrl: 'https://myresumehero.com',
    generateRobotsTxt: true,
    sitemapSize: 5000,
    changefreq: 'daily',
    priority: 0.7,
    exclude: ['/password-reset', '/email-verification', '/editor'],
    robotsTxtOptions: {
        policies: [
            { userAgent: '*', allow: '/', disallow: ['/password-reset', '/email-verification', '/editor'] },
        ],
    },
};
