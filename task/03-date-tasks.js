'use strict';

/********************************************************************************************
 *                                                                                          *
 * Plese read the following tutorial before implementing tasks:                             *
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Numbers_and_dates#Date_object
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date    *
 *                                                                                          *
 ********************************************************************************************/


/**
 * Parses a rfc2822 string date representation into date value
 * For rfc2822 date specification refer to : http://tools.ietf.org/html/rfc2822#page-14
 *
 * @param {string} value
 * @return {date}
 *
 * @example:
 *    'December 17, 1995 03:24:00'    => Date()
 *    'Tue, 26 Jan 2016 13:48:02 GMT' => Date()
 *    'Sun, 17 May 1998 03:00:00 GMT+01' => Date()
 */
function parseDataFromRfc2822(value) {
   return new Date(value);
}

/**
 * Parses an ISO 8601 string date representation into date value
 * For ISO 8601 date specification refer to : https://en.wikipedia.org/wiki/ISO_8601
 *
 * @param {string} value
 * @return {date}
 *
 * @example :
 *    '2016-01-19T16:07:37+00:00'    => Date()
 *    '2016-01-19T08:07:37Z' => Date()
 */
function parseDataFromIso8601(value) {
   return new Date(value);
}


/**
 * Returns true if specified date is leap year and false otherwise
 * Please find algorithm here: https://en.wikipedia.org/wiki/Leap_year#Algorithm
 *
 * @param {date} date
 * @return {bool}
 *
 * @example :
 *    Date(1900,1,1)    => false
 *    Date(2000,1,1)    => true
 *    Date(2001,1,1)    => false
 *    Date(2012,1,1)    => true
 *    Date(2015,1,1)    => false
 */
function isLeapYear(date) {
   let year = date.getFullYear();
   if (year % 4 === 0 && year % 100 != 0 || year % 400 === 0) {
      return true;
   } else {
      return false;
   }
}


/**
 * Returns the string represention of the timespan between two dates.
 * The format of output string is "HH:mm:ss.sss"
 *
 * @param {date} startDate
 * @param {date} endDate
 * @return {string}
 *
 * @example:
 *    Date(2000,1,1,10,0,0),  Date(2000,1,1,11,0,0)   => "01:00:00.000"
 *    Date(2000,1,1,10,0,0),  Date(2000,1,1,10,30,0)       => "00:30:00.000"
 *    Date(2000,1,1,10,0,0),  Date(2000,1,1,10,0,20)        => "00:00:20.000"
 *    Date(2000,1,1,10,0,0),  Date(2000,1,1,10,0,0,250)     => "00:00:00.250"
 *    Date(2000,1,1,10,0,0),  Date(2000,1,1,15,20,10,453)   => "05:20:10.453"
 */
function timeSpanToString(startDate, endDate) {
   let milliseconds =  endDate - startDate;
   let millisecInHour = 3600000;
   let millisecInMin =  60000;
   let millisecInSec =  1000;
   let resultString = '';

   if (Math.floor(milliseconds / millisecInHour) > 0) {
      let hours = Math.floor(milliseconds / millisecInHour);
      if (hours < 10) {
         resultString = '0' + hours.toString() + ':';
      } else {
         resultString = hours.toString() + ':';
      }
      milliseconds -= hours*millisecInHour;
   } else {
      resultString = '00:';
   }

   if (Math.floor(milliseconds / millisecInMin) > 0) {
      let minutes = Math.floor(milliseconds / millisecInMin);
      if (minutes < 10) {
         resultString = resultString + '0' + minutes.toString() + ':';
      } else {
         resultString = resultString + minutes.toString() + ':';
      }
      milliseconds -= minutes*millisecInMin;
   } else {
      resultString = resultString + '00:';
   }

   if (Math.floor(milliseconds / millisecInSec) > 0) {
      let seconds = Math.floor(milliseconds / millisecInSec);
      if (seconds < 10) {
         resultString = resultString + '0' + seconds.toString() + '.';
      } else {
         resultString = resultString + seconds.toString() + '.';
      }
      milliseconds -= seconds*millisecInSec;
   } else {
      resultString = resultString + '00.';
   }

   if (milliseconds > 0) {
      if (milliseconds < 10) {
         resultString = resultString + '00' + milliseconds.toString();
      }
      if (milliseconds < 100 && milliseconds >= 10) {
         resultString = resultString + '0' + milliseconds.toString();
      } else {
         resultString = resultString + milliseconds.toString();
      }
   } else {
      resultString = resultString + '000';
   }

   return resultString;
}


/**
 * Returns the angle (in radians) between the hands of an analog clock for the specified Greenwich time.
 * If you have problem with solution please read: https://en.wikipedia.org/wiki/Clock_angle_problem
 * 
 * @param {date} date
 * @return {number}
 *
 * @example:
 *    Date.UTC(2016,2,5, 0, 0) => 0
 *    Date.UTC(2016,3,5, 3, 0) => Math.PI/2
 *    Date.UTC(2016,3,5,18, 0) => Math.PI
 *    Date.UTC(2016,3,5,21, 0) => Math.PI/2
 */
function angleBetweenClockHands(date) {

   let notUtcDate = new Date(date);
   let hours = notUtcDate.getUTCHours() % 12;
   let minutes = notUtcDate.getUTCMinutes();
   let difference = Math.abs(0.5 * (60*hours - 11*minutes));

   if ((360 - difference) < difference) {
      return (360 - difference)*Math.PI/180;
   } else {
      return difference*Math.PI/180;
   }
}


module.exports = {
    parseDataFromRfc2822: parseDataFromRfc2822,
    parseDataFromIso8601: parseDataFromIso8601,
    isLeapYear: isLeapYear,
    timeSpanToString: timeSpanToString,
    angleBetweenClockHands: angleBetweenClockHands
};
