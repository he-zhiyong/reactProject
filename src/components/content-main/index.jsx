import React from "react";
import './content-main.less';
import { Layout, Button, Table, Popconfirm, Tabs, Dropdown, Input, TextArea ,Radio,Select, Menu } from 'antd';
const { Content } = Layout;
const TabPane = Tabs.TabPane;
const Option = Select.Option;
const RadioGroup = Radio.Group;

class EditableCell extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: this.props.value,
            placeholder:this.props.placeholder,
            editable: this.props.editable || false,
        }
    }
    componentWillReceiveProps(nextProps) {
        if (nextProps.editable !== this.state.editable) {
            this.setState({ editable: nextProps.editable });
            if (nextProps.editable) {
                this.cacheValue = this.state.value;
            }
        }
        if (nextProps.status && nextProps.status !== this.props.status) {
            if (nextProps.status === 'save') {
                this.props.onChange(this.state.value);
            } else if (nextProps.status === 'cancel') {
                this.setState({ value: this.cacheValue });
                this.props.onChange(this.cacheValue);
            }
        }
    }
    shouldComponentUpdate(nextProps, nextState) {
        return nextProps.editable !== this.state.editable ||
            nextState.value !== this.state.value;
    }
    handleChange(e) {
        const value = e.target.value;
        this.setState({ value });
    }
    render() {
        const { value, editable, placeholder } = this.state;
        return (
            <div>
                {
                    editable ?
                        <div>
                            <Input
                                placeholder={placeholder}
                                value={value}
                                onChange={e => this.handleChange(e)}
                                size="small"
                            />
                        </div>
                        :
                        <div className="editable-row-text">
                            {value.toString() || ' '}
                        </div>
                }
            </div>
        );
    }
}

