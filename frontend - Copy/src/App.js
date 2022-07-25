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

import { Route, Switch, BrowserRouter } from "react-router-dom";

function App() {
    return (
        <div>
            <BrowserRouter>
                <Switch>
                    <Route
                        exact
                        path="/home-agency/"
                        component={HomeAgencija}
                    />
                    <Route
                        exact
                        path="/home-agency/vehicle/:slug"
                        component={SingleVehicle}
                    />
                    <Route
                        exact
                        path="/home-agency/reservations"
                        component={Reseravations}
                    />
                    <Route
                        exact
                        path="/home-agency/additions"
                        component={Additions}
                    />
                    <Route exact path="/home-agency/sizes" component={Sizes} />
                    <Route exact path="/home-agency/fuel" component={Fuel} />
                    <Route
                        exact
                        path="/home-agency/reports"
                        component={ReportsAgency}
                    />

                    <Route exact path="/home-admin/" component={HomeAdmin} />
                    <Route
                        exact
                        path="/home-admin/agency/:slug"
                        component={SingleAgency}
                    />
                    <Route exact path="/home-admin/cities" component={Cities} />
                    <Route
                        exact
                        path="/home-admin/currencies"
                        component={Currencies}
                    />
                    <Route
                        exact
                        path="/home-admin/reports"
                        component={Reports}
                    />

                    <Route exact path="/" component={Login} />
                    {/* <Route exact path="/forgot/" component={Forgot} /> */}
                    <Route component={Error} />
                </Switch>
            </BrowserRouter>
        </div>
    );
}

export default App;
