import React from 'react';
import {
    NavLink,
} from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faFeather, faList, faPlusCircle,
} from '@fortawesome/free-solid-svg-icons';

const Nav = (props) => {
    return (
        <nav className="navbar">
            <div className="site-title"><NavLink exact to="/"><FontAwesomeIcon icon={faFeather} className="icon" id="title" /></NavLink></div>
            <div className="nav-actions">
                <div><NavLink exact to="/"><FontAwesomeIcon icon={faList} className="icon" /></NavLink></div>
                <div><NavLink to="/posts/new"><FontAwesomeIcon icon={faPlusCircle} className="icon" /></NavLink></div>
            </div>
        </nav>
    );
};

export default Nav;
