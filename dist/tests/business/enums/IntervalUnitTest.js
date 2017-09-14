"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const IntervalUnit = require("../../../src/business/enums/IntervalUnit");
const jasmine_core_1 = require("jasmine-core");
describe('Duration Test', function () {
    describe('requires duration', function () {
        let test = jasmine_core_1.expect(IntervalUnit.Duration.requiresDuration(IntervalUnit.enums.second)).to.be.false;
        test = jasmine_core_1.expect(IntervalUnit.Duration.requiresDuration(IntervalUnit.enums.minute)).to.be.false;
        test = jasmine_core_1.expect(IntervalUnit.Duration.requiresDuration(IntervalUnit.enums.hour)).to.be.false;
        test = jasmine_core_1.expect(IntervalUnit.Duration.requiresDuration(IntervalUnit.enums.day)).to.be.true;
        test = jasmine_core_1.expect(IntervalUnit.Duration.requiresDuration(IntervalUnit.enums.week)).to.be.true;
        test = jasmine_core_1.expect(IntervalUnit.Duration.requiresDuration(IntervalUnit.enums.month)).to.be.true;
    });
    describe('valid duration', function () {
        let test = jasmine_core_1.expect(IntervalUnit.Duration.validDuration(IntervalUnit.enums.second)).to.be.true;
        test = jasmine_core_1.expect(IntervalUnit.Duration.validDuration(IntervalUnit.enums.minute)).to.be.true;
        test = jasmine_core_1.expect(IntervalUnit.Duration.validDuration(IntervalUnit.enums.hour)).to.be.true;
        test = jasmine_core_1.expect(IntervalUnit.Duration.validDuration(IntervalUnit.enums.day)).to.be.false;
        test = jasmine_core_1.expect(IntervalUnit.Duration.validDuration(IntervalUnit.enums.week)).to.be.false;
        test = jasmine_core_1.expect(IntervalUnit.Duration.validDuration(IntervalUnit.enums.month)).to.be.false;
    });
    describe('convert to milliseconds', function () {
        jasmine_core_1.expect(IntervalUnit.Duration.convert(1, 'seconds')).equal(1000);
        jasmine_core_1.expect(IntervalUnit.Duration.convert(1, 'minutes')).equal(60000);
        jasmine_core_1.expect(IntervalUnit.Duration.convert(1, 'hours')).equal(21600000);
        jasmine_core_1.expect(IntervalUnit.Duration.convert(1, 'days')).equal(518400000);
        jasmine_core_1.expect(IntervalUnit.Duration.convert(1, 'weeks')).equal(3628800000);
        jasmine_core_1.expect(IntervalUnit.Duration.convert(1, 'month')).equal(108864000000);
    });
});
//# sourceMappingURL=IntervalUnitTest.js.map