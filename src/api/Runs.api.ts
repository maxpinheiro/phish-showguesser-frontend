import { apiRoot, ResponseStatus } from "../app/store/store";
import { Run, RunID } from "../types/Run.type";

export const getAllRuns = (): Promise<Run[] | ResponseStatus.UnknownError> => {
    return new Promise(async (resolve) => {
        try {
            const response = await fetch(`${apiRoot}/runs`);
            if (response.status === 200) {
                const data = await response.json();
                if (data.hasOwnProperty('runs')) {
                    resolve(data.runs as Run[]);
                } else {
                    resolve(ResponseStatus.UnknownError);
                }
            } else {
                resolve(ResponseStatus.UnknownError);
            }
        } catch (e) {
            resolve(ResponseStatus.UnknownError);
        }
    })
}

export const getRunById = (runId: RunID): Promise<Run | ResponseStatus.NotFound | ResponseStatus.UnknownError> => {
    return new Promise(async (resolve) => {
        try {
            const response = await fetch(`${apiRoot}/runs/${runId}`);
            if (response.status === 200) {
                const data = await response.json();
                if (data.hasOwnProperty('run')) {
                    resolve(data.run as Run);
                } else {
                    resolve(ResponseStatus.UnknownError);
                }
            } else if (response.status === 404) {
                resolve(ResponseStatus.NotFound);
            } else {
                resolve(ResponseStatus.UnknownError);
            }
        } catch (e) {
            resolve(ResponseStatus.UnknownError);
        }
    })
}

export const getRunListByIds = (runIds: string[]): Promise<Run[] | ResponseStatus.UnknownError> => {
    return new Promise(async (resolve) => {
        const response = await fetch(`${apiRoot}/runs?runIds=${runIds.join('-')}`);
        if (response.status === 200) {
            const data = await response.json();
            if (data.hasOwnProperty('runs')) {
                resolve(data.runs as Run[]);
            } else {
                resolve(ResponseStatus.UnknownError);
            }
        } else {
            resolve(ResponseStatus.UnknownError);
        }
    })
}
