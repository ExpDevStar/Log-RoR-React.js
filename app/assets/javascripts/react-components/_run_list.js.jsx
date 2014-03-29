/** @jsx React.DOM */

var RunList = React.createClass({
	render: function() {
		if (this.props.runs) {	
			var runRows = this.props.runs.map(function(run) {
				return <Run date={run.date} name={run.name} distance={run.distance} start_time={run.start_time} end_time={run.end_time} notes={run.notes} />
			});

			return ( runRows );
		} else {
			return <tr><td colspan="6">No runs have been logged</td></tr>
		}
	}
});