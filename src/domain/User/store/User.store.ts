import { createSlice, PayloadAction, Reducer } from "@reduxjs/toolkit";
import { Selector } from "react-redux";
import { RootState } from "../../../app/store/store";
import { arrayToDictByID, organizeArrayByField } from "../../../shared/util/utils";
import { Run, RunID } from "../../../types/Run.type";
import { Score } from "../../../types/Score.type";
import { User } from "../../../types/User.type";

export interface UserState {
    currentUser: User | null,
    currentUserScores: Score[],
    currentUserRuns: Run[],
    currentRunUsers: User[]
}

const initialState: UserState = {
    currentUser: null,
    currentUserScores: [],
    currentUserRuns: [],
    currentRunUsers: []
}

const saveCurrentUserReducer = (state: UserState, action: PayloadAction<User>): UserState => ({
    ...state,
    currentUser: action.payload || null
});

const saveUserScoresReducer = (state: UserState, action: PayloadAction<Score[]>): UserState => ({
    ...state,
    currentUserScores: action.payload || []
});

const saveUserRunsReducer = (state: UserState, action: PayloadAction<Run[]>): UserState => ({
    ...state,
    currentUserRuns: action.payload || []
});

const storeCurrentRunUsersReducer = (state: UserState, action: PayloadAction<User[]>): UserState => ({
    ...state,
    currentRunUsers: action.payload || []
});

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        saveCurrentUser: saveCurrentUserReducer,
        saveUserScores: saveUserScoresReducer,
        saveUserRuns: saveUserRunsReducer,
        storeCurrentRunUsers: storeCurrentRunUsersReducer
    }
})

export const { saveCurrentUser, saveUserScores, saveUserRuns, storeCurrentRunUsers } = userSlice.actions;

export const selectCurrentUser: Selector<RootState, User | null> = state => state.user.currentUser;

export const selectCurrentUserScores: Selector<RootState, Score[]> = state => state.user.currentUserScores;
export const selectCurrentUserScoresOrganized: Selector<RootState, Record<RunID, Score[]>> = state => organizeArrayByField(state.user.currentUserScores, "runId");

export const selectCurrentUserRuns: Selector<RootState, Run[]> = state => state.user.currentUserRuns;
export const selectCurrentUserRunsOrganized: Selector<RootState, Record<string, Run>> = state => arrayToDictByID(state.user.currentUserRuns);

export const selectUsersForCurrentRun: Selector<RootState, User[]> = state => state.user.currentRunUsers;
export const selectUsersDictForCurrentRun: Selector<RootState, Record<string, User>> = state => arrayToDictByID(state.user.currentRunUsers);


export const userReducer = userSlice.reducer;
