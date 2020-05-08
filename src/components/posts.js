import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
    NavLink,
} from 'react-router-dom';
import PostThumbnail from './post-thumbnail';
import { fetchPosts } from '../actions';

class Posts extends Component {
    // on component did mount, call fetchPosts
    componentDidMount() {
        this.props.fetchPosts();
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
                        No posts here yet!
                    </div>
                );
            }
        } else {
            return (
                <div>Loading!</div>
            );
        }
    }
}

const mapStateToProps = (reduxState) => ({
    posts: reduxState.posts.all,
});

export default connect(mapStateToProps, { fetchPosts })(Posts);
