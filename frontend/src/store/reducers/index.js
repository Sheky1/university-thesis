import { combineReducers } from "redux";

import loginReducer from "./loginReducer";
import agencyReducer from "./agencyReducer";
import vehicleReducer from "./vehicleReducer";
import vehicleSizesReducer from "./vehicleSizesReducer";
import fuelTypesReducer from "./fuelTypesReducer";
import currenciesReducer from "./currenciesReducer";
import additionsReducer from "./additionsReducer";
import reservationsReducer from "./reservationsReducer";
import reportsReducer from "./reportsReducer";

const rootReducer = combineReducers({
    user: loginReducer,
    agencies: agencyReducer,
    vehicles: vehicleReducer,
    vehicleSizes: vehicleSizesReducer,
    fuelTypes: fuelTypesReducer,
    currencies: currenciesReducer,
    additions: additionsReducer,
    reservations: reservationsReducer,
    reports: reportsReducer,
});

export default rootReducer;
