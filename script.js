//Array storing all of the book objects
const myLibrary = [];

//Constructor for "book" objects
function Book(title, author) {
    this.title = title;
    this.author = author;
    this.id = crypto.randomUUID();
}
//Function to add a new book to the array
function addBook(title, author) {
    const newBook = new Book(title, author);
    myLibrary.push(newBook);
}
addBook("The Please Work Games", "Hopeful person");
console.log(myLibrary);