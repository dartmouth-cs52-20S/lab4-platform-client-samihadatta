import React from 'react';
import { connect } from 'react-redux';
import { fetchPost } from '../actions';
import { imageUrlWorks } from './lib';

const PostThumbnail = (props) => {
    const renderImage = () => {
        if (imageUrlWorks(props.post.coverUrl)) {
            return (
                <img src={props.post.coverUrl} alt={`${props.post.coverUrl}`} />
            );
        } else {
            return <div />;
        }
    };
    const tags = props.post.tags.join(', ');
    return (
        // eslint-disable-next-line jsx-a11y/no-static-element-interactions
        <div className="thumbnail" onClick={() => props.fetchPost(props.post._id)}>
            {renderImage()}
            <div className="thumbnailTitle">{props.post.title}</div>
            <div className="thumbnailAuthor">{props.post.author.username}</div>
            <div className="thumbnailTags">{tags}</div>
        </div>
    );
};

export default connect(null, { fetchPost })(PostThumbnail);
