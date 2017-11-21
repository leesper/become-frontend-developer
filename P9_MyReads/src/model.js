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
  constructor(image, title, authors) {
    this.image = image;
    this.title = title;
    this.authors = authors;
  }
}

export {Shelf, Book};
