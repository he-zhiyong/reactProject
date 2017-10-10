import React from "react";
//import {Link} from 'react-router';
import { createHashHistory } from 'history';
import { useRouterHistory } from 'react-router';
import './header-main.less';
import { Layout, Icon, Row, Col,Avatar, Badge, Menu, Dropdown, message } from 'antd';
const { Header} = Layout;

const appHistory = useRouterHistory(createHashHistory)({ queryKey: false });

export default class HeaderMain extends React.Component {
    constructor(props) {
        super(props);
        this.getUserInfo = this.getUserInfo.bind(this);
        this.logout = this.logout.bind(this);
        this.checkLogStatus = this.checkLogStatus.bind(this);
        this.state = {
            siderCollapsed: false,
        };
    }
    logout(e) {
        e.preventDefault();
        this.checkLogStatus(() => {
            localStorage.setItem('user', null);
            message.success('退出登录！');
        });
    }
    checkLogStatus(fn) {
        var user = JSON.parse(localStorage.getItem('user'))
        if (user) {
            fn()
        } else {
            message.error('请先登录！');
            appHistory.push('/login');
        }
    }
    getUserInfo(e) {
        e.preventDefault();
        this.checkLogStatus(() => {
            var user = JSON.parse(localStorage.getItem('user'))
            var url = '/api/user';
            var options = {
                method: 'get',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'x-access-token': user.token
                },
            }
            fetch(url, options)
                .then((res) => {
                    if (res.status >= 200 && res.status < 300) {
                        user.token = res.headers.get('x-access-token')
                        localStorage.setItem('user', JSON.stringify(user))
                        return res.json()
                    }
                })
                .then(result => {
                    if (result.success) {
                        message.success(result.message);
                    } else {
                        message.error(result.message);
                        localStorage.setItem('user', null);
                        appHistory.push('/login');
                    }
                })
        });
    }
    render() {
        const menu = (
            <Menu>
              <Menu.Item>
              <a onClick={this.getUserInfo}>User Info</a>
              </Menu.Item>
              <Menu.Item>
                <a onClick={this.logout}>Setting</a>
              </Menu.Item>
              <Menu.Item>
                <a onClick={this.logout}>Logout</a>
              </Menu.Item>
            </Menu>
          );          
        return (
            <Header>
                <Row>
                    <Col span={2}>
                        <Icon className="trigger" type={this.props.siderCollapsed ? 'menu-unfold' : 'menu-fold'} onClick={this.props.toggleSider}/>
                    </Col>
                    <Col span={4} offset={18}>
                        <Dropdown overlay={menu} placement="bottomCenter">
                            <Badge count={5}>
                                <Avatar size="large" shape="square" icon="user" />
                            </Badge>
                        </Dropdown>
                    </Col>
                </Row>
            </Header>
        )
    }
}