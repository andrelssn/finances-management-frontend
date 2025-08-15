import React from 'react';
import { useMediaQuery, useTheme } from '@mui/material';

// Style
import "./App.css";

// Components
import LoaderSystem from './Components/LoaderSystem/LoaderSystem';
import Login from './Views/Login/Login';
import MySnackbar from './Components/MySnackbar/MySnackbar';
import MainRouter from './Router/MainRouter';

// Services
import { clearSecurity, getData } from './Services/services';

function App() {
	const [userData, setUserData] = React.useState(null);
	const [view, setView] 	      = React.useState(<LoaderSystem sx={{ mt: 40 }}/>);
	const [reload, setReload]	  = React.useState(1);
	const [snackbar, setSnackbar] = React.useState({ open: false, severity: "", message: "" });

	const theme = useTheme();
	const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

	async function checkUser() {
		setView(<LoaderSystem sx={{ mt: 40 }}/>);

		await getData('/user').then(response => {
			if (response.status === 200) {
				setUserData(response);
				setView(<MainRouter isMobile={isMobile} userData={userData}/>);
			} else {
				setView(<Login setReload={setReload} reload={reload} setSnackbar={setSnackbar}/>);
				clearSecurity();
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
