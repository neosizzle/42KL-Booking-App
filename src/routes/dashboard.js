import { useEffect, useState } from "react";
import axios from "axios";
import Cookies from 'universal-cookie';
import Typography from '@mui/material/Typography';
import CircularProgress from '@mui/material/CircularProgress';
import Bookings from "../components/Bookings/Bookings";
import Navbar from "../components/Navbar";

/*
** Dashboard page
** 
** 1. Get the user profile from 42 network api
** 2. Create a new user object and store that user locally in our db
** 3. Render the navbar and the booking list
*/
const cookies = new Cookies();
const Dashboard = () => {

	const [user42, setUser42] = useState(null);
	const [user, setUser] = useState(null);

	useEffect(() => {
		let	userObj;
		
		console.log(cookies.get("access_token"))
		axios.get(`${process.env.REACT_APP_API_URL}/auth/me/${cookies.get("access_token")}`)
		.then((response) => 
		{
			let headers;

			setUser42(response.data);
			userObj = {
				intra_id : response.data.id,
				intra_name : response.data.login,
				email : response.data.email,
				admin : response.data["staff?"]
			}
			//set userapi here
			headers = {
				headers : {
					Authorization : "OAuth " + cookies.get("access_token")
				}
			}
			axios.post(`${process.env.REACT_APP_API_URL}/users`, userObj, headers)
			.then((response)=>setUser(response.data))
			.catch((error) =>
			{
				console.log(error.response);
				alert(`error : ${error.message}`);
				window.location.href = "/"
			})
			//console.log(response.data);
			//console.log(userObj);
		})
		.catch((err)=>
		{
			console.log(err.reponse);
			alert(`error : ${err.message}`);
			window.location.href = "/";
		})
	}, [])

	return ( 
		<div>
			{
				user42? 
				<Navbar active="Dashboard" imgUrl={user42.image_url} isAdmin={user42['staff?']}/> : 
				<CircularProgress/>
			}

			<div style={{padding:"3rem"}}>
			{
				user?
				<div>
					<Typography variant="h2" component="div" gutterBottom>
       			 	{user.data.intra_name}'s Bookings
      				</Typography>
					<Bookings user={user}/>
				</div>:
				<div style={{display:"flex",justifyContent:"center",alignItems:"center"}}>
					<CircularProgress color="primary"/>
				</div>
			}
			</div>
		</div>
	 );
}
 
export default Dashboard;