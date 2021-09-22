import { useEffect, useState } from "react";
import axios from "axios";
import Cookies from 'universal-cookie';
import Typography from '@mui/material/Typography';
import CircularProgress from '@mui/material/CircularProgress';
import Bookings from "../components/Bookings/Bookings"
import Navbar from "../components/Navbar"
/*
** Dashboard page

1. Check for auth code. If there is no auth code, redirect back to root
2. If there is auth code, get user info from 42API
3. Create new user in booking API db based on user info 
*/
const cookies = new Cookies();
const Dashboard = () => {

	const [user42, setUser42] = useState([])
	const [user, setUser] = useState([])

	useEffect(() => {
		axios.get(`https://api.intra.42.fr/v2/me?access_token=${cookies.get("access_token")}`)
		.then((response) => 
		{
			setUser42(response.data)
			//set userapi here
			console.log(response.data);
		})
		.catch((err)=>
		{
			console.log(err);
			window.location.href = "/";
		})
	}, [])

	return ( 
		<div>
			<Navbar active="Dashboard" imgUrl={user42.image_url} isAdmin={user42['staff?']}/>

			<div style={{padding:"3rem"}}>
			{
				user42.login?
				<div>
					<Typography variant="h2" component="div" gutterBottom>
       			 	{user42.login}'s Bookings
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