import React, { useState } from 'react';
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types';
import { Logout } from "../../functions"
import { useHistory } from "react-router-dom";
import { CreateListingModal } from '../../modals';
import "./styles.scss"

const Header = ({ page, createListing }) => {

    const [createModal, setCreateModal] = useState(false)

    const accessToken = localStorage.getItem("accessToken")
    const authenicated = accessToken !== null

    const history = useHistory()

    const handleRegister = () => {
        console.log(authenicated)
        authenicated ?
        Logout()
        .then(() => history.push("/register"))
        .catch(err => console.log(err))
        :
        history.push("/register")
    }

    const handleModalClose = reload => {
        setCreateModal(false)
        createListing(reload)
    }

    const handleModalOpen = () => {
        authenicated ?
        setCreateModal(true)
        :
        history.push("/register")
    }

    return (
        <header>
            {createModal && <CreateListingModal closeModal={handleModalClose}/>}
            <nav className='header-links'>
                <Link to={`/${page === "all-listing" ? "my-listing" : ""}`}>{page === "all-listing" ? "View My Listings" : "View All Listing"}</Link>
                {page !== "register" &&<button  onClick={handleModalOpen}>+ Create New Listing</button>}
                {page !== "register" && <button  onClick={handleRegister}>{authenicated ? "Sign Out" : "Sign In"}</button>}
            </nav>
        </header>
    );
}

Header.propTypes = {
    page : PropTypes.string,
    createListing : PropTypes.func
}

export default Header;