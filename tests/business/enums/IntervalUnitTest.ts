import * as IntervalUnit from '../../../src/business/enums/IntervalUnit';
import { expect } from 'chai';

describe('Duration Test', function () {

    describe('requires duration', function () {
        let test = expect(IntervalUnit.Duration.requiresDuration(IntervalUnit.enums.second)).to.be.false;
        test = expect(IntervalUnit.Duration.requiresDuration(IntervalUnit.enums.minute)).to.be.false;
        test = expect(IntervalUnit.Duration.requiresDuration(IntervalUnit.enums.hour)).to.be.false;
        test = expect(IntervalUnit.Duration.requiresDuration(IntervalUnit.enums.day)).to.be.true;
        test = expect(IntervalUnit.Duration.requiresDuration(IntervalUnit.enums.week)).to.be.true;
        test = expect(IntervalUnit.Duration.requiresDuration(IntervalUnit.enums.month)).to.be.true;
    });

    describe('valid duration', function () {
        let test = expect(IntervalUnit.Duration.validDuration(IntervalUnit.enums.second)).to.be.true;
        test = expect(IntervalUnit.Duration.validDuration(IntervalUnit.enums.minute)).to.be.true;
        test = expect(IntervalUnit.Duration.validDuration(IntervalUnit.enums.hour)).to.be.true;
        test = expect(IntervalUnit.Duration.validDuration(IntervalUnit.enums.day)).to.be.false;
        test = expect(IntervalUnit.Duration.validDuration(IntervalUnit.enums.week)).to.be.false;
        test = expect(IntervalUnit.Duration.validDuration(IntervalUnit.enums.month)).to.be.false;
    });

    describe('convert to milliseconds', function () {
        expect(IntervalUnit.Duration.convert(1, 'seconds')).equal(1000);
        expect(IntervalUnit.Duration.convert(1, 'minutes')).equal(60000);
        expect(IntervalUnit.Duration.convert(1, 'hours')).equal(21600000);
        expect(IntervalUnit.Duration.convert(1, 'days')).equal(518400000);
        expect(IntervalUnit.Duration.convert(1, 'weeks')).equal(3628800000);
        expect(IntervalUnit.Duration.convert(1, 'month')).equal(108864000000);
    });
});
