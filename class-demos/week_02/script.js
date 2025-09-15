// this is a comment

// this is the loading event using an anonymous function
window.onload = () => {
    console.log('page is fully loaded');
    // alert('page has loaded');

    // gives us an array which is a collection of variables 
    // harder to manipulate
    let allMyParagraphs = document.getElementsByTagName('p');
    console.log(allMyParagraphs);

    // more specific but still returns an array
    let blueParagraphs = document.getElementsByClassName('blue-paragraph');
    console.log(blueParagraphs);

    // we dont want to manipulate an array, it is harder to retrieve data
    // arrays are compiled of a series of the data in order
    // #1 element = 0, #2 element = 1
    console.log(allMyParagraphs[0]);

    // ids are the best way to retrieve an individual element on a page
    let importantParagraph = document.getElementById('important-paragraph');
    console.log(importantParagraph);

    // modify content with js
    importantParagraph.innerHTML = 'this is my new paragraph text <span>this is in a span</span>';

    importantParagraph.style.color = 'violet';
    importantParagraph.classList.add('red-paragraph');

    importantParagraph.classList.add('second-paragraph');
    console.log(importantParagraph.classList)
    importantParagraph.classList.remove('second-paragraph');
    console.log(importantParagraph.classList)

    let button = document.getElementById('click');
    button.addEventListener('click', () => {
        // create a variable that is an instance of the element
        let newElement = document.createElement('p');
        // add content to element
        newElement.textContent = 'hi';
        newElement.classList.add('greetings');
        // reference where we are adding new element to
        let container = document.body;
        // body is used often thus shorthand
        // add element in the page
        container.appendChild(newElement);  
    });
    // button.onclick = () => {}

    let byebutton = document.getElementById('bye');
    byebutton.addEventListener('click', () => {
        // retrieving all of the paragraphs that contains greetings class
        let allMyGreetings = document.getElementsByClassName('greetings');
        console.log(allMyGreetings);
        allMyGreetings[0].remove();
    });
};

