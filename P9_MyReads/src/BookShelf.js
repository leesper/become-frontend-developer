import React from 'react'
import BookCollection from './BookCollection'
import BatchChanger from './BatchChanger'
import './App.css'

class BookShelf extends React.Component {
  render() {
    return (
      <div className="bookshelf">
        <h2 className="bookshelf-title">{this.props.title}</h2>
        <BatchChanger
          batchHandler={this.props.batchHandler}
          title={this.props.title}
        />
        <BookCollection
          items={this.props.items}
          shelf={this.props.title}
          clickHandler={this.props.clickHandler}
          collectType="bookshelf-books"
        />
      </div>
    )
  }
}

export default BookShelf
