/** @jsx React.DOM */

var RunList = React.createClass({
	render: function() {
		var obj = this;
		if (this.props.runs.length > 0) {	
			var runRows = this.props.runs.map(function(run) {
				return new Run({key: run.id, date: run.date, name: run.name, distance: run.distance, start_time: run.start_time,
				 end_time: run.end_time, notes: run.notes, form: obj.props.form, onRunSubmit: obj.props.onRunSubmit, action: obj.props.action});
			});
			return React.DOM.div({className: "stored-runs"}, runRows);
		} else {
			return <div className="tr"><div className="td"><h4>No runs found. Go run some more!</h4></div></div>;
		}
	}
});