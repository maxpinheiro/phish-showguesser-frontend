import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { ResponseStatus } from "../../app/store/store";
import { organizeArrayByField } from "../../shared/util/utils";
import { Guess } from "../../types/Guess.type";
import { getUserListByIds } from "../../api/User.api";
import { getGuessesForRun } from "../../api/Guess.api";
import { selectGuessesOrganized, selectUsersOrganized, storeGuesses, storeRun, storeUsers } from "./GuessList.store";
import { getRunById } from "../../api/Runs.api";
import { RunID } from "../../types/Run.type";
import { User, UserID } from "../../types/User.type";
import { AvatarIcon } from "../AvatarCreator/AvatarCreator";


const GuessList: React.FC = () => {
    const { runId } = useParams();
    const [ error, setError ] = useState<string | null>(null);
    const [ openUsers, setOpenUsers ] = useState<Record<string, boolean>>({});
    const organizedGuesses: Record<UserID, Guess[]> = useSelector(selectGuessesOrganized);
    const organizedUsers: Record<UserID, User> = useSelector(selectUsersOrganized);
    const dispatch = useDispatch();

    const collectGuessListInfo = async (runId: RunID) => {
        const guesses = await getGuessesForRun(runId);
        if (guesses === ResponseStatus.UnknownError) {
            setError("Unknown error");
            return;
        }
        const guessesOrganized = organizeArrayByField(guesses, "userId");
        const userIds = Object.keys(guessesOrganized);
        const users = await getUserListByIds(userIds);
        if (users === ResponseStatus.UnknownError) {
            setError("Unknown error");
            return;
        }
        const run = await getRunById(runId);
        if (run === ResponseStatus.NotFound) {
            setError("Run not found error");
            return;
        }
        if (run === ResponseStatus.UnknownError) {
            setError("Unknown error");
            return;
        }
        dispatch(storeGuesses(guesses));
        dispatch(storeUsers(users));
        dispatch(storeRun(run));
    }

    useEffect(() => {
        if (!runId) {
            setError("Run not found");
        } else {
            collectGuessListInfo(runId as RunID);
        }
    }, [ runId, dispatch ]);

    useEffect(() => {
        let usersDict: Record<string, boolean> = {};
        Object.keys(organizedGuesses).forEach(userId => {usersDict[userId] = false});
        setOpenUsers(usersDict);
    }, [ organizedGuesses ]);

    const openUser = (userId: string) => setOpenUsers(usersDict => {usersDict[userId] = true; return usersDict});
    const closeUser = (userId: string) => setOpenUsers(usersDict => {usersDict[userId] = false; return usersDict});
    
    return (
        <div>
            { Object.entries(organizedGuesses).map(([ userId, guesses ]) => (
                <div key={userId}>
                    <div className="flex-row" onClick={() => openUsers[userId] ? closeUser(userId) : openUser(userId)}>
                        { /** <AvatarIcon {...organizedUsers[userId as UserID].avatar} /> **/ }
                        <p>{organizedUsers[userId as UserID]?.username || userId}</p>
                        { openUsers[userId] ?
                            <div> v </div> :
                            <div> ^ </div>
                        }
                    </div>
                    {
                        openUsers[userId] &&
                        <div className="flex-column">
                            { guesses.map(guess => (
                                <div key={guess.id}>
                                    <p>{guess.songName}</p>
                                </div>
                            )) }
                        </div>
                    }
                </div>
            )) }
        </div>
    )
}

export default GuessList;
