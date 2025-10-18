// import express library
// 1. we always import libraries first
const express = require('express')

// 2. initialize the libraries
const app = express()

// 3. middleware
// stuff that happens between initialization and app listen
app.use(express.static('assets'))

// 3a. global variables for server storage

// 4. routing
// this determines what responses the server gives based on the requests that comes in
app.get('/', (req, res) => {
    res.send('server works')
})

app.get('/submit', (req, res) => {
    console.log(req.query)

    res.redirect('/')
})

// 5. set the app to listen to requests
// ALWAYS GOES LAST
app.listen(3001, () => {
    console.log('server running on http://127.0.0.1:3001/')
})
