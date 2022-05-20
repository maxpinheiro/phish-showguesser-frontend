
export type RunID = `run${number}`;//string;

export interface Run {
    id: RunID;
    name: string;
    dates: string[];
}
