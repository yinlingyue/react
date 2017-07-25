import React from 'react';

export default class TodosComponent extends React.Component {


	handleButtonClick() {
		this.props.handleAddItem(this.refs.input.value);
	}

	handleColorClick() {
		this.props.handleToggleColor();
	}

	render() {

		var style = this.props.redColor ? {color:"red"} : {color:"green"};

		return (
			<div>
				<input type="text" ref='input' />
				<button onClick={this.handleButtonClick.bind(this)}>提交按钮</button>
				<button onClick={this.handleColorClick.bind(this)} style={style}>变色</button>
				{
					this.props.items.map((value, index) => {
						return <div key={index}>{value}</div>
					})
				}
			</div>
		)
	}

}