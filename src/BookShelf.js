import React from "react";
import "./App.css";
import Book from "./Book";
import PropTypes from "prop-types";

class BookShelf extends React.Component {
  moveBooks = (book, shelf) => {
    this.props.moveBooks(book, shelf);
  };

  render() {
    const { shelfname, books } = this.props;

    return (
      <div className="book-shelf">
        <div>{shelfname}</div>
        <div className="book-list">
          <ol className="books-grid">
            {books.map((book) => (
              <li key={book.id}>
                <Book book={book} moveBooks={this.moveBooks} action="move" />
              </li>
            ))}
          </ol>
        </div>
      </div>
    );
  }
}

BookShelf.propTypes = {
  shelfname: PropTypes.string.isRequired,
  books: PropTypes.array.isRequired,
  moveBooks: PropTypes.func.isRequired,
};

export default BookShelf;
