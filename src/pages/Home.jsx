import React from "react";
//import {Link} from 'react-router';
import { Layout, Menu, Icon, Button,message } from 'antd';
const { Header, Content, Footer, Sider } = Layout;

export default class Home extends React.Component {
    constructor() {
        super(...arguments);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleSubmit(e) {
        e.preventDefault();
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
                    return res.json()
                }
            })
            .then(result => {
                if (result.success) {
                    message.success(result.message);
                } else {
                    message.error(result.message);
                }
            })
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
                        <Button onClick = {this.handleSubmit}>test</Button>
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