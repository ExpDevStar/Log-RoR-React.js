/**@jsx React.DOM */

var Run = React.createClass({
	getInitialState: function() {
		return {edit: false};
	},

	handleEdit: function(event){ 
		this.setState({edit: true})
		return false;
	},

	handleSubmit: function() {
		event.preventDefault();
		var name = this.refs.name.getDOMNode().value.trim();
		var distance = this.refs.distance.getDOMNode().value;
		var date = this.refs.date.getDOMNode().value.trim();
		var start_time = this.refs.start_time.getDOMNode().value;
		var end_time = this.refs.end_time.getDOMNode().value;
		var notes = this.refs.notes.getDOMNode().value.trim();
		//validation
		if (!name || !distance || !date || !start_time || !end_time) return false;
		var formData = new FormData(this.refs.form.getDOMNode());
		this.props.onRunSubmit(formData, this.props.action);

	},

	render: function() {
		if (this.state.edit) {		
			return (
				<tr key={this.props.id}>
					<td>
						<input type="date" ref="date" name="date" value={ this.props.date } />
					</td>
					<td>
						<input ref="name" name="name" value={ this.props.name } />
					</td>
					<td> 
						<input type="number" ref="distance" name="distance" step="any" value={ this.props.distance } />
					</td>
					<td> 
						<input type="time" ref="start_time" name="start_time" value={ this.props.start_time } />
					</td>
					<td>
						<input type="time" ref="end_time" name="end_time" value={ this.props.end_time } />
					</td>
					<td>
						<input ref="notes" name="notes" value={ this.props.notes } />
					</td>
					<td>
						<form ref="form" className="run-form" accept-charset="UTF-8" method="post" onSubmit={this.handleSubmit}>
						<input type="hidden" name="id" value={this.props.id} />
						<input type="hidden" name={this.props.form.csrf_param} value={this.props.form.csrf_token} />
						<input type="submit" className="submit_button"/>
						</form>
					</td>
				</tr>
			);
		} else {
			return (
				<tr key={this.props.id} onClick={this.handleEdit}>
					<td ref="date"> { this.props.date } </td>
					<td ref="name"> { this.props.name } </td>
					<td ref="distance"> { this.props.distance } </td>
					<td ref="start_time"> { this.props.start_time } </td>
					<td ref="end_time"> { this.props.end_time } </td>
					<td ref="notes"> { this.props.notes } </td>
				</tr>
			);
		}
	}
});