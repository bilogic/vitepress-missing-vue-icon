import { withPwa } from "@vite-pwa/vitepress";
import { defineConfig, HeadConfig } from "vitepress";
import { loadEnv } from "vite";
import tailwindcss from "@tailwindcss/vite";
import svgLoader from "vite-svg-loader";
import { generateSidebar } from "vitepress-sidebar";

const env = loadEnv("", process.cwd(), ""); // loads .env
const config = loadEnv("config", process.cwd()); // loads .env.config

config.VITE_PROD_URL = env.VITE_PROD_URL ?? config.VITE_PROD_URL ?? "";
config.VITE_SITE = env.VITE_SITE ?? config.VITE_SITE ?? "";
config.VITE_BASE = env.VITE_BASE ?? config.VITE_BASE ?? "/";
config.VITE_LANG = env.VITE_LANG ?? config.VITE_LANG ?? "en-US";
config.VITE_PWA_NAME = env.VITE_PWA_NAME ?? config.VITE_PWA_NAME ?? "Name";
config.VITE_PWA_DESCRIPTION =
    env.VITE_PWA_DESCRIPTION ?? config.VITE_PWA_DESCRIPTION ?? "Description";
config.VITE_PWA_SHORT_NAME =
    env.VITE_PWA_SHORT_NAME ?? config.VITE_PWA_SHORT_NAME ?? "ShortName";
config.VITE_PWA_IMAGE =
    env.VITE_PWA_IMAGE ?? config.VITE_PWA_IMAGE ?? "/vitepress-og.jpg";
config.VITE_THEME_COLOR =
    env.VITE_THEME_COLOR ?? config.VITE_THEME_COLOR ?? "#c08424";

const APP_ENV = env.APP_ENV;

const vitePressSidebarOptions = {
    title: "VitePress Sidebar",
    documentRootPath: "/docs",
    useTitleFromFrontmatter: true,
    hyphenToSpace: true,
    capitalizeEachWords: true,
    sortMenusByFrontmatterOrder: true,
    useFolderTitleFromIndexFile: true,
};
const gtmHead: string = `
<!-- Google Tag Manager -->
<script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-XXXXXXXX');</script>
<!-- End Google Tag Manager -->
`;

const gtmBody: string = `
<!-- Google Tag Manager (noscript) -->
<noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-XXXXXXXX"
height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>
<!-- End Google Tag Manager (noscript) -->
`;

let final: any = defineConfig({
    sitemap: {
        hostname: config.VITE_PROD_URL,
    },
    vite: {
        logLevel: "info",
        define: {
            __DATE__: `'${new Date().toISOString()}'`,
        },
        plugins: [tailwindcss(), svgLoader()],
        server: {
            port: parseInt(config.VITE_PORT) || 5172,
        },
    },
    cleanUrls: true,
    // for testing purposes
    assetsDir: "./assets",
    lang: config.VITE_LANG,
    title: config.VITE_PWA_NAME,
    description: config.VITE_PWA_DESCRIPTION,
    head: [
        ["meta", { name: "theme-color", content: "#ffffff" }],
        ["link", { rel: "icon", href: "/favicon.svg", type: "image/svg+xml" }],
        ["link", { rel: "alternate icon", href: "/favicon.ico" }],
        [
            "link",
            {
                rel: "mask-icon",
                href: "/favicon.svg",
                color: config.VITE_THEME_COLOR,
            },
        ],
        [
            "meta",
            {
                name: "keywords",
                content: "PWA, VitePress, workbox, Vite, vite-plugin",
            },
        ],
        [
            "link",
            {
                rel: "apple-touch-icon",
                href: "/pwa-192x192.png",
                sizes: "192x192",
            },
        ],
        ["script", {}, `document.documentElement.classList.add('dark')`],
    ],
    appearance: false,
    themeConfig: {
        logo: "/favicon.svg",
        nav: [{ text: "Try", link: "/tool/widget" }],
        sidebar: generateSidebar(
            vitePressSidebarOptions // VitePress Sidebar's options here...
        ),

        footer: {
            copyright: "Copyright  ",
        },
    },
    pwa: {
        mode: "development",
        base: "/",
        scope: "/",
        includeAssets: ["favicon.svg"],
        experimental: {
            includeAllowlist: true,
        },
        manifest: {
            scope: config.VITE_BASE,
            name: config.VITE_PWA_NAME,
            short_name: config.VITE_PWA_SHORT_NAME,
            description: config.VITE_PWA_DESCRIPTION,
            theme_color: config.VITE_THEME_COLOR,
            icons: [
                {
                    src: "pwa-192x192.png",
                    sizes: "192x192",
                    type: "image/png",
                },
                {
                    src: "pwa-512x512.png",
                    sizes: "512x512",
                    type: "image/png",
                },
                {
                    src: "pwa-512x512.png",
                    sizes: "512x512",
                    type: "image/png",
                    purpose: "any maskable",
                },
            ],
        },
        workbox: {
            globPatterns: ["**/*.{css,js,html,svg,png,ico,txt,woff2}"],
        },
        devOptions: {
            enabled: true,
            suppressWarnings: true,
            navigateFallback: "/",
        },
    },
    transformPageData(pageData) {
        const canonicalUrl = `${config.VITE_PROD_URL}/${pageData.relativePath}`
            .replace(/index\.md$/, "")
            .replace(/\.md$/, "");

        pageData.frontmatter.head ??= [];
        pageData.frontmatter.head.push([
            "link",
            { rel: "canonical", href: canonicalUrl },
        ]);
        pageData.frontmatter.head.push([
            "meta",
            {
                name: "og:image",
                content: config.VITE_PWA_IMAGE,
            },
            { name: "og:site_name", content: config.VITE_SITE },
            { name: "og:title", content: `${pageData.title}` },
            { name: "og:description", content: `${pageData.description}` },
        ]);
    },
    transformHtml(html, id, context) {
        console.log("APP_ENV", APP_ENV); // will show during `npm run build`
        if (APP_ENV == "production")
            return html
                .replace("<head>", `<head>${gtmHead}`)
                .replace("<body>", `<body>${gtmBody}`);
    },
});

// final = withPwa(final);

export default final;
