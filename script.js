const myLibrary = [];
//create main page div
const page = document.createElement("div");
page.classList.add("page");

const body = document.body;
body.appendChild(page);

//creating header
const header = document.createElement("div");
header.classList.add("header");
page.appendChild(header);


//add book button
const newBtn = document.createElement("button");
newBtn.classList.add("newBtn");
newBtn.textContent = "ADD BOOK";
header.appendChild(newBtn);




//creating the card box
const cardBox = document.createElement("div");
cardBox.classList.add("cardBox");
page.appendChild(cardBox);







//constructor function
function Book(title, author, pages, read) {
    if (!new.target) {
        throw Error("You must use the 'new' operator");
    };

    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
};

//adding a method to the prototype - saving memory.
Book.prototype.info = function() {
    return `${this.title}
            ${this.author}
            ${this.pages} pages
            Read: ${this.read}`
};

//manually creating a new book
//const hobbit = new Book("hobbit", "author", 292, "Y");
//console.log(hobbit.info());


// creating book and pushing into array (library)
function addBook(title, author, pages, read) {
    const addition = new Book(title, author, pages, read);
    myLibrary.push(addition);

    
};

addBook("hobbit", "J.R.Tolkien", 292, "y");
//logging result of hobbit.info() in library for testing
console.log(myLibrary[0].info());


//loop through array to display

for (let i of myLibrary) {
    const card = document.createElement("div");
    card.classList.add("card")
    card.textContent = i.info();
    cardBox.appendChild(card);
    
};

//adding event listener to addBook btn
newBtn.addEventListener("click", function(e) {
    const inputForm = document.createElement("form");
    inputForm.classList.add("inputForm");


    
    //fields
    const titleInput = document.createElement("input");
    titleInput.type = "text";
    titleInput.placeholder = "Title";
    titleInput.required = true;
    titleInput.classList.add("inp");
    inputForm.appendChild(titleInput);

    const authorInput = document.createElement("input");
    authorInput.type = "text";
    authorInput.placeholder = "author";
    authorInput.required = true;
    authorInput.classList.add("inp");
    inputForm.appendChild(authorInput);
    

    const pagesInput = document.createElement("input");
    pagesInput.type = "number";
    pagesInput.placeholder = "0";
    pagesInput.required = true;
    pagesInput.classList.add("inp");
    inputForm.appendChild(pagesInput);

    const readInput = document.createElement("input");
    readInput.type = "text";
    readInput.placeholder = "Y/N";
    readInput.required = true;
    readInput.classList.add("inp");
    inputForm.appendChild(readInput);

    //submit button
    const submitBtn = document.createElement("button");
    submitBtn.type = "submit";
    submitBtn.textContent = "Add";
    submitBtn.classList.add("submitBtn")
    inputForm.appendChild(submitBtn);

    page.appendChild(inputForm);
    
    //disable add book button so we dont add multiple forms
    newBtn.disabled = true;

    //submitting form x
    inputForm.addEventListener("submit", function(e) {
        e.preventDefault();

        //retrieve the value from form inputs

        const title = titleInput.value;
        const author = authorInput.value;
        const pages = pagesInput.value;
        const read = readInput.checked ? "y" : "n";

        addBook(title, author, pages, read);

        //create new card element for new book
        const card = document.createElement("div");
        card.classList.add("card");
        card.textContent = myLibrary[myLibrary.length - 1].info();
        cardBox.appendChild(card);

        // remove inputForm so its not still there after adding book
        page.removeChild(inputForm);

        newBtn.disabled = false; // re-enabling forms.




    });


    
});







