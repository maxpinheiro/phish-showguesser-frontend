import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { ResponseStatus } from "../../app/store/store";
import { formatDateRange, organizeArrayByField } from "../../shared/util/utils";
import { Guess } from "../../types/Guess.type";
import { getUserListByIds } from "../../api/User.api";
import { getGuessesForRun } from "../../api/Guess.api";
import { selectOrganizedGuessesByUser, selectRun, selectUsersOrganized, storeGuesses, storeRun, storeUsers } from "./GuessList.store";
import { getRunById } from "../../api/Runs.api";
import { Run, RunID } from "../../types/Run.type";
import { User, UserID } from "../../types/User.type";
import { Link } from "react-router-dom";
import { Oval } from "react-loader-spinner";
import GuessList from "./GuessList";


const GuessListContainer: React.FC = () => {
    const { runId } = useParams();
    const [ error, setError ] = useState<string | null>(null);
    const [ status, setStatus ] = useState<'loading' | 'loaded' | 'error'>('loading');

    const organizedGuesses: Record<UserID, {"complete": Guess[], "incomplete": Guess[]}> = useSelector(selectOrganizedGuessesByUser);
    const organizedUsers: Record<UserID, User> = useSelector(selectUsersOrganized);
    const run: Run | null = useSelector(selectRun);
    const dispatch = useDispatch();

    const collectGuessListInfo = async (runId: RunID) => {
        const guesses = await getGuessesForRun(runId);
        if (guesses === ResponseStatus.UnknownError) {
            setError("Unknown error");
            setStatus("error");
            return;
        }
        const guessesOrganized = organizeArrayByField(guesses, "userId");
        const userIds = Object.keys(guessesOrganized);
        const users = await getUserListByIds(userIds);
        if (users === ResponseStatus.UnknownError) {
            setError("Unknown error");
            setStatus("error");
            return;
        }
        const run = await getRunById(runId);
        if (run === ResponseStatus.NotFound) {
            setError("Run not found error");
            return;
        }
        if (run === ResponseStatus.UnknownError) {
            setError("Unknown error");
            setStatus("error");
            return;
        }
        dispatch(storeGuesses(guesses));
        dispatch(storeUsers(users));
        dispatch(storeRun(run));
        setStatus('loaded');
    }

    useEffect(() => {
        if (!runId) {
            setError("Run not found");
        } else {
            collectGuessListInfo(runId as RunID);
        }
    }, [ runId, dispatch ]);
    
    return (
        <div id="guess-list-page">
            <div>
                <Link to="/runs">All Runs</Link>
            </div>
            <div className="column--centered">
                <p className="header">Guesses</p>
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
                {
                    status === 'loaded' &&
                    <>
                        {
                            run &&
                            <div className="column--centered">
                                <p>{run.name}</p>
                                <p>{formatDateRange(run.dates, true)}</p>
                            </div>  
                        }
                        <div className="w-100">
                            <GuessList organizedGuesses={organizedGuesses} users={organizedUsers} />
                        </div>
                    </>
                }
                {
                    status === 'error' &&
                    <p>{error || "An unknown error occurred."}</p>
                }
                <div className="h-20vh" />
            </div>
        </div>
    )
}

export default GuessListContainer;
