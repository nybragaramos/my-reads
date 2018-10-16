import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './Book.css';

class Book extends Component {

	static propTypes = {
		book: PropTypes.object.isRequired,
	}

	state = {
		shelter:''
	}

	render() {
		let book = this.props.book;
		console.log(this.props.book.authors)
		return (
			<div className='book'>
				<div className='book-top'>
					<img src={book.imageLinks.thumbnail} alt={`cover from {book.title}`} className='book-cover'/>
					<div className="book-shelf-changer">
						<select>
							<option value="move" disabled>Move to...</option>
							<option value="currentlyReading">Currently Reading</option>
							<option value="wantToRead">Want to Read</option>
							<option value="read">Read</option>
							<option value="none">None</option>
						</select>
					</div>
				</div>
				<h2 className='book-title'>{book.title}</h2>
				<p className='book-authors'>{book.authors.join(', ')}</p>
			</div>
		);
	}
}

export default Book;