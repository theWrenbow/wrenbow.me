<script setup lang="ts">
import type { HTMLAttributes } from 'vue';

defineOptions({
    inheritAttrs: false,
});

interface Props {
    className?: HTMLAttributes['class'];
}

defineProps<Props>();
</script>

<template>
    <img
        src="/images/brand/wrenbow_avatar-round@400px.webp"
        alt="𝚠𝚛𝚎𝚗𝚋𝚘𝚠🌈🕊️"
        :class="[ className + ' pointer-events-none select-none']"
        v-bind="$attrs"
    />
</template>
