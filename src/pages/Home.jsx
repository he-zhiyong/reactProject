import React from "react";
//import {Link} from 'react-router';
import { createHashHistory } from 'history';
import { useRouterHistory } from 'react-router';
import '../styles/home.less';
import { Layout, Input, Tabs, Collapse, Icon, Card, Row, Col,Avatar, Badge, Menu, Dropdown, Button, message } from 'antd';
const { Header, Content, Footer, Sider } = Layout;
const Search = Input.Search;
const TabPane = Tabs.TabPane;
const Panel = Collapse.Panel;

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
    toggle() {
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
        const menu = (
            <Menu>
              <Menu.Item>
                <a target="_blank" rel="noopener noreferrer" href="http://www.alipay.com/">1st menu item</a>
              </Menu.Item>
              <Menu.Item>
                <a target="_blank" rel="noopener noreferrer" href="http://www.taobao.com/">2nd menu item</a>
              </Menu.Item>
              <Menu.Item>
                <a target="_blank" rel="noopener noreferrer" href="http://www.tmall.com/">3d menu item</a>
              </Menu.Item>
            </Menu>
          );          
        return (
            <Layout className="home-layout">
                <Sider
                    trigger={null}
                    collapsible
                    collapsed={this.state.collapsed}
                    width="280"
                    collapsedWidth="0"
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
                            <div className="tbar">
                                <span onClick={() => alert(1)}>Clear all</span>
                            </div>
                            <Collapse bordered={false} defaultActiveKey={['1']} >
                                <Panel header="2017-09-20" key="1">
                                    <Card title="Card title" extra={<a href="#">More</a>}>
                                        <p>Card content</p>
                                        <p>Card content</p>
                                        <p>Card content</p>
                                    </Card>
                                    <Card title="Card title" extra={<a href="#">More</a>}>
                                        <p>Card content</p>
                                        <p>Card content</p>
                                        <p>Card content</p>
                                    </Card>
                                    <Card title="Card title" extra={<a href="#">More</a>}>
                                        <p>Card content</p>
                                        <p>Card content</p>
                                        <p>Card content</p>
                                    </Card>
                                    <Card title="Card title" extra={<a href="#">More</a>}>
                                        <p>Card content</p>
                                        <p>Card content</p>
                                        <p>Card content</p>
                                    </Card>
                                </Panel>
                                <Panel header="2017-09-19" key="2">
                                    <Card title="Card title" extra={<a href="#">More</a>}>
                                        <p>Card content</p>
                                        <p>Card content</p>
                                        <p>Card content</p>
                                    </Card>
                                    <Card title="Card title" extra={<a href="#">More</a>}>
                                        <p>Card content</p>
                                        <p>Card content</p>
                                        <p>Card content</p>
                                    </Card>
                                </Panel>
                                <Panel header="2017-09-18" key="3">
                                    <p>dasdsadfdsf</p>
                                </Panel>
                                <Panel header="2017-09-17" key="4">
                                    <p>dasdsadfdsf</p>
                                </Panel>
                                <Panel header="2017-09-16" key="5">
                                    <p>dasdsadfdsf</p>
                                </Panel>
                                <Panel header="2017-09-15" key="6">
                                    <p>dasdsadfdsf</p>
                                </Panel>
                                <Panel header="2017-09-14" key="7">
                                    <p>dasdsadfdsf</p>
                                </Panel>
                            </Collapse>
                        </TabPane>
                        <TabPane tab="Collections" key="2">Content of Tab Pane 2</TabPane>
                    </Tabs>
                </Sider>
                <Layout>
                    <Header>
                        <Row>
                            <Col span={2}>
                                <Icon className="trigger" type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'} onClick={this.toggle}/>
                            </Col>
                            <Col span={4} offset={18}>
                                <Dropdown overlay={menu} placement="bottomCenter">
                                    <Badge count={5}>
                                        <Avatar size="large" shape="square" icon="user" />
                                    </Badge>
                                </Dropdown>
                            </Col>
                        </Row>
                        
                        
                        {/* <Button onClick={this.getUserInfo}>用户信息</Button>
        <Button onClick={this.logout}>登出</Button> */}
                    </Header>
                    <Content>
                        <div>
                            content
                        </div>
                    </Content>
                    <Footer style={{ textAlign: 'center' }}>
                        API Test ©2017 Created by Hezhiyong
                    </Footer>
                </Layout>
            </Layout>
        )
    }
}