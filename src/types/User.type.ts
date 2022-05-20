
export type UserID = `user${number}`;//string;

export interface User {
    id: UserID,
    username: string,
    passsord: string
}

