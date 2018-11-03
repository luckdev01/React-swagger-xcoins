import moment from 'moment';
export const date2str = (datestr) => {
    return moment(datestr).format('YYYY-MM-DD HH:mm');
}
export const diffhours = (startdate, enddate) => {
    //var duration = new Date(enddate).getTime() - new Date(startdate).getTime();
    let s = moment(startdate); //moment.duration(enddate.diff(startdate));
    let e = moment(enddate);

    return moment.duration(e.diff(s)).asHours();
}