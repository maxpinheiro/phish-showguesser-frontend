import { createSlice, PayloadAction, Reducer } from "@reduxjs/toolkit";
import { Selector } from "react-redux";
import { RootState } from "../../app/store/store";
import { arrayToDictByID, organizeArrayByField } from "../../shared/util/utils";
import { Run, RunID } from "../../types/Run.type";
import { Score } from "../../types/Score.type";
import { User } from "../../types/User.type";

export interface ProfilePageState {
    user: User | null,
    scoreRecord: Score[],
    runRecord: Run[]
}

const initialState: ProfilePageState = {
    user: null,
    scoreRecord: [],
    runRecord: []
}

const saveUserReducer = (state: ProfilePageState, action: PayloadAction<User>): ProfilePageState => ({
    ...state,
    user: action.payload || null
});

const saveScoreRecordReducer = (state: ProfilePageState, action: PayloadAction<Score[]>): ProfilePageState => ({
    ...state,
    scoreRecord: action.payload || []
});

const saveRunRecordReducer = (state: ProfilePageState, action: PayloadAction<Run[]>): ProfilePageState => ({
    ...state,
    runRecord: action.payload || []
});

export const profilePageSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        saveUser: saveUserReducer,
        saveScoreRecord: saveScoreRecordReducer,
        saveRunRecord: saveRunRecordReducer
    }
})

export const { saveUser, saveScoreRecord, saveRunRecord } = profilePageSlice.actions;

export const selectUser: Selector<RootState, User | null> = state => state.profilePage.user;

export const selectScoreRecord: Selector<RootState, Score[]> = state => state.profilePage.scoreRecord;
export const selectScoreRecordOrganized: Selector<RootState, Record<RunID, Score[]>> = state => organizeArrayByField(state.profilePage.scoreRecord, "runId");

export const selectRunRecord: Selector<RootState, Run[]> = state => state.profilePage.runRecord;
export const selectRunRecordOrganized: Selector<RootState, Record<RunID, Run>> = state => arrayToDictByID(state.profilePage.runRecord);

export const profilePageReducer = profilePageSlice.reducer;
