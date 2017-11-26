import React from 'react'
import './App.css'
import Changer from './Changer'

class BookItem extends React.Component {
  render() {
    return (
      <li>
        <div className="book">
          <div className="book-top">
            <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${this.props.book.image})` }} ></div>
            <Changer
              book={this.props.book}
              shelf={this.props.shelf}
              clickHandler={this.props.clickHandler}
            />
          </div>
          <div className="book-title">{this.props.book.title}</div>
          <div className="book-authors">{this.props.book.authors}</div>
        </div>
      </li>
    )
  }
}

export default BookItem
