import React from "react"
import PropTypes from 'prop-types';
import { CreateListing, Token } from "../../functions"
import { CreateForm } from "../../components/forms"
import { useHistory } from "react-router-dom"
import "../styles.scss"

const CreateListingModal = ({ closeModal }) => {
    
    const history = useHistory()

    const handleClose = () => closeModal(false)

    const handleCreate = (e) => {
        e.preventDefault()
        const token = localStorage.getItem("accessToken")
        const quantity = document.getElementById("quantity").value
        const price = document.getElementById("price").value
        const product_title = document.getElementById("name").value
        const product_description = document.getElementById("description").value
        const body = {
            product_title,
            product_description,
            quantity,
            price
        }
        CreateListing(body, token)
        .then(() => closeModal(true))
        .catch(err => {
            if(err.status === 401){
                Token(history)
                .then(() => handleCreate(e))
                .catch(err => console.log(err))
            }
        })
    }

    return (
        <div className="modalWrapper" onClick={handleClose}>
            <div className="conf-modal center" onClick={e => e.stopPropagation()}>
                <CreateForm handleCreate={handleCreate}/>
            </div>
        </div>
    )
}

CreateListingModal.propTypes = {
    closeModal : PropTypes.func
}

export default CreateListingModal