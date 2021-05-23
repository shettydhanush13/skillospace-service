import React from "react"
import PropTypes from 'prop-types';
import { EditListing } from "../../functions"
import { EditForm } from "../../components/forms"
import "../styles.scss"

const EditListingModal = ({ closeModal, id, quantity, price }) => {

    const handleClose = () => closeModal(false)

    const handleEdit = (e) => {
        e.preventDefault()
        const quantity = document.getElementById("quantity").value
        const price = document.getElementById("price").value
        const body = {
            quantity,
            price
        }
        EditListing(body, id)
        .then(() => closeModal(true))
        .catch(err => console.log(err))
    }

    return (
        <div className="modalWrapper" onClick={handleClose}>
            <div className="conf-modal center" onClick={e => e.stopPropagation()}>
                <EditForm quantity={quantity} price={price} handleEdit={handleEdit}/>
            </div>
        </div>
    )
}

EditListingModal.propTypes = {
    closeModal : PropTypes.func,
    id : PropTypes.number,
    quantity: PropTypes.number,
    price: PropTypes.number
}

export default EditListingModal