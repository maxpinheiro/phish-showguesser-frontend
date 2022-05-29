import { AvatarConfig } from "../domain/AvatarCreator/AvatarCreator.store";

export type UserID = `user${number}`;//string;

export interface User {
    id: UserID,
    username: string,
    passsord: string,
    avatar: AvatarConfig
}

