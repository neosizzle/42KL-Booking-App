import { useState, useEffect } from "react";
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete'
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import LinearProgress from '@mui/material/LinearProgress';
import Typography from '@mui/material/Typography';
import SeatDisplay from "./SeatDisplay";
import axios from "axios"

/*
** helper function to extract the seat names from json data
** and put them in an array
*/
const generate_seat_names = (data, setSeatNames) =>
{
	let res;

	res = [];
	data.data.forEach(element => {
		res.push(element.name);
	});
	setSeatNames(res);
}

const SeatManage = ({user}) => {
	const [seatNames, setSeatNames] = useState(null)
	const [value, setValue] = useState(null)
	
	useEffect(() => {
		axios.get(`${process.env.REACT_APP_API_URL}/seats`)
		.then((response) => generate_seat_names(response.data, setSeatNames))
		.catch((e) => {console.log(e.response); alert("error"); window.location.href = "/"})
	}, [])

	return ( 
		<Box sx = {{padding : "3rem"}}>
			<Paper square sx = {{padding : "1rem"}}>
				<Typography variant = "h5">
					Manage seats
				</Typography>
				<br/>
				{
				   seatNames?
				   <Autocomplete
				   value={value}
				   onChange={(event, newValue) => {
				   setValue(newValue);
				   }}
				   options={seatNames}
				   renderInput={(params) => <TextField {...params} label="Seat ID" />}
				   />:
				   <LinearProgress/>
			   }
			   
			   <SeatDisplay seat_name = {value} userID = {user.data.intra_id}/>
			</Paper>
		</Box>
	 );
}
 
export default SeatManage;