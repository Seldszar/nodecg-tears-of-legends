'use strict';

var Rieussec = require('rieussec');
var moment = require('moment');

require('moment-duration-format');

module.exports = function (nodecg) {
    var defaultStopwatch = { time: '00:00:00', state: 'stopped', milliseconds: 0 };
    var stopwatch = nodecg.Replicant('stopwatch', { defaultValue: defaultStopwatch });

    var rieussec = new Rieussec();

    rieussec.setMilliseconds(0);

    rieussec.on('tick', function (ms) {
        stopwatch.value.time = moment.duration(ms).format('hh:mm:ss', { trim: false });
        stopwatch.value.milliseconds = ms;
    });

    rieussec.on('state', function (state) {
        stopwatch.value.state = state;
    });

    nodecg.listenFor('stopwatch', function (command) {
        switch (command) {
            case 'start':
                if (stopwatch.value.state == 'finished') {
                    rieussec.reset();
                }

                rieussec.start();
                break;
            case 'pause':
                rieussec.pause();
                break;
            case 'finish':
                rieussec.pause();
                stopwatch.value.state = 'finished';
                break;
            case 'reset':
                rieussec.reset();
                break;
        }
    });
};
