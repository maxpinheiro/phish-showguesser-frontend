import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import { authenticationReducer } from '../../domain/Authentication/Authentication.store';
import { guessEditorReducer } from '../../domain/GuessEditor/GuessEditor.store';
import { guessListReducer } from '../../domain/GuessList/GuessList.store';
import { runListReducer } from '../../domain/RunList/RunList.store';
import { leaderboardReducer } from '../../domain/Leaderboard/Leaderboard.store';
import { profilePageReducer } from '../../domain/ProfilePage/ProfilePage.store';

export const apiRoot = 'http://localhost:5000';

export enum ResponseStatus {
  Success = 200,
  UnknownError = 500,
  NotFound = 404
}

export const store = configureStore({
  reducer: {
    authentication: authenticationReducer,
    guessEditor: guessEditorReducer,
    guessList: guessListReducer,
    runList: runListReducer,
    leaderboard: leaderboardReducer,
    profilePage: profilePageReducer,
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
