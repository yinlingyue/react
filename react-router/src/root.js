import './css/reset.css';
import './css/style.css';
import 'antd/dist/antd.css';
import React from 'react';
import ReactDom from 'react-dom';
import {Router, Route, hashHistory} from 'react-router';
import IndexComponent from './components/index/index.js';

class Root extends React.Component {

	render() {
		return(
			<div className="main">
				<Router history={hashHistory}>
					<Route path='/' component={IndexComponent}></Route>
				</Router>
			</div>
		)
	}


}


ReactDom.render(<Root />, document.querySelector("#root"));