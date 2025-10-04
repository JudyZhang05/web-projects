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
    let hours = date.getHours()
    let ampm = hours >= 12 ? 'PM' : 'AM'
    // Convert to 12-hour format
    hours = hours % 12;
    hours = hours ? hours : 12; // Handle 0 (midnight) as 12

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
    
    // update every minute
    setInterval( () => {
        runTime()
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