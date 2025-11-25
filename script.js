const addBookButton = document.querySelector("#addBookButton");
const formContainer = document.querySelector("#formContainer");
const submitButton = document.querySelector("#submitButton");
const bookForm = document.querySelector("#bookForm")
const modal = document.querySelector(".modal")
const template = document.querySelector("#bookTemplate");
const cardContainer = document.querySelector("#cardContainer");
const closeModal = document.querySelector("#closeModal");

//Array storing all of the book objects
let myLibrary = [];

//Constructor for "book" objects
function Book(title, author, pages, status) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.status = status;
    this.id = crypto.randomUUID();
}
//Function to add a new book to the array
function addBook(title, author, pages, status) {
    const newBook = new Book(title, author, pages, status);
    myLibrary.push(newBook);
}

function displayBooks() {
    //clears the content so it doesn't repeat
    cardContainer.innerHTML = "";
    for(const book of myLibrary) {
        const clone = document.importNode(template.content, true);
        clone.querySelector("h2").textContent = book.title;
        if(book.status === true) {
            clone.querySelector(".read").textContent = "Read";
        }
        else {
            clone.querySelector(".read").textContent = "Not Read";
        }
        clone.querySelector("h3").textContent = book.author;
        clone.querySelector("p").textContent = book.pages;

        const deleteButton = clone.querySelector(".delete");
        deleteButton.addEventListener("click", () => {
            const newLibrary = myLibrary.filter(function(b) {
                return b.id !== book.id;
            })
            myLibrary = newLibrary;
            console.log("This is the new array" + myLibrary);
            displayBooks();
        })

        const statusButton = clone.querySelector(".status");
        statusButton.addEventListener("click", () => {
            if(book.status === true) {
                book.status = false;
            }
            else if(book.status === false)  {
                book.status = true;
            }
            displayBooks();
        })
        cardContainer.appendChild(clone);
    }
    
}
addBook("The Hunger Games", "Suzanne Collins", 349, true);
console.log(myLibrary);

addBookButton.addEventListener("click", function() {
    modal.classList.add("show");
})
closeModal.addEventListener("click", () => {
    modal.classList.remove("show");
})

bookForm.addEventListener("submit", e => {
    e.preventDefault();
    const title = document.querySelector("#title").value;
    const author = document.querySelector("#author").value;
    const pages = document.querySelector("#pages").value;

    const status = document.querySelector("#status").checked;
    addBook(title, author, pages, status);
    console.log(myLibrary);
    displayBooks();

    modal.classList.remove("show");
    bookForm.reset();
})

//calling function when opened
displayBooks();