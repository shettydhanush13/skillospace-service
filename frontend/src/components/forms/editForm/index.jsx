import React from 'react';
import PropTypes from 'prop-types';

const EditForm = ({ quantity, price, handleEdit }) => {
	return (
		<>
			<h2>Edit listing</h2>
			<form className='account-form' onSubmit={handleEdit}>
				<div className={`account-form-fields`}>
					<label htmlFor="quntity">Quantity</label>
					<input defaultValue={quantity} id='quantity' name='quantity' type='text' placeholder='Quantity' required />
					<br />
					<label htmlFor="price">Price (INR)</label>
					<input defaultValue={price} id='price' name='price' type='text' placeholder='Price' required/>
				</div>
				<button className='btn-submit-form' type='submit'>UPDATE</button>
			</form>
		</>
	)
}

EditForm.propTypes = {
    quantity : PropTypes.number,
	price : PropTypes.number,
	handleEdit : PropTypes.func,
}

export default EditForm