import { useState } from "react";
import Paper from "@mui/material/Paper";
import Divider from '@mui/material/Divider';
import Button from '@mui/material/Button';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { Typography } from "@mui/material";
import moment from 'moment';
import BookingFeedback from "./BookingFeedback";


const BookingInfo = ({width, date, section, seat}) => {
	const [open, setOpen] = useState(false)
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
				Date  <Typography gutterBottom>{moment(date).format("YYYY-MMM-Do")}</Typography>
			</Typography>
			<Typography gutterBottom variant = "h6">
				Section <Typography gutterBottom>{section}</Typography>
			</Typography>
			<Typography gutterBottom variant = "h6">
				Seat  <Typography gutterBottom>{seat}</Typography>
			</Typography>
			<Button
			variant="contained"
			startIcon={<CheckCircleIcon/>}
			onClick={()=>setOpen(!open)}>
				Confirm Booking
			</Button>
			<BookingFeedback open = {open} setOpen = {setOpen} width = {width}/>
		</Paper>
	 );
}
 
export default BookingInfo;