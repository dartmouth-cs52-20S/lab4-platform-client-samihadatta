// /* eslint-disable react/no-danger */
// /* eslint-disable jsx-a11y/no-static-element-interactions */
// import React, { Component } from 'react';
// import { connect } from 'react-redux';
// import TextareaAutosize from 'react-textarea-autosize';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import {
//     faEdit, faTimes, faCheck, faTrash,
// } from '@fortawesome/free-solid-svg-icons';
// import marked from 'marked';
// import { fetchComment, deleteComment, updateComment } from '../actions';

// class Comment extends Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             isEditing: false,
//             currentContent: '',
//         };
//     }

//     componentDidMount() {
//         this.props.fetchComment(this.props.currentComment.id);
//     }

//     startEditing = () => {
//         this.setState(() => ({
//             isEditing: true,
//             currentContent: this.props.comment.content,
//         }));
//         console.log(this.props.comment.tags);
//     }

//     handleUpdateComment = () => {
//         this.props.updateComment({ id: this.props.comment.id, content: this.state.currentContent }, () => this.setState({ isEditing: false }));
//         console.log(this.props.comment);
//         // setTimeout(() => { this.setState({ isEditing: false }); }, 0);
//     }

//     cancelUpdate = () => {
//         this.setState(() => ({
//             isEditing: false,
//             currentContent: this.props.comment.content,
//         }));
//     }

//     onContentChange = (event) => {
//         this.setState({ currentContent: event.target.value });
//     }

//     handleDelete = (event) => {
//         event.preventDefault(); // just in case (Trevor's idea)
//         this.props.deleteComment(this.props.comment.id, this.props.history);
//     }

//     renderShow = () => {
//         console.log('comment in render');
//         console.log(this.props.comment);
//         return (
//             <div className="comment">
//                 <div className="comment-icons">
//                     <FontAwesomeIcon icon={faEdit} onClick={this.startEditing} className="icon" />
//                     <FontAwesomeIcon icon={faTrash} onClick={this.handleDelete} className="icon" />
//                 </div>
//                 <div className="comment-info">
//                     <div className="comment-content" dangerouslySetInnerHTML={{ __html: marked(this.props.currentPost.content || '') }} />
//                 </div>
//             </div>
//         );
//     }

//     renderEditing = () => {
//         return (
//             <div className="comment comment-edit">
//                 <div className="comment-icons">
//                     <FontAwesomeIcon icon={faTrash} onClick={this.handleDelete} className="icon" />
//                 </div>
//                 <div className="comment-editing">
//                     <div className="edit-field">
//                         <TextareaAutosize value={this.state.currentContent} placeholder="content" onChange={this.onContentChange} />
//                     </div>
//                     <div className="edit-actions">
//                         <div onClick={this.handleUpdatePost} className="action-button"><FontAwesomeIcon icon={faCheck} className="icon" /></div>
//                         <div onClick={this.cancelUpdate} className="action-button"><FontAwesomeIcon icon={faTimes} className="icon" /></div>
//                     </div>
//                 </div>
//             </div>
//         );
//     }

//     render() {
//         console.log('in render for comments');
//         console.log(Object.keys(this.props.currentPost).length);
//         if (this.props.currentComment === undefined || Object.keys(this.props.currentPost).length <= 0 || this.props.currentPost === {}) {
//             return (
//                 <div>
//                     Loading comment...
//                 </div>
//             );
//         } else if (this.state.isEditing) {
//             return (
//                 <div>
//                     {this.renderEditing()}
//                 </div>
//             );
//         } else {
//             return (
//                 <div>
//                     {this.renderShow()}
//                 </div>
//             );
//         }
//     }
// }

// export default connect(null, { fetchComment, deleteComment, updateComment })(Comment);
