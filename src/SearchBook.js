import React from "react";
import * as BooksAPI from "./BooksAPI";
import "./App.css";
import Book from "./Book";
import PropTypes from "prop-types";

class SearchBook extends React.Component {
  state = {
    books: [],
  };

  searchBook = (query) => {
    const booksinshelf = this.props.booksinshelf;

    BooksAPI.search(query).then((booksfound) => {
      if (booksfound && booksfound.length > 0) {
        booksfound.forEach((book) => {
          //update the book shelf if this book is in a shelf
          booksinshelf.forEach((b) => {
            if (book.id === b.id) {
              book.shelf = b.shelf;
            }
          });
        });

        this.setState({ books: booksfound });
      } else {
        this.setState({ books: [] });
      }
    });
  };

  moveBooks = (book, shelf) => {
    this.props.moveBooks(book, shelf);
  };

  render() {
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <button
            className="close-search"
            onClick={(event) => (window.location.href = "/")}
          >
            Close
          </button>
          <div className="search-books-input-wrapper">
            {/*
                  NOTES: The search from BooksAPI is limited to a particular set of search terms.
                  You can find these search terms here:
                  https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                  However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                  you don't find a specific author or title. Every search is limited by search terms.
                */}
            <input
              type="text"
              placeholder="Search by title or author"
              onChange={(event) => this.searchBook(event.target.value)}
            />
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            {this.state.books.map((book) => (
              <li key={book.id}>
                <Book book={book} moveBooks={this.moveBooks} />
              </li>
            ))}
          </ol>
        </div>
      </div>
    );
  }
}

SearchBook.propTypes = {
  booksinshelf: PropTypes.array.isRequired,
  moveBooks: PropTypes.func.isRequired,
};
export default SearchBook;
