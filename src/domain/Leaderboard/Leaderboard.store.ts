import { createSelector, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Selector } from "react-redux";
import { RootState } from "../../app/store/store";
import { arrayToDictByID, organizeArrayByField, organizeScoresByUserId, rankScores, rankUsers } from "../../shared/util/utils";
import { Run } from "../../types/Run.type";
import { Score } from "../../types/Score.type";
import { User, UserID } from "../../types/User.type";

export interface LeaderboardState {
    scores: Score[],
    users: User[],
    run: Run | null
}

const initialState: LeaderboardState = {
    scores: [],
    users: [],
    run: null
}

const saveScoresReducer = (state: LeaderboardState, action: PayloadAction<Score[]>): LeaderboardState => ({
    ...state,
    scores: action.payload
});

const saveUsersReducer = (state: LeaderboardState, action: PayloadAction<User[]>): LeaderboardState => ({
    ...state,
    users: action.payload || []
});

const saveRunReducer = (state: LeaderboardState, action: PayloadAction<Run>): LeaderboardState => ({
    ...state,
    run: action.payload || null
});

export const leaderboardSlice = createSlice({
    name: 'scores',
    initialState,
    reducers: {
        saveScores: saveScoresReducer,
        saveUsers: saveUsersReducer,
        saveRun: saveRunReducer
    }
})

export const { saveScores, saveUsers, saveRun } = leaderboardSlice.actions;

export const selectAllScores: Selector<RootState, Score[]> = (state) => state.leaderboard.scores;
export const selectScoresByUser: Selector<RootState, Record<UserID, Score[]>> = createSelector(selectAllScores, (scores) => organizeArrayByField(scores, "userId"));

export const selectRankedUsers: Selector<RootState, ({userId: string, points: number})[]> = createSelector(selectAllScores, (scores) => rankScores(scores));
//export const selectRankedUsers: Selector<RootState, Record<UserID, number>> = createSelector(selectAllScores, (scores) => rankUsers(scores));

export const selectUsers: Selector<RootState, User[]> = state => state.leaderboard.users;
export const selectUsersDict: Selector<RootState, Record<string, User>> = state => arrayToDictByID(state.leaderboard.users);

export const selectRun: Selector<RootState, Run | null> = state => state.leaderboard.run;

export const leaderboardReducer = leaderboardSlice.reducer;
