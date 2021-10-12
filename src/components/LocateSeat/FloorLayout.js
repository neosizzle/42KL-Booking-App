import { useEffect, useState } from 'react';
import { ImageMap } from "@qiuz/react-image-map";
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import SeatUnit from './SeatUnit';
import axios from "axios";

/*
** Helper to generate image url
*/
const imgUrlHelper = (section, setImgUrl) =>
{
	switch (section) {
		case "182/181/180, GF":
			setImgUrl("/assets/182-181-180GF.svg")
			break;
		case "182/181/180, 1F":
			setImgUrl("/assets/182-181-1801F.svg")
			break;
		case "190/191, GF":
			setImgUrl("/assets/190-191GF.svg");
			break;
		case "190/191, 1F":
			setImgUrl("/assets/190-1911F.svg");
			break;
		default:
			break;
	}
}

/*
** Helper to generate map areas
*/
const generateMapArea = (seatData, seat_name) =>
{
	let	res;
	let	i;
	let	temp;

	i = -1;
	res = [];
	while (++i < seatData.data.length)
	{
		temp = {
			left : seatData.data[i].x_offs,
			top : seatData.data[i].y_offs,
			height: "6%",//ratio : /1.75
			width: "3.42%",
			render : (area, idx) =>
			{
				return <SeatUnit
				transform = {seatData.data[idx].transformation}
				selected = {seatData.data[idx].name === seat_name}
				/>
			},
		}
		res.push(temp);
	}
	return (res);
}

const FloorLayout = ({seat_section, seat_name}) => {
	const [seatData, setSeatData] = useState(null)
	const [imgUrl, setImgUrl] = useState(null)

	useEffect(() => {
		axios.get(`${process.env.REACT_APP_API_URL}/seats/section/${encodeURIComponent(seat_section)}`)
		.then((response) => setSeatData(response.data))
		.catch ((error) => console.error(error))

		imgUrlHelper(seat_section, setImgUrl);
	}, [seat_section])

	return ( 
		<Box>
			{
				seatData?
				<ImageMap src = {imgUrl} map={generateMapArea(seatData, seat_name)}/>: 
				<CircularProgress/>
			}
		</Box>
	 );
}
 
export default FloorLayout;