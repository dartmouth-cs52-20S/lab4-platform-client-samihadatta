import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faSearch, faUndo,
} from '@fortawesome/free-solid-svg-icons';
import { fetchPosts, search } from '../actions';

class SearchBar extends Component {
    constructor(props) {
        super(props);
        this.state = { searchTerm: '' };
    }

    onInputChange = (event) => {
        this.setState({ searchTerm: event.target.value });
    }

    search = () => {
        this.props.onSearch();
        this.props.search(this.state.searchTerm);
    }

    refresh = () => {
        console.log('in refresh');
        this.setState({ searchTerm: '' });
        this.props.onReturn();
        this.props.fetchPosts();
    }

    render() {
        return (
            <div className="search">
                <input onChange={this.onInputChange} value={this.state.searchTerm} placeholder="Search" />
                <FontAwesomeIcon icon={faSearch} className="icon" onClick={this.search} />
                <FontAwesomeIcon icon={faUndo} className="icon" onClick={this.refresh} />
            </div>
        );
    }
}

export default connect(null, {
    fetchPosts, search,
})(SearchBar);
