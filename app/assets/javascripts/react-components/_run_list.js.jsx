/** @jsx React.DOM */

var RunList = React.createClass({


	render: function() {
		var obj = this;
		if (this.props.runs != null) {	
			var runRows = this.props.runs.map(function(run) {
				if (obj.props.edit == run.id) {
					//returns a form version of the run row
					return <Run key={run.id} date={run.date} name={run.name} distance={run.distance} start_time={run.start_time} end_time={run.end_time} notes={run.notes} static="false" />
				} else {
					//returns a static version of the run row
					return <Run key={run.id} date={run.date} name={run.name} distance={run.distance} start_time={run.start_time} end_time={run.end_time} notes={run.notes} static="true" />
				}
			});
			return React.DOM.tbody({className: "stored_runs"}, runRows);
		} else {
			return <tr><td colSpan="6">No runs have been logged</td></tr>;
		}
	}
});