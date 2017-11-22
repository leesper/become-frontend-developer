class Shelf {
  constructor(title) {
    this.title = title;
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
