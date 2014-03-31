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
		if (!this.props.firstTry) {
			return (
				<div className="invalid_login">
					<p>Login taken. Try another.</p>
					<form ref="form" className="row" accept-charset="UTF-8" method="post" onSubmit={this.handleSubmit}>
						<input ref="first_name" name="first_name" placeholder="First Name" />
						<input ref="last_name" name="last_name" placeholder="Last Name" />
						<input ref="login" name="login" placeholder="UserID" />
						<input type="hidden" name={this.props.form.csrf_param} value={this.props.form.csrf_token} />
						<input type="submit" className="submit_button"/>
						<div className="registration_link"><p>First time here? Create an account here!</p></div>
					</form>
				</div>
				);
		} else {		
			return (
				<form ref="form" className="row" accept-charset="UTF-8" method="post" onSubmit={this.handleSubmit}>
					<input ref="first_name" name="first_name" placeholder="First Name" />
					<input ref="last_name" name="last_name" placeholder="Last Name" />
					<input ref="login" name="login" placeholder="UserID" />
					<input type="hidden" name={this.props.form.csrf_param} value={this.props.form.csrf_token} />
					<input type="submit" className="submit_button"/>
					<div className="registration_link"><p>First time here? Create an account here!</p></div>
				</form>
			);
		}
	}
});