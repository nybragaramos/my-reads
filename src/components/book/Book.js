import React, { Component } from 'react';
import PropTypes from 'prop-types';
import * as BooksAPI from './../../utils/BooksAPI'
import './Book.css';
import noImage from './icons/no-image.jpg'

class Book extends Component {

	static propTypes = {
		book: PropTypes.object.isRequired,
		shelvesHandler: PropTypes.func.isRequired
	}

	bookShelves(book, shelf){
		BooksAPI.update(book, shelf).then((value) => {
			this.props.shelvesHandler(book, shelf);
		})
	}

	render() {
		
		const book = this.props.book;
		const bookImg =
      book.imageLinks && book.imageLinks.thumbnail
        ? book.imageLinks.thumbnail
        : noImage;
    const title = book.title ? book.title : 'No title available';
    const authors = book.authors ? book.authors.join(', ') : 'No author available';

		return (

			<div className='book'>
				<div className='book-top'>
					<img src={bookImg} alt={`cover from {title}`} className='book-cover'/>
					<div className="book-shelf-hanger">
						<select value={book.shelf} onChange= {(event) => this.bookShelves(book, event.target.value)} aria-label="Select bookshelf">
							<option value="move" disabled>Move to...</option>
							<option value="currentlyReading">Currently Reading</option>
							<option value="wantToRead">Want to Read</option>
							<option value="read">Read</option>
							<option value="none">None</option>
						</select>
					</div>
				</div>
				<h3 className='book-title'>{title}</h3>
				<p className='book-authors'>{authors}</p>
				
			</div>
		);
	}
}

export default Book;

