/**@jsx React.DOM */

var Run = React.createClass({
	getInitialState: function() {
		return {edit: false};
	},

	handleEdit: function(event){ 
		this.setState({edit: true})
		return false;
	},

	render: function() {
		if (this.state.edit) {		
			return (
				<tr key={this.props.id} onClick={this.handleEdit}>
					<td ref="date"> <input type="date" ref="date" name="date" value={ this.props.date } /> </td>
					<td ref="name"> <input ref="name" name="name" value={ this.props.name } /> </td>
					<td ref="distance"> <input type="number" ref="distance" name="distance" step="any" value={ this.props.distance } /> </td>
					<td ref="start_time"> <input type="time" ref="start_time" name="start_time" value={ this.props.start_time } /> </td>
					<td ref="end_time"> <input type="time" ref="end_time" name="end_time" value={ this.props.end_time } /> </td>
					<td ref="notes"> <input ref="notes" name="notes" value={ this.props.notes } /> </td>
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