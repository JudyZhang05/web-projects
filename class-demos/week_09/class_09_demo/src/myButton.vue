<script setup>
import {ref} from 'vue'

// declare a variable in vue using ref()
// this is a number equal to 0
let numClicks = ref(0)

const buttonClick = () => {
  console.log('click detected')
  // .value needs to be used in order to access the value of the variable in the <script>
  numClicks.value++
}
</script>

<template>
    <button @click="buttonClick">click me</button>

    <div>
        number of clicks {{ numClicks }}
    </div>
</template>

<style scoped>
</style>
