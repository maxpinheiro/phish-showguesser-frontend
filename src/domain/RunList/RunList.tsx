import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { ResponseStatus } from "../../app/store/store";
import { Run } from "../../types/Run.type";
import { getAllRuns } from "../../api/Runs.api";
import { saveRuns, selectRuns } from "./RunList.store";
import { formatDateRange } from "../../shared/util/utils";
import { Oval } from "react-loader-spinner";

const RunList: React.FC = () => {
    const runs: Run[] = useSelector(selectRuns);
    const [ openRunId, setOpenRunId ] = useState<string | null>(null);
    const [ error, setError ] = useState<string | null>(null);
    const [ status, setStatus ] = useState<'loading' | 'loaded' | 'error'>('loading');
    const dispatch = useDispatch();

    useEffect(() => {
        getAllRuns().then(response => {
            if (response === ResponseStatus.UnknownError) {
                setError('Unknown error');
            } else {
                setStatus('loaded');
                dispatch(saveRuns(response));
            }
        })
    }, [ dispatch ]);


    return (
        <div className="column--centered">
            <p className="header">Runs</p>
            {
                status === 'loading' &&
                <>
                    <Oval 
                        width={100} height={100}
                        strokeWidth={5} color="#E01212" secondaryColor="#AB2626"
                    />
                    <p>Loading...</p>
                </>
            }
            { error && <p>{error}</p> }
            {
                status === 'loaded' && runs && 
                runs.map((run, idx) => (
                    <div key={run.id} className={`column--centered w-100 row-color-${idx % 2} p-5-0`}>
                        <div className="pointer" onClick={() => setOpenRunId(runId => runId === run.id? null : run.id)}> 
                            <p>{`${formatDateRange(run.dates)}: ${run.name}`}</p>
                        </div>
                        {
                            openRunId === run.id &&
                            <div className="row--space-around w-100 p-5-0">
                                <Link to={`/guesses/${run.id}/edit`}>Edit Your Guesses</Link>
                                <Link to={`/guesses/${run.id}`}>View All Guesses</Link>
                                <Link to={`/scores/${run.id}`}>Leaderboard</Link>
                            </div>
                        }
                    </div>
                ))
            }
        </div>
    )
}

export default RunList;
