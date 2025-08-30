import React from "react";

// Style
import "./App.css";

// Components
import MainRouter from "./Router/MainRouter";
import MySnackbar from "./Components/MySnackbar/MySnackbar";
import LoaderSystem from "./Components/LoaderSystem/LoaderSystem";

// Type
import type { SnackbarState } from "./Components/MySnackbar/MySnackbar";

// Services
import { clearSecurity, getData } from "./Services/Services";

// Global
import userAuthData from "./Components/GlobalState/User";

function App() {
    const [view, setView] 	      = React.useState(<LoaderSystem sx={{ mt: 40 }}/>);
	const [reload, setReload]	  = React.useState<number>(1);
    const [snackbar, setSnackbar] = React.useState<SnackbarState>({
        open: false,
        message: "",
    });

    // const user = userAuthData((state) => state.user); exemplo de get do user no zustand
	const addUser = userAuthData((state) => state.addUser);
	const clearUser = userAuthData((state) => state.clearUser);

	async function checkUser() {
        const result = await getData('/user');

        if (result.success) {
            if (result.response.status === 200) {
                addUser(result.response.data);
			}
		} else {
            clearSecurity();
            clearUser();
        }

        setView(<MainRouter setSnackbar={setSnackbar} reloadCheck={reloadCheck}/>);
	}

	React.useEffect(() => {
		checkUser();
	}, [reload]);

    const reloadCheck = () =>  {
        setReload(reload + 1);
        setView(<LoaderSystem sx={{ mt: 40 }}/>);
    }

    return (
        <main>
            {view}

			<MySnackbar open={snackbar.open} snackbar={snackbar} setSnackbar={setSnackbar}/>
        </main>
    );
}

export default App;
