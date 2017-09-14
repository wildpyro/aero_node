"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var enums;
(function (enums) {
    enums["second"] = "seconds";
    enums["minute"] = "minutes";
    enums["hour"] = "hours";
    enums["day"] = "days";
    enums["week"] = "weeks";
    enums["month"] = "months";
})(enums = exports.enums || (exports.enums = {}));
exports.values = [enums.second, enums.minute, enums.hour, enums.day, enums.week, enums.month];
class Duration {
    /**
     * Duration unit is required for only some of the intervals
     * @param interval_unit
     */
    static requiresDuration(interval_unit) {
        if ([enums[enums.day], enums[enums.week], enums[enums.month]].indexOf(interval_unit)) {
            return true;
        }
        return false;
    }
    /**
     * Only support specific durations
     * @param duration_unit
     */
    static validDuration(duration_unit) {
        if ([enums[enums.second], enums[enums.minute], enums[enums.hour]].indexOf(duration_unit)) {
            return true;
        }
        return false;
    }
    /**
     * convert the duration to milliseconds for running on the raspberry pi
     * @param duration
     * @param duration_unit
     * @param interval_unit
     */
    static convert(duration, duration_unit) {
        let durationInSSS;
        switch (duration_unit) {
            case enums.second: {
                durationInSSS = duration * 1000;
                break;
            }
            case enums.minute: {
                durationInSSS = duration * 60000;
                break;
            }
            case enums.hour: {
                durationInSSS = duration * (60000 * 360);
                break;
            }
            case enums.day: {
                durationInSSS = duration * (60000 * 360 * 24);
                break;
            }
            case enums.week: {
                durationInSSS = duration * (60000 * 360 * 24 * 7);
                break;
            }
            case enums.month: {
                //hardcode to 30 days in a month?
                durationInSSS = duration * (60000 * 360 * 24 * 7 * 30);
                break;
            }
        }
        return durationInSSS;
    }
}
exports.Duration = Duration;
//# sourceMappingURL=IntervalUnit.js.map