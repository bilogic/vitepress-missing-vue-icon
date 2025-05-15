<template>
    <a href="#" @click="show = false">Hide</a> |
    <a href="#" @click="show = true">Show</a>
    <div class="border border-red-500">
        <Icon class="w-4" v-if="show" />
    </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import Icon from "./assets/vitepress.svg"; // this icon is bad
// import Icon from "./assets/trash.svg"; // this icon is good
const show: boolean = ref<boolean>(true);
</script>

<style scoped>
header {
    line-height: 1.5;
}

.logo {
    display: block;
    margin: 0 auto 2rem;
}

@media (min-width: 1024px) {
    header {
        display: flex;
        place-items: center;
        padding-right: calc(var(--section-gap) / 2);
    }

    .logo {
        margin: 0 2rem 0 0;
    }

    header .wrapper {
        display: flex;
        place-items: flex-start;
        flex-wrap: wrap;
    }
}

.button {
    margin-top: 35px;
}

.flip-list-move {
    transition: transform 0.5s;
}

.no-move {
    transition: transform 0s;
}

.ghost {
    opacity: 0.5;
    background: #c8ebfb;
}

.list-group {
    min-height: 20px;
}

.list-group-item i {
    cursor: pointer;
}
</style>
