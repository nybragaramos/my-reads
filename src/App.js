import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';
import * as BooksAPI from './utils/BooksAPI'
import Shelf from './components/shelf/Shelf'
import Search from './components/search/Search'
import './App.css';

const shelves = [
  "currentlyReading",
  "wantToRead",
  "read",
  ];

class App extends Component {

  constructor(props) {
    super(props);
    this.shelvesHandler = this.shelvesHandler.bind(this);
    this.booksListHandler = this.booksListHandler.bind(this);
  }

  state = {
    booksShelves: [],
    booksList: []
  }

  componentDidMount() {

    function shelfType(shelfName) {
      return function(element) {
        return element.shelf === shelfName;
      }
    }

    BooksAPI.getAll()
    .then((books) => {    
      this.setState(
        {booksList: books, booksShelves: shelves.map((shelf) => {
          return({shelf: shelf, books: books.filter(shelfType(shelf))})
        })
      });
    })
  }

  booksListHandler (list) {
    if(list) {
      this.setState({booksList: list});
    }
  }

  shelvesHandler(param, e) {
      let values = this.state.booksShelves.map((value) => {
        if(value.shelf === param.shelf){
          value.books = value.books.map((book) => {
            if(book.id === param.id) {
              book.shelf=e;
            }
            return book;
          });

          value.books = value.books.filter(
            book => book.id !== param.id)
        }

        if(value.shelf === e){
          value.books.push(param);
        }

        return value;
      });
    this.setState({booksShelves: values});
  }

  render() {
    let booksShelves = this.state.booksShelves;
    return (
    <div>
      <Route exact path='/' render= {() => (
        <div className="shelves">
          <header>
          <h1>My Reads</h1>
          </header>
          <main>
            <ol>
              {booksShelves.map(booksShelves => <li key={booksShelves.shelf}><Shelf shelf={booksShelves.shelf} books={booksShelves.books} shelvesHandler = {this.shelvesHandler}/></li>)}
            </ol>
          </main>
          <Link to='/search' className='search-button'>Add contact</Link>
        </div>
      )}/>
      <Route path='/search' render={({ history }) => (
        <Search shelvesHandler = {this.shelvesHandler} booksOnShelves={this.state.booksList} booksListHandler= {this.booksListHandler} onSearch={ () => { history.push('/'); } }/>
      )}/>
    </div>
    );
  }
}

export default App;
