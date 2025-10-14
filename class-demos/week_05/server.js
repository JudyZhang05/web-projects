// import express library
// 1. we always import libraries first
const express = require('express')

// 2. initialize the libraries
const app = express()

// 3. middleware
// stuff that happens between initialization and app listen
app.use(express.static('assets'))

// 3a. global variables for server storage
let allNotes = []

// 4. routing
// this determines what responses the server gives based on the requests that comes in
app.get('/', (req, res) => {
    res.send('server is working')
})

// app.get('/guestbook', (res, req) => {
//     res.sendFile(Path2D.join(__dirname, 'assets/guestbook.html'))
// })

app.get('/submit', (req, res) => {
    console.log(req.query)
    
    // local variables
    let user = req.query.guest  // grabs guest from the form data name='guest'
    let message = req.query.note    // grabs the note from the form data name='note'
    let time = Date(Date.now()).toLocaleString()    // creates a new date string at the now time

    // creates a new object, storing all of the new variable data inside of properties
    const messageData = {
        username: user,
        message: message,
        date: time
    }
    
    allNotes.push(messageData)

    // res.send('thank you for submitting, ' + user)
    res.redirect('/')
})

app.get('/all-messages', (req, res) => {
    let messageString = ''  // creates local variable string to use to send to client

    // use a loop to go through the entire notes array
    // short hand for a regular for loop; useful for arrays of objects https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/for...of
    for(let n of allNotes){
        messageString += '<h3>' + n.username + '</h3>' + 'says' + n.message + '\n'
    }

    // res.send(messageString)
    // we are no longer sending a string, we are now sending a json object
    // it is cumbersome to have to write html as a string
    res.json({notes: allNotes})
})

// 5. set the app to listen to requests
// ALWAYS GOES LAST
app.listen(3001, () => {
    console.log('server running on http://127.0.0.1:3001/')
})
