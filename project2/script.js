window.onload = () => {
    // declaring variables
    const time = document.getElementById('time')
    const today = document.getElementById('today')
    const point = document.querySelectorAll('.point')

    // date and time
    let date = new Date()

    // day of the week
    const weekday = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"]
    // single line if statements for formating month and day digits to be 00 format
    let month = date.getMonth()+1 < 10 ? `0${date.getMonth()}` : date.getMonth()+1  //plus 1 bc getMonth is zero indexed
    let day = date.getDate() < 10 ? `0${date.getDate()}` : date.getDate() 

    // AM and PM
    let ampm = date.toLocaleString('en-US' ,{hour: 'numeric', hour12:true}).slice(2)

    today.textContent = `${weekday[date.getDay()]} ${month}/${day}`

    // turning date into a function so that I can call it later
    let runTime = () => {
        let date = new Date()
        let hour = date.getHours()%12 < 10 ? `0${date.getHours()%12}` : date.getHours()%12
        hour = date.getHours() != 12 ? date.getHours()%12 : date.getHours()
        let minute = date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes()
        time.textContent = `${hour}:${minute} ${ampm}`
    }
    runTime()
    
    
    // leaf
    const leaf1 = document.querySelector('.l1')
    const leaf2 = document.querySelector('.l2')
    const leaf3 = document.querySelector('.l3')

    const leaves = ['./assets/oldleaf.svg', './assets/leaf.svg', './assets/newleaf.svg']
    
    // update every 6 secs
    setInterval( () => {
        runTime()

        // leaf changes every 6 secs
        leaf1.src = leaves[Math.floor(Math.random()*3)]
        leaf2.src = leaves[Math.floor(Math.random()*3)]
        leaf3.src = leaves[Math.floor(Math.random()*3)]
    }, 6000)

    // hover effect for crossing and uncrossing out tasks lists
    point.forEach(item => {
        item.addEventListener('mouseover', () => {
            if(item.classList.length > 1){
                item.classList.remove('cross')
            }else{
                item.classList.add('cross')
            }
        })
    });


}