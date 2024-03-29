//Function for find in force fu decision date

import { DAY } from './variables.js';

export function findInForceFuDay(date) {

  let j = 0;
  let k = 0;
  let misteryDays = 0;

  while (j != 10) {
    misteryDays++;
    if (date + DAY * misteryDays != Date.parse(new Date(2016, 1, 20, 0)) &&
        date + DAY * misteryDays != Date.parse(new Date(2018, 3, 28, 0)) &&
        date + DAY * misteryDays != Date.parse(new Date(2018, 5, 9, 0)) &&
        date + DAY * misteryDays != Date.parse(new Date(2018, 11, 29, 0)) &&
        date + DAY * misteryDays != Date.parse(new Date(2021, 1, 20, 0)) &&
        date + DAY * misteryDays != Date.parse(new Date(2022, 2, 5, 0))
        ) {
       if (new Date(date + DAY * misteryDays ).getDay() != 6 &&
           new Date(date + DAY * misteryDays ).getDay() != 0 &&
             date + DAY * misteryDays != Date.parse(new Date(2015, 0, 1, 0)) &&
             date + DAY * misteryDays != Date.parse(new Date(2015, 0, 2, 0)) &&
             date + DAY * misteryDays != Date.parse(new Date(2015, 0, 3, 0)) &&
             date + DAY * misteryDays != Date.parse(new Date(2015, 0, 4, 0)) &&
             date + DAY * misteryDays != Date.parse(new Date(2015, 0, 5, 0)) &&
             date + DAY * misteryDays != Date.parse(new Date(2015, 0, 6, 0)) &&
             date + DAY * misteryDays != Date.parse(new Date(2015, 0, 7, 0)) &&
             date + DAY * misteryDays != Date.parse(new Date(2015, 0, 8, 0)) &&
             date + DAY * misteryDays != Date.parse(new Date(2015, 0, 9, 0)) &&
             date + DAY * misteryDays != Date.parse(new Date(2015, 1, 23, 0)) &&
             date + DAY * misteryDays != Date.parse(new Date(2015, 2, 9, 0)) &&
             date + DAY * misteryDays != Date.parse(new Date(2015, 4, 1, 0)) &&
             date + DAY * misteryDays != Date.parse(new Date(2015, 4, 4, 0)) &&
             date + DAY * misteryDays != Date.parse(new Date(2015, 4, 11, 0)) &&
             date + DAY * misteryDays != Date.parse(new Date(2015, 5, 12, 0)) &&
             date + DAY * misteryDays != Date.parse(new Date(2015, 10, 4, 0)) &&
             date + DAY * misteryDays != Date.parse(new Date(2016, 0, 1, 0)) &&
             date + DAY * misteryDays != Date.parse(new Date(2016, 0, 2, 0)) &&
             date + DAY * misteryDays != Date.parse(new Date(2016, 0, 3, 0)) &&
             date + DAY * misteryDays != Date.parse(new Date(2016, 0, 4, 0)) &&
             date + DAY * misteryDays != Date.parse(new Date(2016, 0, 5, 0)) &&
             date + DAY * misteryDays != Date.parse(new Date(2016, 0, 6, 0)) &&
             date + DAY * misteryDays != Date.parse(new Date(2016, 0, 7, 0)) &&
             date + DAY * misteryDays != Date.parse(new Date(2016, 0, 8, 0)) &&
             date + DAY * misteryDays != Date.parse(new Date(2016, 1, 22, 0)) &&
             date + DAY * misteryDays != Date.parse(new Date(2016, 1, 23, 0)) &&
             date + DAY * misteryDays != Date.parse(new Date(2016, 2, 7, 0)) &&
             date + DAY * misteryDays != Date.parse(new Date(2016, 2, 8, 0)) &&
             date + DAY * misteryDays != Date.parse(new Date(2016, 4, 2, 0)) &&
             date + DAY * misteryDays != Date.parse(new Date(2016, 4, 3, 0)) &&
             date + DAY * misteryDays != Date.parse(new Date(2016, 4, 9, 0)) &&
             date + DAY * misteryDays != Date.parse(new Date(2016, 5, 13, 0)) &&
             date + DAY * misteryDays != Date.parse(new Date(2016, 10, 4, 0)) &&
             date + DAY * misteryDays != Date.parse(new Date(2017, 0, 1, 0)) &&
             date + DAY * misteryDays != Date.parse(new Date(2017, 0, 2, 0)) &&
             date + DAY * misteryDays != Date.parse(new Date(2017, 0, 3, 0)) &&
             date + DAY * misteryDays != Date.parse(new Date(2017, 0, 4, 0)) &&
             date + DAY * misteryDays != Date.parse(new Date(2017, 0, 5, 0)) &&
             date + DAY * misteryDays != Date.parse(new Date(2017, 0, 6, 0)) &&
             date + DAY * misteryDays != Date.parse(new Date(2017, 0, 7, 0)) &&
             date + DAY * misteryDays != Date.parse(new Date(2017, 0, 8, 0)) &&
             date + DAY * misteryDays != Date.parse(new Date(2017, 1, 23, 0)) &&
             date + DAY * misteryDays != Date.parse(new Date(2017, 1, 24, 0)) &&
             date + DAY * misteryDays != Date.parse(new Date(2017, 2, 8, 0)) &&
             date + DAY * misteryDays != Date.parse(new Date(2017, 4, 1, 0)) &&
             date + DAY * misteryDays != Date.parse(new Date(2017, 4, 8, 0)) &&
             date + DAY * misteryDays != Date.parse(new Date(2017, 4, 9, 0)) &&
             date + DAY * misteryDays != Date.parse(new Date(2017, 5, 12, 0)) &&
             date + DAY * misteryDays != Date.parse(new Date(2017, 10, 6, 0)) &&
             date + DAY * misteryDays != Date.parse(new Date(2018, 0, 1, 0)) &&
             date + DAY * misteryDays != Date.parse(new Date(2018, 0, 2, 0)) &&
             date + DAY * misteryDays != Date.parse(new Date(2018, 0, 3, 0)) &&
             date + DAY * misteryDays != Date.parse(new Date(2018, 0, 4, 0)) &&
             date + DAY * misteryDays != Date.parse(new Date(2018, 0, 5, 0)) &&
             date + DAY * misteryDays != Date.parse(new Date(2018, 0, 6, 0)) &&
             date + DAY * misteryDays != Date.parse(new Date(2018, 0, 7, 0)) &&
             date + DAY * misteryDays != Date.parse(new Date(2018, 0, 8, 0)) &&
             date + DAY * misteryDays != Date.parse(new Date(2018, 1, 23, 0)) &&
             date + DAY * misteryDays != Date.parse(new Date(2018, 2, 8, 0)) &&
             date + DAY * misteryDays != Date.parse(new Date(2018, 2, 9, 0)) &&
             date + DAY * misteryDays != Date.parse(new Date(2018, 3, 30, 0)) &&
             date + DAY * misteryDays != Date.parse(new Date(2018, 4, 1, 0)) &&
             date + DAY * misteryDays != Date.parse(new Date(2018, 4, 2, 0)) &&
             date + DAY * misteryDays != Date.parse(new Date(2018, 4, 9, 0)) &&
             date + DAY * misteryDays != Date.parse(new Date(2018, 5, 11, 0)) &&
             date + DAY * misteryDays != Date.parse(new Date(2018, 5, 12, 0)) &&
             date + DAY * misteryDays != Date.parse(new Date(2018, 10, 5, 0)) &&
             date + DAY * misteryDays != Date.parse(new Date(2018, 11, 31, 0)) &&
             date + DAY * misteryDays != Date.parse(new Date(2019, 0, 1, 0)) &&
             date + DAY * misteryDays != Date.parse(new Date(2019, 0, 2, 0)) &&
             date + DAY * misteryDays != Date.parse(new Date(2019, 0, 3, 0)) &&
             date + DAY * misteryDays != Date.parse(new Date(2019, 0, 4, 0)) &&
             date + DAY * misteryDays != Date.parse(new Date(2019, 0, 5, 0)) &&
             date + DAY * misteryDays != Date.parse(new Date(2019, 0, 6, 0)) &&
             date + DAY * misteryDays != Date.parse(new Date(2019, 0, 7, 0)) &&
             date + DAY * misteryDays != Date.parse(new Date(2019, 0, 8, 0)) &&
             date + DAY * misteryDays != Date.parse(new Date(2019, 2, 8, 0)) &&
             date + DAY * misteryDays != Date.parse(new Date(2019, 4, 1, 0)) &&
             date + DAY * misteryDays != Date.parse(new Date(2019, 4, 2, 0)) &&
             date + DAY * misteryDays != Date.parse(new Date(2019, 4, 3, 0)) &&
             date + DAY * misteryDays != Date.parse(new Date(2019, 4, 9, 0)) &&
             date + DAY * misteryDays != Date.parse(new Date(2019, 4, 10, 0)) &&
             date + DAY * misteryDays != Date.parse(new Date(2019, 5, 12, 0)) &&
             date + DAY * misteryDays != Date.parse(new Date(2019, 10, 4, 0)) &&
             date + DAY * misteryDays != Date.parse(new Date(2020, 0, 1, 0)) &&
             date + DAY * misteryDays != Date.parse(new Date(2020, 0, 2, 0)) &&
             date + DAY * misteryDays != Date.parse(new Date(2020, 0, 3, 0)) &&
             date + DAY * misteryDays != Date.parse(new Date(2020, 0, 4, 0)) &&
             date + DAY * misteryDays != Date.parse(new Date(2020, 0, 5, 0)) &&
             date + DAY * misteryDays != Date.parse(new Date(2020, 0, 6, 0)) &&
             date + DAY * misteryDays != Date.parse(new Date(2020, 0, 7, 0)) &&
             date + DAY * misteryDays != Date.parse(new Date(2020, 0, 8, 0)) &&
             date + DAY * misteryDays != Date.parse(new Date(2020, 1, 24, 0)) &&
             date + DAY * misteryDays != Date.parse(new Date(2020, 2, 9, 0)) &&
             date + DAY * misteryDays != Date.parse(new Date(2020, 2, 30, 0)) &&
             date + DAY * misteryDays != Date.parse(new Date(2020, 2, 31, 0)) &&
             date + DAY * misteryDays != Date.parse(new Date(2020, 3, 1, 0)) &&
             date + DAY * misteryDays != Date.parse(new Date(2020, 3, 2, 0)) &&
             date + DAY * misteryDays != Date.parse(new Date(2020, 3, 3, 0)) &&
             date + DAY * misteryDays != Date.parse(new Date(2020, 3, 4, 0)) &&
             date + DAY * misteryDays != Date.parse(new Date(2020, 3, 5, 0)) &&
             date + DAY * misteryDays != Date.parse(new Date(2020, 3, 6, 0)) &&
             date + DAY * misteryDays != Date.parse(new Date(2020, 3, 7, 0)) &&
             date + DAY * misteryDays != Date.parse(new Date(2020, 3, 8, 0)) &&
             date + DAY * misteryDays != Date.parse(new Date(2020, 3, 9, 0)) &&
             date + DAY * misteryDays != Date.parse(new Date(2020, 3, 10, 0)) &&
             date + DAY * misteryDays != Date.parse(new Date(2020, 3, 11, 0)) &&
             date + DAY * misteryDays != Date.parse(new Date(2020, 3, 12, 0)) &&
             date + DAY * misteryDays != Date.parse(new Date(2020, 3, 13, 0)) &&
             date + DAY * misteryDays != Date.parse(new Date(2020, 3, 14, 0)) &&
             date + DAY * misteryDays != Date.parse(new Date(2020, 3, 15, 0)) &&
             date + DAY * misteryDays != Date.parse(new Date(2020, 3, 16, 0)) &&
             date + DAY * misteryDays != Date.parse(new Date(2020, 3, 17, 0)) &&
             date + DAY * misteryDays != Date.parse(new Date(2020, 3, 18, 0)) &&
             date + DAY * misteryDays != Date.parse(new Date(2020, 3, 19, 0)) &&
             date + DAY * misteryDays != Date.parse(new Date(2020, 3, 20, 0)) &&
             date + DAY * misteryDays != Date.parse(new Date(2020, 3, 21, 0)) &&
             date + DAY * misteryDays != Date.parse(new Date(2020, 3, 22, 0)) &&
             date + DAY * misteryDays != Date.parse(new Date(2020, 3, 23, 0)) &&
             date + DAY * misteryDays != Date.parse(new Date(2020, 3, 24, 0)) &&
             date + DAY * misteryDays != Date.parse(new Date(2020, 3, 25, 0)) &&
             date + DAY * misteryDays != Date.parse(new Date(2020, 3, 26, 0)) &&
             date + DAY * misteryDays != Date.parse(new Date(2020, 3, 27, 0)) &&
             date + DAY * misteryDays != Date.parse(new Date(2020, 3, 28, 0)) &&
             date + DAY * misteryDays != Date.parse(new Date(2020, 3, 29, 0)) &&
             date + DAY * misteryDays != Date.parse(new Date(2020, 3, 30, 0)) &&
             date + DAY * misteryDays != Date.parse(new Date(2020, 4, 1, 0)) &&
             date + DAY * misteryDays != Date.parse(new Date(2020, 4, 4, 0)) &&
             date + DAY * misteryDays != Date.parse(new Date(2020, 4, 5, 0)) &&
             date + DAY * misteryDays != Date.parse(new Date(2020, 4, 6, 0)) &&
             date + DAY * misteryDays != Date.parse(new Date(2020, 4, 7, 0)) &&
             date + DAY * misteryDays != Date.parse(new Date(2020, 4, 8, 0)) &&
             date + DAY * misteryDays != Date.parse(new Date(2020, 4, 11, 0)) &&
             date + DAY * misteryDays != Date.parse(new Date(2020, 5, 12, 0)) &&
             date + DAY * misteryDays != Date.parse(new Date(2020, 5, 24, 0)) &&
             date + DAY * misteryDays != Date.parse(new Date(2020, 6, 1, 0)) &&
             date + DAY * misteryDays != Date.parse(new Date(2020, 10, 4, 0)) &&
             date + DAY * misteryDays != Date.parse(new Date(2021, 0, 1, 0)) &&
             date + DAY * misteryDays != Date.parse(new Date(2021, 0, 2, 0)) &&
             date + DAY * misteryDays != Date.parse(new Date(2021, 0, 3, 0)) &&
             date + DAY * misteryDays != Date.parse(new Date(2021, 0, 4, 0)) &&
             date + DAY * misteryDays != Date.parse(new Date(2021, 0, 5, 0)) &&
             date + DAY * misteryDays != Date.parse(new Date(2021, 0, 6, 0)) &&
             date + DAY * misteryDays != Date.parse(new Date(2021, 0, 7, 0)) &&
             date + DAY * misteryDays != Date.parse(new Date(2021, 0, 8, 0)) &&
             date + DAY * misteryDays != Date.parse(new Date(2021, 0, 9, 0)) &&
             date + DAY * misteryDays != Date.parse(new Date(2021, 0, 10, 0)) &&
             date + DAY * misteryDays != Date.parse(new Date(2021, 1, 22, 0)) &&
             date + DAY * misteryDays != Date.parse(new Date(2021, 1, 23, 0)) &&
             date + DAY * misteryDays != Date.parse(new Date(2021, 2, 8, 0)) &&
             date + DAY * misteryDays != Date.parse(new Date(2021, 4, 3, 0)) &&
             date + DAY * misteryDays != Date.parse(new Date(2021, 4, 4, 0)) &&
             date + DAY * misteryDays != Date.parse(new Date(2021, 4, 5, 0)) &&
             date + DAY * misteryDays != Date.parse(new Date(2021, 4, 6, 0)) &&
             date + DAY * misteryDays != Date.parse(new Date(2021, 4, 7, 0)) &&
             date + DAY * misteryDays != Date.parse(new Date(2021, 4, 10, 0)) &&
             date + DAY * misteryDays != Date.parse(new Date(2021, 5, 14, 0)) &&
             date + DAY * misteryDays != Date.parse(new Date(2021, 10, 1, 0)) &&
             date + DAY * misteryDays != Date.parse(new Date(2021, 10, 2, 0)) &&
             date + DAY * misteryDays != Date.parse(new Date(2021, 10, 3, 0)) &&
             date + DAY * misteryDays != Date.parse(new Date(2021, 10, 4, 0)) &&
             date + DAY * misteryDays != Date.parse(new Date(2021, 10, 5, 0)) &&
             date + DAY * misteryDays != Date.parse(new Date(2021, 11, 31, 0)) &&
             date + DAY * misteryDays != Date.parse(new Date(2022, 0, 1, 0)) &&
             date + DAY * misteryDays != Date.parse(new Date(2022, 0, 2, 0)) &&
             date + DAY * misteryDays != Date.parse(new Date(2022, 0, 3, 0)) &&
             date + DAY * misteryDays != Date.parse(new Date(2022, 0, 4, 0)) &&
             date + DAY * misteryDays != Date.parse(new Date(2022, 0, 5, 0)) &&
             date + DAY * misteryDays != Date.parse(new Date(2022, 0, 6, 0)) &&
             date + DAY * misteryDays != Date.parse(new Date(2022, 0, 7, 0)) &&
             date + DAY * misteryDays != Date.parse(new Date(2022, 0, 8, 0)) &&
             date + DAY * misteryDays != Date.parse(new Date(2022, 1, 23, 0)) &&
             date + DAY * misteryDays != Date.parse(new Date(2022, 2, 7, 0)) &&
             date + DAY * misteryDays != Date.parse(new Date(2022, 2, 8, 0)) &&
             date + DAY * misteryDays != Date.parse(new Date(2022, 4, 2, 0)) &&
             date + DAY * misteryDays != Date.parse(new Date(2022, 4, 3, 0)) &&
             date + DAY * misteryDays != Date.parse(new Date(2022, 4, 9, 0)) &&
             date + DAY * misteryDays != Date.parse(new Date(2022, 4, 10, 0)) &&
             date + DAY * misteryDays != Date.parse(new Date(2022, 5, 13, 0)) &&
             date + DAY * misteryDays != Date.parse(new Date(2022, 10, 4, 0))
        ) {
          j++;
        }
    } else {
      j++;
    }
  }
  date = date + DAY * (misteryDays + 1);
  return date;
}

export function findLastDayForPayFu(date) {
  return findInForceFuDay(date) - DAY;
}
