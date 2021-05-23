import React from 'react';
import PropTypes from 'prop-types';
import "./styles.scss"

const ListingCard = ({ list, page, deleteListing, editListing }) => {

    const handleDelete = () => deleteListing(list)
    const handleEdit = () => editListing(list)
    
    return (
        <>
            <div className="product-card">
                <div className="product-details">
                    <h4>#{list.id} - {list.product_title}</h4>
                    {page === "my-listing" && <div className="actions">
                        <span onClick={handleEdit}>Edit</span>
                        <span onClick={handleDelete}>Delete</span>
                    </div>}
                    <p>{list.product_description}</p>
                    {page === "all-listing" &&<p>created by   @{list.user_name}</p>}
                    <div className="product-bottom-details">
                        <div className="product-price">₹{list.price}</div>
                        <div className="product-qunatity">Quantity : {list.quantity}</div>
                    </div>
                </div>
            </div>
        </>
    );
}

ListingCard.propTypes = {
    deleteListing : PropTypes.func,
    editListing : PropTypes.func,
    page : PropTypes.string,
    list : PropTypes.shape ({
        id : PropTypes.number,
        product_title : PropTypes.string,
        product_description : PropTypes.string,
        quantity : PropTypes.string,
        price : PropTypes.string,
        user_name : PropTypes.string
    })
}

export default ListingCard;