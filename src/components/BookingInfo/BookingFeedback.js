import { useCallback } from 'react';
import { useHistory } from 'react-router-dom' 
import Backdrop from '@mui/material/Backdrop';
import Paper from '@mui/material/Paper';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';


const BookingFeedback = ({open, setOpen, width, error}) => {
	const history = useHistory();
	const handleRedir = useCallback((endp) => history.push(endp), [history]);
	
	return ( 
		<Backdrop
		open = {open}
		onClick = {()=>setOpen(!open)}
		>
			{
				!error?
				<Paper variant="outlined" sx = {{color : "#00e35b", backgroundColor:"#cfffe1", padding : width <= 425? "1rem": "4rem 4rem 2rem 4rem", margin : "2rem"}}>
				<Typography variant = "h3" gutterBottom>
					<CheckCircleOutlineIcon/> Success!
				</Typography>
				<Typography gutterBottom>
					Your booking has been placed
				</Typography>
				<Button variant="contained" onClick = {()=> handleRedir("/dashboard")}>
					OK
				</Button>
				</Paper>:
				<Paper variant="outlined" sx = {{color : "#c62828", backgroundColor:"#f29694", padding : width <= 425? "1rem": "4rem 4rem 2rem 4rem", margin : "2rem"}}>
				<Typography variant = "h3" gutterBottom>
					<ErrorOutlineIcon/> Error!
				</Typography>
				<Typography gutterBottom>
					Something wrong happened : {error.error}
				</Typography>
				<Button variant="contained" color="error">
					OK
				</Button>
				</Paper>
			}
		</Backdrop>
	 );
}
 
export default BookingFeedback;