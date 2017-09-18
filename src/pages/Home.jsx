import React from "react";
//import {Link} from 'react-router';
import { createHashHistory } from 'history'
import { useRouterHistory } from 'react-router'
import { Layout, Menu, Icon, Button, message } from 'antd';
const { Header, Content, Footer, Sider } = Layout;

const appHistory = useRouterHistory(createHashHistory)({ queryKey: false });

export default class Home extends React.Component {
    constructor() {
        super(...arguments);
        this.getUserInfo = this.getUserInfo.bind(this);
        this.logout = this.logout.bind(this);
        this.checkLogStatus = this.checkLogStatus.bind(this);
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
        return (
            <Layout style={{ height: '100%' }}>
                <Sider
                    breakpoint="lg"
                    collapsedWidth="0"
                    onCollapse={(collapsed, type) => { console.log(collapsed, type); }}
                >
                    <div className="logo" />
                    <Menu theme="dark" mode="inline" defaultSelectedKeys={['4']}>
                        <Menu.Item key="1">
                            <Icon type="user" />
                            <span className="nav-text">nav 1</span>
                        </Menu.Item>
                        <Menu.Item key="2">
                            <Icon type="video-camera" />
                            <span className="nav-text">nav 2</span>
                        </Menu.Item>
                        <Menu.Item key="3">
                            <Icon type="upload" />
                            <span className="nav-text">nav 3</span>
                        </Menu.Item>
                        <Menu.Item key="4">
                            <Icon type="user" />
                            <span className="nav-text">nav 4</span>
                        </Menu.Item>
                    </Menu>
                </Sider>
                <Layout>
                    <Header style={{ background: '#fff', padding: 0 }}>
                        <Button onClick={this.getUserInfo}>用户信息</Button>
                        <Button onClick={this.logout}>登出</Button>
                    </Header>
                    <Content style={{ margin: '24px 16px 0' }}>
                        <div style={{ padding: 24, background: '#fff' }}>
                            content
                    </div>
                    </Content>
                    <Footer style={{ textAlign: 'center' }}>
                        Ant Design ©2016 Created by Ant UED
                    </Footer>
                </Layout>
            </Layout>
        )
    }
}