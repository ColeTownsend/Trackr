var React = require('react'),
    Panel = require('./panel.js');

var ChartsDisplay = React.createClass({

    getInitialState: function() {
        return {disabled_events: []};
    },

    render: function() {
        var sorted_events = this.sorted_events();

        var active_charts = sorted_events.active.map(function(event) {
            return (
                <Panel key={event.name}
                    active={true}
                    event={event}
                    athletes={this.props.athletes}
                    disable_event={this.disable_event}
                    line_type={this.props.line_type} />
            );
        }.bind(this));

        var disabled_charts = sorted_events.disabled.map(function(event) {
            return (
                <Panel key={event.name}
                    active={false}
                    event={event}
                    activate_event={this.activate_event}/>
            );
        }.bind(this));

        return (
            <div id="charts-display">
                <div id="disabled-events">
                    {disabled_charts}
                </div>
                <div id="active-events">
                    {active_charts}
                </div>
            </div>
        );
    },

    sorted_events: function() {
        var sorted_events = {active: [], disabled: []};
        this.props.events.forEach(function(event) {
            if (this.state.disabled_events.indexOf(event.name) >= 0) {
                sorted_events.disabled.push(event);
            } else {
                sorted_events.active.push(event);
            }
        }.bind(this));

        return sorted_events;
    },

    disable_event: function(event_name) {
        var names = this.state.disabled_events.slice();
        names.push(event_name)
        this.setState({disabled_events: names});
    },

    activate_event: function(event_name) {
        var names = this.state.disabled_events.slice();
        var i = names.indexOf(event_name);
        names.splice(i, 1)
        this.setState({disabled_events: names});
    }

    // Get the names of all the events for which we have races
    // event_names: function() {
    //     var events = [];
    //     // TODO: more efficient search?
    //     this.props.athletes.forEach(function(a) {
    //         a.races.forEach(function(r) {
    //             if (events.indexOf(r.event) === -1) {
    //                 events.push(r.event);
    //             }
    //         });
    //     });
    //
    //     return events;
    // },


});

module.exports = ChartsDisplay;
