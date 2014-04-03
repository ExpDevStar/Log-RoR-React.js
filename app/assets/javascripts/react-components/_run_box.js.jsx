/**@jsx React.DOM */

ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;

var createXhrRequest = function(funct, request_type, action, formData) {
	document.body.style.cursor = "wait"; /*changes cursor to spinner*/
	var xhr = new XMLHttpRequest();
	xhr.open(request_type, action);
	xhr.onreadystatechange = function() {
		if (this.readyState != 4) {
			return;
		}
		if (this.status == 200) {
			funct(this.responseText);
			document.body.style.cursor = ""; /*changes back after request is done*/
			console.log("state has changed");
			return;
		} else {
			document.body.style.cursor = "";
			console.error("AHH xhr failed");
		}
	}
	if (formData != null) {
		xhr.send(formData);
	} else {
		xhr.send();
	}
}

var RunBox = React.createClass({

	getInitialState: function() {
		return JSON.parse(this.props.data);
	},
	handleRunSubmit: function(formData, action) {
		var obj = this;
		var funct = function(responseText) {
			obj.setState({runs: JSON.parse(responseText)});
		}
		createXhrRequest(funct, "POST", action, formData);
	},

	handleLogin: function(formData, action) {
		var obj = this;
		var funct = function(responseText) {
			obj.setState(JSON.parse(responseText));
		}
		createXhrRequest(funct, "POST", action, formData);
		if(this.state.firstTry) return true;
		return false; /*Invalid login or register*/
	},

	handleLogout: function(action) {
		var obj = this;
		var funct = function(responseText) {
			obj.setState(JSON.parse(responseText));
		}
		createXhrRequest(funct, "GET", action, null);
	},

	handlePageChange: function(page_num) {
		this.setState({page: page_num});
	},

	render: function() {
		/*Codes for user not logged in*/
		this.WELCOME_PAGE = 0;
		this.REGISTRATION_PAGE = 1;
		this.LOGIN_PAGE = 2;
		/*Codes for user logged in*/
		this.HOME_PAGE = 0;
		this.SEARCH_PAGE = 1;
		if (this.state.user_id != -1) {
			var form;
			if (this.state.page == this.HOME_PAGE) {
				form = new RunForm({form: this.state.form, onRunSubmit: this.handleRunSubmit, action: '/runs/create'});
			} else if (this.state.page == this.SEARCH_PAGE) {
				form = new SearchForm({form: this.state.form, onRunFilter: this.handleRunSubmit, action: '/runs/filter'});
			} else {
				console.error("Page code: " + this.state.page + " is unknown");
			}
			return (
				React.DOM.div(null,
					new NavBar({onPageChange: this.handlePageChange, onLogout: this.handleLogout, logout_action: '/user/logout'}),
					React.DOM.div({className: "table-centered"},
						form),
					React.DOM.div({className: "table-centered"},
						<ReactCSSTransitionGroup transitionName="object"> {
							new RunList({form: this.state.form, runs: this.state.runs, onRunSubmit: this.handleRunSubmit, action: '/runs/update'})
						}
						</ReactCSSTransitionGroup>
					)
				)
			);
		} else if (this.state.page == this.WELCOME_PAGE) {

			return (
				<ReactCSSTransitionGroup transitionName="object"> {
					React.DOM.div({className: "center-block"},
						new WelcomePage({onWelcomeClick: this.handlePageChange})
					)
				} </ReactCSSTransitionGroup>
			);

		} else if (this.state.page == this.REGISTRATION_PAGE) {

			return (
				<ReactCSSTransitionGroup transitionName="object"> {
					React.DOM.div({className: "center-block"},
						new RegisterForm({form: this.state.form, onRegister: this.handleLogin, pageChange: this.handlePageChange, action: '/user/create'})
					)
				} </ReactCSSTransitionGroup>
			);
		} else if (this.state.page == this.LOGIN_PAGE) {

			return (
				<ReactCSSTransitionGroup transitionName="object"> {
					React.DOM.div({className: "center-block"},
						new LoginForm({form: this.state.form, onLogin: this.handleLogin, pageChange: this.handlePageChange, action: '/user/login'})
					)
				} </ReactCSSTransitionGroup>
			);
		}
		return React.DOM.div({className: "This is broken"});
	}
});

