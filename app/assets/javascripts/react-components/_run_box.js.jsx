/**@jsx React.DOM */

ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;

/*Function for creating an XML HTTP Request.  It takes in a function to execute on the response text,
the request type, the action, and the form data.  If there is no form data, use null*/
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
			return;
		} else {
			document.body.style.cursor = "";
			console.error("Request failed.");
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

	/*This function is used for all actions relating to changing the runs, including
	adding a new run, editting a run, or deleting a run*/
	handleRunSubmit: function(formData, action) {
		var obj = this;
		var funct = function(responseText) {
			obj.setState({runs: JSON.parse(responseText)});
		}
		createXhrRequest(funct, "POST", action, formData);
	},

	/*This function handles login actions, which include logging in and registering a new account*/
	handleLogin: function(formData, action) {
		var obj = this;
		var funct = function(responseText) {
			obj.setState(JSON.parse(responseText));
		}
		createXhrRequest(funct, "POST", action, formData);
		return (this.state.login_state == 1) /*Valid login or register is 1*/
	},

	/*This function handles the logging out of a user*/
	handleLogout: function(action) {
		var obj = this;
		var funct = function(responseText) {
			obj.setState(JSON.parse(responseText));
		}
		createXhrRequest(funct, "GET", action, null);
	},

	/*This handles whenever a page is changed on both the logged in state and logged off state*/
	handlePageChange: function(page_num) {
		this.setState({page: page_num, login_state: 1});
	},

	render: function() {
		/*Codes for user not logged in*/
		this.WELCOME_PAGE = 0;
		this.REGISTRATION_PAGE = 1;
		this.LOGIN_PAGE = 2;
		/*Codes for user logged in*/
		this.HOME_PAGE = 0;
		this.SEARCH_PAGE = 1;

		if (this.state.user != null) {
		/*Pages if user is logged in*/
			var run_form;
			var search_form;
			switch(this.state.page) {
				case this.HOME_PAGE:
					run_form = new RunForm({form: this.state.form, onRunSubmit: this.handleRunSubmit, action: '/runs/create'});
					search_form = <div className="hidden"></div>
					break;
				case this.SEARCH_PAGE:
					run_form = <div className="hidden"></div>
					search_form = new SearchForm({form: this.state.form, onRunFilter: this.handleRunSubmit, action: '/runs/filter'});
					break;
				default:
					console.error("Page code: " + this.state.page + " is unknown");
			}
			return (
				React.DOM.div(null,
					new NavBar({onPageChange: this.handlePageChange, onLogout: this.handleLogout, logout_action: '/user/logout'}),
					React.DOM.div({className: "table-centered"},
						search_form),
					React.DOM.div({className: "table-centered"},

						<ReactCSSTransitionGroup transitionName="object"> 
							<div className="col-title tr">
								<span className="cell"><h4>Date</h4></span>
								<span className="cell"><h4>Name</h4></span>
								<span className="cell"><h4>Distance</h4></span>
								<span className="cell"><h4>Start Time</h4></span>
								<span className="cell"><h4>End Time</h4></span>
								<span className="cell"><h4>Notes</h4></span>
							</div>
							<div className="run-list">
								{run_form}
								{
								new RunList({user: this.state.user, form: this.state.form, runs: this.state.runs, onRunSubmit: this.handleRunSubmit,
									editAction: '/runs/update', deleteAction: '/runs/delete'})
								}
							</div>
						</ReactCSSTransitionGroup>
					)
				)
			);
		} else {
		/*Pages if user is not logged in*/
			switch(this.state.page) {
				case this.WELCOME_PAGE:
					return (
						<ReactCSSTransitionGroup transitionName="object"> {
							React.DOM.div({className: "center-block"},
								new WelcomePage({onWelcomeClick: this.handlePageChange})
							)
						} </ReactCSSTransitionGroup>
					);
					break;
				case this.REGISTRATION_PAGE:
					return (
						<ReactCSSTransitionGroup transitionName="object"> {
							React.DOM.div({className: "center-block"},
								new RegisterForm({form: this.state.form, onRegister: this.handleLogin, pageChange: this.handlePageChange, action: '/user/create'})
							)
						} </ReactCSSTransitionGroup>
					);
					break;
				case this.LOGIN_PAGE:
					return (
						<ReactCSSTransitionGroup transitionName="object"> {
							React.DOM.div({className: "center-block"},
								new LoginForm({form: this.state.form, onLogin: this.handleLogin, pageChange: this.handlePageChange, action: '/user/login'})
							)
						} </ReactCSSTransitionGroup>
					);
					break;
				default:
					console.error("Page code: " + this.state.page + " is unknown");
					return <div>Broken page</div>
			}
		}
	}
});

