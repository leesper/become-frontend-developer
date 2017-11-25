import React from 'react'
import BookShelf from './BookShelf'
import { Link } from 'react-router-dom'

class BookList extends React.Component {
  render() {
    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          <div>
            {this.props.shelves.map(shelf => (
              <BookShelf
                key={shelf.title}
                title={shelf.title}
                items={shelf.items}
                clickHandler={this.props.clickHandler}
                batchHandler={this.props.batchHandler}
              />
            ))}
          </div>
        </div>
        <div className="open-search">
          <Link to="/search">Add a book</Link>
        </div>
      </div>
    )
  }
}

export default BookList
