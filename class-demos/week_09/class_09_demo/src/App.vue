<script setup>
// this is javascript code
// imports tell the library to pull something specific to vue
import { onMounted } from 'vue';
import myButton from './myButton.vue';

// https://vuejs.org/guide/essentials/lifecycle.html
// onMounted is similar to window.onload
onMounted(() => {
  console.log('the component has been added to the DOM')
})

</script>

<template>
  <!-- this is html code -->
  <myButton/>
</template>

<style scoped>
/* this is css code */
button{
  border: 2px solid cyan;
}

</style>
