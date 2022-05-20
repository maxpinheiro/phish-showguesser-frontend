import { createSelector, createSlice, PayloadAction, Selector } from "@reduxjs/toolkit";
import { RootState } from "../../../app/store/store";
import { organizeGuesses } from "../../../shared/util/utils";
import { Guess } from "../../../types/Guess.type";

export interface GuessesState {
    runGuesses: Guess[]
}

const initialState: GuessesState = {
    runGuesses: []
}

const storeRunGuessesReducer = (state: GuessesState, action: PayloadAction<Guess[]>) => ({
    ...state,
    runGuesses: action.payload
});

export const guessesSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        storeRunGuesses: storeRunGuessesReducer
    }
})

export const { storeRunGuesses } = guessesSlice.actions;

export const selectRunGuesses: Selector<RootState, Guess[]> = (state)=> state.guesses.runGuesses;
export const selectRunGuessesOrganized: Selector<RootState, Record<string, Guess[]>> = createSelector(selectRunGuesses, (guesses) => organizeGuesses(guesses));

export const guessesReducer = guessesSlice.reducer;
