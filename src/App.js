import { useMediaQuery, useTheme } from '@mui/material';

// Style
import "./App.css";

// Components
import Header from "./Router/Layout/Header";
import MainRouter from "./Router/MainRouter";

function App() {
	const theme = useTheme();
	const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

	return (
		<div className="App">
			<Header isMobile={isMobile}/>

			<MainRouter/>
		</div>
	);
}

export default App;
