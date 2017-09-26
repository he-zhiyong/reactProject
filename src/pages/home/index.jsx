import React from 'react';
import './home.less';
import moment from 'moment';
import SiderMain from '../../components/sider-main/index.jsx';
import HeaderMain from '../../components/header-main/index.jsx';
import ContentMain from '../../components/content-main/index.jsx';
import FooterMain from '../../components/footer-main/index.jsx';
import { Layout } from 'antd';

export default class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            siderCollapsed: false,
            apiHistoryData: JSON.parse(localStorage.getItem("apiHistoryData")) || [],
            historyActiveKey:[]
        };
    }
    render() {
        const sider = {
            siderCollapsed: this.state.siderCollapsed,
            apiHistoryGroupData: this.apiHistoryDataHandle.call(this, this.state.apiHistoryData),
            historyActiveKey:this.state.historyActiveKey,
            refreshApiHistoryData: this.refreshApiHistoryData.bind(this),
            deleteApiHistoryData: this.deleteApiHistoryData.bind(this),
            deleteApiHistoryGroupData: this.deleteApiHistoryGroupData.bind(this),
            clearApiHistoryData: this.clearApiHistoryData.bind(this),
        }
        const header = {
            siderCollapsed: this.state.siderCollapsed,
            toggleSider: this.toggleSider.bind(this),
            addApiHistoryData: this.addApiHistoryData.bind(this)
        }
        const content = {
            addApiHistoryData: this.addApiHistoryData.bind(this)
        }
        return (
            <Layout className="home-layout">
                <SiderMain {...sider} />
                <Layout>
                    <HeaderMain {...header} />
                    <ContentMain {...content}/>
                    <FooterMain />
                </Layout>
            </Layout>
        )
    }
    toggleSider() {
        this.setState({
            siderCollapsed: !this.state.siderCollapsed,
        });
    }
    updateApiHistoryData(apiHistoryData){
        this.setState({ apiHistoryData })
        console.log(apiHistoryData)
        localStorage.setItem("apiHistoryData", JSON.stringify(apiHistoryData))
    }
    refreshApiHistoryData(){
        let apiHistoryData = JSON.parse(localStorage.getItem("apiHistoryData")) || []
        let historyActiveKey = []
        this.setState({ apiHistoryData,historyActiveKey })
    }
    addApiHistoryData() {
        let num = this.state.apiHistoryData.length+1
        let newApiData = {
            testDate: moment().format('YYYY-MM-DD'),
            title: "测试" + num,
            id: num,
            groupId:moment().format('YYYY-MM-DD'),
        }
        let apiHistoryData = this.state.apiHistoryData
        apiHistoryData.push(newApiData)
        this.updateApiHistoryData.call(this,apiHistoryData)
    }
    deleteApiHistoryData(id) {
        let apiHistoryData = this.state.apiHistoryData
        apiHistoryData.forEach((item,index,apiHistoryData)=>{
            if(item.id === id){
                apiHistoryData.splice(index,1)
            }
        })
        this.updateApiHistoryData.call(this,apiHistoryData)
    }
    deleteApiHistoryGroupData(groupId){
        let apiHistoryData = this.state.apiHistoryData
        apiHistoryData = apiHistoryData.filter((item,index,apiHistoryData)=>{
            return item.groupId !== groupId
        })
        this.updateApiHistoryData.call(this,apiHistoryData)
    }
    clearApiHistoryData() {
        this.setState({
            apiHistoryData: []
        })
    }
    apiHistoryDataHandle(data) {
        let apiHistoryData = data
        let apiGroupData = []
        const hasTestDate = (apiHistoryData, groupId) => {
            var hasGroupId = false;
            apiHistoryData.forEach((api, index) => {
                if (api.groupId === groupId) {
                    hasGroupId = index;
                }
            });
            return hasGroupId;
        }
        if (apiHistoryData.length) {
            apiHistoryData = this.sortData(apiHistoryData, 'testDate')
            apiHistoryData.forEach((api, index) => {
                let i = hasTestDate(apiGroupData, api.groupId)
                if (i === false) {
                    apiGroupData.push({
                        testDate: api.testDate,
                        groupId:api.groupId,
                        apiHistoryData: [api]
                    });
                } else {
                    apiGroupData[i].apiHistoryData.push(api)
                }
            });
        }
        return apiGroupData
    }
    sortData(data, key) {
        function by(key) {
            return function (o, p) {
                var a, b;
                if (typeof o === "object" && typeof p === "object" && o && p) {
                    a = o[key];
                    b = p[key];
                    if (a === b) {
                        return 0;
                    }
                    if (typeof a === typeof b) {
                        return a > b ? -1 : 1;
                    }
                    return typeof a > typeof b ? -1 : 1;
                }
            }
        }
        return data.sort(by(key));
    }
}