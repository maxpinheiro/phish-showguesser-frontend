import React from "react";
import { Route, Routes } from "react-router";
import Login from "../domain/Authentication/component/Login";
import Signup from "../domain/Authentication/component/Signup";
import GuessEditor from "../domain/GuessEditor/component/GuessEditor";
import GuessList from "../domain/Guesses/component/GuessList";
import RunsList from "../domain/Runs/component/RunsList";
import RunLeaderboard from "../domain/Scores/component/RunLeaderboard";
import ProfilePage from "../domain/User/component/ProfilePage";
import Home from "./component/Home";

const AppRouter = () => (
    <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/runs" element={<RunsList />} />
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
