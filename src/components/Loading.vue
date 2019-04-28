<template>
  <div/>
</template>

<script>
export default {
  name: 'Loading',
}
</script>
<style scoped>
@keyframes loading {
    0% {
        content: '.';
    }
    33% {
        content: '..';
    }
    66% {
        content: '...';
    }
    100% {
        content: '.';
    }
}
div {
    position: absolute;
    top: calc(50% - 70px);
    left: 50%;
    transform: translate(-50%, -50%);
}
div:after {
    content: '.';
    font-size: 3rem;
    animation: loading 2s linear infinite;
}
</style>
