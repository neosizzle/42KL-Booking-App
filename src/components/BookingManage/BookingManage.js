import { useState} from "react";
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import ByStudent from "./ByStudent";
import ByDate from "./ByDate"
import Tickets from "./Tickets"

const BookingManage = () => {
	const [tabSelect, setTabSelect] = useState(0);


	return (
		<Box sx = {{padding : "3rem"}}>
			<Paper square sx = {{padding : "1rem"}}>
				<Typography variant = "h5">
					Manage bookings
				</Typography>
				<br/>
				<Tabs
				variant = "scrollable"
				value = {tabSelect}
				onChange = {(e, val) => setTabSelect(val)}
				>
					<Tab label="By Student" value = {0}/>
					<Tab label="By Date" value = {1}/>
					<Tab label="Tickets" value = {2}/>
				</Tabs>
				<br/>
				{
					tabSelect === 0?
					<ByStudent/>:
					tabSelect === 1?
					<ByDate/> :
					tabSelect === 2?
					<Tickets/>
					:
					null
				}
			</Paper>
		</Box>
	);
}
 
export default BookingManage;