import { RunID } from "./Run.type";
import { UserID } from "./User.type";

export type GuessID = `guess${number};`; //string;

export interface Guess {
    id: GuessID,
    userId: UserID,
    runId: RunID,
    songId: string,
    songName: string,
    encore: boolean,
    completed: boolean
}
