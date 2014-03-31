/** @jsx React.DOM */

var RunForm = React.createClass({
	handleSubmit: function (event) {
		event.preventDefault();
		var name = this.refs.name.getDOMNode().value.trim();
		var distance = this.refs.distance.getDOMNode().value;
		var date = this.refs.date.getDOMNode().value.trim();
		var start_time = this.refs.start_time.getDOMNode().value;
		var end_time = this.refs.end_time.getDOMNode().value;
		var notes = this.refs.notes.getDOMNode().value.trim();
		//validation
		if (!name || !distance || !date || !start_time || !end_time) return false;
		//submit form data
		var formData = new FormData(this.refs.form.getDOMNode());
		this.props.onRunSubmit(formData, this.props.action);

		//reset form
		this.refs.name.getDOMNode().value = '';
		this.refs.distance.getDOMNode().value = '';
		this.refs.date.getDOMNode().value = '';
		this.refs.start_time.getDOMNode().value = '';
		this.refs.end_time.getDOMNode().value = '';
		this.refs.notes.getDOMNode().value = '';
		return false;
	},

	render: function() {
		return	(
			<form ref="form" className="form-inline" accept-charset="UTF-8" method="post" onSubmit={this.handleSubmit}>
				<div className="tr">
					<span className="cell">Date</span>
					<span className="cell">Name</span>
					<span className="cell">Distance</span>
					<span className="cell">Start Time</span>
					<span className="cell">End Time</span>
					<span className="cell">Notes</span>
				</div>
				<div className="tr">
					<span className="cell">
						<input type="date" ref="date" name="date" />
					</span>
					<span className="cell">
						<input ref="name" name="name"/>
					</span>
					<span className="cell">
						<input type="number" ref="distance" name="distance" step="any"/>
					</span>
					<span className="cell">
						<input type="time" ref="start_time" name="start_time" />
					</span>
					<span className="cell">
						<input type="time" ref="end_time" name="end_time" />
					</span>
					<span className="cell">
						<input ref="notes" name="notes" />
					</span>
					<span className="cell">
						<input type="hidden" name={this.props.form.csrf_param} value={this.props.form.csrf_token} />
						<input type="submit" className="submit_button"/>
					</span>
				</div>
			</form>
		);
	}
});