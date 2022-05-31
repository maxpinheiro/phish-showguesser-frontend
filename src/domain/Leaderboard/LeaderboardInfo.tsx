import React, { useState } from "react";
import { Link } from "react-router-dom";
import { DropDownUpIcon, DropDownIcon } from "../../shared/icons/Dropdown";
import { Score } from "../../types/Score.type";
import { User, UserID } from "../../types/User.type";
import { AvatarIcon } from "../AvatarCreator/AvatarIcon";
import { defaultAvatar } from "../AvatarCreator/AvatarCreator.store";

interface LeaderboardInfoProps {
    rankedUsers: {user: User, points: number}[],
    scoresByUser: Record<UserID, Score[]>
}

const LeaderboardInfo: React.FC<LeaderboardInfoProps> = ({ rankedUsers, scoresByUser }) => {
    const [ openUserIds, setOpenUserIds ] = useState<string[]>([]);
    const toggleUser = (userId: string) => setOpenUserIds(ids => ids.includes(userId) ? ids.filter(id => id !== userId) : [ ...ids, userId ]);

    return (
        <div className="column--centered w-100 max-w-500 mx-auto" id="leaderboard-list">
            { rankedUsers.map(({ user, points }, idx) => (
                <div key={user.id} className="w-100">
                    <div className="row--space-between align-center px-10">
                        <div className="row align-center mx-bw-5">
                            <p>{idx + 1}.</p>
                            { user.avatar ? <AvatarIcon {...user.avatar} /> : <AvatarIcon {...defaultAvatar} /> }
                            <Link className="ml-5" to={`/users/${user.id}`}><p>{user.username}</p></Link>
                            <p>{` - ${points} ${points === 1 ? 'pt' : 'pts'}`}</p>
                        </div>
                        <div className="flex-grow row--end pointer" onClick={() => toggleUser(user.id)}>
                            { openUserIds.includes(user.id) ? <DropDownUpIcon  /> : <DropDownIcon /> }                            
                        </div>
                    </div>
                    { openUserIds.includes(user.id) &&
                        <div className="px-10 my-bw-10">
                            {
                                scoresByUser[user.id] && scoresByUser[user.id].map(score => (
                                    <div key={score.id} className="row mx-bw-5">
                                        <p className="m-0">{score.songName}</p>
                                        <p className="m-0">{` - ${score.points} ${score.points === 1 ? 'pt' : 'pts'}`}</p>
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

export default LeaderboardInfo;
