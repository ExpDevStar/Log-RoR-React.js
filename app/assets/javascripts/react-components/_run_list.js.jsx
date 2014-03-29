/** @jsx React.DOM */

var RunList = React.createClass({
	render: function() {
		if (this.props.runs != null) {	
			var runRows = this.props.runs.map(function(run) {
				return <Run date={run.date} name={run.name} distance={run.distance} start_time={run.start_time} end_time={run.end_time} notes={run.notes} />
			});

			return (
				<div className="runRow">
				{ runRows }
				</div>
				);
		} else {
			return <tr><td colSpan="6">No runs have been logged</td></tr>
		}
	}
});