import React from 'react'
import './App.css'

class Changer extends React.Component {
  render() {
    return (
      <div className="book-shelf-changer">
        <select value={this.props.book.shelf} onChange={(e) => this.props.clickHandler(e, this.props.book)}>
          <option value="moveTo" disabled>Move to...</option>
          <option value="currentlyReading">Currently Reading</option>
          <option value="wantToRead">Want To Read</option>
          <option value="read">Read</option>
          <option value="none">None</option>
        </select>
      </div>
    )
  }
}

export default Changer;
