'use strict'

// BOOK LIBRARY
const myLibrary = [];


// read book from the user;
// const book = ['game of thrones', 'db weiss', 8421, true,'Effective Java', 'Joshua Bloch', 416, true, 'Clean Code: Agile Software', 'Robert C . Martin', 464, false,'Eloquent Javascript','Marjin Haverbeke', 472, true, 'You don\'t know JS Yet', 'Kyle Simpson',143,true,'Design Patterns','Erich Gamma',395,true,'Javascript: The Good Part','Douglas Crockford',176,true]
const form = document.getElementById('bookform');

// Adding a class 
class Book{
    // constructor to create a book object
    constructor(form){
        this.Title = form.title.value.trim();
        this.Author = form.author.value.trim();
        this.Publication = form.publication.value.trim();
        this.Pages = parseInt(form.pages.value);
        this.Read = form.read.value === 'Yes';
    }
}
// Add event listener
form.addEventListener('submit', function (e){

    // Prevent refreshing the page
    e.preventDefault();

    // reading everything from the form
    const form = e.target;
    const book = new Book(form);
    // Check for duplicate and add it to the library
    addBookToLibrary(book);
    // clear the form 
    form.reset();
});

myLibrary.push({
    Title: 'Game Of Thrones',
    Author: 'George R. R. Martin',
    Publication: 'Aug 1, 1996',
    Pages: 694,
    Read: 'No',
}
,{
    Title: 'Fire & Blood',
    Author: 'George R. R. Martin',
    Publication: 'Nov 20, 2018',
    Pages:  736,
    Read: 'Yes',
}
);
// Function to add books to the library
function addBookToLibrary(newBook){
    // Checks for duplicates
    const exists = myLibrary.some(book => book.Title.toLowerCase() === newBook.Title.toLowerCase())
   if(!exists){
    myLibrary.push(newBook);
   }
   else{
    alert('book already added to the library');
   }
   display();
}

// Function to display the book
const display = function displayBooks() {
    // Selecting the book container
    const container = document.getElementById('bookContainer');
    container.innerHTML = ''; // Clear the container before rendering

    // Loop through the library and create elements
    myLibrary.forEach((book, index) => {
        // Create the book card
        const bookCard = document.createElement('div');
        bookCard.id = 'book-card';

        // Create the book info section
        const bookInfo = document.createElement('div');
        bookInfo.className = 'book-info';

        const title = document.createElement('h3');
        title.textContent = `Title: ${book.Title}`;
        const author = document.createElement('p');
        author.textContent = `Author: ${book.Author}`;
        const pages = document.createElement('p');
        pages.textContent = `No of Pages: ${book.Pages}`;
        const publication = document.createElement('p');
        publication.textContent = `Published: ${book.Publication}`;

        // Append book info elements
        bookInfo.appendChild(title);
        bookInfo.appendChild(author);
        bookInfo.appendChild(pages);
        bookInfo.appendChild(publication);

        // Create the card buttons section
        const cardButtons = document.createElement('div');
        cardButtons.className = 'card-buttons';

        const readButton = document.createElement('button');
        readButton.className = 'read-btn';
        readButton.textContent = 'READ';
        if (book.Read) {
            readButton.disabled = true;
        }
        readButton.addEventListener('click', () => {
            myLibrary[index].Read = 'Yes'; // Mark book as read
            display(); // Re-render to update button state
        });

        const deleteButton = document.createElement('button');
        deleteButton.className = 'delete-btn';
        deleteButton.textContent = 'Delete';
        deleteButton.addEventListener('click', () => {
            myLibrary.splice(index, 1); // Remove book from array
            display(); // Re-render to update display
        });

        // Append buttons to the card buttons section
        cardButtons.appendChild(readButton);
        cardButtons.appendChild(deleteButton);

        // Append book info and buttons to the book card
        bookCard.appendChild(bookInfo);
        bookCard.appendChild(cardButtons);

        // Append the book card to the container
        container.appendChild(bookCard);
    });
};
display();

//Functions for the Read & Delete button
