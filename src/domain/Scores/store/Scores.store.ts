import { createSelector, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Selector } from "react-redux";
import { RootState } from "../../../app/store/store";
import { organizeScores, rankScores, rankUsers } from "../../../shared/util/utils";
import { Score } from "../../../types/Score.type";

export interface ScoresState {
    currentRunScores: Score[],
}

const initialState: ScoresState = {
    currentRunScores: []
}

const saveScoresReducer = (state: ScoresState, action: PayloadAction<Score[]>) => ({
    ...state,
    scores: action.payload
});

export const scoresSlice = createSlice({
    name: 'scores',
    initialState,
    reducers: {
        saveScoresForCurrentRun: saveScoresReducer
    }
})

export const { saveScoresForCurrentRun } = scoresSlice.actions;

export const selectScoresForCurrentRun: Selector<RootState, Score[]> = (state) => state.scores.currentRunScores;
export const selectOrganizedScores: Selector<RootState, Record<string, Score[]>> = createSelector(selectScoresForCurrentRun, (scores) => organizeScores(scores));
export const selectRankedScores: Selector<RootState, ({userId: string, points: number})[]> = createSelector(selectScoresForCurrentRun, (scores) => rankScores(scores));
export const selectRankedUsers: Selector<RootState, Record<string, number>> = createSelector(selectScoresForCurrentRun, (scores) => rankUsers(scores));

export const scoresReducer = scoresSlice.reducer;
