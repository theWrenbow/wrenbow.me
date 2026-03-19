<script setup lang="ts">
// import { defineComponent, h } from 'vue';
import AppLogoIcon from '@/components/AppLogoIcon.vue';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { toUrl } from '@/lib/utils';
import { home } from '@/routes';
import { Twitch, YouTube, BlueSky, Linktree } from '@/routes/Socials';

const socialLinks = [
    {
        title: "twitch",
        href: Twitch().url,
        color: "text-twitch hover:text-twitch/75",
    },
    {
        title: "youtube",
        href: YouTube().url,
        color: "text-youtube hover:text-youtube/75",
    },
    {
        title: "bluesky",
        href: BlueSky().url,
        color: "text-bluesky hover:text-bluesky/75",
    },
    {
        title: "linktree",
        href: Linktree().url,
        color: "text-linktree hover:text-linktree/75",
    },
];
</script>
<template>
    <main class="flex min-h-svh flex-col items-center justify-center gap-6 bg-background p-6 md:p-10 select-none font-mono">
        <div class="w-full max-w-sm">
            <div class="flex flex-col gap-8">
                <div class="flex flex-col items-center gap-4">
                    <Link
                        :href="home()"
                        class="flex flex-col items-center gap-2 font-medium pointer-events-none"
                    >
                        <div
                            class="mb-1 flex h-32 w-32 items-center justify-center rounded-md"
                        >
                            <AppLogoIcon
                                class="size-32 fill-current text-[var(--foreground)] dark:text-white animate-[spin_8s_linear_infinite]"
                            />
                        </div>
                        <span class="sr-only">wrenbow</span>
                        <h3 class="text-xl font-semibold"><span class="bg-gradient-to-r from-wren-accent to-wren-main bg-clip-text text-transparent">𝚠𝚛𝚎𝚗𝚋𝚘𝚠</span><span class="text-muted-foreground">🌈🕊️</span></h3>
                    </Link>
                    <div class="space-y-2 text-center">
                        <h1 class="text-center text-4xl text-foreground font-bold pointer-events-none animate-pulse">
                            coming soon
                        </h1>
                        <Separator class="my-6" />
                        <Button variant="ghost" v-for="item in socialLinks" :key="toUrl(item.href)" as-child>
                            <a
                                :href="toUrl(item.href)"
                                target="_blank"
                                rel="noopener noreferrer"
                                :class="item.color"
                            >
                                {{ item.title }}
                            </a>
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    </main>
</template>
