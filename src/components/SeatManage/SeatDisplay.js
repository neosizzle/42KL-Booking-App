import { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import BuildIcon from '@mui/icons-material/Build';
import Grid from '@mui/material/Grid';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import axios from 'axios';

/*
** Helper to handle seat activation
*/
const handleActivate = (setReload, reload, seat_name, userID)=>
{
	console.log(userID);
	axios.patch(`${process.env.REACT_APP_API_URL}/seats/activate/${seat_name}`, null, {headers :{userID : "admin"}})
	.then((response) => {
		setReload(-reload)
	})
	.catch((e) => {console.log(e.response); alert(e.message); })
}

/*
** Helper to handle seat deactivation
*/
const handleDeactivate = (setReload, reload, seat_name, userID)=>
{
	axios.patch(`${process.env.REACT_APP_API_URL}/seats/deactivate/${seat_name}`, null, {headers :{userID : "admin"}})
	.then((response) => {
		setReload(-reload)
	})
	.catch((e) => {console.log(e.response); alert(e.message); })
}

const SeatDisplay = ({seat_name, userID}) => {
	const [seat, setSeat] = useState(null);
	const [reload, setReload] = useState(1);
	const [open, setOpen] = useState(false);

	useEffect(() => {
		if (!seat_name)
			return;
		axios.get(`${process.env.REACT_APP_API_URL}/seats/${seat_name}`)
		.then((response) => setSeat(response.data))
		.catch((e) => {console.log(e.response); alert("error"); window.location.href = "/"})
	}, [seat_name, reload])
	return (
	<Box>
		{
			seat?
			<div>
				<List>
					<ListItem>
						<ListItemIcon>
							<AssignmentIndIcon/>
						</ListItemIcon>
						<ListItemText primary = "Seat ID" secondary = {seat.data.name}/>
					</ListItem>

					<ListItem>
						<ListItemIcon>
							<LocationOnIcon/>
						</ListItemIcon>
						<ListItemText primary = "Seat section" secondary = {seat.data.section}/>
					</ListItem>

					<ListItem>
						<ListItemIcon>
							<BuildIcon/>
						</ListItemIcon>
						{
							seat.data.is_activated ?
							<ListItemText secondaryTypographyProps={{sx : {color : "success.main"}}} primary = "Seat status" secondary = "Activated"/>:
							<ListItemText secondaryTypographyProps={{sx : {color : "text.disabled"}}} primary = "Seat status" secondary = "Deactivated"/>
						}
						
					</ListItem>
				</List>
			</div> :
			<Box sx = {{opacity : "0.5"}}>
				<img style = {{width : "100%"}}src = "42_logo.png" alt = "logo"/>
				<Typography align = "center" variant = "h4">
						Pick a seat
				</Typography>
			</Box>
		}
		{
			seat?
			<Box>
				<Grid container rowSpacing ={2} columnSpacing = {2}>
					<Grid item lg = {6} md = {6} sm = {6} xs = {12}  sx = {{display : "flex" ,justifyContent : "center"}}>
						<Button
						variant = "contained"
						disabled = {seat.data.is_activated}
						onClick = {()=>handleActivate(setReload, reload, seat.data.name, userID)}
						>activate</Button>
					</Grid>

					<Grid item lg = {6} md = {6} sm = {6} xs = {12} sx = {{display : "flex" ,justifyContent : "center"}}>
						<Button
						variant = "contained"
						color="error"
						disabled = {!seat.data.is_activated}
						onClick = {()=>setOpen(true)}
						>deactivate</Button>
						<Dialog
						open = {open}
						onClose = {() => setOpen(false)}
						>
							<DialogTitle>
								Deactivate seat?
							</DialogTitle>
							<DialogContent>
							<DialogContentText>
								This action will prevent further bookings on that seat and it will
								delete all upcoming bookings for that seat.
							</DialogContentText>
							</DialogContent>
							<DialogActions>
							<Button onClick={() => setOpen(false)}>Cancel</Button>
							<Button onClick={() => {setOpen(false);handleDeactivate(setReload, reload, seat.data.name, userID)}} autoFocus>
								Confirm
							</Button>
							</DialogActions>
						</Dialog>
					</Grid>
				</Grid>
			</Box> : 
			null
		}
	</Box>
	);
}
 
export default SeatDisplay;