import { Guess } from "../../types/Guess.type";
import { DateString } from "../../types/Run.type";
import { Score } from "../../types/Score.type";
import { UserID } from "../../types/User.type";

export const formatDateRange = (dates: DateString[], withYear?: boolean): string => {
    if (dates.length < 2) return '';
    let dateObjs: Date[] = dates.map(date => new Date(date));
    dateObjs.sort();
    let date1 = `${dateObjs[0].getMonth()}/${dateObjs[0].getDate()}`;
    let date2 = `${dateObjs[dateObjs.length-1].getMonth()}/${dateObjs[dateObjs.length-1].getDate()}`;
    if (withYear) {
        date1 += `/${Math.floor(dateObjs[0].getFullYear() / 100)}`;
        date2 += `/${Math.floor(dateObjs[dateObjs.length-1].getFullYear() / 100)}`;
    }
    return `${date1} - ${date2}`;
}

export const arrayToDictByID = <T extends {id: string}>(arr: T[]): Record<string, T> => {
    let dict: Record<string, T> = {};
    arr.forEach(item => {
        dict[item.id || ''] = item;
    })
    return dict;
}

export const organizeArrayByField = <T extends Record<string, any>>(arr: T[], field: string): Record<string, T[]> => {
    let dict: Record<string, T[]> = {};
    arr.forEach(item => {
        if (field in item) {
            if (item[field] in dict) {
                dict[item[field]].push(item);
            } else {
                dict[item[field]] = [ item ];
            }
        }
    });
    return dict;
}

export const totalScoresForRuns = (organizedScores: Record<string, Score[]>): Record<string, number> => {
    let scoresForRuns: Record<string, number> = {};
    Object.entries(organizedScores).forEach(([runId, scores]: [string, Score[]]) => {
        scoresForRuns[runId] = scores.map(score => score.points).reduce((acc, curr) => acc + curr);
    });
    return scoresForRuns;
}

export const organizeGuessesByUserId = (guesses: Guess[]): Record<UserID, Guess[]> => {
    let guessesDict: Record<UserID, Guess[]> = {};
    guesses.forEach(guess => {
        if (guess.userId in guessesDict) {
            guessesDict[guess.userId].push(guess);
        } else {
            guessesDict[guess.userId] = [ guess ];
        }
    });

    return guessesDict;
}

export const organizeScoresByUserId = (scores: Score[]): Record<UserID, Score[]> => {
    let scoresDict: Record<UserID, Score[]> = {};
    scores.forEach(score => {
        if (score.userId in scoresDict) {
            scoresDict[score.userId].push(score);
        } else {
            scoresDict[score.userId] = [ score ];
        }
    });

    return scoresDict;
}

export const rankScores = (scores: Score[]): ({userId: string, points: number})[] => {
    const scoresDict: Record<UserID, Score[]> = organizeScoresByUserId(scores);
    let scoresRanked: ({userId: string, points: number})[] = [];
    Object.keys(scoresDict).forEach(userId => {
        scoresRanked.push({userId, points: scoresDict[userId as UserID].map(score => score.points).reduce((acc, curr) => acc + curr)});
    })
    return scoresRanked.sort((a, b) => a.points - b.points);
}

export const rankUsers = (scores: Score[]): Record<UserID, number> => {
    const scoresDict: Record<UserID, Score[]> = organizeScoresByUserId(scores);
    const usersDict: Record<UserID, number> = {};
    Object.keys(scoresDict).forEach(userId => {
        usersDict[userId as UserID] = scoresDict[userId as UserID].map(score => score.points).reduce((acc, curr) => acc + curr);
    })
    return usersDict;
}

