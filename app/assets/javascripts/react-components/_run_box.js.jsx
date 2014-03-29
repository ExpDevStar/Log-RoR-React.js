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
				obj.setState({runs: this.responseText});
				return;
			} else {
				//respond with error
			}
		}
	},

	render: function() {
		return (
			<div className="run-box">
				<table>
					<tbody>
						<RunForm form={this.state.form} onRunSubmit={this.handleRunSubmit} />
						<RunList run={this.state.runs} />
					</tbody>
				</table>
			</div>
		);
	}
});

