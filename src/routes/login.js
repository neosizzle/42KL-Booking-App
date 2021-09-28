import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';


const handle_signin = ()=>
{
	window.location.href = process.env.REACT_APP_OAUTH_URL;
}

const Login = () => {
	return ( 
		<Box sx = {{
			background:"url(landing_background.png) center",
			backgroundSize:"cover",
			height:"100vh",
			width:"100vw",
			display:"flex",
			justifyContent:"center",
			alignItems:"center",
			flexDirection : "column"}}>
			<img src="42_logo.png" alt="42 logo" width="80%" height="auto" style={{ maxWidth:600 }}/>
			<Typography	variant="h4" sx={{ p: 4 }} gutterBottom>
				&lt;/book_your_iMac&gt;
			</Typography>
			<Button
			variant="contained"
			size="large"
			style={{ fontSize:"1.5em ", userSelect: "none"}}
			onClick = {() => handle_signin()}
			>Sign in with 42</Button>
		</Box>
	 );
}
 
export default Login;