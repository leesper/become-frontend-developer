import React from 'react'
import Changer from './Changer'

const BookItem = (props) => {
  return (
    <li>
      <div className="book">
        <div className="book-top">
          <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${props.book.image})` }} ></div>
          <Changer
            book={props.book}
            shelf={props.shelf}
            clickHandler={props.clickHandler}
          />
        </div>
        <div className="book-title">{props.book.title}</div>
        <div className="book-authors">{props.book.authors}</div>
      </div>
    </li>
  )
};

export default BookItem;
