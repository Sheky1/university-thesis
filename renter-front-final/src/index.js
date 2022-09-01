import React from "react";
import "bootstrap/dist/css/bootstrap.css";
import "./App.scss";
import { BrowserRouter as Router } from "react-router-dom";
import App from "./App";
import { Provider } from "react-redux";
import { createRoot } from "react-dom/client";

import store from "./store/store";

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

root.render(
	<Provider store={store}>
		<Router>
			<App />
		</Router>
	</Provider>
);
