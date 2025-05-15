// ./postcss.config.mjs
// required when running `npm run build` to render tailwind correctly

import { postcssIsolateStyles } from 'vitepress'

export default {
    plugins: [
        postcssIsolateStyles({
            includeFiles: [/vp-doc\.css/, /base\.css/]
        })
    ]
}