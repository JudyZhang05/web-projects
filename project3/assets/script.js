// 1. global variables
let bountyContainer

// 2. wait for window to load
window.onload = () => {
    // make sure the element is loaded and exists before using it
    bountyContainer = document.getElementById('bountyContainer')

    getBounties()
}

// 3. helper functions
// async means we can use fetch
// async needs an "await" pair
async function getBounties() {
    let res = await fetch('/all-bounties')

    let json = await res.json()

    for(let data of json.bounty){
        let newDiv = document.createElement('div')
        newDiv.classList.add('wanted')
        let wantedLabel = document.createElement('h1')
        wantedLabel.textContent = 'WANTED'
        let newDiv2 = document.createElement('div')
        let wantedName = document.createElement('h3')
        wantedName.textContent = data.name
        let wantedTitle = document.createElement('small')
        wantedTitle.textContent = data.title 
        
        // img placeholder
        let imgp = document.createElement('div')
        imgp.classList.add('placeholder-img')
        
        let wantedReward = document.createElement('h3')
        wantedReward.textContent = `${data.reward} GOLD` 

        newDiv.appendChild(wantedLabel)
        newDiv2.appendChild(wantedName)
        newDiv2.appendChild(wantedTitle)
        newDiv.appendChild(newDiv2)
        newDiv.appendChild(imgp)
        newDiv.appendChild(wantedReward)

        bountyContainer.appendChild(newDiv)
    }
}