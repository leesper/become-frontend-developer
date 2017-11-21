import React from 'react'
import './App.css'

class Changer extends React.Component {
  render() {
    return (
      <div className="book-shelf-changer">
        <select>
          <option value="none" disabled>Move to...</option>
          <option value="currentlyReading">{this.props.shelf === "Currently Reading" ? "√ " : " "}Currently Reading</option>
          <option value="wantToRead">{this.props.shelf === "Want To Read" ? "√ " : " "}Want To Read</option>
          <option value="read">{this.props.shelf === "Read" ? "√ " : " "}Read</option>
          <option value="none">None</option>
        </select>
      </div>
    )
  }
}

export default Changer;
