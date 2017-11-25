import React from 'react'
import BookItem from './BookItem'
import './App.css'

class BookCollection extends React.Component {
  render() {
    return (
      <div className={this.props.collectType}>
        <ol className="books-grid">
          {this.props.items && this.props.items.map(item => (
            <BookItem
              key={item.id}
              book={item}
              clickHandler={this.props.clickHandler}
            />
          ))}
        </ol>
      </div>
    )
  }
}

export default BookCollection
