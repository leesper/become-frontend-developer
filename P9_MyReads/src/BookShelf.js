import React from 'react'
import BookCollection from './BookCollection'
import './App.css'

class BookShelf extends React.Component {
  render() {
    return (
      <div className="bookshelf">
        <h2 className="bookshelf-title">{this.props.title}</h2>
        <BookCollection
          items={this.props.items}
          shelf={this.props.title}
        />
      </div>
    )
  }
}

export default BookShelf
