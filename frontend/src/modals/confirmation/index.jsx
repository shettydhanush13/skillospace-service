import React from "react"
import PropTypes from 'prop-types';
import { DeleteListing } from "../../functions"
import "../styles.scss"

const ConfirmationModal = ({ closeModal, id }) => {

    const handleClose = () => closeModal(false)

    const handleDelete = () => {
        DeleteListing(id)
        .then(() => closeModal(true))
        .catch(err => console.log(err))
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