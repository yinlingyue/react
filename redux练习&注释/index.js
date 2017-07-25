import React from 'react';
import Todos from "./todos.js";
import thunk from 'redux-thunk';
import ReactDOM from 'react-dom';
import item_reducer from "./item_reducer.js";
import color_reducer from "./color_reducer.js";
import promiseMiddleware from 'redux-promise';
import {createStore, combineReducers, applyMiddleware} from "redux";

//combineReducers方法相当于上面import把引进来
//初级就import reducer from "reducer.js"
var reducer = combineReducers({
	items: item_reducer,
	redColor: color_reducer
});

//相当于创建了个store接收reducer的所有命令
var store = createStore(reducer, applyMiddleware(promiseMiddleware));

class TodoController extends React.Component {

	constructor(props) {
		super(props);
		//store.getState()是获取store里的所有数据
		this.state = store.getState();
		//监听store的数据是否改变 只有store有任何变化 就自动执行该方法
		store.subscribe(this.handleStoreChange.bind(this));
	}

	componentDidMount() {
		//dispatch是store的一个方法 专门传递信息给store的 告诉store要做什么
		store.dispatch({
			type: 'GET_ITEM_SUCC', 
			payload: new Promise(function(resolve){
				fetch('/items.json').then((response) => {return response.json()}).then((json)=>{
					resolve(json.items);
				})
			})
		});
	}

	handleStoreChange() {
		this.setState(store.getState());
	}

	handleAddItem(value) {
		//创建传话人
		var action = {
			type: "ADD_ITEM",
			text: value
		}
		store.dispatch(action);
	}

	handleToggleColor() {
		var action = {
			type: "CHANGE_COLOR"
		}
		store.dispatch(action);
	}

	render() {
		return (
			<Todos redColor={this.state.redColor} items={this.state.items} handleAddItem={this.handleAddItem.bind(this)} handleToggleColor={this.handleToggleColor.bind(this)}/>
		)
	}

}

ReactDOM.render(
  <TodoController />, document.querySelector('#root')
);