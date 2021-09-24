import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

const NoBookings = () => {
	return ( 
		<Box sx = {{
			width : "80vw",
			height : "80vh",
			display : "flex",
			justifyContent : "center",
			alignItems : "center",
			flexDirection : "column",
			opacity : "0.5"
			}}>
			<img src = "/assets/42 logo.png" alt = "logo"/>
			<Typography variant = "h2">
				 No Bookings
			</Typography>
			<Typography variant = "caption">
				Click the menu on the top left corner and make one
			</Typography>
		</Box>
	 );
}
 
export default NoBookings;