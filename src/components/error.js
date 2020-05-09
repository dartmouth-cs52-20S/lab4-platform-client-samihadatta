/* eslint-disable jsx-a11y/no-static-element-interactions */

import React, { Component } from 'react';
import Modal from 'react-modal';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faList } from '@fortawesome/free-solid-svg-icons';
import { errorClear } from '../actions';
// import Fallback from './fallback';

class ErrorModal extends Component {
    openNow = () => {
        if (this.props.error === '') {
            return false;
        } else {
            return true;
        }
    }

    render() {
        console.log(this.props.appElement);
        if (this.props.error === '') {
            return <div />;
        } else {
            return (
                <Modal
                    isOpen={this.openNow()}
                    onRequestClose={this.props.errorClear}
                    contentLabel="Sign In"
                    appElement={this.props.appElement}
                    className="modal"
                    style={this.modalStyles}
                    ariaHideApp={false}
                >
                    <h3 className="header">Oops!</h3>
                    <img src="https://media.giphy.com/media/JIX9t2j0ZTN9S/giphy.gif" alt="cat gif" />
                    <div className="text">Nothing here but this cat gif!</div>
                    <NavLink to="/">
                        <FontAwesomeIcon icon={faList} />
                        <div className="action-button-text">Back to posts</div>
                    </NavLink>
                </Modal>

            );
        }
    }
}

const mapStateToProps = (reduxState) => {
    return {
        error: reduxState.errors.error,
    };
};

export default connect(mapStateToProps, { errorClear })(ErrorModal);
