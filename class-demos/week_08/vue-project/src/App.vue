<script setup>
  import {ref, onMounted } from "vue"

  const myVariable = ref('hi')

  const greetings = () => {
    console.log('hi')
  }

  onMounted ( () => {
    console.log(document.getElementById('blue-paragraph'))
  })

</script>

<template>
  <button @click="greetings"> {{myVariable}} </button>
  <h1>You did it!</h1>
  <p id='blue-paragraph'>
    Visit <a href="https://vuejs.org/" target="_blank" rel="noopener">vuejs.org</a> to read the
    documentation
  </p>
  <p>
    now i have some text in here
  </p>
</template>

<style scoped></style>
