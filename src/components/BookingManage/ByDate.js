import { useState } from 'react';
import Box from '@mui/material/Box';
import DatePicker from '@mui/lab/DatePicker';
import TextField from '@mui/material/TextField';
import moment from 'moment';
import BookingDisplayDate from './BookingDisplayDate';

const ByDate = () => {
	const today = moment().startOf('day');
	const [date, setDate] = useState(today);

	return ( 
		<Box>
			<Box sx = {{width : "100%", display : "flex", justifyContent : "center"}}>
				<DatePicker
					label="Pick a date"
					value={date}
					onChange={(newValue) => {
						setDate(newValue);
					}}
					renderInput={(params) => <TextField {...params} />}
					cancelText=""
				/>
			</Box>
			<BookingDisplayDate date = {date}/>
		</Box>
	 );
}
 
export default ByDate;