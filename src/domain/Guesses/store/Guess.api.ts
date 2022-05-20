import { apiRoot, ResponseStatus } from "../../../app/store/store";
import { Guess } from "../../../types/Guess.type";

export const getGuessesForRun = (runId: string): Promise<Guess[] | ResponseStatus.UnknownError> => {
    return new Promise(async (resolve) => {
        const response = await fetch(`${apiRoot}/guesses?runId=${runId}`);
        if (response.status === 200) {
            const data = await response.json();
            if (data.hasOwnProperty('guesses')) {
                resolve(data.run as Guess[]);
            } else {
                resolve(ResponseStatus.UnknownError);
            }
        } else {
            resolve(ResponseStatus.UnknownError);
        }
    });
}

export const getGuessesForUserForRun = (userId: string, runId: string): Promise<Guess[] | ResponseStatus.UnknownError> => {
    return new Promise(async (resolve) => {
        const response = await fetch(`${apiRoot}/guesses?runId=${runId}&userId=${userId}`);
        if (response.status === 200) {
            const data = await response.json();
            if (data.hasOwnProperty('guesses')) {
                resolve(data.run as Guess[]);
            } else {
                resolve(ResponseStatus.UnknownError);
            }
        } else {
            resolve(ResponseStatus.UnknownError);
        }
    });
}

export const getGuessesForUser = (userId: string): Promise<Guess[] | ResponseStatus.UnknownError> => {
    return new Promise(async (resolve) => {
        const response = await fetch(`${apiRoot}/guesses?userId=${userId}`);
        if (response.status === 200) {
            const data = await response.json();
            if (data.hasOwnProperty('guesses')) {
                resolve(data.run as Guess[]);
            } else {
                resolve(ResponseStatus.UnknownError);
            }
        } else {
            resolve(ResponseStatus.UnknownError);
        }
    });
}

export const createGuess = (userId: string, runId: string, songId: string, songName: string, encore: boolean): Promise<ResponseStatus> => {
    return new Promise(async (resolve) => {
        const response = await fetch(`${apiRoot}/guesses`, { 
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ userId, runId, songId, songName, encore })
        });
        if (response.status === 200) {
            resolve(ResponseStatus.Success);
        } else {
            resolve(ResponseStatus.UnknownError);
        }
    })
}

export const deleteGuess = (guessId: string): Promise<ResponseStatus> => {
    return new Promise(async (resolve) => {
        const response = await fetch(`${apiRoot}/guesses/${guessId}`, { method: 'DELETE' });
        if (response.status === 200) {
            resolve(ResponseStatus.Success);
        } else {
            resolve(ResponseStatus.UnknownError);
        }
    })
}
