import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { ResponseStatus } from "../../app/store/store";
import { rankScores } from "../../shared/util/utils";
import { getUserListByIds } from "../../api/User.api";
import { getScoresForRun } from "../../api/Scores.api";
import { saveRun, saveScores, saveUsers, selectRankedUsersObj, selectRun, selectScoresByUser } from "./Leaderboard.store";
import { getRunById } from "../../api/Runs.api";
import { Run, RunID } from "../../types/Run.type";
import { User, UserID } from "../../types/User.type";
import { Score } from "../../types/Score.type";
import RunInfo from "../../shared/component/RunInfo";
import { Link } from "react-router-dom";
import LoadingSpinner from "../../shared/icons/LoadingSpinner";
import LeaderboardInfo from "./LeaderboardInfo";

const LeaderboardContainer: React.FC = () => {
    const { runId } = useParams();
    const rankedUsers: ({user: User, points: number})[] = useSelector(selectRankedUsersObj);
    const scoresByUser: Record<UserID, Score[]> = useSelector(selectScoresByUser);
    const run: Run | null = useSelector(selectRun);
    
    const [ status, setStatus ] = useState<"loading" | "loaded" | "error">("loading");
    const [ error, setError ] = useState<string | null>(null);
    const dispatch = useDispatch();

    const collectLeaderboardInfo = async (runId: RunID) => {
        const scores = await getScoresForRun(runId);
        if (scores === ResponseStatus.UnknownError) {
            setError("Unknown error");
            setStatus("error");
            return;
        }
        const rankedUsers = rankScores(scores);
        const userIds = rankedUsers.map(user => user.userId);
        const users = await getUserListByIds(userIds);
        if (users === ResponseStatus.UnknownError) {
            setError("Unknown error");
            setStatus("error");
            return;
        }
        const run = await getRunById(runId);
        if (run === ResponseStatus.UnknownError) {
            setError("Unknown error");
            setStatus("error");
            return;
        } else if (run === ResponseStatus.NotFound) {
            setError("Run not found");
            setStatus("error");
            return;
        }
        dispatch(saveScores(scores));
        dispatch(saveUsers(users));
        dispatch(saveRun(run));
        setStatus("loaded")
    }

    useEffect(() => {
        if (!runId) {
            setError("Run not found");
        } else {
            collectLeaderboardInfo(runId as RunID);
        }

    }, [ runId, dispatch ]);

    return (
        <div id="leaderboard-page">
            <div>
                <Link to="/runs">All Runs</Link>
            </div>
            <div className="column--centered">
                <p className="header">Leaderboard</p>
                {
                    status === 'loading' &&
                    <LoadingSpinner />
                }
                {
                    status === "loaded" && run &&
                    <>
                        <RunInfo run={run} />
                        <div className="my-10" />
                        <LeaderboardInfo rankedUsers={rankedUsers} scoresByUser={scoresByUser} />
                    </>
                }
                {
                    status === "error" && <p>{error || "An unknown error occurred."}</p>
                }
            </div>
        </div>
    );
}

export default LeaderboardContainer;
