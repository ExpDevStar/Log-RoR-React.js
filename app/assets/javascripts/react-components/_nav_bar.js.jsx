/**@jsx React.DOM */

var NavBar = React.createClass({
	handleHome: function(event) {
		event.preventDefault();
		var HOME_PAGE = 0;
		this.props.onPageChange(HOME_PAGE);
		return false;
	},
	handleSearch: function(event) {
		event.preventDefault();
		var SEARCH_PAGE = 1;
		this.props.onPageChange(SEARCH_PAGE);
		return false;
	},

	handleLogout: function(event) {
		event.preventDefault();
		this.props.onLogout(this.props.logout_action);	
		return false;
	},

	render: function() {
		return (
			<div className="table">
				<div className="tr nav-bar">
					<span className="td"><div className="nav-link" onClick={this.handleHome}>Home</div></span>
					<span className="td"><div className="nav-link" onClick={this.handleSearch}>Search</div></span>
					<span className="td"><div className="nav-link" onClick={this.handleLogout}>Logout</div></span>
				</div>
			</div>
		)
	}
})