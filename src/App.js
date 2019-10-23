/* eslint-disable no-undef */
/* eslint-disable no-alert */
import React from "react";
import {
    BrowserRouter as Router,
    Switch,
    Route
} from "react-router-dom";

import 'bootstrap/dist/css/bootstrap.min.css';
import NavigationBar from './components/Header/NavigationBar'
import Game from './components/Game/Game'
import Login from './components/Auth/Login'
import RegisterOld from "./components/Auth/Register-old";
import Register from './components/Auth/Register'

export default function App() {
    return (
        <Router>
            <NavigationBar />
            <Switch>
                <Route path="/about">
                    <About />
                </Route>
                <Route path="/users">
                    <Users />
                </Route>
                <Route path="/register" component={Register} />


                <Route path="/non" component={RegisterOld} />
                <Route path="/game" component={Game} />
                <Route path="/login" component={Login} />
                <Route path="/">
                    <Home />
                </Route>
            </Switch>

        </Router>
    );
}

function Home() {
    return <h2>Home</h2>;
}

function About() {
    return <h2>Nguyễn Minh Trường - 1612760</h2>;
}

function Users() {
    return <h2>Users</h2>;
}