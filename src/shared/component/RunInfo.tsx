import React from "react";
import { Run } from "../../types/Run.type";
import { formatDateRange } from "../util/utils";

interface RunInfoProps {
    run: Run
}

const RunInfo: React.FC<RunInfoProps> = ({run}) => (
    <div className="column--centered" id="run-info">
        <p className="mt-0 mb-10">{run.name}</p>
        <p className="m-0">{formatDateRange(run.dates, true)}</p>
    </div>
);

export default RunInfo;
