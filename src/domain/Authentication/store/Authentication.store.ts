import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../../app/store/store";
import { attemptLogin } from "./Authentication.api";

export interface AuthenticationState {
    loggedIn: boolean,
    userId: string | undefined
}

const initialState: AuthenticationState = {
    loggedIn: false,
    userId: undefined
}

const logInReducer = (state: AuthenticationState, action: PayloadAction<string>) => ({
    ...state,
    loggedIn: true,
    userId: action.payload
});

const logOutReducer = (state: AuthenticationState) => ({
    ...state,
    loggedIn: false,
    userId: undefined
});

export const authenticationSlice = createSlice({
    name: 'authentication',
    initialState,
    reducers: {
        logIn: logInReducer,
        logOut: logOutReducer
    }
})

export const { logIn, logOut } = authenticationSlice.actions;

/*
export const tryLogin = createAsyncThunk(
    'authentication/attemptLogin',
    async (credentials: {username: string, password: string}) => {
      const response = await attemptLogin(credentials.username, credentials.password)
      
      return response;
    }
  );
*/

export const selectIsLoggedIn = (state: RootState): boolean => state.authentication.loggedIn;
export const selectUserId = (state: RootState): string | undefined => state.authentication.userId;

export const authenticationReducer = authenticationSlice.reducer;
