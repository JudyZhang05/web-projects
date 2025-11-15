<script setup>
// https://vuejs.org/guide/essentials/forms
import {ref} from 'vue';

const userInput = ref('');

// deleting first child of the upper div
let deleteFirstChild = () => {
    if(wordLength.firstElementChild){
        wordLength.removeChild(wordLength.firstElementChild)
    }
}

// declaring setInterval
let wordClear = setInterval(deleteFirstChild, 3000)
setInterval(deleteFirstChild, 3000)

// words get inserted into upper div
const typeActive = (e) => {

    // detect space or Enter key
    if(e.key == ' ' || e.key == 'Enter'){
        let newL = document.createElement('p')
        newL.textContent = userInput.value
        userInput.value = null

        wordLength.appendChild(newL)
    }
    
    // The more the users input the faster their response gets deleted
    if(wordLength.clientWidth >= wordBank.clientWidth-500){
        clearInterval(wordClear);
        wordClear = setInterval(deleteFirstChild, 100)
    }else{
        clearInterval(wordClear);
        wordClear = setInterval(deleteFirstChild, 3000)
    }
}

// declaring text phrase variables
let thisLetter = ref(0) 
let voidReplies = {1:'If you gaze long into an abyss, the abyss also gazes into you.', 2:'Hello darkness, my old friend! I\'ve come to talk with you again.', 3:'There is the darkness that frightens, the darkness that soothes, the darkness that is restful.', 4:'Don\'t linger too long in the darkness, lest it consumes you.', 5:'Speak your mind, your truth, and your tale. Only the void will hear it anyways.',6:'Thank you for feeding me your thoughts.'}

// incrementing through a "random" dictionary string to div element
let writing = (randomReply) => {
    // adding string
    reply.textContent += randomReply.value[thisLetter.value]
    thisLetter.value++
    if(reply.textContent == randomReply.value){
        clearInterval(displayReply)
        // removing string
        setTimeout(() => {
            displayReply = setInterval(() => {
                reply.textContent = randomReply.value.slice(0,-(randomReply.value.length - thisLetter.value)-1)
                thisLetter.value--
                if(thisLetter.value == 0){
                    clearInterval(displayReply)
                }
            },100)
        },10000)
    }
}

// declaring/setting up the first "random" phrase
let randomNum = ref(Math.floor(Math.random() * 6)+1)
let randomReply = ref(voidReplies[randomNum.value])
let displayReply = setInterval(() => {writing(randomReply)},100)

// cycle through dictionary phrases and recall phrase incrementation 
let writeReply = () => {
    randomNum = ref(Math.floor(Math.random() * 6)+1)
    randomReply = ref(voidReplies[randomNum.value])
    displayReply = setInterval(() => {writing(randomReply)},100)
}
setInterval(writeReply, 30000)

</script>

<template>
    <div class="theTalk">
        <div class="backDrop">
            <div class="candle">
                <div class="light"></div>
            </div>
            <img src="../public/justTalk.svg" class="moveIt"/>
            <div class="candle2">
                <div class="light2"></div>
            </div>
        </div>
        <small id="reply"></small>
        <div class="interaction">
            <div id="wordBank">
                <div id="wordLength"></div>
            </div>
            <input v-model="userInput" @keydown="typeActive" autofocus placeholder="Talk to the void..." id="inputed"/>
        </div>
        
    </div>
    
</template>

<style scoped>
p{
    margin: 0;
}
small{
    color: #4c5265;
    font-weight: bold;
    font-size: 1.3rem;
    font-family: "Annie Use Your Telescope";
}

#reply{
    border-right: solid #4c5265 2px;
    animation: blink .8s infinite;
    height: 30px;
}@keyframes blink{
    0% {border-right: solid #4c5265 2px;}
    100% {border-right: solid #232a3b00 2px;}
}


.backDrop{
    display: flex;
    justify-content: space-between;
    background-image: url('https://img1.picmix.com/output/stamp/normal/2/0/7/3/2553702_82426.gif');
    background-repeat: no-repeat;
    background-size: cover; 
    border-radius: 100%;
}

.light{
    background: rgba(206, 152, 139, 0.24);
    width: 200px;
    height: 200px;
    transform: translateY(-50px);
    border-radius: 100%;
    animation: flicker 2s infinite;
}
.candle{
    background-image: url('../public/candel.svg');
    position: fixed;
    background-size: contain;
    background-repeat: no-repeat;
    width: 300px;
    height: 400px;
    top: 140px;
    left: -50px;
    z-index: 100;
    
    display: flex;
    justify-content: center;
}
@keyframes flicker{
    0%{opacity: 40%}
    10%{opacity: 10%}
    50%{opacity: 60%}
    90%{opacity: 20%}
    100%{opacity: 40%}
}
.light2{
    background: rgba(206, 152, 139, 0.24);
    width: 200px;
    height: 200px;
    transform: translate(-5px,-50px);
    border-radius: 100%;
    animation: flicker 2s infinite;
}
.candle2{
    background-image: url('../public/candel.svg');
    position: fixed;
    background-size: contain;
    background-repeat: no-repeat;
    width: 300px;
    height: 400px;
    top: 140px;
    right: -50px;
    z-index: 100;
    
    display: flex;
    justify-content: center;
}

.theTalk{
    background-size: cover;
    background-repeat: no-repeat;
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    align-items: center;
}

.moveIt{
    width: 60vh;
    animation: stagger 10s infinite;
    user-select: none;
}
@keyframes stagger{
    0%{transform: translate(-100px,20px)}
    20%{transform: translate(-90px,-20px)}
    50%{transform: translate(-108px,10px)}
    70%{transform: translate(-94px,-12px)}
    100%{transform: translate(-100px,20px)}
}

#wordBank{
    background-color: rgba(0, 0, 0, 0.26);
    background-image: url('https://img1.picmix.com/output/stamp/normal/4/0/7/3/2553704_54735.gif');
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
    margin-left: 1%;
    margin-right: 1%;
    height: 15vh;
    width: 80vw;
    padding: 2%;
    z-index: 1;
    display: flex;
    align-items: center;

    /* cool borders -> https://css-shape.com/wiggly-box */
    --s: 20px;  
    --w: 500px; 
    border: calc(1*var(--s)) solid #0000;
    mask: 
    conic-gradient(#000 0 0) no-repeat 50%/calc(100% - 6*var(--s)) calc(100% - 6*var(--s)),
    radial-gradient(var(--s),#000 100%,#0000 calc(100% + 1px)) 0 0/calc(4*var(--s)) calc(4*var(--s)),
    radial-gradient(var(--s),#0000 calc(100% - 1px),#000) var(--s) var(--s)/calc(2*var(--s)) calc(2*var(--s)) padding-box;

}#wordLength{
    display: flex;
    flex-wrap: wrap;
    overflow-x: hidden;
    align-items: center;
    column-gap: 5px;
    row-gap: 15px;
    padding-left: 20px;
    width: fit-content;
    height: inherit;
}

input{
    all: unset;
    margin-top: 10px;
    z-index: 1;
    background-color: black;
    justify-self: center;
    text-align: center;
    height: 50px;
    width: 500px;
}

.interaction{
    display: flex;
    flex-direction: column;
    align-items: center;
}

</style>
