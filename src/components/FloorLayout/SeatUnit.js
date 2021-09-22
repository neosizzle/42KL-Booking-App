import Box from '@mui/material/Box';

const SeatUnit = ({activated, available}) => {
	return ( 
		<Box sx= {{
			backgroundColor: activated? (available? "green": "red" ) : "black",
			height : "100%",
			width : "100%"
			}}>
			
		</Box>
	 );
}
 
export default SeatUnit;