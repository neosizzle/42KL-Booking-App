import { ImageMap } from "@qiuz/react-image-map";
import SeatUnit from "./SeatUnit";
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import { useEffect, useState } from "react";
import moment from "moment";
import axios from "axios";

/*
** Helper function to retrive seat data accordingly
*/
const seatDataHelper = (setSeatData, section, date, setLoading) =>
{
	axios.get(`${process.env.REACT_APP_API_URL}/seats/section_date?section=${section}&date=${moment(date).format("YYYY-MM-DD")}`)
	.then((response)=>
	{
		//console.log(response);
		setSeatData(response.data);
		setLoading(false);
	})
	.catch((error)=>{
		console.log(error);
		alert(`error : ${error.message}`)
		window.location.href = "/"
	})
}

/*
** Helper function to set the url of the floor plan according to the section
*/
const imgUrlHelper = (section, setImgUrl) =>
{
	switch (section) {
		case "182/181/180, GF":
			setImgUrl("/assets/182-181-180GF.svg")
			break;
		case "182/181/180, 1F":
			setImgUrl("/assets/182-181-1801F.png")
			break;
		case "190/191, GF":
			setImgUrl("/assets/190-191GF.png");
			break;
		case "190/191, 1F":
			setImgUrl("/assets/190-1911F.png");
			break;
		default:
			break;
	}
}

const FloorLayout = ({date, section, setSeat, currSeat, loading, setLoading}) => {
	const [imgUrl, setImgUrl] = useState(null)
	const [seatData, setSeatData] = useState(null);

	useEffect(() => {
		imgUrlHelper(section, setImgUrl);
		seatDataHelper(setSeatData, section, date, setLoading);
		//console.log(seatData);
	}, [date, section, setLoading])

	/*
	* Helper function to generate interactive map areas by taking the map data
	*/
	const generateMapArea = (seatData) =>
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
					activated = {seatData.data[idx].is_activated}
					available = {seatData.is_avail[idx]}
					transform = {seatData.data[idx].transformation}
					name = {seatData.data[idx].name}
					setSeat = {setSeat}
					currSeat = {currSeat}/>
				},
			}
			res.push(temp);
		}
		return (res);
	}

	return (
		seatData && !loading? <ImageMap src = {imgUrl} map={generateMapArea(seatData)}/> : <Box><CircularProgress/></Box>
	 );
}
 
export default FloorLayout;