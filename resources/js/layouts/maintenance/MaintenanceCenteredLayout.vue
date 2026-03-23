<script setup lang="ts">
type Props = {
    heading?: string;
    buttons?: ButtonItem[];
};

withDefaults(defineProps<Props>(), {
    heading: () => 'under maintenance',
    buttons: () => [],
});
</script>
<template>
    <main class="flex min-h-svh flex-col items-center justify-center gap-6 bg-background p-6 md:p-10 select-none font-mono">
        <div class="w-full max-w-sm">
            <div class="flex flex-col gap-8">
                <div class="flex flex-col items-center gap-4">
                    <slot />
                </div>
            </div>
        </div>
    </main>
</template>
