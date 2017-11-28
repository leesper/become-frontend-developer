import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import BookList from './BookList'
import BookSearch from './BookSearch'
import { Shelf, Book } from './model'
import { Route } from 'react-router-dom'

const MAX_RESULTS = 20;

class BooksApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      results: [],
      shelfReading: new Shelf("Currently Reading"),
      shelfToRead: new Shelf("Want To Read"),
      shelfRead: new Shelf("Read")
    };
    this.shelfMap = {};
  }

  render() {
    return (
      <div className="app">
        <Route path="/" exact render={() => (
          <BookList
            shelves={[
              this.state.shelfReading,
              this.state.shelfToRead,
              this.state.shelfRead]}
            clickHandler={this.handleClick}
            batchHandler={this.handleBatch}
          />
        )}/>
        <Route path="/search" render={() => (
          <BookSearch
            onSearch={this.handleSearch}
            results={this.state.results}
            clickHandler={this.handleClick}
          />
        )}/>
      </div>
    )
  }

  handleBatch = (e, shelf) => {
    const target = e.target.value;
    console.log("batch target", target);
    let targetShelf;
    switch (shelf) {
      case "currentlyReading":
        targetShelf = this.state.shelfReading;
        break;
      case "wantToRead":
        targetShelf = this.state.shelfToRead;
        break;
      case "read":
        targetShelf = this.state.shelfRead;
        break;
      default:
        console.log("target do nothing: " + target);
    }

    console.log("target items", targetShelf.items);
    targetShelf.items.forEach(book => {
      if (book.shelf !== target) {
        BooksAPI.update({ id: book.id }, target).then(res => {
          this.updateShelves();
          this.updateResults(book, target);
        }).catch(err => {
          console.log('update error: ' + err);
        });
      }
    });

  }

  handleSearch = (query) => {
    console.log("query", query);
    const self = this;
    BooksAPI.search(query, MAX_RESULTS).then(books => {
      console.log('books', books);
      const results = books.map(book => (
        new Book(
          book.id,
          book.imageLinks.smallThumbnail,
          book.title,
          book.authors ? book.authors[0] : '',
          self.shelfMap[book.id] ? self.shelfMap[book.id] : 'none')
      ))

      this.setState({ results: results })
    }).catch(err => {
      console.log('search error:' + err);
    });
  }

  handleClick = (e, book) => {
    const targetShelf = e.target.value;
    console.log(book, book.shelf, targetShelf);
    if (targetShelf === "none") {
      this.shelfMap[book.id] = "";
    }
    if (book.shelf !== targetShelf) {
      BooksAPI.update({ id: book.id }, targetShelf).then(res => {
        this.updateShelves();
        this.updateResults(book, targetShelf);
      }).catch(err => {
        console.log('update error: ' + err);
      });
    }
  }

  componentDidMount() {
    this.updateShelves();
  }

  updateResults(book, target) {
    const results = this.state.results;
    results.forEach((result) => {
      if (result.id === book.id) {
        result.shelf = target;
      }
    });
    this.setState({results: results});
  }

  updateShelves() {
    const self = this;
    BooksAPI.getAll().then(books => {
      console.log(books);
      const shelfReading = new Shelf("Currently Reading", "currentlyReading");
      const shelfToRead = new Shelf("Want To Read", "wantToRead");
      const shelfRead = new Shelf("Read", "read");

      books.forEach(function(book) {
        self.shelfMap[book.id] = book.shelf;
        const bookItem = new Book(
          book.id,
          book.imageLinks.smallThumbnail,
          book.title,
          book.authors ? book.authors[0]: '',
          book.shelf);
        switch (book.shelf) {
          case "currentlyReading":
            shelfReading.addBook(bookItem);
            break;
          case "wantToRead":
            shelfToRead.addBook(bookItem);
            break;
          case "read":
            shelfRead.addBook(bookItem);
            break;
          default:
            console.log("invalid shelf", book.shelf);
        }
      });

      this.setState({
        shelfReading: shelfReading,
        shelfToRead: shelfToRead,
        shelfRead: shelfRead
      });
    }).catch(err => {
      console.log("getAll error: " + err);
    });
  }
}

export default BooksApp
