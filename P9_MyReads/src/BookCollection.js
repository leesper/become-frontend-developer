import React from 'react'
import BookItem from './BookItem'
import './App.css'

class BookCollection extends React.Component {
  render() {
    return (
      <div className="bookshelf-books">
        <ol className="books-grid">
          {this.props.items.map(item => (
            <BookItem
              key={item.title}
              image={item.image}
              title={item.title}
              authors={item.authors}
            />
          ))}
        </ol>
      </div>
    )
  }
}

export default BookCollection
