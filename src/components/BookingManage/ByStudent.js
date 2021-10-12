import { useState, useEffect } from "react";
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import LinearProgress from '@mui/material/LinearProgress';
import BookingDisplayUser from "./BookingDisplayUser";
import axios from "axios";

/*
** helper function to extract the seat names from json data
** and put them in an array
*/
const generate_user_names = (data, setUserNames) =>
{
	let res;

	res = [];
	data.data.forEach(element => {
		res.push(element.intra_name);
	});
	setUserNames(res);
}

const ByStudent = () => {
	const [userNames, setUserNames] = useState(null);
	const [value, setValue] = useState(null);

	useEffect(() => {
		axios.get(`${process.env.REACT_APP_API_URL}/users`)
		.then((response) => generate_user_names(response.data, setUserNames))
		.catch((e) => {console.log(e.response); alert("error"); window.location.href = "/"})
	}, [])

	return (
	<div>
		{
			userNames?
			<Autocomplete
			value={value}
			onChange={(event, newValue) => {
			setValue(newValue);
			}}
			options={userNames}
			renderInput={(params) => <TextField {...params} label="Intra login" />}
			/>:
			<LinearProgress/>
		}
		<BookingDisplayUser user_name = {value}/>
	</div>
	);
}
 
export default ByStudent;