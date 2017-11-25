import React from 'react'
import './App.css'

class Changer extends React.Component {
  render() {
    return (
      <div className="book-shelf-changer">
        <select onClick={(e) => this.props.clickHandler(e, this.props.book)}>
          <option value="none" disabled>Move to...</option>
          <option value="currentlyReading">{this.props.book.shelf === "currentlyReading" ? "√ " : " "}Currently Reading</option>
          <option value="wantToRead">{this.props.book.shelf === "wantToRead" ? "√ " : " "}Want To Read</option>
          <option value="read">{this.props.book.shelf === "read" ? "√ " : " "}Read</option>
          <option value="none">None</option>
        </select>
      </div>
    )
  }
}

export default Changer;
