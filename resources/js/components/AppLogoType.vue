<script setup lang="ts">
import type { HTMLAttributes } from 'vue';

defineOptions({
    inheritAttrs: false,
});

interface Props {
    className?: HTMLAttributes['class'];
    color?: HTMLAttributes['class'];
    size?: string;
    weight?: string;
}

defineProps<Props>();
</script>
<template>
    <h3 :class="[className, size ? ' text-'+size : ' text-xl', weight ? 'font-'+weight : 'font-semibold']" v-bind="$attrs">
        <span class="sr-only">wrenbow</span>
        <span :class="[color ? color : 'bg-linear-to-r from-wren-accent to-wren-main bg-clip-text text-transparent']">𝚠𝚛𝚎𝚗𝚋𝚘𝚠</span>
        <span :class="[color ? color : 'text-muted-foreground']">🌈🕊️</span>
    </h3>
</template>
