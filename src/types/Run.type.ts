
export type RunID = `run${number}`;//string;
export type DateString = `${number}-${number}-${number}`;

export interface Run {
    id: RunID;
    name: string;
    dates: DateString[];
}
