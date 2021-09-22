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
import Navbar from "../components/Navbar";
import FloorLayout from "../components/FloorLayout/FloorLayout";
import BookingInfo from "../components/BookingInfo/BookingInfo";
import useWindowWidth from '../hooks/useWindowWidth';
import moment from 'moment';


const cookies = new Cookies();
const Book = () => {
	const width = useWindowWidth();
	const [user42, setUser42] = useState([]);
	const [user, setUser] = useState([]);
	const today = moment().startOf('day');
	const [date, setDate] = useState(today);
	const [open, setOpen] = useState(false);
	const [section, setSection] = useState("181/180, GF");
	const [anchor, setAnchor] = useState(null);
	const [seat, setSeat] = useState(null)

	useEffect(() => {
		axios.get(`https://api.intra.42.fr/v2/me?access_token=${cookies.get("access_token")}`)
		.then((response) => 
		{
			setUser42(response.data)
			//set userapi here
			console.log(response.data);
		})
		.catch((err)=>
		{
			console.log(err);
			window.location.href = "/";
		})
	}, [])

	return ( 
		<Box>
			<Navbar active="Booking" imgUrl={user42.image_url} isAdmin={user42['staff?']}/>

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
				<MenuItem onClick={() => {setOpen(!open); setSection("181/180, GF")}}> 181/180, GF</MenuItem>
				<MenuItem onClick={() => {setOpen(!open); setSection("181/180, 1F")}}>181/180, 1F</MenuItem>
				<MenuItem onClick={() => {setOpen(!open); setSection("182/183, GF")}}>182/183, GF</MenuItem>
				<MenuItem onClick={() => {setOpen(!open); setSection("182/183, 1F")}}>182/183, 1F</MenuItem>
				<MenuItem onClick={() => {setOpen(!open); setSection("191/190, GF")}}>191/190, GF</MenuItem>
				<MenuItem onClick={() => {setOpen(!open); setSection("191/190, 1F")}}>191/190, 1F</MenuItem>
			</Menu>
				</Grid>
			</Grid>

			<Box sx = {{display : "flex",justifyContent : "center"}}>
				<Box sx = {{width : width<=425 ? "95%" : "60%"}}>
					<FloorLayout date={date} section={section} setSeat={setSeat} currSeat = {seat}/>
				</Box>
			</Box>
			<Box>
				<BookingInfo width = {width} date = {date} section = {section} seat = {seat}/>
			</Box>
		</Box>
	 );
}
 
export default Book;