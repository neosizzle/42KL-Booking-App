import { useState, useEffect } from "react";
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import LinearProgress from '@mui/material/LinearProgress';
import Typography from '@mui/material/Typography';
import BookingDisplay from "./BookingDisplay"
import axios from "axios"


/*
** helper function to extract the seat names from json data
** and put them in an array
*/
const generate_user_names = (data, setUserNames) =>
{
	let res;

	res = [];
	data.data.forEach(element => {
		res.push(element.intra_name);
	});
	setUserNames(res);
}

const BookingManage = () => {
	const [userNames, setUserNames] = useState(null);
	const [value, setValue] = useState(null);

	useEffect(() => {
		axios.get(`${process.env.REACT_APP_API_URL}/users`)
		.then((response) => generate_user_names(response.data, setUserNames))
		.catch((e) => {console.log(e.response); alert("error"); window.location.href = "/"})
	}, [])

	return (
		<Box sx = {{padding : "3rem"}}>
			<Paper square sx = {{padding : "1rem"}}>
				<Typography variant = "h5">
					Manage bookings
				</Typography>
				<br/>
				{
				   userNames?
				   <Autocomplete
				   value={value}
				   onChange={(event, newValue) => {
				   setValue(newValue);
				   }}
				   options={userNames}
				   renderInput={(params) => <TextField {...params} label="Intra login" />}
				   />:
				   <LinearProgress/>
			   }
			   <BookingDisplay user_name = {value}/>
			</Paper>
		</Box>
	);
}
 
export default BookingManage;