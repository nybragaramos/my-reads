import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Book from '../book/Book';
import PropTypes from 'prop-types';
import * as BooksAPI from './../../utils/BooksAPI';
import './Search.css';

const SEARCH_TERMS = ['Android', 'Art', 'Artificial Intelligence', 'Astronomy', 'Austen', 'Baseball', 'Basketball', 'Bhagat', 'Biography', 'Brief', 'Business', 'Camus', 'Cervantes', 'Christie', 'Classics', 'Comics', 'Cook', 'Cricket', 'Cycling', 'Desai', 'Design', 'Development', 'Digital Marketing', 'Drama', 'Drawing', 'Dumas', 'Education', 'Everything', 'Fantasy', 'Film', 'Finance', 'First', 'Fitness', 'Football', 'Future', 'Games', 'Gandhi', 'History', 'Homer', 'Horror', 'Hugo', 'Ibsen', 'Journey', 'Kafka', 'King', 'Lahiri', 'Larsson', 'Learn', 'Literary Fiction', 'Make', 'Manage', 'Marquez', 'Money', 'Mystery', 'Negotiate', 'Painting', 'Philosophy', 'Photography', 'Poetry', 'Production', 'Program Javascript', 'Programming', 'React', 'Redux', 'River', 'Robotics', 'Rowling', 'Satire', 'Science Fiction', 'Shakespeare', 'Singh', 'Swimming', 'Tale', 'Thrun', 'Time', 'Tolstoy', 'Travel', 'Ultimate', 'Virtual Reality', 'Web Development', 'iOS'];

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
		showingBooks: [],
		notFound: false
	}

	searchHandlerShelves(book, shelf){

		if(book.shelf === 'none') {
			book.shelf = shelf;
			/*add book do list of books with shelf*/
			let addBook = this.props.booksOnShelves;
			addBook.push(book);
			this.props.booksListHandler(addBook);

			/*update showingBooks*/
			let updateShowingBooks = this.state.showingBooks.map((showingBook) => {
				return ((showingBook.id === book.id) ? book : showingBook);
			});

			this.setState({showingBook: updateShowingBooks});
		}
		this.props.shelvesHandler(book, shelf);
	}

	updateSearch = (query) => {
		this.setState({ query: query });

		if(query) {
			BooksAPI.search(query).then((books) => {
				if(books.length > 0) {
					
					let updateBooks = books.map((book) => {
						const foundBook = this.props.booksOnShelves.find(function (element) {
							return element.id === book.id;
						})

						if (foundBook) { 
							return foundBook;
						} else {
							book.shelf = 'none';
							return book;
						}

					})
					this.updateBooks(updateBooks);
				} else {
					this.notFound();
				}
			})
		} else {
			console.log('clearBooks');
			this.clearBooks();
		}
	}

	updateQuery = (query) => {
		this.setState({ query: query });
	}

	updateBooks = (books) => {
		this.setState({ showingBooks: books, notFound: false});	
	}

	notFound = () => {
		this.setState({ showingBooks: [], notFound: true});
	}

	clearBooks = () => {
		this.setState({ showingBooks: [], notFound: false});
		console.log(this.state.showingBooks);
	}

	render() {
		const newBooks = this.state.showingBooks;
		const notFound = this.state.notFound;

		return (
			<div>
				<div className='search-bar'>
					<Link to='/' className='search-close' aria-label="Close">Close</Link>
					<input className='search-books' type='text' placeholder='Search books by title or author' aria-label='Search book by title or author' value={this.state.query} onChange= {(event) => this.updateSearch(event.target.value)}/>
				</div>
				{newBooks.length > 0 && (
					<div className='search-results'>
				
						<h1>Search returned {newBooks.length} books</h1>
						<ol className='shelf-books'>
							{this.state.showingBooks.map(book => <li key={book.id}><Book book={book} shelvesHandler={this.searchHandlerShelves}/></li>)}
						</ol>
					</div>
				)}
				{notFound && (
				<div className='not-found'>
					<h1>Please check the allowed search terms</h1>
					<ol>
						{SEARCH_TERMS.map(term => <li key={term}>{term}</li>)}
					</ol>
				</div>
				)}
			</div>
		);
	}
}

export default Search;

