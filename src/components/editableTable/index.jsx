import React from 'react';
import './editableTable.less';
import {Table, Input} from 'antd';

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
export default class EditableTable extends React.Component {
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
        return <Table className="editableTable" bordered dataSource={dataSource} columns={columns}  pagination={false} size="middle"/>;
    }
}