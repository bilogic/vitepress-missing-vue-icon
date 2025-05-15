---
layout: home
title: Widget
description: Test
---

# Vue Component
---

1. Make sure to be using `npm run build` and icon is using `vitepress.svg`
2. Navigate to this URL [/tool/widget](/tool/widget)
3. Click on Hide, then Show, but icon can hide, but cannot show again
4. Problem does not occure if using `npm run dev`
5. If icon is changed to use `trash.svg` in `Component.vue`, issue does not happen for `npm run build`

:::raw
<Component />
:::
 
<script setup lang="ts">
    import Component from '../../widgets/Component.vue'
</script>
