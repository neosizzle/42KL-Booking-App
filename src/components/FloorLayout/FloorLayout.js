import { ImageMap } from "@qiuz/react-image-map";
import SeatUnit from "./SeatUnit";
import { useEffect, useState } from "react";

const data = require ("../../data/seat")

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
				return <SeatUnit activated = {seatData.data[idx].is_activated} available = {seatData.is_avail[idx]}/>
			},
			// onMouseOver: () => console.log("map onMouseOver")
		}
		res.push(temp);
	}
	return (res);
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

const FloorLayout = ({date, section, setSeat}) => {
	const [imgUrl, setImgUrl] = useState("https://cdn.discordapp.com/attachments/877898452065992765/889042953530646548/180_GF_with_seats.png")
	const [seatData, setSeatData] = useState(data.data)
	useEffect(() => {
		imgUrlHelper(section, setImgUrl);
		setSeatData(data.data);
		//console.log(seatData);
	}, [date, section])
	const mapAreas = generateMapArea(seatData);
	//const mapAreas = []

	const onMapClick = (area, index) => {
		const tip = `click map${index + 1}`;
		console.log(tip, area);
		alert(tip);
	}
	return (
		<ImageMap src = {imgUrl} map={mapAreas} onMapClick={onMapClick}/>
	 );
}
 
export default FloorLayout;