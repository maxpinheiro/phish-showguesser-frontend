import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { ResponseStatus } from "../../../app/store/store";
import { organizeArrayByField, totalScoresForRuns } from "../../../shared/util/utils";
import { Run, RunID } from "../../../types/Run.type";
import { Score } from "../../../types/Score.type";
import { User } from "../../../types/User.type";
import { getRunListByIds } from "../../Runs/store/Runs.api";
import { getScoresForUser } from "../../Scores/store/Scores.api";
import { getUserById } from "../store/User.api";
import { saveCurrentUser, saveUserRuns, saveUserScores, selectCurrentUser, selectCurrentUserRunsOrganized, selectCurrentUserScoresOrganized } from "../store/User.store";

const ProfilePage: React.FC = () => {
    const user: User | null = useSelector(selectCurrentUser);
    const userScoresOrganized: Record<RunID, Score[]> = useSelector(selectCurrentUserScoresOrganized);
    const userRunsOrganized: Record<RunID, Run> = useSelector(selectCurrentUserRunsOrganized);;
    const scoresForRuns: Record<RunID, number> = totalScoresForRuns(userScoresOrganized);
    const [ openRunId, setOpenRunId ] = useState<string | null>(null);
    const [ error, setError ] = useState<string | null>(null);
    const dispatch = useDispatch();

    const collectionProfilePageInfo = async (userId: string) => {
        const user = await getUserById(userId);
        if (user === ResponseStatus.NotFound) {
            setError("User not found");
            return;
        }
        if (user === ResponseStatus.UnknownError) {
            setError("Unknown error");
            return;
        }
        const scores = await getScoresForUser(userId);
        if (scores === ResponseStatus.UnknownError) {
            setError("Unknown error");
            return;
        }
        const scoresOrganized = organizeArrayByField(scores, "runId");
        const runIds = Object.keys(scoresOrganized);
        const runs = await getRunListByIds(runIds);
        if (runs === ResponseStatus.UnknownError) {
            setError("Unknown error");
            return;
        }
        dispatch(saveCurrentUser(user));
        dispatch(saveUserScores(scores));
        dispatch(saveUserRuns(runs));
    }



    useEffect(() => {
        const { userId } = useParams();
        if (!userId) {
            setError("User not found.");
        } else {
            collectionProfilePageInfo(userId);
        }
    }, [ dispatch ]);

    return (
        <div>
            { error && <p>{error}</p> }
            { 
                user && 
                <div>
                    <div>
                        <h2>{user.username}</h2>
                    </div>
                    <div>
                        <p>Record:</p>
                        { Object.entries(userScoresOrganized).map(([runId, scores]) => (
                            <div id={runId}>
                                <div onClick={() => setOpenRunId(id => id === runId ? null : runId)}> 
                                    <p>{userRunsOrganized[runId as RunID]?.name || ''}</p>
                                </div>
                                {
                                    openRunId === runId &&
                                    <div className="flex-column">
                                        
                                    </div>
                                }
                            </div>
                        ))
                        }
                    </div>
                </div>
            }

        </div>
    )
}

export default ProfilePage;
