import type { Theme } from "vitepress";
import DefaultTheme from "vitepress/theme";
import { h } from "vue";
import { createPinia } from "pinia";
import piniaPluginPersistedstate from "pinia-plugin-persistedstate";

// import ReloadPrompt from "./components/ReloadPrompt.vue";
import "./tailwind.css";

export default {
    extends: DefaultTheme,
    // Layout() {
    //     return h(DefaultTheme.Layout, null, {
    //         "layout-bottom": () => h(ReloadPrompt),
    //     });
    // },
    enhanceApp({ app, router, siteData }) {
        // ...
        const pinia = createPinia();
        pinia.use(piniaPluginPersistedstate);
        app.use(pinia);
    },
} satisfies Theme;
