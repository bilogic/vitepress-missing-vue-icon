<template>
    <template v-if="offlineReady || needRefresh">
        <div class="pwa-toast" role="alertdialog" aria-labelledby="pwa-message">
            <div id="pwa-message" class="mb-3">
                {{
                    offlineReady ? "App ready to work offline" : "Updates found"
                }}
            </div>
            <button
                v-if="needRefresh"
                type="button"
                class="pwa-refresh"
                @click="
                    updateServiceWorker?.();
                    close();
                "
            >
                Reload
            </button>
            <button type="button" class="pwa-cancel" @click="close">
                {{ offlineReady ? "OK" : "Later" }}
            </button>
        </div>
    </template>
</template>

<script setup lang="ts">
import { onBeforeMount, ref } from "vue";

const offlineReady = ref(false);
const needRefresh = ref(false);

let updateServiceWorker: (() => Promise<void>) | undefined;

function onOfflineReady() {
    offlineReady.value = true;
}
function onNeedRefresh() {
    needRefresh.value = true;
}
async function close() {
    offlineReady.value = false;
    needRefresh.value = false;
}

onBeforeMount(async () => {
    const { registerSW } = await import("virtual:pwa-register");
    updateServiceWorker = registerSW({
        immediate: true,
        onOfflineReady,
        onNeedRefresh,
        onRegisteredSW() {
            // eslint-disable-next-line no-console
            console.info("Service Worker registered");
        },
        onRegisterError(e) {
            console.error("Service Worker registration error!", e);
        },
    });
});
</script>

<style>
.pwa-toast {
    position: fixed;
    right: 0;
    top: 0;
    margin: 16px;
    padding: 12px;
    border: 1px solid #8885;
    border-radius: 4px;
    z-index: 100;
    text-align: left;
    box-shadow: 3px 4px 5px 0 #8885;
    background-color: var(--color-primary-500);
}
.pwa-toast #pwa-message {
    margin-bottom: 8px;
}
.pwa-toast button {
    border: 1px solid #8885;
    outline: none;
    margin-right: 5px;
    border-radius: 2px;
    padding: 3px 10px;
}
</style>
