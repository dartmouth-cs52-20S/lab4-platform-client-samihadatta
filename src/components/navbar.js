import React from 'react';
import {
    NavLink,
} from 'react-router-dom';

const Nav = (props) => {
    return (
        <nav>
            <ul>
                <li><NavLink exact to="/">My Super Awesome Blog</NavLink></li>
                <li><NavLink to="/posts/new">new post</NavLink></li>
            </ul>
        </nav>
    );
};

export default Nav;
