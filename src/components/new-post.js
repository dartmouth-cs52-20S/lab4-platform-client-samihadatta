import React, { Component } from 'react';
import { connect } from 'react-redux';
import TextareaAutosize from 'react-textarea-autosize';
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faChevronLeft,
} from '@fortawesome/free-solid-svg-icons';
import { createPost } from '../actions';

class NewPost extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: '',
            content: '',
            tags: '',
            coverURL: '',
        };
    }

    onTitleChange = (event) => {
        this.setState({ title: event.target.value });
    }

    onTagChange = (event) => {
        this.setState({ tags: event.target.value });
    }

    onContentChange = (event) => {
        this.setState({ content: event.target.value });
    }

    onCoverURLChange = (event) => {
        this.setState({ coverURL: event.target.value });
    }

    createPost = () => {
        console.log('in create post');
        const post = {
            title: this.state.title,
            tags: this.state.tags,
            content: this.state.content,
            coverURL: this.state.coverURL,
        };
        this.props.createPost(post, this.props.history);
        console.log('leaving create post');
    }

    render() {
        return (
            <div>
                <NavLink to="/"><FontAwesomeIcon icon={faChevronLeft} /></NavLink>
                <div className="header">Create a New Post</div>
                <div className="edit-label">Title</div>
                <TextareaAutosize onChange={this.onTitleChange} placeholder="title" value={this.state.title} />
                <div className="edit-label">Tags</div>
                <TextareaAutosize onChange={this.onTagChange} placeholder="tags" value={this.state.tags} />
                <div className="edit-label">Cover Url</div>
                <TextareaAutosize onChange={this.onCoverURLChange} placeholder="cover URL" value={this.state.coverURL} />
                <div className="edit-label">Content</div>
                <TextareaAutosize onChange={this.onContentChange} placeholder="content" value={this.state.content} />
                <button type="submit" onClick={this.createPost}>Create me</button>
            </div>
        );
    }
}

export default connect(null, { createPost })(NewPost);
