const express = require('express')
const parser = require('body-parser')
const multer = require('multer')
const nedb = require('@seald-io/nedb')

// setup configurations for libraries
const encodedParser = parser.urlencoded({extended:true})
const uploadProcessor = multer({dest:'public/upload'})
// added database variable to keep track of the database file
let database = new nedb({
    file: 'database.txt',
    autoload: true
})

const app = express()

// app.use is middleware
// this happens in between the app being set up and the routes that is recieves
app.use(express.static('public'))
app.use(encodedParser)

app.get('/', (req,res) => {
    res.sendFile('index.html', {root:"public"})
})

app.post('/upload', uploadProcessor.single('imgUpload'), (req, res) => {
    
    console.log(req.body)
    let data = {
        postText: req.body.text
        ,postTime: Date.toLocaleString()
        ,postTimestamp: Date.now()
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

app.listen(6004, () => {
    console.log('app is listening on http://localhost:6004')
})