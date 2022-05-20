import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import { authenticationReducer } from '../../domain/Authentication/store/Authentication.store';
import { guessEditorReducer } from '../../domain/GuessEditor/store/GuessEditor.store';
import { guessesReducer } from '../../domain/Guesses/store/Guesses.store';
import { runsReducer } from '../../domain/Runs/store/Runs.store';
import { scoresReducer } from '../../domain/Scores/store/Scores.store';
import { userReducer } from '../../domain/User/store/User.store';

export const apiRoot = 'localhost:5000';

export enum ResponseStatus {
  Success = 200,
  UnknownError = 500,
  NotFound = 404
}

export const store = configureStore({
  reducer: {
    authentication: authenticationReducer,
    guessEditor: guessEditorReducer,
    guesses: guessesReducer,
    runs: runsReducer,
    scores: scoresReducer,
    user: userReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
