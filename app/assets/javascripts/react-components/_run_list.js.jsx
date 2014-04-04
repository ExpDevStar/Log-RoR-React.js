/** @jsx React.DOM */

var RunList = React.createClass({
	render: function() {
		var obj = this;
		if (this.props.runs.length > 0) {
			
			/*Groups together all the runs*/
			var runRows = this.props.runs.map(function(run) {
				return new Run({key: run.id, date: run.date, name: run.name, distance: run.distance, start_time: run.start_time,
				 end_time: run.end_time, notes: run.notes, form: obj.props.form, onRunSubmit: obj.props.onRunSubmit, editAction: obj.props.editAction,
				deleteAction: obj.props.deleteAction});
			});
			var notice = <p className="notice">Double click to edit a run</p>
			return React.DOM.div({className: "stored-runs"}, runRows, notice);
		} else {
			return <div className="tr no-runs"><h4>No runs found. Go run some more!</h4></div>;
		}
	}
});