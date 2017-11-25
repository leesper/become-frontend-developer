import React from 'react'

class BatchChanger extends React.Component {
  render() {
    return (
      <div className="batch-shelf-changer">
        <select onClick={(e) => this.props.batchHandler(e, this.props.title)}>
          <option value="none" disabled>Move to...</option>
          <option value="currentlyReading">{this.props.title === "Currently Reading" ? "√ " : " "}Currently Reading</option>
          <option value="wantToRead">{this.props.title === "Want To Read" ? "√ " : " "}Want To Read</option>
          <option value="read">{this.props.title === "Read" ? "√ " : " "}Read</option>
        </select>
      </div>
    )
  }
}

export default BatchChanger
