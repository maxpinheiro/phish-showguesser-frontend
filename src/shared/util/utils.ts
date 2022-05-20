import { getScoresForRun } from "../../domain/Scores/store/Scores.api";
import { Guess } from "../../types/Guess.type";
import { Score } from "../../types/Score.type";
import { UserID } from "../../types/User.type";

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

export const organizeGuesses = (guesses: Guess[]): Record<UserID, Guess[]> => {
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

export const organizeScores = (scores: Score[]): Record<UserID, Score[]> => {
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
    const scoresDict: Record<UserID, Score[]> = organizeScores(scores);
    let scoresRanked: ({userId: string, points: number})[] = [];
    Object.keys(scoresDict).forEach(userId => {
        scoresRanked.push({userId, points: scoresDict[userId as UserID].map(score => score.points).reduce((acc, curr) => acc + curr)});
    })
    return scoresRanked.sort((a, b) => a.points - b.points);
}

export const rankUsers = (scores: Score[]): Record<UserID, number> => {
    const scoresDict: Record<UserID, Score[]> = organizeScores(scores);
    const usersDict: Record<UserID, number> = {};
    Object.keys(scoresDict).forEach(userId => {
        usersDict[userId as UserID] = scoresDict[userId as UserID].map(score => score.points).reduce((acc, curr) => acc + curr);
    })
    return usersDict;
}

