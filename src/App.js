import "./App.css";

// Components
import Header from "./Router/Layout/Header";
import MainRouter from "./Router/MainRouter";

function App() {
	return (
		<div className="App">
			<Header/>

			<MainRouter/>
		</div>
	);
}

export default App;
