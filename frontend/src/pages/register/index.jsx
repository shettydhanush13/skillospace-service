import React, { useState, Suspense } from 'react';
import RegisterForm from "../../components/loginForm"
import ErrorBoundary from "../../errorBoundary"
import Header from "../../components/header"
import "./styles.css"

const Register = () => {

	const [option, setOption] = useState("sign-in")

	const handleClick = e => setOption(e.target.id)
	
	return ( 
		<Suspense fallback={<div>error occured</div>}>
			<ErrorBoundary>
			    <Header page="register"/>
				<section className='container'>
					<ul className='options' onClick={handleClick}>
						<li id="sign-in" className={option === "sign-in" ? 'active' : ''}>Sign in</li>
						<li id="sign-up" className={option === "sign-up" ? 'active' : ''}>Sign up</li>
					</ul>
					<RegisterForm option={option} />
				</section>
			</ErrorBoundary>
		</Suspense>
	)
}

export default Register;