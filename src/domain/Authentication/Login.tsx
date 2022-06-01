import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { User } from "../../types/User.type";
import { attemptLogin, LoginResponse } from "../../api/Authentication.api";
import { logIn } from "./Authentication.store";
import { ResponseStatus } from "../../app/store/store";
import { useNavigate } from "react-router-dom";


const Login: React.FC = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [ username, setUsername ] = useState<string | null>(null);
    const [ password, setPassword ] = useState<string | null>(null);
    const [ showPassword, setShowPassword ] = useState<boolean>(false);
    const [ loading, setLoading ] = useState<boolean>(false);
    const [ error, setError ] = useState<string | null>(null);

    const tryLogin = async (username: string | null, password: string | null) => {
        if (username === null) {
            setError('Missing username.');
        } else if (password === null) {
            setError('Missing password.');
        } else {
            setLoading(true);
            const response = await attemptLogin(username, password);
            if (response instanceof Object) {
                const user = response as User;
                dispatch(logIn(user.id));
                setLoading(false);
                navigate(`/users/${user.id}`);
            } else if (response === ResponseStatus.Unauthorized) {
                setError('Invalid password.');
            } else if (response === ResponseStatus.NotFound) {
                setError('Invalid username.');
            } else {
                setError('An unknown error occurred. Please retry and/or refresh the page.');
            }
            setLoading(false);
        }
    }

    return (
        <div className="column--centered">
            <p className="header">Login</p>
            { error && <p className="text-centered mx-10">{error}</p> }
            <div className="row align-center my-10 w-75">
                <p className="m-0 mr-10">Username: </p>
                <input className="flex-grow rounded bg-light-gray p-5-10" type="text" value={username || ''} onChange={e => setUsername(e.target.value)} placeholder="username" />
            </div>
            <div className="row align-center my-10 w-75">
                <p className="m-0 mr-10">Password: </p>
                <div className="flex-grow rounded bg-gray-200 row--space-between align-center">
                    <input className="flex-grow rounded bg-light-gray p-5-10 " type={showPassword ? "text" : "password"} value={password || ''} onChange={e => setPassword(e.target.value)} placeholder="password" />
                    <div onClick={() => setShowPassword(p => !p)} className="pointer mx-6"><i className={`bi ${showPassword ? 'bi-eye' : 'bi-eye-slash'}`} /></div>
                </div>
                
            </div>
            <button onClick={() => tryLogin(username, password)} disabled={loading} className="p-5-10 rounded bg-gray-200 p-5-10" >
                <p className="m-0 font-semibold">Login</p>
            </button>
            {
                loading && <p>Loading...</p>
            }
        </div>
    );
}

export default Login;
