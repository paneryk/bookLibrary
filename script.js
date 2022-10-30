const addButton = document.querySelector('#addBook');
const tbody = document.querySelector('tbody');
const form = document.querySelector('form');
const input = document.querySelectorAll('input');
const bookTitleInput = document.querySelector('#bookTitle');
const bookAuthorInput = document.querySelector('#bookAuthor');
const bookStatus = document.querySelector('#status');
const openForm = document.getElementById('openForm');

let myLibrary = [];

function Book(title, author, status) {
    this.title = title,
    this.author = author,
    this.status = Boolean(status)
}

function createCheckbox(book) {
    const div = document.createElement('div');
    const checkbox = document.createElement('input');
    const label = document.createElement('label');
    


    checkbox.type = "checkbox";
    checkbox.classList.add('checkbox');
    label.textContent = book.status ? "Read" : "Not read";
    
    book.status ? checkbox.checked = true : checkbox.checked = false;
    

    checkbox.addEventListener('change', () => {
        book.status ? book.status = false : book.status = true;
        label.textContent = book.status ? "Read" : "Not read";
    })
    
    
    div.append(checkbox);
    div.append(label)
    return div;
}

function addBook(book) {
    const tr = document.createElement('tr');
    const tdAuthor = document.createElement('td');
    const tdTitle = document.createElement('td');
    const tdStatus = document.createElement('td');
    const tdDelete = document.createElement('td');
    const deleteButton = document.createElement('button')

    myLibrary.unshift(book);

    const filterFunction = (element) => element.title = book.title;
    const index = myLibrary.findIndex(filterFunction);

    tr.setAttribute('data-index', index);
    myLibrary.length === 1 ? tbody.append(tr) : tbody.prepend(tr);
    tr.appendChild(tdTitle);
    tdTitle.textContent = book.title;
    tdTitle.classList.add('title');
    tr.appendChild(tdAuthor);
    tdAuthor.textContent = book.author;
    tr.appendChild(tdStatus);
    tdStatus.append(createCheckbox(book));
    tr.appendChild(tdDelete);
    deleteButton.setAttribute('id', index);
    deleteButton.textContent = 'Remove';
    tdDelete.appendChild(deleteButton);

    deleteButton.addEventListener('click', () => {
        if (confirm('Do you want to remove this book?')) tr.remove();
    })
}

openForm.addEventListener('click', (e) => {
    e.target.textContent === "Close" ? e.target.textContent = "Add a book" : e.target.textContent = "Close";
    form.classList.toggle('invisible');
})

form.addEventListener('submit', (event) => {
    event.preventDefault();
    const status = bookStatus.value === '0' ? 0 : 1;
    const book = new Book(bookTitleInput.value, bookAuthorInput.value, status)
    addBook(book);
    input.forEach(element => element.value = '');
    bookStatus.value = '1';
})


const theHobbit = new Book("The Hobbit", "J.R.R. Tolkien", 0);
const wiedzmin = new Book('The Witcher', 'Andrzej Sapkowski', 1);
addBook(theHobbit);
addBook(wiedzmin);