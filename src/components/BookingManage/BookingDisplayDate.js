import { useState, useEffect } from "react";
import { Box } from "@mui/system";
import Typography from "@mui/material/Typography";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableFooter from '@mui/material/TableFooter';
import TablePagination from '@mui/material/TablePagination';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import axios from "axios";
import moment from "moment";
import {useJsonToCsv} from 'react-json-csv';
import Cookies from 'universal-cookie';

const cookies = new Cookies();
const handleDelete = (id, setReload, reload) =>
{
	let headers;

	headers = {
		headers : {
			Authorization : "OAuth " + cookies.get("access_token")
		}
	}
	axios.delete(`${process.env.REACT_APP_API_URL}/bookings/${id}`, headers)
	.then((res) => setReload(-reload))
	.catch((e) => {console.log(e.response);alert(`error : ${e.message}`)})
}

const BookingDisplayDate = ({date}) => {
	const data_per_page = 3;
	const [bookings, setBookings] = useState(null);
	const [currPage, setCurrPage] = useState(0);
	const [dataSize, setDataSize] = useState(null);
	const [reload, setReload] = useState(1);
	const [open, setOpen] = useState(false);
	const { saveAsCsv } = useJsonToCsv();
	const csvFields = {
		_id : "Booking ID",
		booked_by : "User",
		booked_date : "Date",
		seat_section : "Seat Section",
		seat_name : "Seat Name"
	};

	useEffect(() => {
		if (!date)
			return;
		axios.get(`${process.env.REACT_APP_API_URL}/bookings/date/${moment(date).format("YYYY-MM-DD")}`)
		.then((response) => {
			setBookings(response.data.data);
			setDataSize(response.data.data.length);
		})
		.catch((e) => {console.log(e.response); alert("error"); window.location.href = "/"})
	}, [date, dataSize, reload])

	return (
		date?
		<TableContainer>
		<Table>
			<TableHead>
				<TableRow>
					<TableCell>Booking id</TableCell>
					<TableCell align = "right">User</TableCell>
					<TableCell align = "right">Date</TableCell>
					<TableCell align = "right">Seat section</TableCell>
					<TableCell align = "right">Seat name</TableCell>
					<TableCell align = "right">Action</TableCell>
				</TableRow>
			</TableHead>
			<TableBody>
				{
					bookings ?
					bookings
					.slice(0)
					.reverse()
					.slice((currPage) * data_per_page, (currPage) * data_per_page + data_per_page)
					.map((booking, idx) => {
						return <TableRow key = {idx}>
							<TableCell>{booking._id}</TableCell>
							<TableCell align = "right">{booking.booked_by}</TableCell>
							<TableCell align = "right">{moment(booking.booked_date).format("YYYY-MM-DD")}</TableCell>
							<TableCell align = "right">{booking.seat_section}</TableCell>
							<TableCell align = "right">{booking.seat_name}</TableCell>
							<TableCell align = "right">
								<Button
								color = "error"
								variant="text"
								onClick = {() => setOpen(true)}
								>Delete</Button>
								<Dialog
								open = {open}
								onClose = {() => setOpen(false)}
								>
								<DialogTitle>
									Delete booking?
								</DialogTitle>
								<DialogActions>
								<Button onClick={() => setOpen(false)}>Cancel</Button>
								<Button onClick={() => {setOpen(false);handleDelete(booking._id, setReload, reload)}} autoFocus>
									Confirm
								</Button>
								</DialogActions>
								</Dialog>
							</TableCell>
						</TableRow>
					}):
					<CircularProgress/>
				}
			</TableBody>
			<TableFooter>
				{
					dataSize?
					<TableRow>
						<TableCell>
						<Button onClick={() => saveAsCsv({ data : bookings, fields : csvFields, filename : "export"})}>
						 Export to CSV
						</Button>
						</TableCell>
						<TablePagination
						count = {dataSize}
						onPageChange = {(event, page)=> setCurrPage(page)}
						page = {currPage}
						rowsPerPageOptions = {[]}
						rowsPerPage = {data_per_page}
						/>
					</TableRow>:
				null
				}
			</TableFooter>
		</Table>
		</TableContainer> : 
		<Box sx = {{opacity : "0.5"}}>
			<Box sx={{display:"flex", justifyContent:"center"}}>
				<img style = {{height : "100%", maxWidth : "100%"}}src = "42_logo.png" alt = "logo"/>
			</Box>
			<Typography align = "center" variant = "h4">
					Pick a Date
			</Typography>
		</Box>
	);
}
 
export default BookingDisplayDate;