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
import axios from "axios";
import moment from "moment";

const handleDelete = (id, setReload, reload) =>
{
	axios.delete(`${process.env.REACT_APP_API_URL}/bookings/${id}`)
	.then((res) => setReload(-reload))
	.catch((e) => {console.log(e.response);alert(`error : ${e.message}`)})
}

const BookingDisplay = ({user_name}) => {
	const data_per_page = 3;
	const [user, setUser] = useState(null);
	const [bookings, setBookings] = useState(null);
	const [currPage, setCurrPage] = useState(0);
	const [dataSize, setDataSize] = useState(null);
	const [reload, setReload] = useState(1);
	const [open, setOpen] = useState(false)

	useEffect(() => {
		if (!user_name)
			return;
		axios.get(`${process.env.REACT_APP_API_URL}/users/${user_name}`)
		.then((response) => {
			setUser(response.data.data);
			setBookings(response.data.bookings);
			setDataSize(response.data.bookings.length);
		})
		.catch((e) => {console.log(e.response); alert("error"); window.location.href = "/"})
	}, [user_name, dataSize, reload])

	return (
		user?
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
					null
				}
			</TableBody>
			<TableFooter>
				{
					dataSize?
					<TableRow>
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
					Pick a user
			</Typography>
		</Box>
	);
}
 
export default BookingDisplay;