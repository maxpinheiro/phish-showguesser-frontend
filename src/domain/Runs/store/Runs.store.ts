import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Selector } from "react-redux";
import { RootState } from "../../../app/store/store";
import { Run } from "../../../types/Run.type";

export interface RunsState {
    runs: Run[]
}

const initialState: RunsState = {
    runs: []
}

const saveRunsReducer = (state: RunsState, action: PayloadAction<Run[]>) => ({
    ...state,
    runs: action.payload
});

export const runsSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        saveRuns: saveRunsReducer
    }
})

export const { saveRuns } = runsSlice.actions;

export const selectRuns: Selector<RootState, Run[]> = (state) => state.runs.runs;

export const runsReducer = runsSlice.reducer;
