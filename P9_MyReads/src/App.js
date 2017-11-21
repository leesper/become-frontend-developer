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
      ))

      books.forEach(function(book) {
        const bookItem = new Book(
          book.imageLinks.smallThumbnail,
          book.title,
          book.authors[0]);
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

      console.log(shelves);
    });
  }
}

export default BooksApp
