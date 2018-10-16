import React, { Component } from 'react';
import PropTypes from 'prop-types';
import * as BooksAPI from '../../utils/BooksAPI'
import Book from '../book/Book'
import './BookList.css';

class BookList extends Component {

	static propTypes = {
		shelf: PropTypes.string.isRequired,
	}

	state = {
    books: []
  }

  componentDidMount() {

  	function shelfType(shelfName) {
    	return function(element) {
      	return element.shelf === shelfName;
    	}
		}

    BooksAPI.getAll().then((books) => {
      this.setState({books: books.filter(shelfType(this.props.shelf))});
    });
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
						{this.state.books.map(book => <li key={book.id}><Book  book={book} /></li>)}
					</ol>
				</div>
			</div>
		);
	}


}

export default BookList;