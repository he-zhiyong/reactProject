import React from "react";
import './home.less';
import moment from 'moment';
import SiderMain from '../../components/sider-main/index.jsx';
import HeaderMain from '../../components/header-main/index.jsx';
import ContentMain from '../../components/content-main/index.jsx';
import FooterMain from '../../components/footer-main/index.jsx';
import { Layout} from 'antd';

export default class Home extends React.Component {
    constructor() {
        super(...arguments);
        console.log(moment().format("Y-M-D"))
    }
    render() {   
        return (
            <Layout className="home-layout">
                <SiderMain/>
                <Layout>
                    <HeaderMain/>
                    <ContentMain/>
                    <FooterMain/>
                </Layout>
            </Layout>
        )
    }
}