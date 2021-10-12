const SELECTED_COLOR = "green";
const AVAIL_COLOR = "grey";

const SeatUnit = ({transform, selected}) => {

	return ( 
		<div style= {{
			backgroundColor: selected ? SELECTED_COLOR : AVAIL_COLOR,
			height : "100%",
			width : "100%",
			transform : transform,
			borderRadius : "0.5rem",
			opacity : "0.9",
			}}
			>

		</div>
	);
}
 
export default SeatUnit;