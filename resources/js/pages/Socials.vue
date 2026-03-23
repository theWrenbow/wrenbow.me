<script setup lang="ts">
import { Link } from '@inertiajs/vue3';
import { Button } from '@/components/ui/button';
import MaintenanceLayout from '@/layouts/MaintenanceLayout.vue';
import { toUrl } from '@/lib/utils';
import { home } from '@/routes';
import { Twitch, YouTube, BlueSky, Linktree, GitHub, Patreon } from '@/routes/Socials';

const buttons = [
    {
        title: "🦋 bluesky",
        href: BlueSky().url,
        color: "text-bluesky hover:text-bluesky/75",
        openInNewTab: true,
    },
    {
        title: "🐱 github",
        href: GitHub().url,
        color: "text-github hover:text-github/75",
        openInNewTab: true,
    },
    {
        title: "🅿️ patreon",
        href: Patreon().url,
        color: "text-patreon hover:text-patreon/75",
        openInNewTab: true,
    },
    {
        title: "🌳 linktree",
        href: Linktree().url,
        color: "text-linktree hover:text-linktree/75",
        openInNewTab: true,
    },
    {
        title: "🟣 twitch",
        href: Twitch().url,
        color: "text-twitch hover:text-twitch/75",
        openInNewTab: true,
    },
    {
        title: "📺 youtube",
        href: YouTube().url,
        color: "text-youtube hover:text-youtube/75",
        openInNewTab: true,
    },
];
</script>
<template>
    <MaintenanceLayout title="socials" :buttons="buttons" heading="my socials" :headingAnimated="false">
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
