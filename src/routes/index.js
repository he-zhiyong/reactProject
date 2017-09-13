import React from "react";
import { createHashHistory } from 'history'
import { Router, Route, useRouterHistory} from 'react-router'
import Home from '../pages/Home.jsx';
import Login from '../pages/Login.jsx';
import Register from '../pages/Register.jsx';

const appHistory = useRouterHistory(createHashHistory)({queryKey:false});//去除地址末尾key的hash值

export default class Routes extends React.Component {
    render() {
        return (
            <Router history = {appHistory} >
                <Route path ="/" component={Home} />
                <Route path="/login" component={Login}/>
                <Route path="/register" component={Register}/>
            </Router>
        )
    }
}