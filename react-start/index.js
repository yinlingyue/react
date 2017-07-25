import React from 'react';
import ReactDom from 'react-dom';

class Root extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			name: "react"
		}
	}


	render() {
		return <div>{this.state.name}</div>
	}

}


ReactDom.render(<Root/> , document.getElementById("root"));