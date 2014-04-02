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
		var classes = "center-content";
		if (!this.props.firstTry) {
			classes += " invalid_form";
			return (
				<div className={classes}>
					<p>Invalid login. Try again.</p>
					<form ref="form" id="login-form" accept-charset="UTF-8" method="post" onSubmit={this.handleSubmit}>
						<input className="input-box" ref="login" name="login" placeholder="Login here" />
						<input type="hidden" name={this.props.form.csrf_param} value={this.props.form.csrf_token} />
					</form><br/>
					<div className="button_link" onClick={this.props.backToWelcome}>Back</div>
					<button type="submit" form="login-form" className="button_link">Login</button>
				</div>
				);
		} else {		
			return (
				<div className={classes}>
				<form ref="form" id="login-form" accept-charset="UTF-8" method="post" onSubmit={this.handleSubmit}>
					<input className="input-box" ref="login" name="login" placeholder="Login here" />
					<input type="hidden" name={this.props.form.csrf_param} value={this.props.form.csrf_token} />
				</form><br/>
				<div className="button_link" onClick={this.props.backToWelcome}>Back</div>
				<button type="submit" form="login-form" className="button_link">Login</button>
				</div>
			);
		}
	}
});