/* eslint-disable jsx-a11y/no-static-element-interactions */

/*
 * Class for sign in modal
 */
import React, { Component } from 'react';
import Modal from 'react-modal';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
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
                    <h4 className="error-message">Error: ${this.props.error}</h4>
                    <NavLink to="/">
                        <div className="action-button">Return to home page</div>
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
