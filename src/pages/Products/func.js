import moment from 'moment';
export const date2str = (datestr) => {
    return moment(datestr).format('YYYY-MM-DD HH:mm');
}