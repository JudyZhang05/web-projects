// import express library
// 1. we always import libraries first
const express = require('express')
const parser = require('body-parser')
const multer = require('multer')

// setup configurations for libraries
const encodedParser = parser.urlencoded({extended:true})
const uploadProcessor = multer({dest:'public/upload/'})


// 2. initialize the libraries
const app = express()


// 3. middleware
// stuff that happens between initialization and app listen
app.use(express.static('public'))
app.use(encodedParser)
// tells the app to be ready to revieve json data
app.use(parser.json())

// 3a. global variables for server storage
let allBounties = []
let bountyNum = 0


// 4. routing
// this determines what responses the server gives based on the requests that comes in
app.get('/', (res, req) => {
    req.sendFile('tavern.html', {root:'public'})
})

// NEW
app.post('/upload', uploadProcessor.single('sketchImg'), (req, res) => {
    console.log(req.body)

    // post requests store data coming in from the request body
    // console.log(req.body.bountyName[0].toUpperCase() + req.body.bountyName.slice(1))
    let bounty = {
        name: req.body.bountyName[0].toUpperCase() + req.body.bountyName.slice(1)
        ,title: req.body.bountyTitle.toUpperCase()
        ,reward: req.body.reward
        ,bountyNumber: bountyNum
    }
    
    if(req.file){
        bounty.imgSrc = '/upload/' + req.file.filename
    }

    // adding individual post data to global data array
    // .push adds to the end of the arry
    // .unshift adds to the beginning of the array
    allBounties.unshift(bounty)

    // incrementing the post number 
    bountyNum++

    // once we have stored the data, refresh back to home page
    res.redirect('/')
})


// OLD
// app.get('/submit', (req, res) => {
//     const bounty = {
//         name: req.query.bountyName[0].toUpperCase() + req.query.bountyName.slice(1)
//         ,title: req.query.bountyTitle.toUpperCase()
//         ,reward: req.query.reward
//     }

//     allBounties.unshift(bounty)

//     res.redirect('/')
// })


app.get('/all-bounties', (req, res) => {
    res.json({bounty: allBounties})
})

// 5. set the app to listen to requests
// ALWAYS GOES LAST
app.listen(8152, () => {
    console.log('server running on http://127.0.0.1:8152/')
})
