import { useState, useEffect } from "react";
import LinearProgress from '@mui/material/LinearProgress';
import Snackbar from '@mui/material/Snackbar';
import LoadingButton from '@mui/lab/LoadingButton';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import axios from "axios";
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

const updateHandler = (reload, setReload, days, max, setLoading, setSnackbar)=>{
	let payload;

	payload = {
        "days_in_advance": days,
        "max_booking_instances": max
    }
	setLoading(true);
	axios.patch(`${process.env.REACT_APP_API_URL}/booking_ticket`, payload)
	.then(()=>{
		setSnackbar(true);
		setReload(-reload);
		setLoading(false);
	})
	.catch((e)=>{console.log(e); alert("Error patching ticket data"); window.location.reload()})
}

const Tickets = () => {

	const [reload, setReload] = useState(1);
	const [ticket, setTicket] = useState(null);
	const [days_in_advance, setDays_in_advance] = useState("");
	const [max_allowed_instances, setMax_allowed_instances] = useState("");
	const [loading, setLoading] = useState(false);
	const [snackbar, setSnackbar] = useState(false);

	useEffect(() => {
		axios.get(`${process.env.REACT_APP_API_URL}/booking_ticket`)
		.then((response)=>{
			setTicket(response.data.data)
			setDays_in_advance(response.data.data.days_in_advance);
			setMax_allowed_instances(response.data.data.max_booking_instances);
		})
		.catch((e)=>{console.log(e); alert("Error fetching ticket data"); window.location.reload()})
	}, [reload])

	return (
	<Box>
		{
			ticket?
			<Box>
				<TextField
				label = "Days in advance"
				sx = {{margin : "1rem"}}
				value = {days_in_advance}
				onChange = {(e) => setDays_in_advance(e.target.value)}
				type = "number"
				/>

				<TextField
				label = "Max allowed bookings"
				sx = {{margin : "1rem"}}
				value = {max_allowed_instances}
				onChange = {(e) => setMax_allowed_instances(e.target.value)}
				type = "number"
				/>

				<LoadingButton
				variant = "outlined"
				sx = {{margin : "1rem"}}
				loading = {loading}
				onClick = {()=>updateHandler(reload, setReload, days_in_advance, max_allowed_instances, setLoading, setSnackbar)}
				>
					Update
				</LoadingButton>
				<Snackbar
				open={snackbar}
				autoHideDuration={6000}
				onClose={() => setSnackbar(false)}
				message="Updated"
				action={
					<IconButton
					size="small"
					aria-label="close"
					color="inherit"
					onClick={() => setSnackbar(false)}
				>
					<CloseIcon fontSize="small" />
				</IconButton>
				}
			/>
			</Box>:
			<LinearProgress/>
		}
	</Box>
	);
}
 
export default Tickets;