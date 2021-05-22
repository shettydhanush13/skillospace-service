import React from 'react';
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types';
import "./styles.css"

const Header = ({ page }) => {

    const handleRouting = e => {
        console.log(e.target.id)
    }

    return (
        <header>
            <nav className='header-links' onClick={handleRouting}>
                <Link to={`/${page === "all-listing" ? "my-listing" : ""}`}>{page === "all-listing" ? "My Listings" : "All Listing"}</Link>
                {page !== "register" && <Link to="/register">Sign out</Link>}
            </nav>
        </header>
    );
}

Header.propTypes = {
    page : PropTypes.string
}

export default Header;