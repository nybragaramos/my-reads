import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import './Search.css';

class Search extends Component {

	state = {
		query: ''
	}

	updateQuery = (query) => {
		this.setState({ query: query.trim() });
	}

	clearQuery =  () => {
		this.setState({ query: ''});
	}

	render() {
		
		let showingBooks;

		return (
			<div>
				<div className='search-bar'>
					<Link to='/' className='search-close'>Close</Link>
					<input className='search-books' type='text' placeholder='Search books by title or author' value={this.state.query} onChange= {(event) => this.updateQuery(event.target.value)}/>
				</div>
				<div className='search-results'>
					<p>Search</p>
				</div>
			</div>
		);
	}
}

export default Search;