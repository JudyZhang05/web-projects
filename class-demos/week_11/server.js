const express = require('express')
const parser = require('body-parser')
const multer = require('multer')
const nedb = require('@seald-io/nedb')

// setup configurations for libraries
const encodedParser = parser.urlencoded({extended:true})
const uploadProcessor = multer({dest:'public/upload'})
// added database variable to keep track of the database file
let database = new nedb({
    filename: 'database.txt',
    autoload: true
})

const app = express()

// app.use is middleware
// this happens in between the app being set up and the routes that is recieves
app.use(express.static('public'))
app.use(encodedParser)
// tells the app to be ready to revieve json data
app.use(parser.json())

app.get('/', (req,res) => {
    res.sendFile('index.html', {root:"public"})
})

app.post('/upload', uploadProcessor.single('imgUpload'), (req, res) => {
    
    console.log(req.body)

    // creates an object that keeps track of the time using the Date class from the MDN documentation
    const currentTime = new Date(Date.now())

    console.log(currentTime)

    let data = {
        postText: req.body.text
        ,postTime: currentTime.toLocaleString()
        ,postTimestamp: currentTime
    }

    // 2 params for insert
    // 1. darta to be added
    // 2. callback for after the data has been added
    database.insert(data, (err, dataToBeAdded) => {
        if (err){
            res.redirect('/')
        }else{
            console.log(dataToBeAdded)
            res.redirect('/')
        }
    })
    
    // this line is now redundant because we need to redirect after the data has been added
    // res.redirect('/')
})

// create a new request to retrieve the info from the database
app.get('/populate-posts',(req, res) => {
    // this should retrieve info 
    // 1. what are we looking for inside the database?
    // nedb takes in an object to search for
    // empty {} means we wantt o retrieve the entire db
    let query = {}

    database.find(query, (err, data) => {
        // console.log(data)

        // we are sending back a json response so our front-end main.js can parse it
        res.json(data)
    })
})

// this will take in data from my main.js and delete a specific post in the database
app.delete('/delete-post', (req, res) => {

    // console.log(req.body.id)

    // based on the nedb, we constuct a search that will match the _id property inside of the db to the id that comes in from the client
    let query = {
        _id: req.body.id
    }

    database.remove(query, {}, (err, numRemoved) => {
        console.log(numRemoved)
        res.redirect('/')
    })

})

app.listen(6004, () => {
    console.log('app is listening on http://localhost:6004')
})