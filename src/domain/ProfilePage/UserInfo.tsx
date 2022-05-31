import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { Run, RunID } from "../../types/Run.type";
import { Score } from "../../types/Score.type";
import { User } from "../../types/User.type";
import { logOut, selectUserId } from "../Authentication/Authentication.store";
import { AvatarIconLarge, AvatarIconSized } from "../AvatarCreator/AvatarIcon";

interface UserInfoProps {
    user: User,
    scoreRecordOrganized: Record<RunID, Score[]>,
    runRecordOrganized: Record<RunID, Run>
}

const UserInfo: React.FC<UserInfoProps> = ({ user, scoreRecordOrganized, runRecordOrganized }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [ openRunId, setOpenRunId ] = useState<string | null>(null);
    const currentUserId: string | null = useSelector(selectUserId);
    const [ editing, setEditing ] = useState<boolean>(false);

    return (
        <div className="column w-100 max-w-500" id="user-info">
            <div className="row align-center mx-10 my-10">
                <AvatarIconSized {...user.avatar} size={60} />
                <p className="title m-0 mx-10">{user.username}</p>
                { currentUserId === user.id && 
                    <div className="row--end flex-grow mx-bw-5">
                        <p className="pointer m-0" onClick={() => {editing ? setEditing(false) : setEditing(true)}}>{editing ? 'Save' : 'Edit'}</p>
                        <p className="pointer m-0" onClick={() => {dispatch(logOut()); navigate('/login');}}>Logout</p>
                    </div>
                }
            </div>
            <div className="mx-10">
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
    )
}

export default UserInfo;
