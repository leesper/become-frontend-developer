import React from 'react'
import SearchBar from './SearchBar'
import SearchResults from './SearchResults'

class BookSearch extends React.Component {
  render() {
    return (
      <div className="search-books">
        <SearchBar
          onSearch={this.props.onSearch}
        />
        <SearchResults
          results={this.props.results}
          clickHandler={this.props.clickHandler}
        />
      </div>
    )
  }
}

export default BookSearch
