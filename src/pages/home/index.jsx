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
            apiData: JSON.parse(localStorage.getItem("apiData")) || []
        };
    }
    render() {
        const sider = {
            siderCollapsed: this.state.siderCollapsed,
            apiGroupData: this.apiDataHandle.call(this, this.state.apiData),
            addApiData: this.addApiData.bind(this),
            clearApiData: this.clearApiData.bind(this),
        }
        const header = {
            siderCollapsed: this.state.siderCollapsed,
            toggleSider: this.toggleSider.bind(this),
            addApiData: this.addApiData.bind(this)
        }
        return (
            <Layout className="home-layout">
                <SiderMain {...sider} />
                <Layout>
                    <HeaderMain {...header} />
                    <ContentMain />
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
    updateApiData(apiData){
        this.setState({ apiData })
        localStorage.setItem("apiData", JSON.stringify(apiData))
    }
    addApiData() {
        let num = this.state.apiData.length + 1
        let newApiData = {
            testDate: moment().subtract(num, 'day').format('YYYY-MM-DD'),
            title: "测试" + num,
            id: num
        }
        let apiData = this.state.apiData
        apiData.push(newApiData)
        this.updateApiData.call(this,apiData)
    }
    deleteApiData(id) {
        let apiData = this.state.apiData
        this.updateApiData.call(this,apiData)
    }
    deleteApiGroupData(testDate){
        let apiData = this.state.apiData
        this.updateApiData.call(this,apiData)
    }
    clearApiData() {
        this.setState({
            apiData: []
        })
    }
    apiDataHandle(data) {
        let apiData = data
        let apiGroupData = []
        const hasTestDate = (apiData, testDate) => {
            var hasTestDate = false;
            apiData.forEach((api, index) => {
                if (api.testDate === testDate) {
                    hasTestDate = index;
                }
            });
            return hasTestDate;
        }
        if (apiData.length) {
            apiData = this.sortData(apiData, 'testDate')
            apiData.forEach((api, index) => {
                let i = hasTestDate(apiGroupData, api.testDate)
                if (i === false) {
                    apiGroupData.push({
                        testDate: api.testDate,
                        apiData: [api]
                    });
                } else {
                    apiGroupData[i].apiData.push(api)
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