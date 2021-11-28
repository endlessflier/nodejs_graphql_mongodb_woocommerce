import moment from "moment-business-days"

const columbusDay = '10-11-2021';
const veteransDay = '11-11-2021';
const thanksgivingDay = '11-25-2021';
const christmasEve = '12-24-2021';
const christmasDay = '12-25-2021';
const newYearsEve = '12-31-20201'

const US_HOLIDAYS = [columbusDay, veteransDay, thanksgivingDay, christmasEve, christmasDay, newYearsEve]

export const calculateNextBusinessDay = () => {
  moment.updateLocale('us', {
    holidays: US_HOLIDAYS,
    holidayFormat: 'MM-DD-YYYY'
 });

 
  const result = moment().nextBusinessDay()._d // Mon Feb 02 2015 00:00:00 GMT-0600 (CST)
  const formattedDate = moment(result).format('YYYY-MM-DD')
  return formattedDate
}