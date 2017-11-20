import React from 'react'
import SearchBar from './SearchBar'
import SearchResults from './SearchResults'

class BookSearch extends React.Component {
  render() {
    return (
      <div className="search-books">
        <SearchBar
          onClick={this.props.onClick}
        />
        <SearchResults />
      </div>
    )
  }
}

export default BookSearch
