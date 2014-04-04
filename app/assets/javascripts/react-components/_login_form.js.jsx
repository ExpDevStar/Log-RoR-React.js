/** @jsx React.DOM */

var LoginForm = React.createClass({

	getInitialState: function(){ 
		return {error_message: ""}
	},

	handleSubmit: function(event) {
		event.preventDefault();
		var login = this.refs.login.getDOMNode().value
		if (!login) return false;
		var formData = new FormData(this.refs.form.getDOMNode());
		if(!this.props.onLogin(formData, this.props.action)) {/*Invalid login*/
			this.setState({error_message: "Invalid login. Try again"});
		}
	},

	handleBack: function(event) {
		event.preventDefault();
		var WELCOME_PAGE = 0;
		this.props.pageChange(WELCOME_PAGE);
	},

	render: function() {
		return (
			<div className="center-content">
				<p className="error-message">{this.state.error_message}</p>
				<form ref="form" id="login-form" accept-charset="UTF-8" method="post" onSubmit={this.handleSubmit}>
					<input className="input-box" ref="login" name="login" placeholder="Login here" />
					<input type="hidden" name={this.props.form.csrf_param} value={this.props.form.csrf_token} />
				</form><br/>
				<div className="welcome-button button_link" onClick={this.handleBack}>Back</div>
				<button type="submit" form="login-form" className="welcome-button button_link">Login</button>
			</div>
		);
	}
});