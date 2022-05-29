import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Selector } from "react-redux";
import { RootState } from "../../app/store/store";
import { Run } from "../../types/Run.type";

export interface RunListState {
    runs: Run[]
}

const initialState: RunListState = {
    runs: []
}

const saveRunsReducer = (state: RunListState, action: PayloadAction<Run[]>) => ({
    ...state,
    runs: action.payload || state.runs
});

export const runListSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        saveRuns: saveRunsReducer
    }
})

export const { saveRuns } = runListSlice.actions;

export const selectRuns: Selector<RootState, Run[]> = (state) => state.runList.runs;

export const runListReducer = runListSlice.reducer;