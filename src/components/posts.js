import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
    NavLink,
} from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import PostThumbnail from './post-thumbnail';
import { fetchPosts } from '../actions';
import Loading from './loading';

class Posts extends Component {
    // on component did mount, call fetchPosts
    componentDidMount() {
        this.props.fetchPosts();
    }

    renderEmptyState = () => {
        return (
            <div className="empty-state">
                <div className="header">There are no posts here yet!</div>
                <img src="https://media.giphy.com/media/vvWhQsVAFkyisScAsM/giphy.gif" alt=" " />
                <NavLink to="/posts/new">
                    <div className="action-button">
                        <FontAwesomeIcon icon={faPlus} />
                        <div className="action-button-text">Create a post</div>
                    </div>
                </NavLink>
            </div>
        );
    }

    render() {
        if (this.props.posts !== undefined) {
            const posts = this.props.posts.map((post) => {
                return <NavLink to={`/posts/${post.id}`} key={post.id}><PostThumbnail key={post.id} post={post} /></NavLink>;
            });
            if (posts.length > 0) {
                return (
                    <div id="posts">
                        <div className="header"> Posts</div>
                        {posts}
                    </div>
                );
            } else {
                return (
                    <div id="posts">
                        {this.renderEmptyState()}
                    </div>
                );
            }
        } else {
            return (
                <div>
                    {Loading}
                </div>
            );
        }
    }
}

const mapStateToProps = (reduxState) => ({
    posts: reduxState.posts.all,
});

export default connect(mapStateToProps, { fetchPosts })(Posts);
