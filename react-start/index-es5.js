var React = require("react");
var ReactDom = require("react-dom");

var Root = React.createClass({

	getInitialState: function(){
		return {
			name: "react"
		}
	},

	render : function() {
		return <div>{this.state.name}</div>
	}

})

ReactDom.render(<Root/> , document.getElementById("root"));