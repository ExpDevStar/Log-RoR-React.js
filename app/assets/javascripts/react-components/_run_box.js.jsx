/**@jsx React.DOM */

var RunBox = React.createClass({
	getInitialState: function() {
		return JSON.parse(this.props.runs);
	},
	handleRunSubmit: function(formData, action) {
		var xhr = new XMLHttpRequest();
		xhr.open("POST", action);
		xhr.send(formData);
		var obj = this;
		xhr.onreadystatechange = function() {
			if (this.readyState != 4) {
				return;
			}
			if (this.status == 200) {
				obj.setState({runs: JSON.parse(this.responseText)});
				return;
			} else {
				//respond with error
			}
		}
	},

	render: function() {
		return (
			React.DOM.div({className: "run_box"},
				React.DOM.table({className: "run_data"}, 
					new RunForm({form: this.state.form, onRunSubmit: this.handleRunSubmit, action: '/runs/create'}),
					new RunList({runs: this.state.runs, edit: this.state.edit})
				)
			)
		)
	}
});

