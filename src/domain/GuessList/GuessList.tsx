import React, { useState } from "react";
import { Link } from "react-router-dom";
import { DropDownUpIcon, DropDownIcon } from "../../shared/icons/Dropdown";
import { Guess } from "../../types/Guess.type";
import { User, UserID } from "../../types/User.type";
import { AvatarIcon } from "../AvatarCreator/AvatarIcon";

interface GuessListProps {
    organizedGuesses: Record<UserID, {"complete": Guess[], "incomplete": Guess[]}>,
    users: Record<UserID, User>,
}

const GuessList: React.FC<GuessListProps> = ({ organizedGuesses, users }) => {
    const [ openUserIds, setOpenUserIds ] = useState<string[]>([]);
    const toggleUser = (userId: string) => setOpenUserIds(ids => ids.includes(userId) ? ids.filter(id => id !== userId) : [ ...ids, userId ]);
    
    if (Object.keys(organizedGuesses).length === 0) {
        return (
            <p className="text-centered">There are no guesses for this show yet!</p>
        )
    }

    return (
        <div className="column--centered w-100 max-w-500 mx-auto" id="guess-list">
            { Object.entries(organizedGuesses).map(([ userId, guesses ]) => (
                <div key={userId} className="w-100">
                    <div className="row--space-between align-center px-10" id="guess-user-header">
                        <div className="row mx-bw-5 align-center">
                            { users[userId as UserID].avatar && <AvatarIcon {...users[userId as UserID].avatar} /> }
                            <Link className="ml-5" to={`/users/${userId}`}><p>{users[userId as UserID]?.username || userId}</p></Link>
                            <p>{`- ${guesses.complete.length} completed`}</p>
                        </div>
                        <div className="flex-grow row--end pointer" onClick={() => toggleUser(userId)}>
                            { openUserIds.includes(userId) ? <DropDownUpIcon  /> : <DropDownIcon /> }                            
                        </div>
                    </div>
                    {
                        openUserIds.includes(userId) &&
                        <div className="px-10" id="user-guesses">
                            <div className="column my-bw-10">
                                { guesses["complete"].map(guess => (
                                    <div key={guess.id}>
                                        <a href={`https://www.phish.net/song/${guess.songId.substring(5)}`} target="_blank">
                                            <p className="text-crossed text-50pct m-0">{guess.songName}{guess.encore ? " (Encore)" : ""}</p>
                                        </a>
                                    </div>
                                )) }
                            </div>
                            <div className="divider" />
                            <div className="column my-bw-10">
                                { guesses["incomplete"].map(guess => (
                                    <div key={guess.id}>
                                        <a href={`https://www.phish.net/song/${guess.songId.substring(5)}`} target="_blank">
                                            <p className="m-0">{guess.encore ? "Encore: " : ""}{guess.songName}</p>
                                        </a>
                                    </div>
                                )) }
                            </div>
                        </div>
                    }
                </div> 
            )) }
        </div>
    );
}

export default GuessList;
