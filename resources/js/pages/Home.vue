<script setup lang="ts">
import { Link } from '@inertiajs/vue3';
import { Button } from '@/components/ui/button';
import MaintenanceLayout from '@/layouts/MaintenanceLayout.vue';
import { toUrl } from '@/lib/utils';
import { home, Socials, AimbowMethod } from '@/routes';

const buttons = [
    {
        title: "🐦 socials",
        href: Socials().url,
    },
    {
        title: "🎯 aimbow method",
        color: "text-cyan-500 hover:text-cyan-600",
        href: AimbowMethod().url,
    },
];
</script>
<template>
    <MaintenanceLayout :buttons="buttons" heading="coming soon">
    </MaintenanceLayout>
</template>
