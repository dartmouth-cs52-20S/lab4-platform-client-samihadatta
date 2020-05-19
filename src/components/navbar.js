/* eslint-disable jsx-a11y/no-static-element-interactions */
import React from 'react';
import {
    NavLink, withRouter,
} from 'react-router-dom';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faFeather, faList, faPlusCircle,
} from '@fortawesome/free-solid-svg-icons';
import { signoutUser } from '../actions';

const Nav = (props) => {
    const handleSignOut = () => {
        props.signoutUser(props.history);
    };

    const signInOut = () => {
        console.log('props.authenticated');
        console.log(props.authenticated);
        if (props.authenticated) {
            console.log('yeehaw');
            return (
                <div className="signInOut">
                    <div onClick={handleSignOut}>Sign Out</div>
                </div>
            );
        } else {
            console.log('nope :(');
            return (
                <div className="signInOut">
                    <div><NavLink exact to="/signup">Sign Up</NavLink></div>
                    <div><NavLink exact to="/signin">Sign In</NavLink></div>
                </div>
            );
        }
    };

    return (
        <nav className="navbar">
            <div className="site-title"><NavLink exact to="/"><FontAwesomeIcon icon={faFeather} className="icon" id="title" /></NavLink></div>
            <div className="nav-actions">
                {signInOut()}
                <div><NavLink exact to="/"><FontAwesomeIcon icon={faList} className="icon" /></NavLink></div>
                <div><NavLink to="/posts/new"><FontAwesomeIcon icon={faPlusCircle} className="icon" /></NavLink></div>
            </div>
        </nav>
    );
};

const mapStateToProps = (reduxState) => {
    return {
        authenticated: reduxState.auth.authenticated,
    };
};

export default withRouter(connect(mapStateToProps, { signoutUser })(Nav));
