import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { ResponseStatus } from "../../app/store/store";
import { organizeArrayByField, totalScoresForRuns } from "../../shared/util/utils";
import { Run, RunID } from "../../types/Run.type";
import { Score } from "../../types/Score.type";
import { User } from "../../types/User.type";
import { getRunListByIds } from "../../api/Runs.api";
import { getScoresForUser } from "../../api/Scores.api";
import { getUserById } from "../../api/User.api";
import { saveUser, saveRunRecord, saveScoreRecord, selectUser, selectRunRecordOrganized, selectScoreRecordOrganized } from "./ProfilePage.store";
import { AvatarIconLarge } from "../AvatarCreator/AvatarCreator";

const ProfilePage: React.FC = () => {
    const { userId } = useParams();
    const user: User | null = useSelector(selectUser);
    const scoreRecordOrganized: Record<RunID, Score[]> = useSelector(selectScoreRecordOrganized);
    const runRecordOrganized: Record<RunID, Run> = useSelector(selectRunRecordOrganized);;
    const scoresForRuns: Record<RunID, number> = totalScoresForRuns(scoreRecordOrganized);
    
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
        dispatch(saveUser(user));
        dispatch(saveScoreRecord(scores));
        dispatch(saveRunRecord(runs));
    }



    useEffect(() => {
        if (!userId) {
            setError("User not found.");
        } else {
            collectionProfilePageInfo(userId);
        }
    }, [ userId, dispatch ]);

    return (
        <div>
            { error && <p>{error}</p> }
            { 
                user && 
                <div>
                    <div className="flex-row">
                        <AvatarIconLarge {...user.avatar} />
                        <h2>{user.username}</h2>
                    </div>
                    <div>
                        <p>Record:</p>
                        { Object.entries(scoreRecordOrganized).map(([runId, scores]) => (
                            <div id={runId}>
                                <div onClick={() => setOpenRunId(id => id === runId ? null : runId)}> 
                                    <p>{runRecordOrganized[runId as RunID]?.name || ''}</p>
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
