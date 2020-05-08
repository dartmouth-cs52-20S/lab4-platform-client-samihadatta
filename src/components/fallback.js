import React from 'react';
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faList } from '@fortawesome/free-solid-svg-icons';

const Fallback = () => {
    return (
        <div>
            <div id="fallback">
                <div className="header">Oops!</div>
                <img src="https://media.giphy.com/media/JIX9t2j0ZTN9S/giphy.gif" alt="cat gif" />
                <div className="fallback-text">Nothing here but this cat gif!</div>
                <NavLink to="/">
                    <div className="action-button">
                        <FontAwesomeIcon icon={faList} />
                        <div className="action-button-text">Back to posts</div>
                        <FontAwesomeIcon icon={faList} />
                    </div>
                </NavLink>
            </div>
        </div>
    );
};

export default Fallback;
