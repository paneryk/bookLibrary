export class Library {
    _books = [];

    get books() {
        return this._books;
    }
    
    addBook(book) {
        this._books.unshift(book);
    }
    removeBook(book) {
       let index = this._books.findIndex(element => element === book);
       this._books.splice(index, 1);
    }
}

export class Book {
    constructor(title, author, status) {
        this._title = title,
        this._author = author,
        this._status = Boolean(status)
    }

    get title() {return this._title;}
    get author() {return this._author;}
    get status() {return this._status;}

    changeStatus(newStatus) {
        this._status = Boolean(newStatus);
    }
}
