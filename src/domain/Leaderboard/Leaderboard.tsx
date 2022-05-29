import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { ResponseStatus } from "../../app/store/store";
import { formatDateRange, rankScores } from "../../shared/util/utils";
import { getUserListByIds } from "../../api/User.api";
import { getScoresForRun } from "../../api/Scores.api";
import { saveScores, saveUsers, saveRun, selectScoresByUser, selectRankedUsers, selectUsersDict, selectRun } from "./Leaderboard.store";
import { getRunById } from "../../api/Runs.api";
import { RunID } from "../../types/Run.type";
import { UserID } from "../../types/User.type";

const RunLeaderboard: React.FC = () => {
    const { runId } = useParams();
    const rankedUsers: ({userId: string, points: number})[] = useSelector(selectRankedUsers);
    const scoresByUser = useSelector(selectScoresByUser);
    const users = useSelector(selectUsersDict);
    const run = useSelector(selectRun);
    
    const [ openUsers, setOpenUsers ] = useState<Record<string, boolean>>({});
    const [ error, setError ] = useState<string | null>(null);
    const dispatch = useDispatch();

    const collectLeaderboardInfo = async (runId: RunID) => {
        const scores = await getScoresForRun(runId);
        if (scores === ResponseStatus.UnknownError) {
            setError("Unknown error");
            return;
        }
        const rankedUsers = rankScores(scores);
        const userIds = rankedUsers.map(user => user.userId);
        const users = await getUserListByIds(userIds);
        if (users === ResponseStatus.UnknownError) {
            setError("Unknown error");
            return;
        }
        const run = await getRunById(runId);
        if (run === ResponseStatus.UnknownError) {
            setError("Unknown error");
            return;
        } else if (run === ResponseStatus.NotFound) {
            setError("Run not found");
            return;
        }
        dispatch(saveScores(scores));
        dispatch(saveUsers(users));
        dispatch(saveRun(run));
    }

    const openUser = (userId: string) => setOpenUsers(usersDict => {usersDict[userId] = true; return usersDict});
    const closeUser = (userId: string) => setOpenUsers(usersDict => {usersDict[userId] = false; return usersDict});

    useEffect(() => {
        if (!runId) {
            setError("Run not found");
        } else {
            collectLeaderboardInfo(runId as RunID);
        }

    }, [ runId, dispatch ]);

    useEffect(() => {
        let usersDict: Record<string, boolean> = {};
        Object.keys(scoresByUser).forEach(userId => {usersDict[userId] = false});
        setOpenUsers(usersDict);
    }, [ scoresByUser ]);



    return (
        <div>
            {
                error && <p>{error}</p>
            }
            <h2>Leaderboard</h2>
            { run &&
                <div>
                    <p>{run.name}</p>
                    <p>{formatDateRange(run.dates, true)}</p>
                </div>
            }
            { rankedUsers.length > 0 && rankedUsers.map(({ userId, points }, idx) => (
                <div id={userId}>
                    <div onClick={() => openUsers[userId] ? closeUser(userId) : openUser(userId)}>
                        <p>{idx + 1}.</p>
                        <p>{users[userId]?.username || userId}</p>
                        <p>{points}</p>
                    </div>
                    { openUsers[userId] &&
                        <div>
                            {
                                scoresByUser[userId as UserID] && scoresByUser[userId as UserID].map(score => (
                                    <div id={score.id}>
                                        <p>{score.songName}</p>
                                        <p>{score.points}</p>
                                    </div>
                                ))
                            }
                        </div>    
                    }
                    
                </div>
            )) }
        </div>
    );
}

export default RunLeaderboard;