class EditableTable extends React.Component {
    constructor(props) {
        super(props);
        this.columns = [{
            title: 'Num',
            dataIndex: 'Num',
            width: '4%',
            render: (text, record, index) => this.renderColumns(this.state.data, index, 'Num', text),
        },{
            title: 'Key',
            dataIndex: 'Key',
            width: '32%',
            render: (text, record, index) => this.renderColumns(this.state.data, index, 'Key', text),
        }, {
            title: 'Value',
            dataIndex: 'Value',
            width: '32%',
            render: (text, record, index) => this.renderColumns(this.state.data, index, 'Value', text),
        }, {
            title: 'Description',
            dataIndex: 'Description',
            width: '32%',
            render: (text, record, index) => this.renderColumns(this.state.data, index, 'Description', text),
        }/* , {
            title: 'operation',
            dataIndex: 'operation',
            render: (text, record, index) => {
                const { editable } = this.state.data[index].name;
                return (
                    <div className="editable-row-operations">
                        {
                            editable ?
                                <span>
                                    <a onClick={() => this.editDone(index, 'save')}>Save</a>
                                    <Popconfirm title="Sure to cancel?" onConfirm={() => this.editDone(index, 'cancel')}>
                                        <a>Cancel</a>
                                    </Popconfirm>
                                </span>
                                :
                                <span>
                                    <a onClick={() => this.edit(index)}>Edit</a>
                                </span>
                        }
                    </div>
                );
            },
        } */];
        this.state = {
            data: [{
                key: '0',
                Num:{
                    editable: false,
                    value: 1,
                },
                Key: {
                    editable: true,
                    placeholder: 'Key',
                    value:""
                },
                Value: {
                    editable: true,
                    placeholder: 'Value',
                    value:""
                },
                Description: {
                    editable: true,
                    placeholder: 'Description',
                    value:""
                },
            },{
                key: '1',
                Num:{
                    editable: false,
                    value: 2,
                },
                Key: {
                    editable: true,
                    placeholder: 'Key',
                    value:""
                },
                Value: {
                    editable: true,
                    placeholder: 'Value',
                    value:""
                },
                Description: {
                    editable: true,
                    placeholder: 'Description',
                    value:""
                },
            }],
        };
    }
    renderColumns(data, index, key, text) {
        const { editable,placeholder, status } = data[index][key];
        if (typeof editable === 'undefined') {
            return text;
        }
        return (<EditableCell
            editable={editable}
            value={text}
            placeholder={placeholder}
            onChange={value => this.handleChange(key, index, value)}
            status={status}
        />);
    }
    handleChange(key, index, value) {
        const { data } = this.state;
        data[index][key].value = value;
        this.setState({ data });
    }
    edit(index) {
        const { data } = this.state;
        Object.keys(data[index]).forEach((item) => {
            if (data[index][item] && typeof data[index][item].editable !== 'undefined') {
                data[index][item].editable = true;
            }
        });
        this.setState({ data });
    }
    editDone(index, type) {
        const { data } = this.state;
        Object.keys(data[index]).forEach((item) => {
            if (data[index][item] && typeof data[index][item].editable !== 'undefined') {
                data[index][item].editable = false;
                data[index][item].status = type;
            }
        });
        this.setState({ data }, () => {
            Object.keys(data[index]).forEach((item) => {
                if (data[index][item] && typeof data[index][item].editable !== 'undefined') {
                    delete data[index][item].status;
                }
            });
        });
    }
    render() {
        const { data } = this.state;
        const dataSource = data.map((item) => {
            const obj = {};
            Object.keys(item).forEach((key) => {
                obj[key] = key === 'key' ? item[key] : item[key].value;
            });
            return obj;
        });
        const columns = this.columns;
        return <Table bordered dataSource={dataSource} columns={columns}  pagination={false} size="middle"/>;
    }
}
export default class ContentMain extends React.Component {
    constructor(props) {
        super(props);
        this.newTabIndex = 0;
        const panes = [
            { title: 'Tab 1', content: 'Content of Tab Pane 1', key: '1' },
            { title: 'Tab 2', content: 'Content of Tab Pane 2', key: '2' },
        ];
        this.state = {
            activeKey: panes[0].key,
            radioValue:1,
            panes,
        };
    }
    render() {
        const selectBefore = (
            <Select defaultValue="POST" style={{ width: 80 }}>
                <Option value="GET">GET</Option>
                <Option value="POST">POST</Option>
            </Select>
        );
        const menu = (
            <Menu onClick={() => alert(1)}>
                <Menu.Item key="1">1st menu item</Menu.Item>
                <Menu.Item key="2">2nd menu item</Menu.Item>
                <Menu.Item key="3">3d menu item</Menu.Item>
            </Menu>
        );
        return (
            <Content>
                <Tabs
                    onChange={this.onChange.bind(this)}
                    activeKey={this.state.activeKey}
                    type="editable-card"
                    onEdit={this.onEdit.bind(this)}
                >
                    {this.state.panes.map(pane =>
                        <TabPane tab={pane.title} key={pane.key}>
                            <div className="header">
                                <Input addonBefore={selectBefore} addonAfter={<span className="addParams" onClick={() => alert(1)}>Params</span>} size="large" placeholder="Enter request URL" />
                                <div className="buttons">
                                    <Dropdown.Button type="primary" size="large" onClick={() => alert(1)} overlay={menu} loading >Send</Dropdown.Button>
                                    <Dropdown.Button size="large" onClick={() => alert(1)} overlay={menu} loading>Save</Dropdown.Button>
                                </div>
                            </div>
                            <div className="content">
                                <Tabs defaultActiveKey="3">
                                    <TabPane tab="Authorization" disabled key="1">
                                        Type
                                    </TabPane>
                                    <TabPane tab="Headers" key="2">
                                        <div className="body">
                                            <EditableTable/>
                                        </div>
                                    </TabPane>
                                    <TabPane tab="Body" key="3">
                                        <div className="body">
                                            <RadioGroup onChange={this.radioOnChange.bind(this)} value={this.state.radioValue}>
                                                <Radio value={1}>form-data</Radio>
                                                <Radio value={2}>x-www-form-urlencoded</Radio>
                                                <Radio value={3}>raw</Radio>
                                                <Radio value={4}>binary</Radio>
                                            </RadioGroup>
                                            <EditableTable/>
                                        </div>
                                    </TabPane>
                                    <TabPane tab="Pre-request Script" disabled key="4">
                                    
                                    </TabPane>
                                    <TabPane tab="Tests" disabled key="5">
                                        <div className="body">
                                            <EditableTable/>
                                        </div>
                                    </TabPane>
                                </Tabs>
                                <div className="">
                                    <h3 className="title">Response</h3>
                                    <Tabs defaultActiveKey="1">
                                        <TabPane tab="Body" key="1">
                                            Type
                                        </TabPane>
                                        <TabPane tab="Cookies" key="2">
                        
                                        </TabPane>
                                        <TabPane tab="Headers" key="3">
                                            
                                        </TabPane>
                                        <TabPane tab="Tests" disabled key="4">
                                        
                                        </TabPane>
                                    </Tabs>
                                </div>
                            </div>
                        </TabPane>)}
                </Tabs>
            </Content>
        )
    }
    radioOnChange(e){
        this.setState({
            radioValue: e.target.value,
        });
    }
    onChange(activeKey) {
        this.setState({ activeKey });
    }
    onEdit(targetKey, action) {
        this[action](targetKey);
    }
    add() {
        const panes = this.state.panes;
        const activeKey = `newTab${this.newTabIndex++}`;
        panes.push({ title: 'New Tab', content: 'New Tab Pane', key: activeKey });
        this.setState({ panes, activeKey });
    }
    remove(targetKey) {
        let activeKey = this.state.activeKey;
        let lastIndex;
        this.state.panes.forEach((pane, i) => {
            if (pane.key === targetKey) {
                lastIndex = i - 1;
            }
        });
        const panes = this.state.panes.filter(pane => pane.key !== targetKey);
        if (lastIndex >= 0 && activeKey === targetKey) {
            activeKey = panes[lastIndex].key;
        }
        this.setState({ panes, activeKey });
    }
}