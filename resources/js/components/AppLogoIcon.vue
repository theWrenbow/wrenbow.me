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
        src="/images/wrenbow_avatar-small_rounded@400px.png"
        alt="𝚠𝚛𝚎𝚗𝚋𝚘𝚠🌈🕊️"
        :class="[ className + ' pointer-events-none select-none']"
        v-bind="$attrs"
    />
</template>
