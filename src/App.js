import {
	BrowserRouter as Router,
	Switch,
	Route,
  } from "react-router-dom";
import Dashboard from "./routes/dashboard"
import Book from "./routes/booking";
import Login from './routes/login';
import Auth from "./routes/auth"
import Admin from "./routes/admin"
import { createTheme, ThemeProvider, responsiveFontSizes} from '@mui/material/styles';
import AdapterMoment from '@mui/lab/AdapterMoment';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import "./css/root.css"

/*
** Custom theme
*/
let theme = createTheme( {
	palette: {
	  type: 'light',
	  primary: {
		main: '#3fff98',
		light : '#8effb9',
		dark : '#00e35b',
	  },
	  secondary: {
		main: '#ff3fa5',
		light: '#fd81c0',
		dark: '#ff0074'
	  },
	},
  });

theme = responsiveFontSizes(theme);

function App() {
  	return (
		<LocalizationProvider dateAdapter={AdapterMoment}>
		<ThemeProvider theme = {theme}>
			<Router className="root">
				<Switch>
					<Route path = "/dashboard" exact>
						<Dashboard/>
					</Route>
					<Route path = "/dashboard/manage" exact>
						<div>
							Manage
						</div>
					</Route>
					<Route path = "/auth">
						<Auth/>
					</Route>
					<Route path = "/booking" exact>
						<Book/>
					</Route>
					<Route path = "/admin" exact>
						<Admin/>
					</Route>
					<Route path = "/" exact>
						<Login/>
					</Route>
				</Switch>
			</Router>
		</ThemeProvider>
		</LocalizationProvider>
  	);
}

export default App;
