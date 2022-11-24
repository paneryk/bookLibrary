import { Library, Book } from "./classes.js";

//selectors

const form = document.querySelector("form");
const bookStatus = document.querySelector("#status");
const bookTitleInput = document.querySelector("#bookTitle");
const bookAuthorInput = document.querySelector("#bookAuthor");
const input = document.querySelectorAll("input");
const openForm = document.getElementById("openForm");

//on window load init

function init() {
    const theHobbit = new Book("The Hobbit", "J.R.R. Tolkien", 0);
    const wiedzmin = new Book("The Witcher", "Andrzej Sapkowski", 1);

    lib.addBook(theHobbit);
    lib.addBook(wiedzmin);
    addListeners(); updateLibrary(lib.books);
}

//listeners section

function addListeners() {
    form.addEventListener("submit", (event) => newBookListener(event));
    openForm.addEventListener("click", (event) => formOpenListener(event));
}
function newBookListener(event) {
    const status = bookStatus.value === "0" ? 0 : 1;
    const book = new Book(bookTitleInput.value, bookAuthorInput.value, status);

    event.preventDefault();
    lib.addBook(book);
    input.forEach((element) => (element.value = ""));
    bookStatus.value = "1";
    updateLibrary(lib.books);
}
function formOpenListener(event) {
    event.target.textContent === "Close"
        ? (event.target.textContent = "Add a book")
        : (event.target.textContent = "Close");
    form.classList.toggle("invisible");
}
function deleteListener(button) {
    button.addEventListener("click", () => {
        if (confirm("Do you want to remove this book?")) {
            lib.removeBook(lib.books[button.id]);
            updateLibrary(lib.books);
        }
    });
}

//library display section

function displayBook(author, title, status, index) {
    const tableRow = document.createDocumentFragment();
    const tr = document.createElement("tr");
    const tdAuthor = document.createElement("td");
    const tdTitle = document.createElement("td");
    const tdStatus = document.createElement("td");
    const tdDelete = document.createElement("td");
    const deleteButton = document.createElement("button");
    const tbody = document.querySelector("tbody");

    tdTitle.textContent = title;
    tdTitle.classList.add("title");

    tdAuthor.textContent = author;

    tdStatus.append(createCheckbox(index, status));

    deleteButton.textContent = "Remove";
    deleteButton.setAttribute("id", index); //add listener
    deleteListener(deleteButton);

    tdDelete.appendChild(deleteButton);
    tr.append(tdAuthor, tdTitle, tdStatus, tdDelete);
    tableRow.append(tr);

    tbody.append(tableRow);
}

function createCheckbox(index, status) {
    const div = document.createElement("div");
    const checkbox = document.createElement("input");
    const label = document.createElement("label");

    checkbox.type = "checkbox";
    checkbox.classList.add("checkbox");
    label.textContent = status ? "Read" : "Not read";

    status ? (checkbox.checked = true) : (checkbox.checked = false);

    checkbox.addEventListener("change", () => {
        status
            ? lib.books[index].changeStatus(false)
            : lib.books[index].changeStatus(true);
        label.textContent = status ? "Read" : "Not read";
    });

    div.append(checkbox);
    div.append(label);
    return div;
}

function updateLibrary(bookArray) {
    const tbody = document.querySelector("tbody");
    const rows = tbody.querySelectorAll("tr");

    rows.forEach((row) => row.remove());

    for (const book of bookArray) {
        displayBook(book.author, book.title, book.status, bookArray.indexOf(book));
    }
}

//initialize library, add listeners and 2 hard coded books

let lib = new Library();
window.addEventListener("load", init());
