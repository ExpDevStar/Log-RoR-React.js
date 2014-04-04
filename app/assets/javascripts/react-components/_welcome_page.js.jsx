/** @jsx React.DOM */

var WelcomePage = React.createClass({
	//There is probably a better way to decompose this...
	handleRegister: function(event) {
		var page_number = 1;
		this.props.onWelcomeClick(page_number);
	},
	handleLogin: function(event) {
		var page_number = 2;
		this.props.onWelcomeClick(page_number);
	},
	render: function() {
		return (
			<div className="center-content">
				<p className="welcome-text">Welcome</p>
				<div className="welcome-button button_link" onClick={this.handleRegister}>Register</div>
				<div className="welcome-button button_link" onClick={this.handleLogin}>Login</div>
			</div>
		);
	}
});