import React from 'react';
import ReactDOM from 'react-dom';
import './styles/index.less';
import Routes from './routes';
import moment from 'moment';
import 'moment/locale/zh-cn';

moment.locale('zh-cn');

ReactDOM.render(<Routes/>, document.getElementById('root'));
