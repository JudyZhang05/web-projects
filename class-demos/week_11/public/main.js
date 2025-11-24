window.onload = () => {

    // we need to make a fetch requestr to the server/database to retrieve the posts that current exist
    loadPosts()
}

async function loadPosts(){
    const postContainer = document.getElementById('all-posts')

    // retrieves the data from the database on my server
    const response = await fetch('/populate-posts')

    // converts the response to json data
    const postArray = await response.json()

    for (let post of postArray){
        // creates the div that will hold all the post data and add post class
        let newDiv = document.createElement('div')
        newDiv.classList.add('post')

        // span that holds the time
        let span  = document.createElement('span')
        span.textContent = post.postTime

        // paragraph that holds the text from the database
        let paragraphText = document.createElement('p')
        paragraphText.textContent = post.postText

        // create a button to delete posts
        let deleteButton = document.createElement('button')
        deleteButton.textContent = 'x'
        // grab the individual id by using post._id
        deleteButton.addEventListener('click', () => {
            handleClick(post._id)
        })

        newDiv.append(deleteButton)
        newDiv.append(span)
        newDiv.append(paragraphText)

        postContainer.append(newDiv)
    }
}

async function handleClick(postId){
    console.log('button was clicked: '+postId)

    let request = await fetch ('/delete-post', {
        // method is the type of request
        method: 'DELETE'
        // body is teh data sent in json format
        ,body: JSON.stringify({id:postId})
        // headers are what type of data should the server expect
        ,headers: {
            'Content-Type': 'application/json'
        }
    })
}