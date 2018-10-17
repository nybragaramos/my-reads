import React, { Component } from 'react';
import PropTypes from 'prop-types';
import * as BooksAPI from './../../utils/BooksAPI'
import './Book.css';

class Book extends Component {

	static propTypes = {
		book: PropTypes.object.isRequired,
		shelvesHandler: PropTypes.func
	}

	state = {
		shelf: this.props.book.shelf,
		option: false
	}


	menu(book, event) {
		BooksAPI.get(book.id).then((upBook) => {
			this.setState({shelf: upBook.shelf});
			console.log(this.state.shelf);
			return(upBook);
		}).then((value) => console.log(value));
	}

	bookShelves(book, shelf){

	/*BooksAPI.get(book.id).then((upBook) => {
		console.log(upBook);
				if(upBook.shelf){
					this.setState({shelf: upBook.shelf})
				}
				else {
					this.setState({shelf: 'none'})
				}
			return(upBook)
		})*/
	/*.then((upBook) => {
			BooksAPI.update(upBook, shelf).then((value) => {
				if(this.props.shelvesHandler) {
					this.props.shelvesHandler(book, shelf);
				}
			})
			}
		)}*/

		BooksAPI.update(book, shelf).then((value) => {
			if(this.props.shelvesHandler) {
				this.props.shelvesHandler(book, shelf);
			}
		})
	}

	render() {
		let book = this.props.book;

		return (

			<div className='book'>
				<div className='book-top'>
					<img src={book.imageLinks.thumbnail} alt={`cover from {book.title}`} className='book-cover'/>
					<div className="book-shelf-changer">
						{/*<select value={book.shelf} onChange= {(event) => this.props.handler(book, event.target.value)}>*/}
						<select value={book.shelf || this.state.shelf  || 'none'} onChange= {(event) => this.bookShelves(book, event.target.value)} onFocus={(event) => this.menu(book, event)}>
							<option value="move" disabled>Move to...</option>
							<option value="currentlyReading">Currently Reading</option>
							<option value="wantToRead">Want to Read</option>
							<option value="read">Read</option>
							<option value="none">None</option>
						</select>
					</div>
				</div>
				<h3 className='book-title'>{book.title}</h3>
				<p className='book-authors'>{book.authors.join(', ')}</p>
			</div>
		);
	}
}

export default Book;