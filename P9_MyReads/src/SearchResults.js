import React from 'react'
import BookCollection from './BookCollection'

class SearchResults extends React.Component {
  render() {
    return (
      // <div className="search-books-results">
      //   <ol className="books-grid"></ol>
      // </div>
      <BookCollection
        items={this.props.results}
        clickHandler={this.props.clickHandler}
        collectType="search-books-results"
      />
    )
  }
}

export default SearchResults
