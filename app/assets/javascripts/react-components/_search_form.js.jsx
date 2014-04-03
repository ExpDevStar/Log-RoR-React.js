/** @jsx React.DOM */

var SearchForm = React.createClass({
	handleSubmit: function (event) {
		event.preventDefault();
		//submit form data
		var formData = new FormData(this.refs.form.getDOMNode());
		this.props.onRunFilter(formData, this.props.action);
		return false;
	},

	render: function() {
		return	(
			<form ref="form" className="search-form form-inline" accept-charset="UTF-8" method="post" onSubmit={this.handleSubmit}>
				<div className="tr">
					<span className="cell"><h4>Date Start</h4></span>
					<span className="cell"><h4>Date End</h4></span>
					<span className="cell"><h4>Search Text</h4></span>
					<span className="cell"><h4>Distance Min</h4></span>
					<span className="cell"><h4>Distance Max</h4></span>
					<span className="cell"><h4>Time Min</h4></span>
					<span className="cell"><h4>Time Max</h4></span>
				</div>
				<div className="tr">
					<span className="cell">
						<input className="table-field" onChange={this.handleSubmit} type="date" name="start_date" />
					</span>
					<span className="cell">
						<input className="table-field" onChange={this.handleSubmit} type="date" name="end_date" />
					</span>
					<span className="cell">
						<input className="table-field" onChange={this.handleSubmit} name="text"/>
					</span>
					<span className="cell">
						<input className="table-field" onChange={this.handleSubmit} type="number" name="min_distance" step="any"/>
					</span>
					<span className="cell">
						<input className="table-field" onChange={this.handleSubmit} type="number" name="max_distance" step="any"/>
					</span>
					<span className="cell">
						<input className="table-field" onChange={this.handleSubmit} type="number" name="min_time" />
					</span>
					<span className="cell">
						<input className="table-field" onChange={this.handleSubmit} type="number" name="max_time" />
					</span>
					<input type="hidden" name={this.props.form.csrf_param} value={this.props.form.csrf_token} />
					<input type="submit" className="hidden-field"/>
				</div>
			</form>
		);
	}
});