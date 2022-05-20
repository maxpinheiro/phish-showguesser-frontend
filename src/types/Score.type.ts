import { RunID } from "./Run.type";
import { UserID } from "./User.type";

export type ScoreID = `score${number}`;//string;

export interface Score {
    id: ScoreID;
    userId: UserID;
    runId: RunID;
    songName: string;
    points: number;
}
