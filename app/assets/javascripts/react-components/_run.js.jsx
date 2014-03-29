/**@jsx React.DOM */

var Run = React.createClass({
	render: function() {
		return (
			<tr>
				<td> { this.props.date } </td>
				<td> { this.props.name } </td>
				<td> { this.props.distance } </td>
				<td> { this.props.start_time } </td>
				<td> { this.props.end_time } </td>
				<td> { this.props.notes } </td>
			</tr>
		)
	}
});