<template>
    <span>{{ msg }}</span>
</template>

<script setup>
const props = defineProps({
    msg: String
})
</script>