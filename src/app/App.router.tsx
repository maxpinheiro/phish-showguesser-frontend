import React from "react";
import { Route, Routes } from "react-router";
import Login from "../domain/Authentication/Login";
import Signup from "../domain/Authentication/Signup";
import GuessEditor from "../domain/GuessEditor/GuessEditor";
import GuessList from "../domain/GuessList/GuessList";
import RunList from "../domain/RunList/RunList";
import RunLeaderboard from "../domain/Leaderboard/Leaderboard";
import ProfilePage from "../domain/ProfilePage/ProfilePage";
import Home from "./component/Home";

const AppRouter: React.FC = () => (
    <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/runs" element={<RunList />} />
        { /*<Route path="/runs/:runId" element={<div />} /> */ }
        { /* <Route path="/guesses" element={<div />} /> */ }
        <Route path="/guesses/:runId" element={<GuessList />} />
        <Route path="/guesses/:runId/edit" element={<GuessEditor />} />
        { /* <Route path="/scores" element={<div />} /> */ }
        <Route path="/scores/:runId" element={<RunLeaderboard />} />
        <Route path="/users/:userId" element={<ProfilePage />} />
        <Route path="/avatar-creator" element={<div />} />
    </Routes>
);

export default AppRouter;
