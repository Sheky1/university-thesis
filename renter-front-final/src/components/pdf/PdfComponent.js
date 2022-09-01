import React, { useRef } from "react";
import ReactToPrint from "react-to-print";
import ReportsList from "../reports/ReportsList";

const Example = (props) => {
    const componentRef = useRef();

    return (
        <div
            style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "flex-start",
            }}
        >
            <ReactToPrint
                trigger={() => (
                    <button
                        className="btn-primary btn-small"
                        style={{ marginLeft: "50px" }}
                    >
                        PDF / Štampanje
                    </button>
                )}
                content={() => componentRef.current}
            />
            <ReportsList reports={props.reports} ref={componentRef} />
        </div>
    );
};
export default Example;
