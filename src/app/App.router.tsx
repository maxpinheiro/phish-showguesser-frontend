import React from "react";
import { Route, Routes } from "react-router";
import Login from "../domain/Authentication/Login";
import Signup from "../domain/Authentication/Signup";
import GuessEditor from "../domain/GuessEditor/GuessEditor";
import GuessListContainer from "../domain/GuessList/GuessListContainer";
import RunList from "../domain/RunList/RunList";
import LeaderboardContainer from "../domain/Leaderboard/LeaderboardContainer";
import ProfilePage from "../domain/ProfilePage/ProfilePage";
import Home from "./component/Home";
import AvatarCreator from "../domain/AvatarCreator/AvatarCreator";

const AppRouter: React.FC = () => (
    <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/runs" element={<RunList />} />
        { /*<Route path="/runs/:runId" element={<div />} /> */ }
        { /* <Route path="/guesses" element={<div />} /> */ }
        <Route path="/guesses/:runId" element={<GuessListContainer />} />
        <Route path="/guesses/:runId/edit" element={<GuessEditor />} />
        { /* <Route path="/scores" element={<div />} /> */ }
        <Route path="/scores/:runId" element={<LeaderboardContainer />} />
        <Route path="/users/:userId" element={<ProfilePage />} />
        <Route path="/avatar-creator" element={<AvatarCreator />} />
    </Routes>
);

export default AppRouter;
