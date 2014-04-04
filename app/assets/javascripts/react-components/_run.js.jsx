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
		this.props.onRunSubmit(formData, this.props.editAction);
		this.setState({edit: false})

	},

	handleMouseEnter: function(event) {
		this.refs.delete_button.getDOMNode().innerHTML = 'x';
	},

	handleMouseLeave: function(event) {
		this.refs.delete_button.getDOMNode().innerHTML = '';
	},

	handleDelete: function(event) {
		event.preventDefault();
		var formData = new FormData();
		formData.append('id', this.props.key);
		formData.append(this.props.form.csrf_param, this.props.form.csrf_token);
		this.props.onRunSubmit(formData, this.props.deleteAction);
	},


	render: function() {
		if (this.state.edit) {		
			return (
				<form ref="form" className="tr" key={this.props.key} accept-charset="UTF-8" method="post" onSubmit={this.handleSubmit}>
					<span className="cell">
						<input type="date" className="table-field" ref="date" name="date" defaultValue={ this.props.date } />
					</span>
					<span className="cell">
						<input ref="name" className="table-field" name="name" defaultValue={ this.props.name } />
					</span>
					<span className="cell"> 
						<input type="number" className="table-field" ref="distance" name="distance" step="any" defaultValue={ this.props.distance } />
					</span>
					<span className="cell"> 
						<input type="time" className="table-field" ref="start_time" name="start_time" defaultValue={ this.props.start_time } />
					</span>
					<span className="cell">
						<input type="time" className="table-field" ref="end_time" name="end_time" defaultValue={ this.props.end_time } />
					</span>
					<span className="cell">
						<input ref="notes" className="table-field" name="notes" defaultValue={ this.props.notes } />
					</span>
					<input type="hidden" className="hidden-field" name="id" value={this.props.key} />
					<input type="hidden" className="hidden-field" name={this.props.form.csrf_param} value={this.props.form.csrf_token} />
					<input type="submit" className="hidden-field"/>
				</form>
			);
		} else {
			return (
				<div>
					<div className="tr" key={this.props.key} onMouseEnter={this.handleMouseEnter} onMouseLeave={this.handleMouseLeave} >
						<span className="cell" onClick={this.handleEdit} ref="date"> { this.props.date } </span>
						<span className="cell" onClick={this.handleEdit} ref="name"> { this.props.name } </span>
						<span className="cell" onClick={this.handleEdit} ref="distance"> { this.props.distance } </span>
						<span className="cell" onClick={this.handleEdit} ref="start_time"> { this.props.start_time } </span>
						<span className="cell" onClick={this.handleEdit} ref="end_time"> { this.props.end_time } </span>
						<span className="cell" onClick={this.handleEdit} ref="notes"> { this.props.notes } </span>
						<div ref="delete_button" className="delete-button" onClick={this.handleDelete}></div>
					</div>
				</div>
			);
		}
	}
});