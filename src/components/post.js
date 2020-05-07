import React, { Component } from 'react';
import { connect } from 'react-redux';
import TextareaAutosize from 'react-textarea-autosize';
import { fetchPost, deletePost, updatePost } from '../actions';

class Post extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isEditing: false,
            // currentTitle: '',
            // currentTags: '',
            // currentContent: '',
            // currentCoverURL: '',
        };
    }

    componentDidMount() {
        console.log('in component did mount');
        // console.log(this.propsmatch);
        console.log('id?');
        console.log(this.props.match.params.postID);
        this.props.fetchPost(this.props.match.params.postID);
        console.log('current post');
        console.log(this.props.currentPost);
    }

    startEditing = () => {
        console.log('we\'re editing!');
        this.setState((prevState) => ({
            isEditing: !prevState.isEditing,
            currentTitle: this.props.currentPost.title,
            currentTags: this.props.currentPost.tags,
            currentContent: this.props.currentPost.content,
            currentCoverURL: this.props.currentPost.coverURL,
        }));
        console.log('state:');
        console.log(this.state);
        console.log('current post:');
        console.log(this.props.currentPost);
    }

    stopEditing = () => {
        const post = {
            title: this.state.currentTitle,
            tags: this.state.currentTags,
            content: this.state.currentContent,
            coverURL: this.state.currentCoverURL,
            id: this.props.currentPost.id,
        };

        this.setState((prevState) => ({
            isEditing: !prevState.isEditing,
            currentTitle: '',
            currentTags: '',
            currentContent: '',
            currentCoverURL: '',
        }));

        this.props.updatePost(post, this.props.history);
    }

    onTitleChange = (event) => {
        this.setState({ currentTitle: event.target.value });
    }

    onTagsChange = (event) => {
        this.setState({ currentTags: event.target.value });
    }

    onContentChange = (event) => {
        this.setState({ currentContent: event.target.value });
    }

    onCoverURLChange = (event) => {
        this.setState({ currentCoverURL: event.target.value });
    }

    renderTitle = () => {
        if (this.state.isEditing) {
            return (
                <TextareaAutosize value={this.state.currentTitle} placeholder="title" onChange={this.onTitleChange} />
            );
        } else {
            return (
                <div>Title: {this.props.currentPost.title}</div>
            );
        }
    }

    renderTags = () => {
        if (this.state.isEditing) {
            return (
                <TextareaAutosize value={this.state.currentTaags} placeholder="tags" onChange={this.onTagsChange} />
            );
        } else {
            return (
                <div>Tags: {this.props.currentPost.tags}</div>
            );
        }
    }

    renderContent = () => {
        if (this.state.isEditing) {
            return (
                <TextareaAutosize value={this.state.currentContent} placeholder="content" onChange={this.onContentChange} />
            );
        } else {
            return (
                <div>Content: {this.props.currentPost.content}</div>
            );
        }
    }

    renderCoverURL = () => {
        if (this.state.isEditing) {
            return (
                <TextareaAutosize value={this.state.currentCoverURL} placeholder="title" onChange={this.onCoverURLChange} />
            );
        } else {
            return (
                <div>Cover URL: {this.props.currentPost.coverURL}</div>
            );
        }
    }

    renderUpdateButton = () => {
        if (this.state.isEditing) {
            return (
                <button type="submit" onClick={this.stopEditing}>Done</button>
            );
        } else {
            return (
                <button type="submit" onClick={this.startEditing}>Edit Me</button>
            );
        }
    }

    render() {
        console.log('in post render');
        console.log(this.props);
        console.log('current post');
        console.log(this.props.currentPost);
        if (this.props.currentPost === undefined || this.props.currentPost.length <= 0) {
            return (
                <div>Post is loading!</div>
            );
        } else { // if (this.props.currentPost !== undefined && this.props.currentPost.length < 0) {
            console.log('not undefined!');
            return (
                <div>
                    Id: {this.props.currentPost.id}
                    {this.renderTitle()}
                    {this.renderTags()}
                    {this.renderContent()}
                    {this.renderCoverURL()}
                    <button type="submit" onClick={this.props.deletePost}>Delete Me</button>
                </div>
            );
        }
    }
}

const mapStateToProps = (reduxState) => {
    return {
        currentPost: reduxState.posts.current,
    };
};

export default connect(mapStateToProps, { fetchPost, deletePost, updatePost })(Post);
