import { createSelector, createSlice, PayloadAction, Selector } from "@reduxjs/toolkit";
import { RootState } from "../../app/store/store";
import { arrayToDictByID, organizeArrayByField } from "../../shared/util/utils";
import { Guess } from "../../types/Guess.type";
import { Run, RunID } from "../../types/Run.type";
import { User, UserID } from "../../types/User.type";

export interface GuessListState {
    guesses: Guess[],
    users: User[],
    run: Run | null
}

const initialState: GuessListState = {
    guesses: [],
    users: [],
    run: null
}

const storeGuessesReducer = (state: GuessListState, action: PayloadAction<Guess[]>): GuessListState => ({
    ...state,
    guesses: action.payload || []
});

const storeUsersReducer = (state: GuessListState, action: PayloadAction<User[]>): GuessListState => ({
    ...state,
    users: action.payload || []
});

const storeRunReducer = (state: GuessListState, action: PayloadAction<Run>): GuessListState => ({
    ...state,
    run: action.payload || null
});

export const guessListSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        storeGuesses: storeGuessesReducer,
        storeUsers: storeUsersReducer,
        storeRun: storeRunReducer
    }
})

export const { storeGuesses, storeUsers, storeRun } = guessListSlice.actions;

export const selectGuesses: Selector<RootState, Guess[]> = state => state.guessList.guesses;
export const selectGuessesOrganized: Selector<RootState, Record<RunID, Guess[]>> = createSelector(selectGuesses, (guesses) => organizeArrayByField(guesses, "runId"));

export const selectUsers: Selector<RootState, User[]> = state => state.guessList.users;
export const selectUsersOrganized: Selector<RootState, Record<UserID, User>> = createSelector(selectUsers, (users) => arrayToDictByID(users));

export const selectRun: Selector<RootState, Run | null> = state => state.guessList.run;

export const guessListReducer = guessListSlice.reducer;
