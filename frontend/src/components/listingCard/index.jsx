import React from 'react';
import PropTypes from 'prop-types';
import "./styles.scss"

const ListingCard = ({ list, page }) => {
    return (
        <div className="product-card">
            <div className="product-details">
                <h4>{list.product_title}</h4>
                {page === "my-listing" && <div className="actions">
                    <span>Edit</span>
                    <span>Delete</span>
                </div>}
                <p>{list.product_description}</p>
                <div className="product-bottom-details">
                    <div className="product-price">₹{list.price}</div>
                    <div className="product-qunatity">Quantity : {list.quantity}</div>
                </div>
            </div>
        </div>
    );
}

ListingCard.propTypes = {
    page : PropTypes.string,
    list : PropTypes.shape ({
        id : PropTypes.number,
        product_title : PropTypes.string,
        product_description : PropTypes.string,
        quantity : PropTypes.string,
        price : PropTypes.string,
    })
}

export default ListingCard;