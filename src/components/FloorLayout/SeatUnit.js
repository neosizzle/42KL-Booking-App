import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';
import { Box } from '@mui/system';
import { useState } from 'react';

const SELECTED_COLOR = "#fd81c0";
const AVAIL_COLOR = "green";
const NON_AVAIL_COLOR = "red";
const NON_ACTIV_COLOR = "grey";

const SeatUnit = ({activated, available, transform, name ,setSeat, currSeat}) => {
	const [open, setOpen] = useState(false);
	const [anchor, setAnchor] = useState(null);
	return ( 
		<div style= {{
			backgroundColor: currSeat === name? SELECTED_COLOR :
			(activated? (available? AVAIL_COLOR: NON_AVAIL_COLOR )
			: NON_ACTIV_COLOR),
			height : "100%",
			width : "100%",
			transform : transform,
			borderRadius : "0.5rem",
			opacity : "0.9"
			}}
			onMouseEnter={(e)=>{setAnchor(e.currentTarget); setOpen(true)}}
			onMouseLeave={()=>{setAnchor(null);setOpen(false)}}
			onClick = {()=>{
				if (!available || !activated) return ;
				setSeat(name);
			}}
			>
			<Popover
			sx={{
				pointerEvents: 'none',
			}}
			open={open}
			anchorEl={anchor}
			anchorOrigin={{
				vertical: 'top',
				horizontal: 'center',
			}}
			transformOrigin={{
				vertical: 'bottom',
				horizontal: 'center',
			}}
			disableRestoreFocus
			>
			<Box sx = {{padding : "1rem"}}>
			<Typography variant = "body1" gutterBottom>
				{name}
			</Typography>
			<Typography variant = "body1" sx = {{
				color : currSeat === name? SELECTED_COLOR :
				(activated? (available? AVAIL_COLOR: NON_AVAIL_COLOR )
				: NON_ACTIV_COLOR)}}>
				{currSeat === name? "selected" :
				(activated? (available? "available": "occupied" )
				: "deactivated")}
			</Typography>
			</Box>
		</Popover>
		</div>
	 );
}
 
export default SeatUnit;