import React from 'react'

class BatchChanger extends React.Component {
  render() {
    return (
      <div className="batch-shelf-changer">
        <select value={this.props.title} onChange={(e) => this.props.batchHandler(e, this.props.title)}>
          <option value="moveTo" disabled>Move to...</option>
          <option value="currentlyReading">Currently Reading</option>
          <option value="wantToRead">Want To Read</option>
          <option value="read">Read</option>
        </select>
      </div>
    )
  }
}

export default BatchChanger
