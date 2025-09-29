// way we are accessing the window in this class
// using ()=>{} format
window.onload = () => {
    // using constant variable declaration
    // this variable will never change to another element
    const moveDiv = document.getElementById('move')
    
    // getting the first button
    const rotateButton = document.getElementById('rotate')
    const stopButton = document.getElementById('stop')

    const time = document.getElementById('time')

    // this will adjust the angle of my div
    let angle = 0;

    // create a variable to store which interval we want to stop
    let intervalId;

    // adjust the x position variables
    let leftPos = 0;
    let speed = 1;

    // rotate the move div usiong css and js
    rotateButton.addEventListener('click', () => {
        // setInterval takes 2 params:
        // 1. callback function (function that happens when the interval elapses)
        // 2. amount of time before the interval happes again (in ms)
        // 1 second = 1000 milliseconds
        intervalId = setInterval( () => {
            angle++ // increase my moveDiv by 1

            // grab the rotation using the style property
            // moveDiv.style.transform = 'rotate(' + angle + 'deg)'
            // shorthand to inject variables into string
            moveDiv.style.transform = `rotate(${angle}deg)`

            // adding speed to elft pos
            leftPos += speed

            if(leftPos >= window.innerWidth || leftPos < 0){
                speed *= 1
            }
            moveDiv.style.left = leftPos;

        }, 10);
    })

    // make the rect stop moving when button clicked
    stopButton.addEventListener('click', () => {
        clearInterval(intervalId)
    })

    setInterval( () => {
        // get the current broswer/computer time
        let date = new Date()
        console.log('test')

        // % is the remainder, so it allows us to convert 24hr to 12 hour time by using the remainder of 12
        time.textContent = (date.getHours()%12) + ':' + date.getMinutes() + ':' + date.getSeconds()
    }, 1000)
}