import { useEffect, useState } from "react";
import axios from "axios";
import Cookies from 'universal-cookie';
import { Box } from "@mui/system";
import Grid from '@mui/material/Grid';
import DatePicker from '@mui/lab/DatePicker';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import CircularProgress from '@mui/material/CircularProgress';
import Navbar from "../components/Navbar";
import FloorLayout from "../components/FloorLayout/FloorLayout";
import BookingInfo from "../components/BookingInfo/BookingInfo";
import useWindowWidth from '../hooks/useWindowWidth';
import moment from 'moment';

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

const cookies = new Cookies();
const Book = () => {
	const width = useWindowWidth();
	const [user42, setUser42] = useState();
	const [user, setUser] = useState();
	const [date, setDate] = useState(moment().startOf('day').add(1, "days"));
	const [open, setOpen] = useState(false);
	const [section, setSection] = useState("182/181/180, GF");
	const [anchor, setAnchor] = useState(null);
	const [seat, setSeat] = useState(null);
	const [loading, setLoading] = useState(false);
	const [days_ahead, setDays_ahead] = useState(5);

	useEffect(() => {
		axios.get(`${process.env.REACT_APP_API_URL}/auth/me/${cookies.get("access_token")}`)
		.then((response) => 
		{
			setUser42(response.data);
			//console.log(`${process.env.REACT_APP_API_URL}/users/${response.data.login}`)
			axios.get(`${process.env.REACT_APP_API_URL}/users/${response.data.login}`)
			.then((response)=>{setUser(response.data)})
			.catch((error) =>
			{
				console.log(error.response);
				alert(`error : ${error.message}`);
				window.location.href = "/"
			})
		})
		.catch((err)=>
		{
			console.log(err.response);
			alert("error");
			window.location.href = "/";
		})

		axios.get(`${process.env.REACT_APP_API_URL}/booking_ticket`)
		.then((response)=>{
			setDays_ahead(response.data.data.days_in_advance);
		})
		.catch((e)=>{console.log(e); alert("Error fetching ticket data"); window.location.reload()})
	}, [])

	return ( 
		user? <Box>
		<Navbar active="Booking" imgUrl={user42.image_url} isAdmin={user42['staff?']}/>

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
					minDate={moment().startOf('day').add(1, "days")}
					maxDate={moment().startOf('day').add(days_ahead, "days")}
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
			<BookingInfo width = {width} date = {date} section = {section} seat = {seat} user = {user}/>
		</Box>
		{/*booking info end*/}
	</Box> :
	<CircularProgress/>
	 );
}
 
export default Book;