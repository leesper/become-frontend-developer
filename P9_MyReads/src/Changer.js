import React from 'react'
import './App.css'

class Changer extends React.Component {
  render() {
    return (
      <div className="book-shelf-changer">
        <select onChange={(e) => this.props.clickHandler(e, this.props.bookid, this.props.shelf)}>
          <option value="none" disabled>Move to...</option>
          <option value="currentlyReading">{this.props.shelf === "currentlyReading" ? "√ " : " "}Currently Reading</option>
          <option value="wantToRead">{this.props.shelf === "wantToRead" ? "√ " : " "}Want To Read</option>
          <option value="read">{this.props.shelf === "read" ? "√ " : " "}Read</option>
          <option value="none">None</option>
        </select>
      </div>
    )
  }
}

export default Changer;
