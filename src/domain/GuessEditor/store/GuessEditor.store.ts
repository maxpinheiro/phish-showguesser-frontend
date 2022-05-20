import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../../app/store/store";
import { Guess } from "../../../types/Guess.type";

export interface GuessEditorState {
    guesses: Guess[]
}

const initialState: GuessEditorState = {
    guesses: []
}

const saveGuessesReducer = (state: GuessEditorState, action: PayloadAction<Guess[]>) => ({
    ...state,
    guesses: action.payload || []
});

export const guessEditorSlice = createSlice({
    name: 'guessEditor',
    initialState,
    reducers: {
        saveGuesses: saveGuessesReducer
    }
})

export const { saveGuesses } = guessEditorSlice.actions;

export const selectGuesses = (state: RootState): Guess[] => state.guessEditor.guesses;

export const guessEditorReducer = guessEditorSlice.reducer;