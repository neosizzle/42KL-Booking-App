import Box from '@mui/material/Box';
import BookingCard from "./BookingCard";
import NoBookings from './NoBookings';
import Pagination from '@mui/material/Pagination';
import { useState } from 'react';
//import data from "../../data/bookings" // dummy data

const Bookings = ({user}) => {
	const 	data_size = user.bookings.length;
	const	data_per_page = 3;
	const	pages = Math.floor(data_size/data_per_page) + (data_size % data_per_page === 0 ? 0 : 1);
	const	[currPage, setCurrPage] = useState(1);
	const	[showCards, setShowCards] = useState(true);

	return (
		<Box>
			{/*Cards start */}
			<Box sx = {{display : "flex", justifyContent : "center", alignItems : "center", flexDirection : "column"}}>
			{
				data_size > 0 ?
				user.bookings.slice(0)
				.reverse()
				.slice((currPage - 1) * data_per_page, (currPage - 1) * data_per_page + data_per_page)
				.map((data, idx) => 
				{
					return <BookingCard key = {idx}
							show = {showCards}
							delay={idx}
							date={data.booked_date}
							name={data.booked_by}
							seat={{name : data.seat_name, section : data.seat_section}}
							booking_id={data._id}/>
				}) :
				<NoBookings/>
			}
			</Box>
			{/*Cards end*/}

			{/*Pagination start */}
			<Box>
				<Pagination
				count={pages}
				page={currPage}
				onChange={(event, value) =>
				{
					setShowCards(false);
					setTimeout(() => {
						setShowCards(true);
						setCurrPage(value);
					}, 500)
				}}/>
			</Box>
			{/*Pagination end */}
		</Box>
	 );
}
 
export default Bookings;