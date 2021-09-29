import { useEffect, useState } from "react";
import { Typography } from '@mui/material';
import Paper from '@mui/material/Paper';
import { Box } from '@mui/system';
import Autocomplete from '@mui/material/Autocomplete';
import LinearProgress from '@mui/material/LinearProgress';
import Grid from '@mui/material/Grid';
import DatePicker from '@mui/lab/DatePicker';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import FloorLayout from "../FloorLayout/FloorLayout";
import BookingInfo from "../BookingInfo/BookingInfo";
import axios from "axios";
import moment from 'moment';
import useWindowWidth from "../../hooks/useWindowWidth";

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

/*
** Helper to handle section change
*/
const handleSectionChange = (setOpen, setSection, setSeat, setLoading, sect, sectTochange)=>
{
	setOpen(false);
	if (sect === sectTochange)
		return ;
	setSection(sectTochange);
	setSeat(null);
	setLoading(true);
}

/*
** Helper to get the user object given the username
*/
const getUser = (username, setUserPicked) =>
{
	axios.get(`${process.env.REACT_APP_API_URL}/users/${username}`)
			.then((response)=>{setUserPicked(response.data)})
			.catch((error) =>
			{
				console.log(error.response);
				alert(`error : ${error.message}`);
				window.location.href = "/"
			})
}

const AdminBookingAdd = () => {
	const width = useWindowWidth();
	const [userNames, setUserNames] = useState(null);
	const [usernamePicked, setUsernamePicked] = useState(null);
	const [userPicked, setUserPicked] = useState(null)
	const today = moment().startOf('day');
	const [date, setDate] = useState(today);
	const [open, setOpen] = useState(false);
	const [section, setSection] = useState("182/181/180, GF");
	const [anchor, setAnchor] = useState(null);
	const [seat, setSeat] = useState(null);
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		axios.get(`${process.env.REACT_APP_API_URL}/users`)
		.then((response) => generate_user_names(response.data, setUserNames))
		.catch((e) => {console.log(e.response); alert("error"); window.location.href = "/"})
	}, [])

	return ( 
		<Box sx = {{padding : "3rem"}}>
			<Paper square sx = {{padding : "1rem"}}>
			<Typography variant = "h5">
				Add booking
			</Typography>
			<br/>
				{
				   userNames?
				   <Autocomplete
				   value={usernamePicked}
				   onChange={(event, newValue) => {
				   setUsernamePicked(newValue);
				   getUser(newValue, setUserPicked);
				   }}
				   options={userNames}
				   renderInput={(params) => <TextField {...params} label="Intra login" />}
				   />:
				   <LinearProgress/>
			   }
				{/*Input selection start */}
				<Grid container sx={{padding:"2rem"}}>
					<Grid item
					lg = {6}
					md = {6}
					sm = {6}
					xs = {12}
					sx={{display:"flex", justifyContent:"center"}}
					>
						<DatePicker
							label="Pick a date"
							value={date}
							onChange={(newValue) => {
								setDate(newValue);
								setSeat(null);
								setLoading(true);
							}}
							renderInput={(params) => <TextField {...params} />}
							minDate={today}
							maxDate={moment().startOf('day').add(5, "days")}
							cancelText=""
						/>
					</Grid>
					<Grid item
					lg = {6}
					md = {6}
					sm = {6}
					xs = {12}
					sx={{display:"flex", justifyContent:"center"}}>
					<Button
					variant = "contained"
					onClick = {(event)=>{setOpen(!open); setAnchor(event.currentTarget)}}
					sx = {{marginTop:width<=599? "2rem":0}}>
						{section}
					</Button>
					<Menu
					anchorEl={anchor}
					open={open}
					onClose={() => setOpen(!open)}
					MenuListProps={{
					'aria-labelledby': 'basic-button',
					}}
					>
					<MenuItem onClick={() => {handleSectionChange(setOpen, setSection, setSeat, setLoading, section, "182/181/180, GF" )}}> 182/181/180, GF</MenuItem>
					<MenuItem onClick={() => {handleSectionChange(setOpen, setSection, setSeat, setLoading, section, "182/181/180, 1F" )}}>182/181/180, 1F</MenuItem>
					<MenuItem onClick={() => {handleSectionChange(setOpen, setSection, setSeat, setLoading, section, "190/191, GF" )}}>190/191, GF</MenuItem>
					<MenuItem onClick={() => {handleSectionChange(setOpen, setSection, setSeat, setLoading, section, "190/191, 1F" )}}>190/191, 1F</MenuItem>
				</Menu>
					</Grid>
				</Grid>
				{/*Input selection end */}

				{/*floor layout start */}
				<Box sx = {{display : "flex",justifyContent : "center"}}>
					<Box sx = {{width : width<=425 ? "95%" : "60%"}}>
						<FloorLayout
						date={date}
						section={section}
						setSeat={setSeat}
						currSeat = {seat}
						loading = {loading}
						setLoading = {setLoading}
						/>
					</Box>
				</Box>
				{/*floor layout end */}

				{/*booking info start*/}
				<Box>
					<BookingInfo width = {width} date = {date} section = {section} seat = {seat} user = {userPicked}/>
				</Box>
				{/*booking info end*/}
			</Paper>
		</Box>
	 );
}
 
export default AdminBookingAdd;