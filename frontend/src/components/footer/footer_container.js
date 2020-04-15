import { connect } from 'react-redux';
import Footer from "./footer";
import { closeModal, openModal } from "../../actions/modal_actions";


const mDTP = dispatch => {
    return ({
        closeModal: () => dispatch(closeModal()),
        openModal: modal => dispatch(openModal(modal))

    })
}

export default connect(null, mDTP)(Footer)