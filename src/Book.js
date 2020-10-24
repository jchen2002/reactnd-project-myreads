import React from "react";
import "./App.css";
import PropTypes from "prop-types";

class Book extends React.Component {
  handleMove = (event) => {
    event.preventDefault();
    this.props.moveBooks(this.props.book, event.target.value);
  };

  render() {
    const { book } = this.props;
    if (!book.shelf) book.shelf = "none";

    return (
      <div className="book">
        <div className="book-top">
          <div
            className="book-cover"
            style={{
              width: 128,
              height: 193,
              backgroundImage: `url("${book.imageLinks &&
                book.imageLinks.thumbnail}")`,
            }}
          />
          <div className="book-shelf-changer">
            <select value={book.shelf} onChange={this.handleMove}>
              <option value="move" disabled>
                Move to...
              </option>
              <option value="currentlyReading">Currently Reading</option>
              <option value="wantToRead">Want to Read</option>
              <option value="read">Read</option>
              <option value="none">None</option>
            </select>
          </div>
        </div>
        <div className="book-title">{book.title}</div>
        <div className="book-authors">{book.authors}</div>
      </div>
    );
  }
}

Book.propTypes = {
  book: PropTypes.object.isRequired,
  moveBooks: PropTypes.func.isRequired,
};

export default Book;
