/** @jsx React.DOM */

var LoginForm = React.createClass({
	handleSubmit: function(event) {
		event.preventDefault();
		var login = this.refs.login.getDOMNode().value
		if (!login) return false;
		var formData = new FormData(this.refs.form.getDOMNode());
		this.props.onLogin(formData, this.props.action);
	},

	render: function() {
		if (!this.props.firstTry) {
			return (
				<div className="invalid_login">
					<p>Invalid login. Try again.</p>
					<form ref="form" className="row" accept-charset="UTF-8" method="post" onSubmit={this.handleSubmit}>
						<input ref="login" name="login" placeholder="Login here" />
						<input type="hidden" name={this.props.form.csrf_param} value={this.props.form.csrf_token} />
						<input type="submit" className="submit_button"/>
						<div className="registration_link"><p>First time here? Create an account here!</p></div>
					</form>
				</div>
				);
		} else {		
			return (
				<form ref="form" className="row" accept-charset="UTF-8" method="post" onSubmit={this.handleSubmit}>
					<input ref="login" name="login" placeholder="Login here" />
					<input type="hidden" name={this.props.form.csrf_param} value={this.props.form.csrf_token} />
					<input type="submit" className="submit_button"/>
					<div className="registration_link">First time here? Create an account here!</div>
				</form>
			);
		}
	}
});