import React from 'react';
import PropTypes from 'prop-types';

const CreateForm = ({ handleCreate }) => {
	return (
		<>
			<h2>Create listing</h2>
            <form className='account-form' onSubmit={handleCreate}>
                <div className={`account-form-fields`}>
                    <input id='name' name='name' type='text' placeholder='Product Name' required />
                    <input id='description' name='description' type='text' placeholder='Product description' required/>
                    <input id='quantity' name='quantity' type='number' placeholder='Quantity' required />
                    <input id='price' name='price' type='number' placeholder='Price' required/>
                </div>
                <button className='btn-submit-form' type='submit'>CREATE</button>
            </form>
		</>
	)
}

CreateForm.propTypes = {
	handleCreate : PropTypes.func,
}

export default CreateForm