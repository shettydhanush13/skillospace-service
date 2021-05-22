import React from 'react';
import PropTypes from 'prop-types';

const RegisterForm = ({ option }) => {

    const handleSumbit = evt => {
        evt.preventDefault()
        const email = document.getElementById("email").value
        const password = document.getElementById("password").value
        let body = {
            email,
            password
        }
        if(option === "sign-up"){
            const username = document.getElementById("username").value
            body = {...body, username }
        } 
        console.log(body)
    }

	return (
		<form className='account-form' onSubmit={handleSumbit}>
			<div className={`account-form-fields ${option}`}>
				<input id='email' name='email' type='email' placeholder='E-mail' required />
				<input id='password' name='password' type='password' placeholder='Password' required/>
                <input id='username' name='username' type='text' placeholder='Username' required disabled={option === "sign-in"} />
			</div>
			<button className='btn-submit-form' type='submit'>{option.replace("-", " ")}</button>
		</form>
	)
}

RegisterForm.propTypes = {
    option : PropTypes.string
}

export default RegisterForm