/** @jsx React.DOM */

var RegisterForm = React.createClass({
	handleSubmit: function(event) {
		event.preventDefault();
		var login = this.refs.login.getDOMNode().value
		var first_name = this.refs.first_name.getDOMNode().value
		var last_name = this.refs.last_name.getDOMNode().value
		if (!login || !first_name || !last_name) return false;
		var formData = new FormData(this.refs.form.getDOMNode());
		this.props.onRegister(formData, this.props.action);
		return false;
	},

	render: function() {
		var classes = "center-content";
		if (!this.props.firstTry) {
			classes += " invalid_form";
			return (
				<div className={classes}>
					<p>Login taken. Try another.</p>
					<form className="register-form" ref="form" accept-charset="UTF-8" method="post" onSubmit={this.handleSubmit}>
						<input className="input-box" ref="first_name" name="first_name" placeholder="First Name" />
						<input className="input-box" ref="last_name" name="last_name" placeholder="Last Name" />
						<input className="input-box" ref="login" name="login" placeholder="UserID" />
						<input type="hidden" name={this.props.form.csrf_param} value={this.props.form.csrf_token} />
						<input type="submit" className="submit_button"/>
					</form><br/>
						<div className="button_link" onClick={this.props.backToWelcome}><p>Back</p></div>
				</div>
				);
		} else {
			return (
				<div className={classes}>
					<form className="register-form" ref="form" accept-charset="UTF-8" method="post" onSubmit={this.handleSubmit}>
						<input className="input-box" ref="first_name" name="first_name" placeholder="First Name" /><br/>
						<input className="input-box" ref="last_name" name="last_name" placeholder="Last Name" /><br/>
						<input className="input-box" ref="login" name="login" placeholder="UserID" /><br/>
						<input type="hidden" name={this.props.form.csrf_param} value={this.props.form.csrf_token} />
						<input type="submit" className="submit_button"/>
					</form><br/>
					<div className="button_link" onClick={this.props.backToWelcome}><p>Back</p></div>
				</div>
			);
		}
	}
});