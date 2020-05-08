import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import TextareaAutosize from 'react-textarea-autosize';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faArrowCircleLeft,
} from '@fortawesome/free-solid-svg-icons';
import { fetchPost, deletePost, updatePost } from '../actions';

class Post extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isEditing: false,
            currentTitle: '',
            currentTags: '',
            currentContent: '',
            currentCoverUrl: '',
        };
    }

    componentDidMount() {
        this.props.fetchPost(this.props.match.params.postID);
    }

    startEditing = () => {
        this.setState(() => ({
            isEditing: true,
            currentTitle: this.props.currentPost.title,
            currentTags: this.props.currentPost.tags,
            currentContent: this.props.currentPost.content,
            currentCoverUrl: this.props.currentPost.coverUrl,
        }));
    }

    stopEditing = () => {
        const post = {
            title: this.state.currentTitle,
            tags: this.state.currentTags,
            content: this.state.currentContent,
            coverUrl: this.state.currentCoverUrl,
            id: this.props.currentPost.id,
        };

        this.props.updatePost(post, () => this.setState({ isEditing: false }));

        // setTimeout(() => { this.setState({ isEditing: false }); }, 0);
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
        event.preventDefault(); // just in case
        this.props.deletePost(this.props.currentPost.id, this.props.history);
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

    renderCoverUrl = () => {
        if (this.state.isEditing) {
            return (
                <TextareaAutosize value={this.state.currentCoverUrl} placeholder="coverUrl" onChange={this.onCoverUrlChange} />
            );
        } else {
            return (
                <div>Cover Url: {this.props.currentPost.coverUrl}
                    <img src={this.props.currentPost.coverUrl} alt="coverUrl" />
                </div>
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

    renderDeleteButton = () => {
        return (
            <button type="submit"
                onClick={this.handleDelete}
            >
                Delete Me
            </button>
        );
    }

    renderShow = () => {
        return (
            <div className="post">
                <div>Title: {this.props.currentPost.title}</div>
                <div>Tags: {this.props.currentPost.tags}</div>
                <div>Cover Url: {this.props.currentPost.coverUrl}
                    <img src={this.props.currentPost.coverUrl} alt="coverUrl" />
                </div>
                <div>Content: {this.props.currentPost.content}</div>
            </div>
        );
    }

    renderEditing = () => {
        return (
            <div className="post">
                <div>Title</div>
                <TextareaAutosize value={this.state.currentTitle} placeholder="title" onChange={this.onTitleChange} />                <div>Tags: {this.props.currentPost.tags}</div>
                <div>Cover Url: {this.props.currentPost.coverUrl}
                    <img src={this.props.currentPost.coverUrl} alt="coverUrl" />
                </div>
                <div>Content: {this.props.currentPost.content}</div>
            </div>
        );
    }

    render() {
        if (this.props.currentPost === undefined || this.props.currentPost.length <= 0) {
            return (
                <div>Post is loading!</div>
            );
        } else if (this.state.isEditing) {
            return (
                {this.renderEditing()}
            );
        } else {
            return (
                {this.renderShow()}
                );
        }
        // } else { // if (this.props.currentPost !== undefined && this.props.currentPost.length < 0) {
        //     return (
        //         <div className="post">
        //             Id: {this.props.currentPost.id}
        //             {this.renderTitle()}
        //             {this.renderTags()}
        //             {this.renderContent()}
        //             {this.renderCoverUrl()}
        //             {this.renderUpdateButton()}
        //             <button type="submit"
        //                 onClick={this.handleDelete}
        //             >
        //                 Delete Me
        //             </button>
        //         </div>
        //     );
        // }
    }
}

const mapStateToProps = (reduxState) => {
    return {
        currentPost: reduxState.posts.current,
    };
};

export default connect(mapStateToProps, { fetchPost, deletePost, updatePost })(Post);
