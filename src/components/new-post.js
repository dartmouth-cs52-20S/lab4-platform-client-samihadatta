import React, { Component } from 'react';
import { connect } from 'react-redux';
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
                <input onChange={this.onTitleChange} placeholder="title" value={this.state.title} />
                <input onChange={this.onTagChange} placeholder="tags" value={this.state.tags} />
                <input onChange={this.onContentChange} placeholder="content" value={this.state.content} />
                <input onChange={this.onCoverURLChange} placeholder="cover URL" value={this.state.coverURL} />
                <button type="submit" onClick={this.createPost}>Create me</button>
            </div>
        );
    }
}

export default connect(null, { createPost })(NewPost);
