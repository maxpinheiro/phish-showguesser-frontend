import { apiRoot, ResponseStatus } from "../app/store/store";
import { User } from "../types/User.type";

export const getAllUsers = (): Promise<User[] | ResponseStatus.UnknownError> => {
    return new Promise(async (resolve) => {
        const response = await fetch(`${apiRoot}/users`);
        if (response.status === 200) {
            const data = await response.json();
            if (data.hasOwnProperty('users')) {
                resolve(data.users as User[]);
            } else {
                resolve(ResponseStatus.UnknownError);
            }
        } else {
            resolve(ResponseStatus.UnknownError);
        }
    })
}

export const getUserById = (userId: string): Promise<User | ResponseStatus.UnknownError | ResponseStatus.NotFound> => {
    return new Promise(async (resolve) => {
        const response = await fetch(`${apiRoot}/users/${userId}`);
        if (response.status === 200) {
            const data = await response.json();
            if (data.hasOwnProperty('user')) {
                resolve(data.user as User);
            } else {
                resolve(ResponseStatus.UnknownError);
            }
        } else if (response.status === 404) {
            resolve(ResponseStatus.NotFound);
        } else {
            resolve(ResponseStatus.UnknownError);
        }
    })
}

export const getUserListByIds = (userIds: string[]): Promise<User[] | ResponseStatus.UnknownError> => {
    return new Promise(async (resolve) => {
        const response = await fetch(`${apiRoot}/users?userIds=${userIds.join('_')}`);
        if (response.status === 200) {
            const data = await response.json();
            if (data.hasOwnProperty('users')) {
                resolve(data.users as User[]);
            } else {
                resolve(ResponseStatus.UnknownError);
            }
        } else {
            resolve(ResponseStatus.UnknownError);
        }
    })
}
