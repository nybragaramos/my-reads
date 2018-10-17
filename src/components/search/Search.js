import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Book from '../book/Book'
import * as BooksAPI from './../../utils/BooksAPI'
import './Search.css';

class Search extends Component {

	state = {
		query: '',
		showingBooks: []
	}

	updateSearch = (query) => {

		/*Adjust Query to not allow double space*/
		let newQuery = query.split(' ');
		newQuery = newQuery.filter(function(str) {
    		return /\S/.test(str);
		});
		query = newQuery.join(' ');

		this.updateQuery(query);

		if(query.length > 0) {
			BooksAPI.search(query).then((books) => {
				if(books.length > 0) {
					this.updateBooks(books);
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
						{this.state.showingBooks.map(book => <li key={book.id}><Book book={book} shelvesHandler={this.props.shelvesHandler}/></li>)}
					</ol>
				</div>
			</div>
		);
	}
}

export default Search;