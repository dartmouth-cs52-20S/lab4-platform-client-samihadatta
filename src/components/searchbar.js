import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faSearch,
} from '@fortawesome/free-solid-svg-icons';
import { search } from '../actions';

class SearchBar extends Component {
    constructor(props) {
        super(props);
        this.state = { searchTerm: '' };
    }

    onInputChange = (event) => {
        this.setState({ searchTerm: event.target.value });
    }

    search = () => {
        this.props.search(this.state.searchTerm);
    }

    render() {
        return (
            <div>
                <input onChange={this.onInputChange} value={this.state.searchTerm} placeholder="Search" />
                <FontAwesomeIcon icon={faSearch} className="icon" onClick={this.search} />
            </div>
        );
    }
}

export default connect(null, {
    search,
})(SearchBar);
