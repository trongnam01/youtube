import moment from 'moment';

const ranges = [
    {
        divider: 1e3,
        suffix: 'N',
    },
    {
        divider: 1e6,
        suffix: 'Tr',
    },
    {
        divider: 1e9,
        suffix: 'T',
    },
];

export function formatViewCount(input) {
    if (!input) {
        return '';
    }

    for (let index = ranges.length - 1; index >= 0; index--) {
        if (input > ranges[index].divider) {
            let quotient = input / ranges[index].divider;

            if (quotient < 10) {
                quotient = Math.floor(quotient * 10) / 10;
            } else {
                quotient = Math.floor(quotient);
            }

            return quotient.toString() + ranges[index].suffix;
        }
    }

    return input.toString();
}

export const handleGetTimeDate = (specificDate) => {
    if (!specificDate) {
        return '';
    }

    let getTime;
    const currentDate = moment();
    getTime = currentDate.diff(specificDate, 'days');
    const hours = currentDate.diff(specificDate, 'hours');

    const yearDiff = currentDate.diff(specificDate, 'years');
    const monthDiff = currentDate.diff(specificDate, 'months');

    // năm trước
    if (yearDiff > 0) {
        return `${yearDiff} năm trước`;
    }
    //tháng trước
    if (monthDiff > 0) {
        return `${monthDiff} tháng trước`;
    }

    if (getTime === 0 && hours < 24) {
        getTime = currentDate.diff(specificDate, 'hours');

        if (getTime === 0) {
            getTime = currentDate.diff(specificDate, 'minutes');

            return `${getTime} phút`;
        }
        return `${getTime} giờ trước`;
    }

    return `${getTime} ngày trước`; // ngày trước
};

export const handleGetTimeVideo = (apiDuration) => {
    const duration = moment.duration(apiDuration);
    const formattedTime = moment.utc(duration.asMilliseconds()).format('HH:mm:ss');
    return formattedTime;
};
