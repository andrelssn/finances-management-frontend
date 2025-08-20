import React from 'react';
import { useMediaQuery, useTheme } from '@mui/material';

// Style
import "./App.css";

// Components
import LoaderSystem from './Components/LoaderSystem/LoaderSystem';
import Login from './Views/Login/Login';
import MySnackbar from './Components/MySnackbar/MySnackbar';
import MainRouter from './Router/MainRouter';

// State Component
import userAuthData from './Components/States/UserState';

// Services
import { clearSecurity, getData } from './Services/services';

function App() {
	const [view, setView] 	      = React.useState(<LoaderSystem sx={{ mt: 40 }}/>);
	const [reload, setReload]	  = React.useState(1);
	const [snackbar, setSnackbar] = React.useState({ open: false, severity: "", message: "" });

    // const user = userAuthData((state) => state.user); exemplo de get do user no zustand
	const addUser = userAuthData((state) => state.addUser);
	const clearUser = userAuthData((state) => state.clearUser);

	const theme = useTheme();
	const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

	async function checkUser() {
		setView(<LoaderSystem sx={{ mt: 40 }}/>);

		await getData('/user').then(response => {
			if (response.status === 200) {
				addUser(response.data);
				setView(<MainRouter isMobile={isMobile} setReload={setReload} setSnackbar={setSnackbar}/>);
			} else {
				setView(<Login setReload={setReload} reload={reload} setSnackbar={setSnackbar}/>);
				clearSecurity();
				clearUser();
			}
		});
	}

	React.useEffect(() => {
		checkUser();
	}, [reload]);

	return (
		<div className="App">
			{view}

			<MySnackbar open={snackbar.open} snackbar={snackbar} setSnackbar={setSnackbar}/>
		</div>
	);
}

export default App;
