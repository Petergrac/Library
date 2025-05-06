'use strict'

// BOOK LIBRARY
const myLibrary = [];


// read book from the user;
// const book = ['game of thrones', 'db weiss', 8421, true,'Effective Java', 'Joshua Bloch', 416, true, 'Clean Code: Agile Software', 'Robert C . Martin', 464, false,'Eloquent Javascript','Marjin Haverbeke', 472, true, 'You don\'t know JS Yet', 'Kyle Simpson',143,true,'Design Patterns','Erich Gamma',395,true,'Javascript: The Good Part','Douglas Crockford',176,true]
const form = document.getElementById('bookform');

// Add event listener
form.addEventListener('submit', function (e){

    // Prevent refreshing the page
    e.preventDefault();

    // reading everything from the form
    const form = e.target;
    
    // saving everything into the object
    const book = {
        Title: form.title.value.trim(),
        Author: form.author.value.trim(),
        Pages: parseInt(form.pages.value),
        Read: form.read.value === 'Yes',
    }
    

    // Check for duplicate and add it to the library
    addBookToLibrary(book);
    // clear the form 
    form.reset();
})
// const book = {
//     Title: 'Game Of Thrones',
//     Author: 'David Beinoff',
//     Pages: 1234,
//     Read: 'No',
// }

// addBookToLibrary(book);
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
const display = function displayBooks(){
    // Selecting the book container
    const container = document.getElementById('bookContainer');
    console.log(myLibrary);
    // Adding the html values to it
   const bookHTML = myLibrary.map( 
        book => 
            `<div id="book-card">
                <div class="book-info">
                    <h3>Title: ${book.Title}</h3>
                    <p>Author: ${book.Author}</p>
                    <p>Pages: ${book.Pages}</p>
                </div>
                <div class="card-buttons">
                    <button class="read-btn" ${book.Read ? 'disabled': ''}>READ</button>
                    <button class="delete-btn">Delete</button>
                </div>
            </div>`
        ).join('');
        container.innerHTML = bookHTML;

    // Add event listeners to buttons after rendering
    document.querySelectorAll('.read-btn').forEach((button, index) => {
        button.addEventListener('click', () => {
            myLibrary[index].Read = true; // Mark book as read
            display(); // Re-render to update button state
        });
    });

    document.querySelectorAll('.delete-btn').forEach((button, index) => {
        button.addEventListener('click', () => {
            myLibrary.splice(index, 1); // Remove book from array
            display(); // Re-render to update display
        });
    });
}
display();

//Functions for the Read & Delete button
