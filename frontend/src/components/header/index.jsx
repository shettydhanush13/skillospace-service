import React from 'react';
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types';
import { Logout } from "../../functions"
import { useHistory } from "react-router-dom";
import "./styles.scss"

const Header = ({ page }) => {

    const history = useHistory()

    const handleLogout = () => {
        Logout()
        .then(() => history.push("/register"))
        .catch(err => console.log(err))
    }

    return (
        <header>
            <nav className='header-links'>
                <Link to={`/${page === "all-listing" ? "my-listing" : ""}`}>{page === "all-listing" ? "My Listings" : "All Listing"}</Link>
                {page !== "register" && <Link onClick={handleLogout}>Sign out</Link>}
            </nav>
        </header>
    );
}

Header.propTypes = {
    page : PropTypes.string
}

export default Header;