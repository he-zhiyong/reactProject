import React from "react";
import { Router, Route, hashHistory } from 'react-router'
import Home from './pages/Home.jsx';
import Login from './pages/Login.jsx';
import Register from './pages/Register.jsx';

export default class Routes extends React.Component {
    render() {
        return (
            <Router history = {hashHistory} >
                <Route path ="/" component={Home} />
                <Route path="/login" component={Login}/>
                <Route path="/register" component={Register}/>
            </Router>
        )
    }
}