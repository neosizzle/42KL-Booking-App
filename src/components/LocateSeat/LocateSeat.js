import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import FloorLayout from './FloorLayout';

const LocateSeat = ({seat_name, seat_section}) => {
	return ( 
		<Box>
			<Paper>
				<Box sx = {{padding : "1rem"}}>
					<Typography variant = "h4">
					{seat_section}
					</Typography>
				</Box>
				<Divider/>
				<Box sx = {{display : "flex", justifyContent : "center", padding : "1rem"}}>
					<Box sx = {{width : "80%"}}>
					<FloorLayout seat_section = {seat_section} seat_name = {seat_name}/>
					</Box>
				</Box>
			</Paper>
		</Box>
	 );
}
 
export default LocateSeat;