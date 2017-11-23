import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import BookList from './BookList'
import BookSearch from './BookSearch'
import {Shelf, Book} from './model'

class BooksApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      /**
       * TODO: Instead of using this state variable to keep track of which page
       * we're on, use the URL in the browser's address bar. This will ensure that
       * users can use the browser's back and forward buttons to navigate between
       * pages, as well as provide a good URL they can bookmark and share.
       */
      showSearchPage: false,
      shelves: []
    };
  }

  handleClick = (e, bookid, originShelf) => {
    const targetShelf = e.target.value;
    console.log(bookid, originShelf, targetShelf);
    if (originShelf !== targetShelf) {
      BooksAPI.update({ id: bookid }, targetShelf).then(res => {
        // alternatively we can just call updateShelves() to refresh the state
        // from server, but this requires an extra request, so I just update the
        // local state and call setState
        const shelves = this.state.shelves;
        const book = this.deleteFromShelf(bookid, originShelf, shelves);
        this.addToShelf(book, targetShelf, shelves);
        this.setState({shelves: shelves});
      }).catch(err => {
        console.log('update error: ' + err);
      });
    }
  }

  deleteFromShelf(bookid, origin, shelves) {
    const index = this.getShelfIndex(origin);

    for (let i = 0; i < shelves[index].items.length; i++) {
      console.log(shelves[index].items[i].id);
      if (shelves[index].items[i].id === bookid) {
        const book = shelves[index].items[i];
        shelves[index].items.splice(i, 1);
        return book;
      }
    }

    return null;
  }

  addToShelf(book, target, shelves) {
    const index = this.getShelfIndex(target);

    if (index < 0) {
      return;
    }

    if (book) {
      book.shelf = target;
      shelves[index].addBook(book);
    }
  }

  getShelfIndex(name) {
    switch (name) {
      case "currentlyReading":
        return 0;
      case "wantToRead":
        return 1;
      case "read":
        return 2;
      default:
        return -1;
    }
  }

  render() {
    return (
      <div className="app">
        {this.state.showSearchPage ? (
          <BookSearch
            onClick={() => this.setState({ showSearchPage: false })}
          />
        ) : (
          <BookList
            onClick={() => this.setState({ showSearchPage: true })}
            shelves={this.state.shelves}
            clickHandler={this.handleClick}
          />
        )}
      </div>
    )
  }

  componentDidMount() {
    this.updateShelves();
  }

  updateShelves() {
    BooksAPI.getAll().then(books => {
      console.log(books);
      const shelves = ["Currently Reading", "Want To Read", "Read"].map(title => (
        new Shelf(title)
      ));

      books.forEach(function(book) {
        const bookItem = new Book(
          book.id,
          book.imageLinks.smallThumbnail,
          book.title,
          book.authors[0],
          book.shelf);
        switch (book.shelf) {
          case "currentlyReading":
            shelves[0].addBook(bookItem);
            break;
          case "wantToRead":
            shelves[1].addBook(bookItem);
            break;
          case "read":
            shelves[2].addBook(bookItem);
            break;
          default:
            console.log("invalid shelf", book.shelf);
        }
      });

      this.setState({shelves: shelves});

      // console.log(shelves);
    }).catch(err => {
      console.log("getAll error: " + err);
    });
  }
}

export default BooksApp
