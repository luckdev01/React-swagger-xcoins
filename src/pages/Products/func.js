import moment from 'moment';
export const date2str = (datestr) => {
    return moment(datestr).format('YYYY-MM-DD HH:mm');
}
export const diffhours = (startdate, enddate) => {
    var duration = new Date(enddate).getTime() - new Date(startdate).getTime();//moment.duration(enddate.diff(startdate));
    return duration/1000/60/60;
}