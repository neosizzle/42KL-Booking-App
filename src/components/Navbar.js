import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import AddToPhotosIcon from '@mui/icons-material/AddToPhotos';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import LockIcon from '@mui/icons-material/Lock';
import Cookies from 'universal-cookie';
import useWindowWidth from '../hooks/useWindowWidth';
import { useHistory } from 'react-router-dom' 
import { useState, useCallback } from 'react';

const handleLogout = () =>
{
	const cookies = new Cookies();
	cookies.remove("access_token");
	window.location.href = "/"
}

const Navbar = ({active, imgUrl, isAdmin}) => {
	const [open, setOpen] = useState(false);
	const width = useWindowWidth();
	const history = useHistory();
	const handleRedir = useCallback((endp) => history.push(endp), [history]);

	return ( 
	<Box sx={{ flexGrow: 1 }}>
      	<AppBar position="static">
       	 	<Toolbar>
         		<IconButton
            		size="large"
            		edge="start"
            		color="inherit"
            		aria-label="menu"
            		sx={{ mr: 2 }}
					onClick = {()=> setOpen(!open)}
         		>
          	  		<MenuIcon />
         	 	</IconButton>
         	 	<Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          	 		{active}
          		</Typography>
				{
				  width >= 425?
					<Button variant = "contained"
					color = "secondary"
					sx={{marginRight : "1rem"}}
					endIcon={<LockIcon/>}
					onClick = {()=>handleLogout()}
					>Log out</Button> :
					null
				}
				
          		<Avatar alt="avatar" src={imgUrl}/>
        	</Toolbar>
      	</AppBar>
		<Drawer
		anchor = "left"
		open = {open}
		onClose = {() => setOpen(!open)}
		>
			<List>
				<ListItemButton
				sx = {{padding : "1rem 3rem 1rem 3rem"}}
				selected={active === "Dashboard"}
				onClick = {() => handleRedir("/dashboard")}
       			>
				<ListItemIcon>
					<ManageAccountsIcon/>
				</ListItemIcon>
				<ListItemText primary="Dashboard"/>
        		</ListItemButton>

				<ListItemButton
				sx = {{padding : "1rem 3rem 1rem 3rem"}}
				selected={active === "Booking"}
				divider = {!isAdmin}
				onClick = {() => handleRedir("/booking")}
       			>
				<ListItemIcon>
					<AddToPhotosIcon/>
				</ListItemIcon>
          		<ListItemText primary="Booking"/>

        		</ListItemButton>

				{
					isAdmin?
					<ListItemButton
					sx = {{padding : "1rem 3rem 1rem 3rem"}}
					selected={active === "Admin"}
					onClick = {() => handleRedir("/admin")}
					divider
					>
					<ListItemIcon>
						<AdminPanelSettingsIcon/>
					</ListItemIcon>
					<ListItemText primary="Admin"/>
					</ListItemButton> : 
					null
				}
				
				{
					width < 425?
					<ListItemButton
					sx = {{padding : "1rem 3rem 1rem 3rem"}}
					onClick = {()=> handleLogout()}
					>
					<ListItemIcon>
						<LockIcon/>
					</ListItemIcon>
					<ListItemText primary="Logout"/>
					</ListItemButton>:
					null
				}
			</List>
		</Drawer>
    </Box>
	 );
}
 
export default Navbar;