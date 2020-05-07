import React from 'react';
import { connect } from 'react-redux';
import { fetchPost } from '../actions';

const PostThumbnail = (props) => {
    console.log('post:');
    console.log(props.post);
    return (
        // eslint-disable-next-line jsx-a11y/no-static-element-interactions
        <div className="thumbnail" onClick={() => props.fetchPost(props.post.id)}>
            <div className="postThumbnailTitle">{props.post.title}</div>
            <div className="postThumbnailTags">{props.post.tags}</div>
            <img src={props.post.coverURL} alt="cover url" />
        </div>
    );
};

export default connect(null, { fetchPost })(PostThumbnail);
