import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { ResponseStatus } from "../../../app/store/store";
import { organizeArrayByField } from "../../../shared/util/utils";
import { Guess } from "../../../types/Guess.type";
import { getUserListByIds } from "../../User/store/User.api";
import { storeCurrentRunUsers } from "../../User/store/User.store";
import { getGuessesForRun } from "../store/Guess.api";
import { selectRunGuessesOrganized, storeRunGuesses } from "../store/Guesses.store";


const GuessList: React.FC = () => {
    const [ error, setError ] = useState<string | null>(null);
    const [ openUsers, setOpenUsers ] = useState<Record<string, boolean>>({});
    const organizedGuesses: Record<string, Guess[]> = useSelector(selectRunGuessesOrganized);
    const dispatch = useDispatch();

    const collectGuessListInfo = async (runId: string) => {
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
        dispatch(storeRunGuesses(guesses));
        dispatch(storeCurrentRunUsers(users));
    }

    useEffect(() => {
        const { runId } = useParams();
        if (!runId) {
            setError("Run not found");
        } else {
            collectGuessListInfo(runId);
        }
    }, [ dispatch ]);

    useEffect(() => {
        let usersDict: Record<string, boolean> = {};
        Object.keys(organizedGuesses).forEach(userId => {usersDict[userId] = false});
        setOpenUsers(usersDict);
    }, [ organizedGuesses ]);

    const openUser = (userId: string) => setOpenUsers(usersDict => {usersDict[userId] = true; return usersDict});
    const closeUser = (userId: string) => setOpenUsers(usersDict => {usersDict[userId] = false; return usersDict});
    
    return (
        <div>
            { Object.keys(organizedGuesses).map(userId => (
                <div id={userId}>
                    <div>
                        <p>{userId}</p>
                        { openUsers[userId] ?
                            <div onClick={() => openUser(userId)}> v </div> :
                            <div onClick={() => closeUser(userId)}> ^ </div>
                        }
                    </div>
                    {
                        openUsers[userId] &&
                        <div className="flex-column">
                            { organizedGuesses[userId].map(guesses => (
                                <div id={guesses.id}>
                                    <p>{guesses.songName}</p>
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
