/** @jsx React.DOM */

var WelcomePage = React.createClass({

	/*This handles the event where a user clicks register*/
	handleRegister: function(event) {
		var register_page = 1;
		this.props.onWelcomeClick(register_page);
	},

	/*This handles the event where a user clicks login*/
	handleLogin: function(event) {
		var login_page = 2;
		this.props.onWelcomeClick(login_page);
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