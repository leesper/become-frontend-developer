import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import BookList from './BookList'
import BookSearch from './BookSearch'

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
      const currentReading = {
        title: "Currently Reading",
        items: []
      };

      const wantToRead = {
        title: "Want To Read",
        items: []
      };

      const read = {
        title: "Read",
        items: []
      };

      books.forEach(function(book) {
        switch (book.shelf) {
          case "currentlyReading":
            currentReading.items.push({
              image: book.imageLinks.smallThumbnail,
              title: book.title,
              authors: book.authors[0]
            });
            break;
          case "wantToRead":
            wantToRead.items.push({
              image: book.imageLinks.smallThumbnail,
              title: book.title,
              authors: book.authors[0]
            });
            break;
          case "read":
            read.items.push({
              image: book.imageLinks.smallThumbnail,
              title: book.title,
              authors: book.authors[0]
            });
            break;
          default:
            console.log("invalid shelf", book.shelf);
        }
      });

      const shelves = [
        currentReading,
        wantToRead,
        read
      ];

      this.setState({shelves: shelves});

      console.log(shelves);
    });
  }
}

export default BooksApp
