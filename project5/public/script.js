// 1. global variables
let bountyContainer
// let wantedBounties
let inspectContainer

// 2. wait for window to load
window.onload = () => {
    // make sure the element is loaded and exists before using it
    bountyContainer = document.getElementById('bountyContainer')
    // wantedBounties = document.getElementsByClassName('wanted')
    inspectContainer = document.getElementById('inspectBounty')

    // get submitted bounties and place them on bounty board 
    getBounties()

    // inspect an enlargement of the bounty the user clicked
    bountyContainer.addEventListener('click', (e) => {
        // get bounty user clicks on
        let realBounty
        let thisBounty
        if(e.target.id != 'bountyContainer'){
            realBounty = e.target
            thisBounty = e.target.cloneNode(true)
            if(e.target.tagName != 'DIV'){
                realBounty = e.target.parentElement
                thisBounty = e.target.parentElement.cloneNode(true)
                if(!e.target.parentElement.classList.contains('wanted')){
                    realBounty = e.target.parentElement.parentElement
                    thisBounty = e.target.parentElement.parentElement.cloneNode(true)
                }
            }
            
            let acceptBounty = document.createElement('div')
            acceptBounty.textContent = 'ACCEPT'
            acceptBounty.classList.add('acceptBounty')
            
            inspectContainer.appendChild(thisBounty)
            thisBounty.appendChild(acceptBounty)

            thisBounty.classList.add('inspecting')
            thisBounty.style.transform = 'scale(200%) translateY(100px)'
            inspectContainer.style.display = 'flex'

            acceptBounty.addEventListener('click', () => {
                bountyContainer.removeChild(realBounty)
                deleteBounty(realBounty)
            })
        }
    })

    // close inspection container 
    inspectContainer.addEventListener('click', () => {
        inspectContainer.style.display = 'none'
        inspectContainer.removeChild(inspectContainer.firstElementChild)
    })

}

// 3. helper functions
// place all submitted bounties on the bounty board
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

        // puts specific images to specific bounties
        let sketchImg = document.createElement('img')
        if(data.title == 'JOKER'){
            sketchImg.src = './assets/vJ.svg'
        }else if(data.title == 'DR. EGGMAN'){
            sketchImg.src = './assets/vE.svg'
        }else if(data.title == 'DIABLO GATO'){
            sketchImg.src = './assets/vP.svg'
        }else{
            sketchImg.src = './assets/villain.svg'
        }
        sketchImg.classList.add('sketch')
        
        let wantedReward = document.createElement('h3')
        wantedReward.classList.add('gold')
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

// delete bounties from board when user accepts them
async function deleteBounty(thisBounty){
    let res = await fetch('/all-bounties')

    let json = await res.json()
    
    for(let bounty of json.bounty){
        if(bounty.name == thisBounty.querySelector('small').textContent && bounty.title == thisBounty.querySelector('h3').textContent && bounty.reward + ' GOLD' == thisBounty.querySelector('.gold').textContent ){
            console.log('deleting ' + bounty)
        }
    }
}