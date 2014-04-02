/**@jsx React.DOM */

ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;

var RunBox = React.createClass({

	getInitialState: function() {
		return JSON.parse(this.props.data);
	},
	handleRunSubmit: function(formData, action) {
		var xhr = new XMLHttpRequest();
		xhr.open("POST", action);
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
		xhr.send(formData);
	},

	handleLogin: function(formData, action) {
		var xhr = new XMLHttpRequest();
		xhr.open("POST", action);
		var obj = this;
		xhr.onreadystatechange = function() {
			if (this.readyState != 4) {
				return;
			}
			if (this.status == 200) {
				obj.setState(JSON.parse(this.responseText));
				console.log("state has changed");
				return;
			} else {
				console.error("AHH xhr failed");
			}
		}
		xhr.send(formData);
	},

	handleLogout: function(action) {
		var xhr = new XMLHttpRequest();
		xhr.open("GET", action);
		var obj = this;
		console.log("eneterd handleLogout")
		xhr.onreadystatechange = function() {
			if (this.readyState != 4) {
				return;
			}
			if (this.status == 200) {
				obj.setState({login: JSON.parse(this.responseText)});
				console.log("state has changed");
				return;
			} else {
				console.error("AHH xhr failed");
			}

		}
		xhr.send();
	},

	handleWelcome: function(page_num) {
		this.setState({login: {user_id: -1, page: page_num, first_try: true}});
	},

	backToWelcome: function(event) {
		this.setState({login: {user_id: -1, page: 0, first_try: true}});
	},

	render: function() {
		this.WELCOME_PAGE = 0;
		this.REGISTRATION_PAGE = 1;
		this.LOGIN_PAGE = 2;
		if (this.state.login.user_id != -1) {
			return (
				React.DOM.div(null,
					new NavBar({onLogout: this.handleLogout, action: '/user/logout'}),
					React.DOM.div({className: "table-centered"},
						new RunForm({form: this.state.form, onRunSubmit: this.handleRunSubmit, action: '/runs/create'}),
						<ReactCSSTransitionGroup transitionName="object"> {
							new RunList({form: this.state.form, runs: this.state.runs, onRunSubmit: this.handleRunSubmit, action: '/runs/update'})
						}
						</ReactCSSTransitionGroup>
					)
				)
			);
		} else if (this.state.login.page == this.WELCOME_PAGE) {

			return (
				<ReactCSSTransitionGroup transitionName="object"> {
					React.DOM.div({className: "center-block"},
						new WelcomePage({onWelcomeClick: this.handleWelcome})
					)
				} </ReactCSSTransitionGroup>
			);

		} else if (this.state.login.page == this.REGISTRATION_PAGE) {

			return (
				<ReactCSSTransitionGroup transitionName="object"> {
					React.DOM.div({className: "center-block"},
						new RegisterForm({form: this.state.form, onRegister: this.handleLogin, backToWelcome: this.backToWelcome, firstTry: this.state.login.first_try, action: '/user/create'})
					)
				} </ReactCSSTransitionGroup>
			);
		} else if (this.state.login.page == this.LOGIN_PAGE) {

			return (
				<ReactCSSTransitionGroup transitionName="object"> {
					React.DOM.div({className: "center-block"},
						new LoginForm({form: this.state.form, onLogin: this.handleLogin, backToWelcome: this.backToWelcome, firstTry: this.state.login.first_try, action: '/user/post_login'})
					)
				} </ReactCSSTransitionGroup>
			);
		}
		return React.DOM.div({className: "This is broken"});
	}
});

