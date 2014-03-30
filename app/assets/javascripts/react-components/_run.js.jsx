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
		console.log("editting run!");
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
		this.setState({edit: false})

	},


	render: function() {
		if (this.state.edit) {		
			return (
				<form ref="form" className="row" key={this.props.key} accept-charset="UTF-8" method="post" onSubmit={this.handleSubmit}>
					<span className="cell">
						<input type="date" ref="date" name="date" defaultValue={ this.props.date } />
					</span>
					<span className="cell">
						<input ref="name" name="name" defaultValue={ this.props.name } />
					</span>
					<span className="cell"> 
						<input type="number" ref="distance" name="distance" step="any" defaultValue={ this.props.distance } />
					</span>
					<span className="cell"> 
						<input type="time" ref="start_time" name="start_time" defaultValue={ this.props.start_time } />
					</span>
					<span className="cell">
						<input type="time" ref="end_time" name="end_time" defaultValue={ this.props.end_time } />
					</span>
					<span className="cell">
						<input ref="notes" name="notes" defaultValue={ this.props.notes } />
					</span>
					<span className="cell">
						<input type="hidden" name="id" value={this.props.key} />
						<input type="hidden" name={this.props.form.csrf_param} value={this.props.form.csrf_token} />
						<input type="submit" className="submit_button"/>
					</span>
				</form>
			);
		} else {
			return (
				<div className="row" key={this.props.key} onClick={this.handleEdit}>
					<span className="cell" ref="date"> { this.props.date } </span>
					<span className="cell" ref="name"> { this.props.name } </span>
					<span className="cell" ref="distance"> { this.props.distance } </span>
					<span className="cell" ref="start_time"> { this.props.start_time } </span>
					<span className="cell" ref="end_time"> { this.props.end_time } </span>
					<span className="cell" ref="notes"> { this.props.notes } </span>
				</div>
			);
		}
	}
});