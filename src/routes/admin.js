import { useState, useEffect } from "react";
import axios from "axios";
import Cookies from 'universal-cookie';
import { Box } from "@mui/system";
import CircularProgress from '@mui/material/CircularProgress';
import Grid from '@mui/material/Grid';
import Navbar from "../components/Navbar"
import SeatManage from "../components/SeatManage/SeatManage"
import BookingManage from "../components/BookingManage/BookingManage"
import AdminBookingAdd from "../components/AdminBookingAdd/AdminBookingAdd"

const cookies = new Cookies();
const Admin = () => {
	const [user42, setUser42] = useState(null);
	const [user, setUser] = useState(null);

	useEffect(() => {
		let	userObj;
		
		axios.get(`${process.env.REACT_APP_API_URL}/auth/me/${cookies.get("access_token")}`)
		.then((response) => 
		{
			setUser42(response.data);
			userObj = {
				intra_id : response.data.id,
				intra_name : response.data.login,
				email : response.data.email,
				admin : response.data["staff?"]
			}
			if (!userObj.admin)
			{
				alert(`error : You are not a staff!`);
				window.location.href = "/"
			}
			//set userapi here
			axios.post(`${process.env.REACT_APP_API_URL}/users`, userObj)
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
			console.log(err.response);

			alert(`error : ${err.message}`);
			window.location.href = "/";
		})
	}, [])

	return ( 
		<div>
			{
				user42? 
				<Navbar active="Admin" imgUrl={user42.image_url} isAdmin={user42['staff?']}/> : 
				<CircularProgress/>
			}
			{
				user?
				<Box>
					<Grid container spacing = {2}>

					<Grid item lg = {4} md = {4} sm = {12} xs = {12}>
						<SeatManage user = {user}/>
					</Grid>

					<Grid item lg = {8} md = {8} sm = {12} xs = {12}>
						<BookingManage user = {user}/>
					</Grid>

					</Grid>

					<Grid container spacing = {2}>
						<Grid item lg = {12} md = {12} sm = {12} xs = {12}>
							<AdminBookingAdd/>
						</Grid>
					</Grid>
				</Box> :
				<CircularProgress/>
			}
		</div>
	 );
}
 
export default Admin;