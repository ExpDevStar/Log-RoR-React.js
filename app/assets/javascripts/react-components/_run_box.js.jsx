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
				console.log("state has changed");
				return;
			} else {
				console.error("AHH xhr failed");
			}
		}
	},

	render: function() {
		return (
			React.DOM.div({className: "run_box"},
				new RunForm({form: this.state.form, onRunSubmit: this.handleRunSubmit, action: '/runs/create'}),
				new RunList({form: this.state.form, runs: this.state.runs, onRunSubmit: this.handleRunSubmit, action: '/runs/update'})
			)
		)
	}
});

