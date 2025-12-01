// import express library
// 1. we always import libraries first
const express = require('express')
// const parser = require('body-parser')
// const multer = require('multer')
// const nedb = require('@seald-io/nedb')

// setup configurations for libraries
// const encodedParser = parser.urlencoded({extended:true})
// const uploadProcessor = multer({dest:'public/upload'})
// added database variable to keep track of the database file
// let database = new nedb({
//     filename: 'database.txt',
//     autoload: true
// })


// 2. initialize the libraries
const app = express()


// 3. middleware
// stuff that happens between initialization and app listen
app.use(express.static('public'))
// app.use(encodedParser)
// tells the app to be ready to revieve json data
// app.use(parser.json())

// 3a. global variables for server storage
let allBounties = []

// 4. routing
// this determines what responses the server gives based on the requests that comes in
app.get('/', (res, req) => {
    req.sendFile('tavern.html', {root:'public'})
})

app.get('/submit', (req, res) => {
    const bounty = {
        name: req.query.bountyName[0].toUpperCase() + req.query.bountyName.slice(1)
        ,title: req.query.bountyTitle.toUpperCase()
        ,reward: req.query.reward
    }

    allBounties.unshift(bounty)

    res.redirect('/')
})

app.get('/all-bounties', (req, res) => {
    res.json({bounty: allBounties})
})

// IMG UPLOAD
// app.post('/upload', uploadProcessor.single('imgUpload'), (req, res) => {
    
//     console.log(req.body)

    // creates an object that keeps track of the time using the Date class from the MDN documentation
    // const currentTime = new Date(Date.now())

    // console.log(currentTime)

    // let data = {
    //     postText: req.body.text
    //     ,postTime: currentTime.toLocaleString()
    //     ,postTimestamp: currentTime
    // }

    // // 2 params for insert
    // // 1. darta to be added
    // // 2. callback for after the data has been added
    // database.insert(data, (err, dataToBeAdded) => {
    //     if (err){
    //         res.redirect('/')
    //     }else{
    //         console.log(dataToBeAdded)
    //         res.redirect('/')
    //     }
    // })
    
    // this line is now redundant because we need to redirect after the data has been added
    // res.redirect('/')
// })

// 5. set the app to listen to requests
// ALWAYS GOES LAST
app.listen(8152, () => {
    console.log('server running on http://127.0.0.1:8152/')
})
