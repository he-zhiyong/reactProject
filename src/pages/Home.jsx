import React from "react";
//import {Link} from 'react-router';
import { createHashHistory } from 'history';
import { useRouterHistory } from 'react-router';
import '../styles/home.less';
import { Layout, Input,Tabs, Menu, Icon, Button, message } from 'antd';
const { Header, Content, Footer, Sider } = Layout;
const Search = Input.Search;
const TabPane = Tabs.TabPane;

const appHistory = useRouterHistory(createHashHistory)({ queryKey: false });

export default class Home extends React.Component {
    constructor() {
        super(...arguments);
        this.toggle = this.toggle.bind(this);
        this.getUserInfo = this.getUserInfo.bind(this);
        this.logout = this.logout.bind(this);
        this.checkLogStatus = this.checkLogStatus.bind(this);
        this.state = {
            collapsed: false,
        };
    }
    toggle(){
        this.setState({
          collapsed: !this.state.collapsed,
        });
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
            <Layout className="home-layout">
                <Sider
                    trigger={null}
                    collapsible
                    collapsed={this.state.collapsed}
                    width="280"
                    collapsedWidth="0"
                    className="sider"
                    onCollapse={(collapsed, type) => { console.log(collapsed, type); }}
                > 
                    <div className="filter">
                        <Search
                            placeholder="Filter"
                            onSearch={value => console.log(value)}
                        />
                    </div>
                    <Tabs defaultActiveKey="1">
                        <TabPane tab="History" key="1">
                            <div className="content">
                                <div className="tbar">
                                    <span onClick={() => alert(1)}>Clear all</span>
                                </div>
                            </div>
                        </TabPane>
                        <TabPane tab="Collections" key="2">Content of Tab Pane 2</TabPane>
                    </Tabs>
                    {/* <Menu theme="light" mode="inline" defaultSelectedKeys={['4']}>
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
                    </Menu> */}
                </Sider>
                <Layout>
                    <Header style={{ background: '#fff', padding: 0 }}>
                        <Icon
                            className="trigger"
                            type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
                            onClick={this.toggle}
                        />
                        {/* <Button onClick={this.getUserInfo}>用户信息</Button>
        <Button onClick={this.logout}>登出</Button> */}
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