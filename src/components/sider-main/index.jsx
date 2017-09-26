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
                            <span onClick={this.props.clearApiHistoryData}>Clear all</span>
                        </div>
                        <Collapse bordered={false} accordion defaultActiveKey={['1']} >
                            {this.props.apiHistoryGroupData.map((apiGroup, index) => (
                                <Panel 
                                    header={
                                        <div>
                                            <span className='collapse-title'>
                                                {apiGroup.testDate}
                                            </span>
                                            <span className='collapse-buttons'>
                                                <Icon type="ellipsis" title="More" data-id={index + 1} 
                                                    onClick={
                                                        (e)=>{
                                                            e.stopPropagation();
                                                            this.props.deleteApiHistoryGroupData(apiGroup.groupId)
                                                        }
                                                    }
                                                    />
                                                <Icon type="delete" title="Delete" data-id={index + 1} 
                                                    onClick={
                                                        (e)=>{
                                                            e.stopPropagation();
                                                            this.props.deleteApiHistoryGroupData(apiGroup.groupId)
                                                        }
                                                    }
                                                />
                                            </span>                                        
                                        </div>
                                    } 
                                    key={index + 1}
                                >
                                    {apiGroup.apiData.map((api, index) => (
                                        <Card key={index + 1} title={api.title} 
                                        extra={<Icon type="close" title="Delete" data-id={api.id} 
                                            onClick={
                                                (e)=>{
                                                    e.preventDefault();
                                                    this.props.deleteApiHistoryData(api.id)
                                                }
                                            }
                                            />}>
                                            <p>Card content</p>
                                            <p>Card content</p>
                                            <p>Card content</p>
                                        </Card>
                                    ))}
                                </Panel>
                            ))}
                        </Collapse>
                    </TabPane>
                    <TabPane tab="Collections" key="2">
                        <div className="tbar">
                            <span onClick={this.props.clearApiData}>Clear all</span>
                            <span onClick={this.props.addApiData}>Add</span>
                        </div>
                        <Collapse bordered={false} defaultActiveKey={['1']} >
                            {this.props.apiGroupData.map((apiGroup, index) => (
                                <Panel 
                                    header={
                                        <div>
                                            <span className='collapse-title'>
                                                {apiGroup.groupName}
                                            </span>
                                            <span className='collapse-buttons'>
                                                <Icon type="ellipsis" title="More" data-id={index + 1} />
                                                <Icon type="delete" title="Delete" data-id={index + 1} />
                                                <Icon type="plus" title="Add" data-id={index + 1} onClick={this.props.addApiData}/>
                                            </span>                                        
                                        </div>
                                    } 
                                    key={index + 1}
                                >
                                    {apiGroup.apiData.map((api, index) => (
                                        <Card key={index + 1} title={api.title} 
                                        extra={<Icon type="close" title="Delete" data-id={api.id} onClick={
                                                (e)=>{
                                                    this.props.deleteApiData(api.id)
                                                }
                                            }
                                            />}>
                                            <p>Card content</p>
                                            <p>Card content</p>
                                            <p>Card content</p>
                                        </Card>
                                    ))}
                                </Panel>
                            ))}
                        </Collapse>
                    </TabPane>
                </Tabs>
            </Sider>
        )
    }
}