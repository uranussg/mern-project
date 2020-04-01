import React from 'react';
import { closeModal } from '../../actions/modal_actions';
import { connect } from 'react-redux';
import LoginFormContainer from '../sesssion/login_form_container';
import SignupFormContainer from '../sesssion/signup_form_container';
import "./modal.css"
import CreateRoomContainer from '../room/room_forms/create_room_container';
import AvatarSelectionContainer from '../main/user_info/avatar_selection_container';
import ThemeContainer from '../game/theme_container'

function Modal({ modal, closeModal, socket, ...rest }) {

    if (!modal) {
        return null;
    }
    let component;
    switch (modal) {
        case 'login':
            component = <LoginFormContainer />;
            break;
        case 'signup':
            component = <SignupFormContainer />;
            break;
        case 'newroom':
            component = <CreateRoomContainer />;
            break;
        case 'avatars':
            component = <AvatarSelectionContainer />;
            break;
        case 'theme':
            component = <ThemeContainer socket={socket} {...rest}/>;
            break;
        default:
            return null;
    }
    return (
        <div className="modal-background" onClick={closeModal}>
            <div className="modal-child" onClick={e => e.stopPropagation()}>
                {component}
            </div>
        </div>
    );
}

const mapStateToProps = (state, ownProps) => {
    return {
        modal: state.ui.modal
    };
};

const mapDispatchToProps = dispatch => {
    return {
        closeModal: () => dispatch(closeModal())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Modal);
