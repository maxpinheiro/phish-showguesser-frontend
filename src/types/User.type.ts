import { AvatarConfig, defaultAvatar } from "../domain/AvatarCreator/AvatarCreator.store";

export type UserID = `user${number}`;//string;

export interface User {
    id: UserID,
    username: string,
    passsord: string,
    avatar: AvatarConfig
}

export const emptyUser: User = {
    id: "user-0",
    username: "",
    passsord: "",
    avatar: defaultAvatar
}
