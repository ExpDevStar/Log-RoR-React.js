/**@jsx React.DOM */

var NavBar = React.createClass({
	handleHome: function(event) {
		event.preventDefault();
		this.props.onHome(this.props.action);
		return false;
	},

	handleLogout: function(event) {
		event.preventDefault();
		this.props.onLogout(this.props.action);	
		return false;
	},

	render: function() {
		return (
			<div className="table">
				<div className="tr nav-bar">
					<span className="td"><div className="nav-link" onClick={this.handleHome}>Home</div></span>
					<span className="td"><div className="nav-link" onClick={this.handleLogout}>Logout</div></span>
				</div>
			</div>
		)
	}
})