import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { User } from "../../../types/User.type";
import { attemptLogin, LoginResponse } from "../store/Authentication.api";
import { logIn } from "../store/Authentication.store";


const Login: React.FC = () => {
    const dispatch = useDispatch();
    const [ username, setUsername ] = useState<string | null>(null);
    const [ password, setPassword ] = useState<string | null>(null);
    const [ error, setError ] = useState<string | null>(null);

    const tryLogin = async (username: string | null, password: string | null) => {
        if (username === null) {
            setError('Missing username.');
        } else if (password === null) {
            setError('Missing password.');
        } else {
            const response = await attemptLogin(username, password);
            if (response instanceof Object) {
                const user = response as User;
                dispatch(logIn(user.id));
            } else if (response === 'incorrect password') {
                setError('Invalid password.');
            } else if (response === 'incorrect username') {
                setError('Invalid username.');
            } else {
                setError('An unknown error occurred. Please retry and/or refresh the page.');
            }
        }
    }

    return (
        <div>
            { error && <p>{error}</p> }
            <div>
                <label>
                    <p>Username: </p>
                    <input type="text" value={username || ''} onChange={e => setUsername(e.target.value)} placeholder="username" />
                </label>
                <label>
                    <p>Password: </p>
                    <input type="text" value={password || ''} onChange={e => setPassword(e.target.value)} placeholder="password" />
                </label>
            </div>
            <button onClick={() => tryLogin(username, password)}>Login</button>
        </div>
    );
}

export default Login;
