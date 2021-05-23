import React, { useState, Suspense, lazy } from 'react';
import { Login, Signup } from "../../functions"
import { useHistory } from "react-router-dom";
import ErrorBoundary from "../../errorBoundary"
import "./styles.scss"
const Header =  lazy(() => import("../../components/header"))
const RegisterForm =  lazy(() => import("../../components/forms/loginForm")) 

const Register = () => {

	const [option, setOption] = useState("sign-in")
	
	const history = useHistory();

	const handleClick = e => setOption(e.target.id)

    const handleRegister = evt => {
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
        option === "sign-up" ?
        Signup(body).then(res => console.log(res)).catch(err => console.log(err))
        :
        Login(body).then(() => history.push("/")).catch(err => console.log(err))
    }
	
	return ( 
		<Suspense fallback={<div>error occured</div>}>
			<ErrorBoundary>
			    <Header page="register"/>
				<section className='container'>
					<ul className='options' onClick={handleClick}>
						<li id="sign-in" className={option === "sign-in" ? 'active' : ''}>Sign in</li>
						<li id="sign-up" className={option === "sign-up" ? 'active' : ''}>Sign up</li>
					</ul>
					<RegisterForm option={option} handleRegister={handleRegister}/>
				</section>
			</ErrorBoundary>
		</Suspense>
	)
}

export default Register;