import React, { Component } from 'react';
import { connect } from 'react-redux';
import TextareaAutosize from 'react-textarea-autosize';
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faChevronLeft, faPlus,
} from '@fortawesome/free-solid-svg-icons';
import { createPost } from '../actions';
import { imageUrlWorks } from './lib';

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
        if (imageUrlWorks(this.state.coverURL) || this.state.coverURL === '') {
            const post = {
                title: this.state.title,
                tags: this.state.tags,
                content: this.state.content,
                coverURL: this.state.coverURL,
            };
            this.props.createPost(post, this.props.history);
        } else {
            this.setState({ coverUrlFail: true });
        }
    }

    renderCoverUrlError = () => {
        if (this.state.coverUrlFail) {
            console.log('failed');
            return (<div className="error-message">Invalid cover image URL!</div>);
        } else {
            return <div />;
        }
    }

    render() {
        return (
            <div className="new-form">
                <NavLink to="/"><FontAwesomeIcon icon={faChevronLeft} /></NavLink>
                <div className="header">Create a New Post</div>
                <div className="edit-field">
                    <div className="edit-label">Title</div>
                    <TextareaAutosize onChange={this.onTitleChange} placeholder="title" value={this.state.title} />
                </div>
                <div className="edit-field">
                    <div className="edit-label">Tags</div>
                    <TextareaAutosize onChange={this.onTagChange} placeholder="tags" value={this.state.tags} />
                </div>
                <div className="edit-field">
                    <div className="edit-label">Cover Url</div>
                    <TextareaAutosize onChange={this.onCoverURLChange} placeholder="cover URL" value={this.state.coverURL} />
                    {this.renderCoverUrlError()}
                </div>
                <div className="edit-field">
                    <div className="edit-label">Content</div>
                    <TextareaAutosize onChange={this.onContentChange} placeholder="content" value={this.state.content} />
                </div>
                {/* eslint-disable-next-line jsx-a11y/no-static-element-interactions */}
                <div className="action-button" onClick={this.createPost}>
                    <FontAwesomeIcon icon={faPlus} />
                    <div className="action-button-text">Create a post</div>
                </div>
            </div>
        );
    }
}

export default connect(null, { createPost })(NewPost);
