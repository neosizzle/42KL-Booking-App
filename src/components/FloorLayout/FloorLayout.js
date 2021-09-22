import { ImageMap } from "@qiuz/react-image-map";
import SeatUnit from "./SeatUnit";
import { useEffect, useState } from "react";
import moment from "moment";

let data = require("../../data/seat");
let data2 = require("../../data/seat2");

/*
** Helper function to retrive seat data accordingly
*/
const seatDataHelper = (setSeatData, section, date) =>
{
	let date_str;

	date_str = moment(date).format("YY-MM-DD");
	if (date_str === moment().format("YY-MM-DD"))
		setSeatData(data.data);
	else
		setSeatData(data2.data);
}

/*
** Helper function to set the url of the floor plan according to the section
*/
const imgUrlHelper = (section, setImgUrl) =>
{
	switch (section) {
		case "181/180, GF":
			setImgUrl("https://cdn.discordapp.com/attachments/877898452065992765/889042953530646548/180_GF_with_seats.png")
			break;
		case "181/180, 1F":
			setImgUrl("https://www.roomsketcher.com/wp-content/uploads/2017/08/RoomSketcher-Custom-2D-Floor-Plan-Branding.jpg")
			break;
		case "182/183, GF":
			setImgUrl("https://www.roomsketcher.com/wp-content/uploads/2017/11/RoomSketcher-Order-Floor-Plans-2D-Floor-Plan.jpg");
			break;
		default:
			break;
	}
}

const FloorLayout = ({date, section, setSeat, currSeat}) => {
	const [imgUrl, setImgUrl] = useState("https://cdn.discordapp.com/attachments/877898452065992765/889042953530646548/180_GF_with_seats.png")
	const [seatData, setSeatData] = useState(data.data);

	useEffect(() => {
		imgUrlHelper(section, setImgUrl);
		seatDataHelper(setSeatData, section, date);
		//console.log(seatData);
	}, [date, section])

	/*
	* Helper function to generate interactive map areas by taking the map data
	*/
	const generateMapArea = (seatData) =>
	{
		let	res;
		let	i;
		let	temp;

		i = -1;
		res = []
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
					name = {seatData.data[idx].name}
					setSeat = {setSeat}
					currSeat = {currSeat}/>
				},
			}
			res.push(temp);
		}
		return (res);
	}

	const mapAreas = generateMapArea(seatData);

	return (
		<ImageMap src = {imgUrl} map={mapAreas}/>
	 );
}
 
export default FloorLayout;