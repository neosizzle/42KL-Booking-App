import { useEffect } from "react";
import axios from "axios";
import Cookies from 'universal-cookie';

const cookies = new Cookies();

/*
** Auth route to get access token and redirect to dashboard
**
**1. Attempt to get code from URL params, if no code exits, redirect to login
**2. Attempt to get access token from 42 API, if anything wrong occurs, redirect to login
**3. Redirect to dashboard after setting cookie to the access token
*/
const Auth = () => {
	useEffect(() => {
		let	code;

		code = new URL(window.location.href).searchParams.get("code");
		if (!code)
		{
			alert("You need to provide authentication to continue!");
			window.location.href = "/";
		}
		axios.post(`${process.env.REACT_APP_API_URL}/auth/get_token/${code}`)
		.then((response) =>
		{
			cookies.set("access_token", response.data.access_token, { path: '/' });
			window.location.href = "/dashboard";
		})
		.catch((err) => 
		{
			console.log(err.response)
			alert("Something wrong occured!");
			window.location.href = "/";
		})
	}, [])
	return ( 
		<div>
			Redirecting.. Please wait
		</div>
	 );
}
 
export default Auth;