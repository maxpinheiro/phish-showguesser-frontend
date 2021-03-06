import { apiRoot, ResponseStatus } from "../app/store/store";
import { User } from "../types/User.type";


export type LoginResponse = User | ResponseStatus;

export const attemptLogin = (username: string, password: string): Promise<LoginResponse> => {
    return new Promise(async (resolve) => {
        const response = await fetch(`${apiRoot}/users/login`, { 
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, password })
        });
        if (response.status === 200) { // success
            const data = await response.json();
            if (data.hasOwnProperty('user')) {
                resolve(data.user as User);
            } else {
                resolve(ResponseStatus.UnknownError);
            }
        } else if (response.status === 401) { // incorrect password
            resolve(ResponseStatus.Unauthorized);
        } else if (response.status === 404) { // incorrect username (username not found)
            resolve(ResponseStatus.NotFound);
        } else { 
            resolve(ResponseStatus.UnknownError);
        }
    })
}

export type SignupResponse = User | 'username taken' | 'missing info' | null;

export const attemptSignup = (username: string, password: string): Promise<SignupResponse> => {
    return new Promise(async (resolve) => {
        const response = await fetch(`${apiRoot}/users`, { 
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, password })
        })
        if (response.status === 200) {
            const data = await response.json();
            if (data.hasOwnProperty('user')) {
                resolve(data.user as User);
            } else {
                resolve(null);
            }
        } else if (response.status === 409) {
            resolve('username taken');
        }  else if (response.status === 404) {
            resolve('missing info');
        } else {
            resolve(null);
        }
    })
}
