/* eslint-disable react/no-danger */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import TextareaAutosize from 'react-textarea-autosize';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faEdit, faTimes, faCheck, faTrash,
} from '@fortawesome/free-solid-svg-icons';
import marked from 'marked';
import {
    addComment, deleteComment, updateComment, fetchComments, fetchPost,
} from '../actions';

class Comment extends Component {
    constructor(props) {
        super(props);
        // console.log('props from comment constructor');
        // console.log(props);
        this.state = {
            isEditing: false,
            currentContent: '',
        };
    }

    componentDidMount() {
        if (this.props.isNew !== undefined) {
            this.setState({ isEditing: true });
        }
    }

    startEditing = () => {
        this.setState(() => ({
            isEditing: true,
            currentContent: this.props.comment.content,
        }));
        // console.log(this.props.comment.tags);
    }

    createComment = () => {
        // console.log('creating comment!');
        const comment = { postId: this.props.comment.postId, content: this.state.currentContent };
        // console.log(comment);
        this.props.addComment(comment.postId, comment);
        this.props.newCallback();
    }

    handleUpdateComment = () => {
        // console.log('updating content?');
        if (this.props.newCallback !== undefined) {
            // console.log(this.props.newCallback);
            // console.log('is new');
            this.createComment();
        } else {
            // console.log('yuh');
            this.props.updateComment(this.props.comment._id,
                { _id: this.props.comment._id, content: this.state.currentContent, postId: this.props.comment.postId },
                () => this.setState({ isEditing: false }));
            // this.props.fetchComments(this.props.comment.postId);

        // setTimeout(() => { this.setState({ isEditing: false }); }, 0);
        }
    }

    cancelUpdate = () => {
        this.setState(() => ({
            isEditing: false,
            currentContent: this.props.comment.content,
        }));
    }

    onContentChange = (event) => {
        this.setState({ currentContent: event.target.value });
    }

    handleDelete = (event) => {
        event.preventDefault(); // just in case (Trevor's idea)
        this.props.deleteComment(this.props.comment._id, this.props.comment);
        // this.props.fetchComments(this.props.comment.postId);
        // this.props.fetchPost(this.props.comment.postId);
    }

    renderShow = () => {
        // console.log('comment in render');
        return (
            <div className="comment">
                <div className="comment-icons">
                    <FontAwesomeIcon icon={faEdit} onClick={this.startEditing} className="icon" />
                    <FontAwesomeIcon icon={faTrash} onClick={this.handleDelete} className="icon" />
                </div>
                <div className="comment-info">
                    <div className="comment-content" dangerouslySetInnerHTML={{ __html: marked(this.props.comment.content || '') }} />
                </div>
            </div>
        );
    }

    renderEditing = () => {
        return (
            <div className="comment comment-edit">
                <div className="comment-icons">
                    <FontAwesomeIcon icon={faTrash} onClick={this.handleDelete} className="icon" />
                </div>
                <div className="comment-editing">
                    <div className="edit-field">
                        <TextareaAutosize value={this.state.currentContent} placeholder="content" onChange={this.onContentChange} />
                    </div>
                    <div className="edit-actions">
                        <div onClick={this.handleUpdateComment} className="action-button"><FontAwesomeIcon icon={faCheck} className="icon" /></div>
                        <div onClick={this.cancelUpdate} className="action-button"><FontAwesomeIcon icon={faTimes} className="icon" /></div>
                    </div>
                </div>
            </div>
        );
    }

    render() {
        // console.log('in render for comments');
        // console.log(this.props);
        // console.log(this.props.comment);
        // console.log(Object.keys(this.props.comment).length);
        if (this.props.comment === undefined || Object.keys(this.props.comment).length <= 0 || this.props.currentPost === {}) {
            return (
                <div>
                    Loading comment...
                </div>
            );
        } else if (this.state.isEditing) {
            return (
                <div>
                    {this.renderEditing()}
                </div>
            );
        } else {
            return (
                <div>
                    {this.renderShow()}
                </div>
            );
        }
    }
}

export default connect(null, {
    addComment, deleteComment, updateComment, fetchComments, fetchPost,
})(Comment);
