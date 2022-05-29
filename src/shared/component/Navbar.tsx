import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getUserById } from "../../api/User.api";
import { ResponseStatus } from "../../app/store/store";
import { selectUserId } from "../../domain/Authentication/Authentication.store";
import { User } from "../../types/User.type";

const Navbar: React.FC = () => {
    const currentUserId = useSelector(selectUserId);
    const [ currentUser, setCurrentUser ] = useState<User | null>(null);

    useEffect(() => {
        if (currentUserId) {
            getUserById(currentUserId).then(user => {
                if (user !== ResponseStatus.UnknownError && user !== ResponseStatus.NotFound) {
                    setCurrentUser(user);
                }
            });
        }
    }, [ currentUserId ]);

    return (
        <div className="flex-row justify-between">
            <div id="logo">
                <Link to="/">

                </Link>
            </div>
            <div id="links" className="flex-row">
                { currentUser ? 
                    <Link to={`/users/${currentUser.id}`}>{currentUser.username}</Link> :
                    <Link to="/login">Login</Link>
                }
            </div>
        </div>
    );
}

export default Navbar;
