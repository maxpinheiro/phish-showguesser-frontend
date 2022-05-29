import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { ResponseStatus } from "../../app/store/store";
import { Run } from "../../types/Run.type";
import { getAllRuns } from "../../api/Runs.api";
import { saveRuns, selectRuns } from "./RunList.store";
import { formatDateRange } from "../../shared/util/utils";

const RunList: React.FC = () => {
    const runs: Run[] = useSelector(selectRuns);
    const [ openRunId, setOpenRunId ] = useState<string | null>(null);
    const [ error, setError ] = useState<string | null>(null);
    const dispatch = useDispatch();

    useEffect(() => {
        getAllRuns().then(response => {
            if (response === ResponseStatus.UnknownError) {
                setError('Unknown error');
            } else {
                dispatch(saveRuns(response));
            }
        })
    }, [ dispatch ]);


    return (
        <div>
            <div>
                <Link to="/runs">All Runs</Link>
            </div>
            <p>Runs</p>
            { error && <p>{error}</p> }
            { runs.map(run => (
                <div id={run.id}>
                    <div onClick={() => setOpenRunId(runId => runId === run.id? null : run.id)}> 
                        <p>{`${formatDateRange(run.dates)}: ${run.name}`}</p>
                    </div>
                    {
                        openRunId === run.id &&
                        <div className="flex-column">
                            <Link to={`/guesses/${run.id}/edit`}>Edit Your Guesses</Link>
                            <Link to={`/guesses/${run.id}`}>View All Guesses</Link>
                            <Link to={`/scores/${run.id}`}>Leaderboard</Link>
                        </div>
                    }
                </div>
            )) }
        </div>
    )
}

export default RunList;
