import React from 'react'
import BookShelf from './BookShelf'

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
              />
            ))}
          </div>
        </div>
        <div className="open-search">
          <a onClick={this.props.onClick}>Add a book</a>
        </div>
      </div>
    )
  }
}

export default BookList
