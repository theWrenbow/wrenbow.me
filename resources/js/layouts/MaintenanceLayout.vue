<script setup lang="ts">
import { Link } from '@inertiajs/vue3';
import AppLogoIcon from '@/components/AppLogoIcon.vue';
import AppLogoType from '@/components/AppLogoType.vue';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import MaintenanceCenteredLayout from '@/layouts/maintenance/MaintenanceCenteredLayout.vue';
import { toUrl } from '@/lib/utils';
import { home } from '@/routes';
import { ButtonItem } from '@/types';

type Props = {
    title?: string;
    heading?: string;
    buttons?: ButtonItem[];
    headingAnimated?: boolean;
};

withDefaults(defineProps<Props>(), {
    heading: () => 'under maintenance',
    buttons: () => [],
    headingAnimated: () => true,
});
</script>
<template>
    <MaintenanceCenteredLayout :title="title">
        <Link
            :href="home()"
            class="flex flex-col items-center gap-2 font-medium pointer-events-none mb-2"
        >
            <div
                class="mb-1 flex h-28 w-28 items-center justify-center rounded-md"
            >
                <AppLogoIcon
                    class="size-28 fill-current text-foreground dark:text-white animate-[spin_8s_linear_infinite]"
                />
            </div>
            <AppLogoType size="xl" />
        </Link>
        <div class="space-y-2 text-center">
            <h1 :class="['text-center text-4xl text-foreground font-bold pointer-events-none', headingAnimated ? 'animate-pulse' : '']">
                {{ heading }}
            </h1>
            <Separator class="my-6" />
            <Button variant="ghost" v-for="item in buttons" :key="toUrl(item.href)" as-child v-show="!item.isHidden">
                <a
                    :href="toUrl(item.href)"
                    :target="item.openInNewTab ? '_blank' : undefined"
                    :rel="item.openInNewTab ? 'noopener noreferrer' : undefined"
                    :class="item.color"
                    v-if="item.openInNewTab"
                >
                    {{ item.title }}
                </a>
                <Link
                    :href="toUrl(item.href)"
                    :target="item.openInNewTab ? '_blank' : undefined"
                    :rel="item.openInNewTab ? 'noopener noreferrer' : undefined"
                    :class="item.color"
                    v-else
                >
                    {{ item.title }}
                </Link>
            </Button>
            <p class="text-sm text-muted-foreground/50 italic absolute bottom-6 left-0 right-0">&copy; 2026 wrenbow media group ltd.</p>
        </div>
        <slot />
    </MaintenanceCenteredLayout>
</template>
