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
        console.log('in posts did mount');
        this.props.fetchPosts();
    }

    render() {
        console.log('in posts render');
        console.log('props:');
        console.log(this.props);
        console.log('going into map');
        if (this.props.posts !== undefined) {
            const posts = this.props.posts.map((post) => {
                return <NavLink to={`/posts/${post.id}`} key={post.id}><PostThumbnail key={post.id} post={post} /></NavLink>;
            });

            return (
                <div id="posts">
                    {posts}
                </div>
            );
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