const myLibrary = [];

// Create main page div
const page = document.createElement("div");
page.classList.add("page");
document.body.appendChild(page);

// Creating header
const header = document.createElement("div");
header.classList.add("header");
page.appendChild(header);

const logoName = document.createElement("h1");
logoName.classList.add("logoName");
logoName.textContent = "JS-ONLY LIBRARY";
header.appendChild(logoName);

// Add book button
const newBtn = document.createElement("button");
newBtn.classList.add("newBtn");
newBtn.textContent = "ADD BOOK";
header.appendChild(newBtn);

// Creating the card box
const cardBox = document.createElement("div");
cardBox.classList.add("cardBox");
page.appendChild(cardBox);

// Constructor function for Book objects
function Book(title, author, pages, read) {
  if (!new.target) {
    throw Error("You must use the 'new' operator");
  }
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
  this.id = crypto.randomUUID();
}

// Prototype method for returning book info
Book.prototype.info = function() {
  return `${this.title}
${this.author}
${this.pages} pages
Read: ${this.read}`;
};

// Function to create and append a card for a book, including a delete button
function createCard(book) {
  // Create the card container
  const card = document.createElement("div");
  card.classList.add("card");

  // Create a div for the book info text and append it to the card
  const infoDiv = document.createElement("div");
  infoDiv.textContent = book.info();
  card.appendChild(infoDiv);

  // Create the delete button
  const deleteBtn = document.createElement("button");
  deleteBtn.classList.add("delete-btn");
  deleteBtn.textContent = "x";

  // Add an event listener to handle deletion of the card and its book
  deleteBtn.addEventListener("click", () => {
    // Remove the book from the library array using its unique ID
    const index = myLibrary.findIndex((b) => b.id === book.id);
    if (index !== -1) {
      myLibrary.splice(index, 1);
    }
    // Remove the card element from the DOM
    card.remove();
  });

  // Append the delete button to the card
  card.appendChild(deleteBtn);
  // Append the card to the cardBox container
  cardBox.appendChild(card);
}

// Function to add a book to the library and create its corresponding card
function addBook(title, author, pages, read) {
  const newBook = new Book(title, author, pages, read);
  myLibrary.push(newBook);
  createCard(newBook);
}

// Create an initial book for testing
addBook("hobbit", "J.R.Tolkien", 292, "y");
console.log(myLibrary[0].info());

// Adding event listener to the ADD BOOK button for opening the input form
newBtn.addEventListener("click", function() {
  const inputForm = document.createElement("form");
  inputForm.classList.add("inputForm");

  // Field for Title
  const titleInput = document.createElement("input");
  titleInput.type = "text";
  titleInput.placeholder = "Title";
  titleInput.required = true;
  titleInput.classList.add("inp");
  inputForm.appendChild(titleInput);

  // Field for Author
  const authorInput = document.createElement("input");
  authorInput.type = "text";
  authorInput.placeholder = "Author";
  authorInput.required = true;
  authorInput.classList.add("inp");
  inputForm.appendChild(authorInput);

  // Field for Pages
  const pagesInput = document.createElement("input");
  pagesInput.type = "number";
  pagesInput.placeholder = "0";
  pagesInput.required = true;
  pagesInput.classList.add("inp");
  inputForm.appendChild(pagesInput);

  // Field for Read status – using a checkbox here
  const readLabel = document.createElement("label");
  readLabel.textContent = "Read? ";
  const readInput = document.createElement("input");
  readInput.type = "checkbox";
  readInput.classList.add("inp");
  readLabel.classList.add("readLabel");
  readLabel.appendChild(readInput);
  inputForm.appendChild(readLabel);

  // Submit button for the form
  const submitBtn = document.createElement("button");
  submitBtn.type = "submit";
  submitBtn.textContent = "Add";
  submitBtn.classList.add("submitBtn");
  inputForm.appendChild(submitBtn);

  page.appendChild(inputForm);

  // Disable the ADD BOOK button so multiple forms aren’t shown
  newBtn.disabled = true;

  // Handle form submission for adding a new book
  inputForm.addEventListener("submit", function(e) {
    e.preventDefault();

    // Retrieve the values from the form inputs
    const title = titleInput.value;
    const author = authorInput.value;
    const pages = pagesInput.value;
    const read = readInput.checked ? "y" : "n";

    // Add the book; addBook() automatically creates and appends the card
    addBook(title, author, pages, read);

    // Remove the form from the page and re-enable the ADD BOOK button
    page.removeChild(inputForm);
    newBtn.disabled = false;
  });
});
