import { useState } from "react";
import Paper from "@mui/material/Paper";
import Divider from '@mui/material/Divider';
import Button from '@mui/material/Button';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { Typography } from "@mui/material";
import BookingFeedback from "./BookingFeedback";
import moment from 'moment';
import axios from "axios";
import Cookies from 'universal-cookie';

const cookies = new Cookies();
/*
** Helper function to send post request and handle confirm booking
*/
const handleConfirm = (user, date, section, seat, setError) => 
{
	let	payload;
	let headers;

	payload = {
		"booked_date" : moment(date).format("YYYY-MM-DD"),
		"booked_by" : user.data.intra_name,
		"seat_name" : seat,
		"seat_section" : section
	}
	headers = {
		headers : {
			Authorization : "OAuth " + cookies.get("access_token")
		}
	}
	axios.post(`${process.env.REACT_APP_API_URL}/bookings`, payload, headers)
	.then((response) => {setError(-1)})
	.catch((error) => {console.log(error.response);setError(error.response.data)})
	;
}

const BookingInfo = ({width, date, section, seat, user}) => {
	const [open, setOpen] = useState(false)
	const [error, setError] = useState(0)
	return ( 
		<Paper elevation = {6} sx = {{
			padding : "2rem",
			margin : width<=425 ? "0.5rem 0.5rem" : "1rem 2rem"
			}}>
			<Typography gutterBottom variant = "h4">
				Booking details : 
			</Typography>
			<Divider/>
			<Typography gutterBottom variant = "h6">
				User <Typography gutterBottom>{user ? user.data.intra_name : "No user"}</Typography>
			</Typography>
			<Typography gutterBottom variant = "h6">
				Date  <Typography gutterBottom>{`${moment(date).format('dddd')}, ${moment(date).format("YYYY-MM-DD")}`}</Typography>
			</Typography>
			<Typography gutterBottom variant = "h6">
				Section <Typography gutterBottom>{section}</Typography>
			</Typography>
			<Typography gutterBottom variant = "h6">
				Seat  <Typography gutterBottom>{seat ? seat : "No seat selected"}</Typography>
			</Typography>
			<Button
			variant="contained"
			startIcon={<CheckCircleIcon/>}
			onClick={()=>{handleConfirm(user, date, section, seat, setError);setOpen(!open)}}
			disabled={!seat || !user}
			>
				Confirm Booking
			</Button>
			<BookingFeedback open = {open} setOpen = {setOpen} width = {width} error = {error}/>
		</Paper>
	 );
}
 
export default BookingInfo;