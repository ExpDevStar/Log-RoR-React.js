/** @jsx React.DOM */

var RunForm = React.createClass({

	/*This handles a new run being created*/
	handleSubmit: function (event) {
		event.preventDefault();
		var name = this.refs.name.getDOMNode().value.trim();
		var distance = this.refs.distance.getDOMNode().value.trim();
		var date = this.refs.date.getDOMNode().value.trim();
		var start_time = this.refs.start_time.getDOMNode().value.trim();
		var end_time = this.refs.end_time.getDOMNode().value.trim();
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
	},

	render: function() {
		return	(
			<form ref="form" className="form-inline run" accept-charset="UTF-8" method="post" onSubmit={this.handleSubmit}>
				<div className="tr">
					<span className="cell first-col">
						<input className="table-field" type="date" ref="date" name="date" />
					</span>
					<span className="cell">
						<input className="table-field" ref="name" name="name"/>
					</span>
					<span className="cell">
						<input className="table-field" type="number" ref="distance" name="distance" step="any"/>
					</span>
					<span className="cell">
						<input className="table-field" type="time" ref="start_time" name="start_time" />
					</span>
					<span className="cell">
						<input className="table-field" type="time" ref="end_time" name="end_time" />
					</span>
					<span className="cell">
						<input className="table-field" ref="notes" name="notes" placeholder="Optional" />
					</span>
					<input type="hidden" name={this.props.form.csrf_param} value={this.props.form.csrf_token} />
					<input type="submit" className="hidden-field"/>
				</div>
			</form>
		);
	}
});