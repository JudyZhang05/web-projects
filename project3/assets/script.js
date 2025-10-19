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
        let wantedTitle = document.createElement('h3')
        wantedTitle.textContent = data.title 
        let wantedName = document.createElement('small')
        wantedName.textContent = data.name

        // puts specific images to specific 
        let sketchImg = document.createElement('img')
        if(data.title == 'THE JOKER'){
            sketchImg.src = './public/vJ.svg'
        }else if(data.title == 'DR. EGGMAN'){
            sketchImg.src = './public/vE.svg'
        }else if(data.title == 'DIABLO GATO'){
            sketchImg.src = './public/vP.svg'
        }else{
            sketchImg.src = './public/villain.svg'
        }
        sketchImg.classList.add('sketch')
        
        let wantedReward = document.createElement('h3')
        wantedReward.textContent = `${data.reward} GOLD` 

        newDiv.appendChild(wantedLabel)
        newDiv2.appendChild(wantedTitle)
        newDiv2.appendChild(wantedName)
        newDiv.appendChild(newDiv2)
        newDiv.appendChild(sketchImg)
        newDiv.appendChild(wantedReward)

        // if random number is even rotate to the left otherwise rotate to the right
        newDiv.style.transform =  Math.floor(Math.random() * 10)%2 == 0 ? `translateY(${Math.floor(Math.random() * 5)}px) rotate(-${Math.floor(Math.random() * 10)}deg)` : `translateY(${Math.floor(Math.random() * 5)}px) rotate(${Math.floor(Math.random() * 10)}deg)`

        bountyContainer.appendChild(newDiv)
    }

}