import React, { useState } from 'react';
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types';
import { Logout } from "../../functions"
import { useHistory } from "react-router-dom";
import { CreateListingModal } from '../../modals';
import "./styles.scss"

const Header = ({ page, createListing }) => {

    const [createModal, setCreateModal] = useState(false)

    const history = useHistory()

    const handleLogout = () => {
        Logout()
        .then(() => history.push("/register"))
        .catch(err => console.log(err))
    }

    const handleModalClose = reload => {
        setCreateModal(false)
        createListing(reload)
    }

    const handleModalOpen = () => {
        setCreateModal(true)
    }

    return (
        <header>
            {createModal && <CreateListingModal closeModal={handleModalClose}/>}
            <nav className='header-links'>
                {page !== "register" &&<button  onClick={handleModalOpen}>Create Listing</button>}
                <Link to={`/${page === "all-listing" ? "my-listing" : ""}`}>{page === "all-listing" ? "My Listings" : "All Listing"}</Link>
                {page !== "register" && <button  onClick={handleLogout}>Sign Out</button>}
            </nav>
        </header>
    );
}

Header.propTypes = {
    page : PropTypes.string,
    createListing : PropTypes.func
}

export default Header;