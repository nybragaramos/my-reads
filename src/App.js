import React, { Component } from 'react';
/*import * as BooksAPI from './utils/BooksAPI'
import Book from './components/book/Book'*/
import BookList from './components/bookList/BookList'

// import logo from './logo.svg';
import './App.css';

const shelves = [
  "currentlyReading",
  "wantToRead",
  "read",
  ];

class App extends Component {
  render() {
    return (
      <div className="App">
        <header>
          <h1>My Reads</h1>
        </header>
        <ol>
          {shelves.map(shelf => <li key={shelf}><BookList shelf={shelf} /></li>)}
        </ol>
      </div>
    );
  }
}

export default App;
