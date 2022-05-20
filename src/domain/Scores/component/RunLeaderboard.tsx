import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { ResponseStatus } from "../../../app/store/store";
import { rankScores } from "../../../shared/util/utils";
import { getUserListByIds } from "../../User/store/User.api";
import { selectUsersDictForCurrentRun, storeCurrentRunUsers } from "../../User/store/User.store";
import { getScoresForRun } from "../store/Scores.api";
import { saveScoresForCurrentRun, selectOrganizedScores, selectRankedScores } from "../store/Scores.store";

const RunLeaderboard: React.FC = () => {
    const rankedScores = useSelector(selectRankedScores);
    const organizedScores = useSelector(selectOrganizedScores);
    const users = useSelector(selectUsersDictForCurrentRun);
    const [ openUsers, setOpenUsers ] = useState<Record<string, boolean>>({});
    const [ error, setError ] = useState<string | null>(null);
    const dispatch = useDispatch();

    const collectLeaderboardInfo = async (runId: string) => {
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
        dispatch(saveScoresForCurrentRun(scores));
        dispatch(storeCurrentRunUsers(users));
    }

    useEffect(() => {
        const { runId } = useParams();
        if (!runId) {
            setError("Run not found");
        } else {
            collectLeaderboardInfo(runId);
        }

    }, [ dispatch ]);

    useEffect(() => {
        let usersDict: Record<string, boolean> = {};
        Object.keys(organizedScores).forEach(userId => {usersDict[userId] = false});
        setOpenUsers(usersDict);
    }, [ organizedScores ]);

    return (
        <div>
            {
                error && <p>{error}</p>
            }
            { rankedScores.map(({ userId, points }, idx) => (
                <div id={userId}>
                    <div>
                        <p>{idx + 1}.</p>
                        <p>{users[userId]?.username || userId}</p>
                        <p>{points}</p>
                    </div>
                    { openUsers[userId] &&
                        <div>
                            {
                                organizedScores[userId] && organizedScores[userId].map(score => (
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
