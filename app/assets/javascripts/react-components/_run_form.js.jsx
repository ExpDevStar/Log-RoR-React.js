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
		return React.DOM.tbody(null, 
				<form ref="form" className="run-form" accept-charset="UTF-8" method="post" onSubmit={this.handleSubmit}>
				<tr>
					<td>Date</td>
					<td>Name</td>
					<td>Distance</td>
					<td>Start Time</td>
					<td>End Time</td>
					<td>Notes</td>
				</tr>
				<tr>
					<td>
						<input type="date" ref="date" name="date" />
					</td>
					<td>
						<input ref="name" name="name"/>
					</td>
					<td>
						<input type="number" ref="distance" name="distance" step="any"/>
					</td>
					<td>
						<input type="time" ref="start_time" name="start_time" />
					</td>
					<td>
						<input type="time" ref="end_time" name="end_time" />
					</td>
					<td>
						<input ref="notes" name="notes" />
					</td>
					<td>
						<input type="hidden" name={this.props.form.csrf_param} value={this.props.form.csrf_token} />
						<input type="submit" className="submit_button"/>
					</td>
				</tr>
				</form>
		);
	}
});