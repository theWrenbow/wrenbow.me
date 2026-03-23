<script setup lang="ts">
import { Link } from '@inertiajs/vue3';
import { Button } from '@/components/ui/button';
import MaintenanceLayout from '@/layouts/MaintenanceLayout.vue';
import { toUrl } from '@/lib/utils';
import { home } from '@/routes';
import { AimbowMethodAimlabs, AimbowMethodV2Aimlabs } from '@/routes/AimRoutine';

const buttons = [
    {
        title: "🎯 aimbow method warmup (aimlabs)",
        href: AimbowMethodAimlabs().url,
        color: "text-cyan-500 hover:text-cyan-600",
        openInNewTab: true,
    },
    {
        title: '✨ aimbow method 2.0 warmup (aimlabs)',
        href: AimbowMethodV2Aimlabs().url,
        color: "text-sky-500 hover:text-sky-600",
        openInNewTab: true,
    },
];
</script>
<template>
    <MaintenanceLayout title="the aimbow method&trade;" :buttons="buttons" heading="aimbow method" :headingAnimated="false">
        <Button variant="ghost" as-child>
            <Link
                :href="toUrl(home().url)"
                class="text-foreground hover:text-foreground/75"
            >
                &larr; home
            </Link>
        </Button>
    </MaintenanceLayout>
</template>
