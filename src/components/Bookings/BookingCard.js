import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';
import CardContent from '@mui/material/CardContent';
import { CardMedia, Typography } from '@mui/material';
import DateRangeIcon from '@mui/icons-material/DateRange';
import DeleteIcon from '@mui/icons-material/Delete';
import FingerprintIcon from '@mui/icons-material/Fingerprint';
import IconButton from '@mui/material/IconButton';
import PersonIcon from '@mui/icons-material/Person';
import DesktopMacIcon from '@mui/icons-material/DesktopMac';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import Popper from '@mui/material/Popper';
import Fade from '@mui/material/Fade';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import useWindowWidth from '../../hooks/useWindowWidth';
import { useState } from 'react';
import moment from 'moment';

const BookingCard = ({show, delay, date, name, seat, booking_id}) => {
	const width = useWindowWidth();
	const [open, setOpen] = useState(false)
	const [anchor, setAnchor] = useState(null)
	let	today;

	today = moment().startOf('day').format()
	return ( 
		<Fade in={show} timeout = {(delay + 1) * 500}>
			<Card sx = {{minWidth:"100%", margin:"2rem"}}>
				<Grid container>
					{/* Left side art start*/}
					<Grid item lg = {2} md = {4} sm = {4} xs = {12}>
					<CardMedia
					component="img"
					height="185"
					image="https://images.unsplash.com/photo-1615184697985-c9bde1b07da7?ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8YWJzdHJhY3QlMjBhcnR8ZW58MHx8MHx8&ixlib=rb-1.2.1&w=1000&q=80"
					alt="some art"
					/>
  					</Grid>
					{/* Left side art end*/}

					{/* Right side content start*/}
					<Grid item lg = {10} md = {8} sm = {8} xs = {12}>
						<CardContent>
						<Grid container sx = {{alignItems:"center"}}>
							<Grid item lg = {10} md = {10} sm = {10} xs = {10}>
							<Stack direction="row" spacing={2} sx = {{alignItems : "center"}} divider = {<Divider orientation="vertical" flexItem />}>
							<DateRangeIcon fontSize="small"/>
							<Typography variant = "h5" gutterBottom>
								{moment(date).format("MM-DD-YYYY")}
							</Typography>
							</Stack>
							</Grid>

							<Grid item lg = {2} md = {2} sm = {2} xs = {2}>
							<IconButton aria-label="delete" size="large" color="error" onClick = {(event) =>{setOpen(!open); setAnchor(event.currentTarget)}}>
							<DeleteIcon />
							</IconButton>
							<Popper open={open} anchorEl={anchor} placement={"left-start"} >
								<Fade in>
								<Paper sx={{padding : "1.5rem"}}>
								<div style={{overflow: "auto", overflowWrap: "break-word", width: width > 425 ? '100%' : '10rem'}}> 
								<Typography variant = "body1" gutterBottom>
										Delete this booking?
								</Typography>
								</div>
									<Stack direction="row" sx={{justifyContent:"center"}}>
									<Button
									variant="contained"
									onClick = {()=>setOpen(!open)}
									>Not yet</Button>
									<Button variant="text" color="error">Confirm</Button>
									</Stack>
								</Paper>
								</Fade>
							</Popper>
							</Grid>
						</Grid>
						<Grid container>
							<Stack direction="row" spacing={2} sx = {{alignItems : "center"}}>
							<PersonIcon fontSize = "small"/>
							<Typography variant = "body1" gutterBottom>
								{name}
							</Typography>
							</Stack>
						</Grid>
						<Grid container>
							<Stack direction="row" spacing={2} sx = {{alignItems : "center"}}>
							<DesktopMacIcon fontSize = "small"/>
							<Typography variant = "body1" gutterBottom>
								{`${seat.section}, ${seat.name}`}
							</Typography>
							</Stack>
						</Grid>
						<Grid container>
							<Stack direction="row" spacing={2} sx = {{alignItems : "center"}}>
							<FingerprintIcon fontSize = "small"/>
							<div style={{overflow: "auto", overflowWrap: "break-word", width: width > 425 ? '100%' : '10rem'}}> 
							<Typography variant = "body1" gutterBottom>
							{booking_id}
							</Typography>
							</div>
							</Stack>
						</Grid>
						<Grid container>
							{
								(date < today) ?
								<Typography variant = "caption" sx = {{color : "red"}}>Expired</Typography> :
								<Typography variant = "caption" sx = {{color : "#00e35b"}}>Upcoming</Typography>
							}
						</Grid>
						</CardContent>
  					</Grid>
					{/* Right side content end*/}
				</Grid>
		</Card>
		</Fade>
	 );
}
 
export default BookingCard;