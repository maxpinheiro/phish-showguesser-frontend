import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { User } from "../../types/User.type";
import { attemptSignup } from "../../api/Authentication.api";
import { logIn } from "./Authentication.store";

const Signup: React.FC = () => {
    const dispatch = useDispatch();
    const [ username, setUsername ] = useState<string | null>(null);
    const [ password, setPassword ] = useState<string | null>(null);
    const [ error, setError ] = useState<string | null>(null);

    const trySignup = async (username: string | null, password: string | null) => {
        if (username === null) {
            setError('missing username');
        } else if (password === null) {
            setError('missing password');
        } else {
            const response = await attemptSignup(username, password);
            if (response instanceof Object) {
                const user = response as User;
                dispatch(logIn(user.id));
            } else if (response === 'username taken') {
                setError('Username already exists.');
            } else if (response === 'missing info') {
                setError('missing info');
            } else {
                setError('unknown error');
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
            <button onClick={() => trySignup(username, password)}>Login</button>
        </div>
    );
}

export default Signup;
