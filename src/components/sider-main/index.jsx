import React from "react";
import './sider-main.less';
import { Layout, Input, Tabs, Collapse, Card ,Icon} from 'antd';
const { Sider } = Layout;
const Search = Input.Search;
const TabPane = Tabs.TabPane;
const Panel = Collapse.Panel;

export default class SiderLeft extends React.Component {
    render() {
        return (
            <Sider
                trigger={null}
                collapsible
                collapsed={this.props.siderCollapsed}
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
                            <span onClick={this.props.clearApiData}>Clear all</span>
                            <span onClick={this.props.addApiData}>Add</span>
                        </div>
                        <Collapse bordered={false} defaultActiveKey={['1']} >
                            {this.props.apiGroupData.map((apiGroup, index) => (
                                <Panel header={apiGroup.testDate} key={index + 1}>
                                    <div className='buttons'>
                                        <span><Icon type="plus" /></span>
                                        <span><Icon type="delete" /></span>
                                        <span><Icon type="ellipsis" /></span>
                                    </div>
                                    {apiGroup.apiData.map((api, index) => (
                                        <Card key={index + 1} title={api.title} extra={<a>More</a>}>
                                            <p>Card content</p>
                                            <p>Card content</p>
                                            <p>Card content</p>
                                        </Card>
                                    ))}
                                </Panel>
                            ))}
                        </Collapse>
                    </TabPane>
                    <TabPane tab="Collections" key="2">Content of Tab Pane 2</TabPane>
                </Tabs>
            </Sider>
        )
    }
}