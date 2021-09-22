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
			backgroundImage:"url(landing_background.png)",
			backgroundSize:"cover",
			height:"100vh",
			width:"100vw",
			display:"flex",
			justifyContent:"center",
			alignItems:"center",
			flexDirection : "column"}}>
			<img src="42 logo.png" alt="42 logo"/>
			<Typography variant="h3" gutterBottom>
				Book your iMac
			</Typography>
			<Button
			variant="contained"
			onClick = {() => handle_signin()}
			>Sign in with 42</Button>
		</Box>
	 );
}
 
export default Login;