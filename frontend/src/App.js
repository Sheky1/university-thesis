import React from "react";

import Login from "./pages/default/Login";
// import Forgot from "./pages/default/Forgot";
import Error from "./pages/default/Error";

import HomeAgencija from "./pages/agency/HomeAgencija";
import SingleVehicle from "./pages/agency/SingleVehicle";
import Reseravations from "./pages/agency/Reseravations";
import Additions from "./pages/agency/Additions";
import Sizes from "./pages/agency/Sizes";
import Fuel from "./pages/agency/Fuel";
import ReportsAgency from "./pages/agency/ReportsAgency";

import HomeAdmin from "./pages/admin/HomeAdmin";
import Cities from "./pages/admin/Cities";
import Currencies from "./pages/admin/Currencies";
import Reports from "./pages/admin/Reports";
import SingleAgency from "./pages/admin/SingleAgency";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { Route, Routes } from "react-router-dom";

function App() {
	return (
		<div>
			<Routes>
				<Route exact path="/home-agency/" element={<HomeAgencija />} />
				<Route
					exact
					path="/home-agency/vehicle/:slug"
					element={<SingleVehicle />}
				/>
				<Route
					exact
					path="/home-agency/reservations"
					element={<Reseravations />}
				/>
				<Route
					exact
					path="/home-agency/additions"
					element={<Additions />}
				/>
				<Route exact path="/home-agency/sizes" element={<Sizes />} />
				<Route exact path="/home-agency/fuel" element={<Fuel />} />
				<Route
					exact
					path="/home-agency/reports"
					element={<ReportsAgency />}
				/>

				<Route exact path="/home-admin/" element={<HomeAdmin />} />
				<Route
					exact
					path="/home-admin/agency/:slug"
					element={<SingleAgency />}
				/>
				<Route exact path="/home-admin/cities" element={<Cities />} />
				<Route
					exact
					path="/home-admin/currencies"
					element={<Currencies />}
				/>
				<Route exact path="/home-admin/reports" element={<Reports />} />

				<Route exact path="/" element={<Login />} />
				{/* <Route exact path="/forgot/" element={Forgot} /> */}
				<Route path="*" element={<Error />} />
			</Routes>
			<ToastContainer autoClose={3000} hideProgressBar />
		</div>
	);
}

export default App;

