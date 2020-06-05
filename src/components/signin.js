/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import TextareaAutosize from 'react-textarea-autosize';
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faChevronLeft, faPlus,
} from '@fortawesome/free-solid-svg-icons';
import { signinUser } from '../actions';

class SignIn extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            username: '',
            // secret: '',
        };
    }

    onUsernameChange = (event) => {
        this.setState({ username: event.target.value });
    }

    onEmailChange = (event) => {
        this.setState({ email: event.target.value });
    }

    onPasswordChange = (event) => {
        // const passwordLength = event.target.value.length;
        // let secret = '';
        // // eslint-disable-next-line no-plusplus
        // for (let i = 0; i < passwordLength; i++) {
        //     secret += '•';
        // }
        // this.setState({ password: event.target.value, secret });
        this.setState({ password: event.target.value });
    }

    signIn = () => {
        const userInfo = {
            email: this.state.email,
            password: this.state.password,
            username: this.state.username,
        };
        this.props.signinUser(userInfo, this.props.history);
    }

    renderError = () => {
        if (this.props.error !== '') {
            return (<div className="error-message">{this.props.error}</div>);
        } else {
            return <div />;
        }
    }

    render() {
        return (
            <div className="new-form">
                <NavLink to="/"><FontAwesomeIcon icon={faChevronLeft} /></NavLink>
                <div className="header">Sign In!</div>
                <div className="edit-field">
                    <div className="edit-label">User Name</div>
                    <TextareaAutosize onChange={this.onUsernameChange} placeholder="user name" value={this.state.username} />
                </div>
                <div className="edit-field">
                    <div className="edit-label">Email</div>
                    <TextareaAutosize onChange={this.onEmailChange} placeholder="email" value={this.state.email} />
                </div>
                <div className="edit-field">
                    <div className="edit-label">Password</div>
                    <TextareaAutosize onChange={this.onPasswordChange} placeholder="password" value={this.state.password} />
                </div>
                {this.renderError()}
                <div className="action-button" onClick={this.signIn}>
                    <FontAwesomeIcon icon={faPlus} />
                    <div className="action-button-text">Sign In</div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (reduxState) => {
    return {
        error: reduxState.errors.error,
    };
};

export default connect(mapStateToProps, { signinUser })(SignIn);

// connect to errors in redux state
