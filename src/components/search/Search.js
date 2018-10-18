import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Book from '../book/Book';
import PropTypes from 'prop-types';
import * as BooksAPI from './../../utils/BooksAPI';
import './Search.css';

class Search extends Component {

	constructor(props) {
    super(props);
    this.searchHandlerShelves = this.searchHandlerShelves.bind(this);
  }

	static propTypes = {
		booksOnShelves: PropTypes.array,
		shelvesHandler: PropTypes.func.isRequired,
		booksListHandler: PropTypes.func.isRequired
	}

	state = {
		query: '',
		showingBooks: []
	}

	searchHandlerShelves(book, shelf){

		if(book.shelf === 'none') {
			book.shelf=shelf;

			/*add book do list of books with shelf*/
			let addBook = this.props.booksOnShelves;
			addBook.push(book);
			this.props.booksListHandler(addBook);

			/*update showingBooks*/
			let updateShowingBooks = this.state.showingBooks.map((showingBook) => {
				if(showingBook.id === book.id){
					return book;
				} return showingBook;
			});

			this.setState({showingBook: updateShowingBooks});
		}
		this.props.shelvesHandler(book, shelf);
	}

	updateSearch = (query) => {
		/*Adjust Query to not allow double space*/
		let newQuery = query.split('  ');
		query = newQuery.join(' ');
 		this.updateQuery(query);

		if(query.length > 0) {
			BooksAPI.search(query).then((books) => {
				if(books.length > 0) {
					
					let updateBooks = books.map((book) => {
						const b = this.props.booksOnShelves.find(function (element) {
							return element.id === book.id;
						})
						if(b) {
							return b
						} else {
							book.shelf = 'none';
							return book;
						}

					})
					this.updateBooks(updateBooks);
				} else {
					this.clearQuery();
				}
			})
		} else {
				this.clearQuery();
		}
	}

	updateQuery = (query) => {
		this.setState({ query: query });
	}

	updateBooks = (books) => {
		this.setState({ showingBooks: books});
	}

	clearQuery =  () => {
		this.setState({ showingBooks: []});
	}

	render() {

		return (
			<div>
				<div className='search-bar'>
					<Link to='/' className='search-close'>Close</Link>
					<input className='search-books' type='text' placeholder='Search books by title or author' value={this.state.query} onChange= {(event) => this.updateSearch(event.target.value)}/>
				</div>
				<div className='search-results'>
					<ol className='shelf-books'>
						{this.state.showingBooks.map(book => <li key={book.id}><Book book={book} shelvesHandler={this.searchHandlerShelves}/></li>)}
					</ol>
				</div>
			</div>
		);
	}
}

export default Search;

