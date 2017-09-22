import React from 'react';
import './home.less';
//import moment from 'moment';
import SiderMain from '../../components/sider-main/index.jsx';
import HeaderMain from '../../components/header-main/index.jsx';
import ContentMain from '../../components/content-main/index.jsx';
import FooterMain from '../../components/footer-main/index.jsx';
import { Layout} from 'antd';

export default class Home extends React.Component {
    constructor(props) {
        super(props);
        this.toggle = this.toggle.bind(this);
        this.state = {
            sideCollapsed: false,
            apiData:JSON.parse(localStorage.getItem("apiData"))
        };
    }
    toggle() {
        this.setState({
            sideCollapsed: !this.state.sideCollapsed,
        });
    }
   /*  addApiData(){
        var apiData = this.state.apiData;
        var newApiData =  {
            testDate:moment().subtract(10, 'days').format('YYYY-MM-DD'),
            title:"测试0221"
        }
        apiData.push(newApiData)
        this.setState({
            apiData: apiData
        });
        console.log(this.state.apiData)
    } */
    render() {
        const sider = {
            sideCollapsed:this.state.sideCollapsed,
            //addApiData:this.addApiData,
            apiData:this.state.apiData
        }
        const header = {
            toggle:this.toggle,
            sideCollapsed:this.state.sideCollapsed,
        }   
        return (
            <Layout className="home-layout">
                <SiderMain {...sider}/>
                <Layout>
                    <HeaderMain {...header}/>
                    <ContentMain/>
                    <FooterMain/>
                </Layout>
            </Layout>
        )
    }
}