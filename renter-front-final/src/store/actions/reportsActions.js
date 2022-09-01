import { GET_REPORTS, UPDATE_REPORT } from "./types";

export const getReports = (reports) => {
    return {
        type: GET_REPORTS,
        payload: reports,
    };
};

export const updateReport = (reports) => {
    return {
        type: UPDATE_REPORT,
        payload: reports,
    };
};
