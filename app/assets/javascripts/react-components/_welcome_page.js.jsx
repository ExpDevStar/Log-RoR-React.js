/** @jsx React.DOM */

var WelcomePage = React.createClass({

	/*This handles the event where a user clicks either the Register or Login button.
	Register = 1 and Login = 2*/
	handleClick: function(page_num) {
		this.props.onWelcomeClick(page_num);
	},

	render: function() {
		return (
			<div className="center-content">
				<p className="welcome-text">Welcome</p>
				<div className="welcome-button button_link" onClick={this.handleClick.bind(this, 1)}>Register</div>
				<div className="welcome-button button_link" onClick={this.handleClick.bind(this, 2)}>Login</div>
			</div>
		);
	}
});