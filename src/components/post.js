/* eslint-disable react/no-danger */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import TextareaAutosize from 'react-textarea-autosize';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faChevronLeft, faEdit, faTimes, faCheck, faTrash, faPlusSquare,
} from '@fortawesome/free-solid-svg-icons';
import marked from 'marked';
import {
    fetchPost, deletePost, updatePost, fetchComments,
} from '../actions';
import { imageUrlWorks } from './lib';
import ErrorModal from './error';
import Loading from './loading';
import Comment from './comment';

class Post extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isEditing: false,
            currentTitle: '',
            currentTags: '',
            currentContent: '',
            currentCoverUrl: '',
            addingComment: false,
            coverUrlFail: false,
        };
    }

    componentDidMount() {
        this.props.fetchPost(this.props.match.params.postID);
        this.props.fetchComments(this.props.match.params.postID);
    }

    startEditing = () => {
        this.setState(() => ({
            isEditing: true,
            currentTitle: this.props.currentPost.title,
            currentTags: this.props.currentPost.tags.join(','),
            currentContent: this.props.currentPost.content,
            currentCoverUrl: this.props.currentPost.coverUrl,
            addingComment: false,
        }));
        // console.log(this.props.currentPost.tags);
    }

    handleUpdatePost = () => {
        if (imageUrlWorks(this.state.currentCoverUrl) || this.state.currentCoverUrl === '' || this.state.currentCoverUrl === undefined) {
            this.setState({ coverUrlFail: false });
            // console.log('current coverUrl');
            // console.log(this.state.coverUrl);
            let tags = this.state.currentTags;
            tags = tags.split(',');
            // eslint-disable-next-line no-plusplus
            for (let i = 0; i < tags.length; i++) {
                tags[i] = tags[i].trim();
            }
            // console.log('trimmed tags');
            // console.log(tags);
            const post = {
                title: this.state.currentTitle,
                tags,
                // tags: this.state.currentTags,
                content: this.state.currentContent,
                coverUrl: this.state.currentCoverUrl,
                _id: this.props.currentPost._id,
            };

            this.props.updatePost(post, () => this.setState({ isEditing: false }));
            // console.log('trying to fix');
            // console.log(this.props.currentPost);
        } else {
            this.setState({ coverUrlFail: true });
        }
        // setTimeout(() => { this.setState({ isEditing: false }); }, 0);
    }

    cancelUpdate = () => {
        this.setState(() => ({
            isEditing: false,
            currentTitle: this.props.currentPost.title,
            currentTags: this.props.currentPost.tags,
            currentContent: this.props.currentPost.content,
            currentCoverUrl: this.props.currentPost.coverUrl,
        }));
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

    onCoverUrlChange = (event) => {
        this.setState({ currentCoverUrl: event.target.value });
    }

    handleDelete = (event) => {
        event.preventDefault(); // just in case (Trevor's idea)
        this.props.deletePost(this.props.currentPost._id, this.props.history);
    }

    handleAddComment = () => {
        // console.log('in handleAddComment');
        this.setState({ addingComment: true });
    }

    handleAddedComment = () => {
        this.setState({ addingComment: false });
    }

    renderCoverImage = () => {
        if (imageUrlWorks(this.props.currentPost.coverUrl)) {
            return (
                // eslint-disable-next-line jsx-a11y/img-redundant-alt
                <img src={this.props.currentPost.coverUrl} className="post-cover-img" alt={`image found at: ${this.props.currentPost.coverUrl}`} />
            );
        } else {
            return <div />;
        }
    }

    renderCoverUrlError = () => {
        // console.log(this.state.coverUrl);
        if (this.state.coverUrlFail) {
            return (<div className="error-message">Invalid cover image URL!</div>);
        } else {
            return <div />;
        }
    }

    renderShow = () => {
        // console.log('currentPost in render');
        // console.log(this.props.currentPost);
        // console.log(this.props.currentPost.tags);
        const tagsString = this.props.currentPost.tags.join(',');
        return (
            <div className="post">
                <div className="post-icons">
                    <NavLink to="/"><FontAwesomeIcon icon={faChevronLeft} className="icon" /></NavLink>
                    <div className="edit-icons">
                        <FontAwesomeIcon icon={faEdit} onClick={this.startEditing} className="icon" />
                        <FontAwesomeIcon icon={faTrash} onClick={this.handleDelete} className="icon" />
                    </div>
                </div>
                <div className="post-info">
                    <div className="post-title">{this.props.currentPost.title}</div>
                    <div className="post-tags">{tagsString}</div>
                    {this.renderCoverImage()}
                    <div className="post-content" dangerouslySetInnerHTML={{ __html: marked(this.props.currentPost.content || '') }} />
                </div>
                {this.renderComments()}
            </div>
        );
    }

    renderEditing = () => {
        // const tags = this.state.currentTags.join(',');
        // // console.log('tags views');
        // console.log(this.state.currentTags);
        // console.log('current cover url');
        // console.log(this.state.currentCoverUrl);
        return (
            <div className="post post-edit">
                <div className="post-icons">
                    <NavLink to="/"><FontAwesomeIcon icon={faChevronLeft} className="icon" /></NavLink>
                    <FontAwesomeIcon icon={faTrash} onClick={this.handleDelete} className="icon" />
                </div>
                <div className="header">Edit Post</div>
                <div className="editing">
                    <div className="edit-field">
                        <div className="edit-label">Title</div>
                        <TextareaAutosize value={this.state.currentTitle} placeholder="title" onChange={this.onTitleChange} />
                    </div>
                    <div className="edit-field">
                        <div className="edit-label">Tags</div>
                        <TextareaAutosize value={this.state.currentTags} placeholder="tags" onChange={this.onTagsChange} />
                    </div>
                    <div className="edit-field">
                        <div className="edit-label">Cover Url</div>
                        <TextareaAutosize value={this.state.currentCoverUrl} placeholder="coverUrl" onChange={this.onCoverUrlChange} />
                        {this.renderCoverUrlError()}
                    </div>
                    <div className="edit-field">
                        <div className="edit-label">Content</div>
                        <TextareaAutosize value={this.state.currentContent} placeholder="content" onChange={this.onContentChange} />
                    </div>
                    <div className="edit-actions">
                        <div onClick={this.handleUpdatePost} className="action-button"><FontAwesomeIcon icon={faCheck} className="icon" />Update Post</div>
                        <div onClick={this.cancelUpdate} className="action-button"><FontAwesomeIcon icon={faTimes} className="icon" />Cancel</div>
                    </div>
                </div>

            </div>
        );
    }

    renderNewComment = () => {
        // console.log('rendering new comment ay');
        if (this.state.addingComment) {
            const comment = { content: '', postId: this.props.currentPost._id };
            return (
                <Comment comment={comment} key={comment._id} isNew="new" newCallback={this.handleAddedComment} />
            );
        } else {
            return <div />;
        }
    }

    renderComments = () => {
        // console.log('rendering comments woooo');
        // this.props.fetchComments(this.props.currentPost._id);
        if (this.props.currentComments !== undefined) {
            // console.log('currentComments');
            // console.log(this.props.currentComments);
            const comments = this.props.currentComments.map((comment) => {
                return <Comment comment={comment} key={comment._id} />;
            });
            return (
                <div id="comments">
                    <div className="comment-header">Comments</div>
                    <FontAwesomeIcon icon={faPlusSquare} className="icon" onClick={this.handleAddComment} />
                    <div className="comments-info">
                        {comments}
                        {this.renderNewComment()}
                    </div>
                </div>
            );
        } else if (this.state.addingComment === true) {
            return (
                <div id="comments">
                    <div className="comment-header">Comments</div>
                    <FontAwesomeIcon icon={faPlusSquare} className="icon" onClick={this.handleAddComment} />
                    <div className="comments-info">
                        {this.renderNewComment()}
                    </div>
                </div>
            );
        } else {
            return (
                <div id="comments">
                    <div className="comment-header">Comments</div>
                    <FontAwesomeIcon icon={faPlusSquare} className="icon" onClick={this.handleAddComment} />
                    <div className="empty-comments-state">
                        No comments yet!
                    </div>
                </div>
            );
        }
    }

    render() {
        // console.log('in render');
        // console.log(Object.keys(this.props.currentPost).length);
        if (this.props.currentPost === undefined || Object.keys(this.props.currentPost).length <= 0 || this.props.currentPost === {}) {
            return (
                <div>
                    <ErrorModal />
                    <Loading />
                </div>
            );
        } else if (this.state.isEditing) { // if (this.props.currentPost !== undefined && this.props.currentPost.length < 0) {
            return (
                <div>
                    <ErrorModal appElement={document.getElementById('post')} />
                    {this.renderEditing()}
                </div>
            );
        } else {
            // console.log('we in here');
            return (
                <div>
                    <ErrorModal appElement={document.getElementById('post')} />
                    {this.renderShow()}
                </div>
            );
        }
    }
}

const mapStateToProps = (reduxState) => {
    return {
        currentPost: reduxState.posts.current,
        currentComments: reduxState.comments.currentComments,
    };
};

export default connect(mapStateToProps, {
    fetchPost, deletePost, updatePost, fetchComments,
})(Post);
