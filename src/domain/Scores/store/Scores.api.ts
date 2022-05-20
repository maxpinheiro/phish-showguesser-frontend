import { apiRoot, ResponseStatus } from "../../../app/store/store";
import { Score } from "../../../types/Score.type";


export const getScoresForRun = (runId: string): Promise<Score[] | ResponseStatus.UnknownError> => {
    return new Promise(async (resolve) => {
        const response = await fetch(`${apiRoot}/scores?runId=${runId}`);
        if (response.status === 200) {
            const data = await response.json();
            if (data.hasOwnProperty('scores')) {
                resolve(data.scores as Score[]);
            } else {
                resolve(ResponseStatus.UnknownError);
            }
        } else {
            resolve(ResponseStatus.UnknownError);
        }
    })
}

export const getScoresForUser = (userId: string): Promise<Score[] | ResponseStatus.UnknownError> => {
    return new Promise(async (resolve) => {
        const response = await fetch(`${apiRoot}/scores?userId=${userId}`);
        if (response.status === 200) {
            const data = await response.json();
            if (data.hasOwnProperty('scores')) {
                resolve(data.scores as Score[]);
            } else {
                resolve(ResponseStatus.UnknownError);
            }
        } else {
            resolve(ResponseStatus.UnknownError);
        }
    })
}

export const getScoresForUserForRun = (userId: string, runId: string): Promise<Score[] | ResponseStatus.UnknownError> => {
    return new Promise(async (resolve) => {
        const response = await fetch(`${apiRoot}/scores?runId=${runId}&userId=${userId}`);
        if (response.status === 200) {
            const data = await response.json();
            if (data.hasOwnProperty('scores')) {
                resolve(data.scores as Score[]);
            } else {
                resolve(ResponseStatus.UnknownError);
            }
        } else {
            resolve(ResponseStatus.UnknownError);
        }
    })
}