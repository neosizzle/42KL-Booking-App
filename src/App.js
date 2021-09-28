import {
	BrowserRouter as Router,
	Switch,
	Route,
} from "react-router-dom";
import Dashboard from "./routes/dashboard"
import Book from "./routes/booking";
import Login from './routes/login';
import Auth from "./routes/auth"
import { createTheme, ThemeProvider, responsiveFontSizes } from '@mui/material/styles';
import AdapterMoment from '@mui/lab/AdapterMoment';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import "./css/root.css"

/*
** Custom theme
*/
let theme = createTheme({
	palette: {
		type: 'light',
		primary: {
			main: '#38560f',
			contrastText: '#f7fbec',
		},
		secondary: {
			main: '#b46d60',
		},
		info: {
			main: '#60a7b4',
		},
		background: {
			default: '#fffaf2',
		},
	},
	typography: {
		fontFamily: 'NTR',
		subtitle2: {
			fontSize: '0.9rem',
		},
		fontSize: 17,
		fontWeightLight: 300,
	},
	props: {
		MuiButtonBase: {
			disableRipple: true,
		},
	},
	spacing: 8,
});

theme = responsiveFontSizes(theme);

function App() {
	return (
		<LocalizationProvider dateAdapter={AdapterMoment}>
			<ThemeProvider theme={theme}>
				<Router className="root">
					<Switch>
						<Route path="/dashboard" exact>
							<Dashboard />
						</Route>
						<Route path="/dashboard/manage" exact>
							<div>
								Manage
							</div>
						</Route>
						<Route path="/auth" exact>
							<Auth />
						</Route>
						<Route path="/booking" exact>
							<Book />
						</Route>
						<Route path="/" exact>
							<Login />
						</Route>
					</Switch>
				</Router>
			</ThemeProvider>
		</LocalizationProvider>
	);
}

export default App;
