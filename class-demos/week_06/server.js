// npm install express body-parser multer

// import libraries
const express = require('express')
const parser = require('body-parser')
const urlEncoded = parser.urlencoded({extended:true})
const multer = require('multer')
const uploadProcessor = multer({dest:'public/images/'}) 

// initializing express application
const app = express()

// set middleware (for the stuff that happens in between initialization and listening)
// this specific line makes our entire folder "public" acessibile to the web
app.use(express.static('public'))
app.use(urlEncoded)

// global array in our server to store all the posts
let allPosts = []
// global variable that stores what number post we have
let postNum = 0

// JUDY - DigitalOcean documentation has helpful syntax usage
app.get('/', (res, req) => {
    req.sendFile('home.html', {root:'public'})
})

// handle the post request coming in fro the html file
app.post('/upload', uploadProcessor.single('theimage'), (req, res) => {
    console.log(req.body)
    
    // post requests store data coming in from the request body
    let postData = {
        title: req.body.title,
        caption: req.body.caption,
        postNumber: postNum
    }

    if(req.file){
        postData.imgSrc = '/images/' + req.file.filename
    }

    console.log(postData)

    // adding individual post data to global data array
    // .push adds to the end of the arry
    // .unshift adds to the beginning of the array
    allPosts.unshift(postData)
    
    // incrementing the post number 
    postNum++

    // once we have stored the data, refresh back to home page
    res.redirect('/')
})

app.get('/all-posts', (req, res) => {
    res.json({posts: allPosts})
}) 

// set the express app to listen to requests
app.listen('6001', () => {
    console.log('server strated at http://127.0.0.1:6001')
})