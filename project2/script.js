window.onload = () => {
    const time = document.getElementById('time')
    const today = document.getElementById('today')

    let date = new Date()
    const weekday = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"]

    let month = date.getMonth() < 10 ? `0${date.getMonth()}` : date.getMonth() 
    let day = date.getDate() < 10 ? `0${date.getDate()}` : date.getDate() 

    let hours = date.getHours()
    let ampm = hours >= 12 ? 'PM' : 'AM';
    // Convert to 12-hour format
    hours = hours % 12;
    hours = hours ? hours : 12; // Handle 0 (midnight) as 12

    today.textContent = `${weekday[date.getDay()]} ${month}/${day}`

    let runTime = () => {
        let date = new Date()
        let hour = date.getHours()%12 < 10 ? `0${date.getHours()%12}` : date.getHours()%12
        let minute = date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes()
        time.textContent = `${hour}:${minute} ${ampm}`
    }
    runTime()

    setInterval( () => {
        runTime()
    }, 6000)


}