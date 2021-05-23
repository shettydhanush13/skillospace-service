import React from "react"
import PropTypes from 'prop-types';
import { DeleteListing, Token } from "../../functions"
import { useHistory } from "react-router-dom";
import "../styles.scss"

const ConfirmationModal = ({ closeModal, id }) => {

    const handleClose = () => closeModal(false)
    const history = useHistory()

    const handleDelete = () => {
        const token = localStorage.getItem("accessToken")
        DeleteListing(id, token)
        .then(() => closeModal(true))
        .catch(err => {
            if(err.status === 401){
                Token(history)
                .then(() => handleDelete())
                .catch(err => console.log(err))
            }
        })
    }

    return (
        <div className="modalWrapper" onClick={handleClose}>
            <div className="conf-modal center" onClick={e => e.stopPropagation()}>
               <div className="title-text">
                   <h2>CONFIRMATION</h2>
                </div>
                <p>are you sure you want to delete this listing ?</p>
                <div className="modal-footer">
                    <p className="conf-but" onClick={handleClose}>NO</p>
                    <p className="conf-but" onClick={handleDelete}>YES</p>
                </div>
            </div>
        </div>
    )
}

ConfirmationModal.propTypes = {
    closeModal : PropTypes.func,
    id : PropTypes.number
}

export default ConfirmationModal