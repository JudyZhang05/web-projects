// import express library
// 1. we always import libraries first
const express = require('express')

// 2. initialize the libraries
const app = express()

// 3. middleware
// stuff that happens between initialization and app listen
app.use(express.static('public'))

// 3a. global variables for server storage
let allBounties = []

// 4. routing
// this determines what responses the server gives based on the requests that comes in
app.get('/', (res, req) => {
    req.sendFile('tavern.html', {root:'public'})
})

app.get('/submit', (req, res) => {
    console.log(req.query)

    const bounty = {
        name: req.query.bountyName[0].toUpperCase() + req.query.bountyName.slice(1)
        ,title: req.query.bountyTitle.toUpperCase()
        ,reward: req.query.reward
    }

    allBounties.push(bounty)

    res.redirect('/')
})

app.get('/all-bounties', (req, res) => {
    res.json({bounty: allBounties})
})

// app.delete('/', (req, res) => {
// })

// 5. set the app to listen to requests
// ALWAYS GOES LAST
app.listen(2518, () => {
    console.log('server running on http://127.0.0.1:2518/')
})
