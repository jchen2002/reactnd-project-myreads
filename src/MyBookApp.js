import React from "react";
import * as BooksAPI from "./BooksAPI";
import "./App.css";
import { Route } from "react-router-dom";
import SearchBook from "./SearchBook";
import BookShelf from "./BookShelf";

class MyBookApp extends React.Component {
  state = {
    books: [],
  };

  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      this.setState({ books });
    });
  }

  filterBy = function(shelf) {
    return this.state.books.filter((b) => {
      return b.shelf === shelf;
    });
  };

  handleMove = (book, shelf) => {
    //get book list without the target book
    const booksWithoutbook = this.state.books.filter((b) => {
      return b.id !== book.id;
    });

    book.shelf = shelf;
    BooksAPI.update(book, shelf);

    this.setState({
      books: [...booksWithoutbook, book],
    });
  };

  shelfs = [
    { title: "Currently Reading", id: "currentlyReading" },
    { title: "Want to Read", id: "wantToRead" },
    { titel: "Read", id: "read" },
    { titel: "None", id: "none" },
  ];

  render() {
    //console.log("MyBookApp render:" + this.state.books);
    return (
      <div>
        <Route
          exact
          path="/"
          render={() => (
            <div className="mybookapp">
              <div className="list-books-title">
                <h1>MyReads</h1>
              </div>
              <BookShelf
                shelfname={"Currently Reading"}
                books={this.filterBy("currentlyReading")}
                moveBooks={this.handleMove}
              />
              <BookShelf
                shelfname={"Want to Read"}
                books={this.filterBy("wantToRead")}
                moveBooks={this.handleMove}
              />
              <BookShelf
                shelfname={"Read"}
                books={this.filterBy("read")}
                moveBooks={this.handleMove}
              />

              {/*
              {this.shelfs.map((s) => (
                <BookShelf
                  key={s.id}
                  shelfname={s.title}
                  books={this.filterBy(s.id)}
                  moveBooks={this.handleMove}
                />
              ))}
              */}
              <div className="open-search">
                <button onClick={(event) => (window.location.href = "/search")}>
                  Add a book
                </button>
              </div>
            </div>
          )}
        />

        <Route
          path="/search"
          render={() => (
            <SearchBook
              booksinshelf={this.state.books}
              moveBooks={this.handleMove}
            />
          )}
        />
      </div>
    );
  }
}

export default MyBookApp;
