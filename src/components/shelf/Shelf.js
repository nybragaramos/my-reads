import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Book from '../book/Book'
import './Shelf.css';

class Shelf extends Component {

	static propTypes = {
		shelf: PropTypes.string.isRequired,
		books: PropTypes.array.isRequired
	}

	render() {
		let shelf = this.props.shelf;
		shelf = shelf.charAt(0).toUpperCase() + shelf.slice(1);
		shelf = shelf.replace(/([a-z](?=[A-Z]))/g, '$1 ')

		return (
			<div className='shelf'>
				<h2 className='shelf-title'>{shelf}</h2>
				<div >
					<ol className='shelf-books'>
						{this.props.books.map(book => <li key={book.id}><Book book={book} handler={this.props.shelvesHandler} /></li>)}
					</ol>
				</div>
			</div>
		);
	}
}

export default Shelf;