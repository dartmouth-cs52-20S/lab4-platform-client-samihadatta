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
import uploadImage from '../s3';

class NewPost extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: '',
            content: '',
            tags: '',
            coverUrl: '',
            preview: null,
            file: null,
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

    oncoverUrlChange = (event) => {
        this.setState({ coverUrl: event.target.value });
    }

    createPost = () => {
        if (imageUrlWorks(this.state.currentCoverUrl) || this.state.currentCoverUrl === '' || this.state.currentCoverUrl === undefined) {
            if (this.state.file) {
                uploadImage(this.state.file).then((url) => {
                    // use url for content_url and
                    // either run your createPost actionCreator
                    // or your updatePost actionCreator
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
                        coverUrl: this.state.coverUrl,
                        contentUrl: url,
                        _id: this.props.currentPost._id,
                    };
                    this.props.createPost(post, this.props.history);
                }).catch((error) => {
                    // handle error
                    console.log('s3 error ooooops');
                });
            } else {
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
                    coverUrl: this.state.coverUrl,
                    contentUrl: null,
                    _id: this.props.currentPost._id,
                };

                this.props.createPost(post, this.props.history);
            }
        } else {
            this.setState({ coverUrlFail: true });
        }
        // console.log('coverUrl');
        // console.log(this.state.coverUrl);
        // if (imageUrlWorks(this.state.coverUrl) || this.state.coverUrl === '') {
        //     const tags = this.state.tags.split(',');
        //     // eslint-disable-next-line no-plusplus
        //     for (let i = 0; i < tags.length; i++) {
        //         tags[i].trim();
        //     }
        //     const post = {
        //         title: this.state.title,
        //         tags,
        //         content: this.state.content,
        //         coverUrl: this.state.coverUrl,
        //     };
        //     this.props.createPost(post, this.props.history);
        // } else {
        //     this.setState({ coverUrlFail: true });
        // }
    }

    onImageUpload = (event) => {
        const file = event.target.files[0];
        // Handle null file
        // Get url of the file and set it to the src of preview
        if (file) {
            this.setState({ preview: window.URL.createObjectURL(file), file });
        }
    }

    rendercoverUrlError = () => {
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
                    <TextareaAutosize onChange={this.oncoverUrlChange} placeholder="cover URL" value={this.state.coverUrl} />
                    {this.rendercoverUrlError()}
                </div>
                <div className="edit-field">
                    <div className="edit-label">Content</div>
                    <TextareaAutosize onChange={this.onContentChange} placeholder="content" value={this.state.content} />
                </div>
                <img id="preview" alt="preview" src={this.state.preview} />
                <input type="file" name="coverImage" onChange={this.onImageUpload} />
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
