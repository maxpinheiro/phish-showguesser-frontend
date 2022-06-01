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
import LoadingSpinner from "../../shared/icons/LoadingSpinner";
import UserInfo from "./UserInfo";

const ProfilePage: React.FC = () => {
    const { userId } = useParams();
    const user: User | null = useSelector(selectUser);
    const scoreRecordOrganized: Record<RunID, Score[]> = useSelector(selectScoreRecordOrganized);
    const runRecordOrganized: Record<RunID, Run> = useSelector(selectRunRecordOrganized);
    const scoresForRuns: Record<RunID, number> = totalScoresForRuns(scoreRecordOrganized);
    
    const [ openRunId, setOpenRunId ] = useState<string | null>(null);
    const [ status, setStatus ] = useState<"loading" | "loaded" | "error">("loading");
    const [ error, setError ] = useState<string | null>(null);
    const dispatch = useDispatch();

    const collectionProfilePageInfo = async (userId: string) => {
        const user = await getUserById(userId);
        if (user === ResponseStatus.NotFound) {
            setError("User not found");
            setStatus("error");
            return;
        }
        if (user === ResponseStatus.UnknownError) {
            setError("Unknown error");
            setStatus("error");
            return;
        }
        const scores = await getScoresForUser(userId);
        if (scores === ResponseStatus.UnknownError) {
            setError("Unknown error");
            setStatus("error");
            return;
        }
        const scoresOrganized = organizeArrayByField(scores, "runId");
        const runIds = Object.keys(scoresOrganized);
        const runs = await getRunListByIds(runIds);
        if (runs === ResponseStatus.UnknownError) {
            setError("Unknown error");
            setStatus("error");
            return;
        }
        dispatch(saveUser(user));
        dispatch(saveScoreRecord(scores));
        dispatch(saveRunRecord(runs));
        setStatus("loaded");
    }

    useEffect(() => {
        if (!userId) {
            setError("User not found.");
        } else {
            collectionProfilePageInfo(userId);
        }
    }, [ userId, dispatch ]);

    return (
        <div className="column--centered">
            {
                status === "loading" && <><div className="h-20vh" /><LoadingSpinner /></>
            }
            { 
                status === "loaded" && user && <UserInfo user={user} scoreRecordOrganized={scoreRecordOrganized} runRecordOrganized={runRecordOrganized} />
            }
            { 
                status === "error" && <p>{error || "An unknown error occurred"}</p> 
            }
        </div>
    )
}

export default ProfilePage;
