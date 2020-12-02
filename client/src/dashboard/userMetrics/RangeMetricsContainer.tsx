import * as React from "react";
import {useEffect, useState} from "react";
import {DatePicker, MuiPickersUtilsProvider} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import DatePickerIcon from "../../resources/icons/DatePickerIcon";
import {MetricCardData, StyledMetricCard} from "../metric/MetricsCard";
import {fetchUserMetric} from "../../store/metrics";
import styled from "styled-components";
import classNames from 'classnames';

interface MyProps {
    className?: string;
}

export const RangeMetricsContainer: React.FC<MyProps> = (props) => {
    const moment = require('moment');
    const magPieBeginning = new Date(moment('2019-10-01').unix() * 1000 + 60000 * new Date().getTimezoneOffset());

    const [startDate, setStartDate] = useState(magPieBeginning as Date | null);
    const [endDate, setEndDate] = useState(new Date() as Date | null);
    const [completedRfis, setCompletedRfis] = useState(-1);
    const [targetsCreated, setTargetsCreated] = useState(-1);
    const [hoursWorked, setHoursWorked] = useState(-1);
    const [uniqueCustomers, setUniqueCustomers] = useState(-1);
    const [displayStartPicker, setDisplayStartPicker] = useState(false);
    const [displayEndPicker, setDisplayEndPicker] = useState(false);

    useEffect(() => {
        console.log(startDate);
        console.log(endDate);
        fetchUserMetric('rfis-completed', startDate, endDate)
            .then(response => response.json())
            .then(rfis => setCompletedRfis(rfis))
            .catch((reason) => {
                console.log('Failed to fetch RFIS completed: ' + reason);
            });
    }, [startDate, endDate]);

    useEffect(() => {
        fetchUserMetric('targets-created', startDate, endDate)
            .then(response => response.json())
            .then(targets => setTargetsCreated(targets))
            .catch((reason) => {
                console.log('Failed to fetch targets created: ' + reason);
            });
    }, [startDate, endDate]);

    useEffect(() => {
        fetchUserMetric('hours-worked', startDate, endDate)
            .then(response => response.json())
            .then(hoursWorked => setHoursWorked(hoursWorked))
            .catch((reason) => {
                console.log('Failed to fetch hours worked: ' + reason);
            });
    }, [startDate, endDate]);

    useEffect(() => {
        fetchUserMetric('unique-customers', startDate, endDate)
            .then(response => response.json())
            .then(uniqueCustomers => setUniqueCustomers(uniqueCustomers))
            .catch((reason) => {
                console.log('Failed to fetch unique customers: ' + reason);
            });
    }, [startDate, endDate]);

    return (
        <div className={classNames('container', props.className)}>
            <div className={'datepickers'}>
                <MuiPickersUtilsProvider
                    utils={DateFnsUtils}>
                    <div className={'datepicker-date'}>
                        <DatePicker
                            value={startDate}
                            onChange={date => setStartDate(date)}
                            animateYearScrolling
                            minDate={magPieBeginning}
                            maxDate={endDate}
                            open={displayStartPicker}
                            onClose={() => setDisplayStartPicker(false)}
                            InputProps={{
                                disableUnderline: true,
                            }}
                            format={'MM/dd/yy'}
                        />
                    </div>
                    <div className={'datepicker-button'} onClick={() => setDisplayStartPicker(true)}>
                        <DatePickerIcon/>
                    </div>
                    <div className={'datepicker-spacer no-select'}>
                        —
                    </div>
                    <div className={'datepicker-date'}>
                        <DatePicker
                            value={endDate}
                            onChange={date => setEndDate(date)}
                            animateYearScrolling
                            minDate={startDate}
                            maxDate={new Date()}
                            open={displayEndPicker}
                            onClose={() => setDisplayEndPicker(false)}
                            InputProps={{
                                disableUnderline: true,
                            }}
                            format={'MM/dd/yy'}
                        />
                    </div>
                    <div className={'datepicker-button'} onClick={() => setDisplayEndPicker(true)}>
                        <DatePickerIcon/>
                    </div>
                </MuiPickersUtilsProvider>
            </div>
            <div className={'card-container'}>
                {completedRfis >= 0 ?
                    <StyledMetricCard
                        data={new MetricCardData('RFIs Completed', completedRfis)}
                        className={'rfis-completed'}
                    />
                    :
                    null
                }
                {targetsCreated >= 0 ?
                    <StyledMetricCard
                        data={new MetricCardData('Targets Created', targetsCreated)}
                        className={'targets-created'}
                    />
                    :
                    null
                }
                {hoursWorked >= 0 ?
                    <StyledMetricCard
                        data={new MetricCardData('Hours Worked', hoursWorked)}
                        className={'hours-worked'}
                    />
                    :
                    null
                }
                {uniqueCustomers >= 0 ?
                    <StyledMetricCard
                        data={new MetricCardData('Requesting Customers', uniqueCustomers)}
                        className={'requesting-customers'}
                    />
                    :
                    null
                }
            </div>
        </div>
    )
};

export const StyledRangeMetricsContainer = styled(RangeMetricsContainer)``;
