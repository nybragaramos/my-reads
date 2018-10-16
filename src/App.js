import React, { Component } from 'react';
import * as BooksAPI from './utils/BooksAPI'
import Book from './components/book/Book'
// import logo from './logo.svg';
import './App.css';

class BooksApp extends Component {

  state = {
    books: []
  }

  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      console.log(books);
      this.setState({ books });
    });
  }

  render() {
    return (
      <div className="App">
        {this.state.books.map(book => (
          <Book key= {book.id} book={book}/>
        ))}
      </div>
    );
  }
}

export default BooksApp;
