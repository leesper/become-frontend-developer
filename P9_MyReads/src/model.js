class Shelf {
  constructor(title, shelf) {
    this.title = title;
    this.shelf = shelf;
    this.items = [];
  }

  addBook(book) {
    this.items.push(book);
  }
}

class Book {
  constructor(id, image, title, authors, shelf) {
    this.id = id;
    this.image = image;
    this.title = title;
    this.authors = authors;
    this.shelf = shelf;
  }
}

export {Shelf, Book};
