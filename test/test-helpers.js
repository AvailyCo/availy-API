const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Need to rework days to separate days based on tables
// function makeDaysArray() {
//   return [
//     sat_PM = {
//       sat_pm_id: 1,
//       sat_pm12: 0,
//       sat_pm1230: 0,
//       sat_pm1: 0,
//       sat_pm130: 0,
//       sat_pm2: 0,
//       sat_pm230: 0,
//       sat_pm3: 0,
//       sat_pm330: 0,
//       sat_pm4: 0,
//       sat_pm430: 0,
//       sat_pm5: 0,
//       sat_pm530: 0,
//       sat_pm6: 0,
//       sat_pm630: 0,
//       sat_pm7: 0,
//       sat_pm730: 0,
//       sat_pm8: 0,
//       sat_pm830: 0,
//       sat_pm9: 0,
//       sat_pm930: 0,
//       sat_pm10: 0,
//       sat_pm1030: 0,
//       sat_pm11: 0,
//       sat_pm1130: 0
//     },
//     sat_AM = {
//       sat_am_id: 1,
//       sat_am12: 0,
//       sat_am1230: 0,
//       sat_am1: 0,
//       sat_am130: 0,
//       sat_am2: 0,
//       sat_am230: 0,
//       sat_am3: 0,
//       sat_am330: 0,
//       sat_am4: 0,
//       sat_am430: 0,
//       sat_am5: 0,
//       sat_am530: 0,
//       sat_am6: 0,
//       sat_am630: 0,
//       sat_am7: 0,
//       sat_am730: 0,
//       sat_am8: 0,
//       sat_am830: 0,
//       sat_am9: 0,
//       sat_am930: 0,
//       sat_am10: 0,
//       sat_am1030: 0,
//       sat_am11: 0,
//       sat_am1130: 0
//     },
//     fri_PM = {
//       fri_pm_id: 1,
//       fri_pm12: 0,
//       fri_pm1230: 0,
//       fri_pm1: 0,
//       fri_pm130: 0,
//       fri_pm2: 0,
//       fri_pm230: 0,
//       fri_pm3: 0,
//       fri_pm330: 0,
//       fri_pm4: 0,
//       fri_pm430: 0,
//       fri_pm5: 0,
//       fri_pm530: 0,
//       fri_pm6: 0,
//       fri_pm630: 0,
//       fri_pm7: 0,
//       fri_pm730: 0,
//       fri_pm8: 0,
//       fri_pm830: 0,
//       fri_pm9: 0,
//       fri_pm930: 0,
//       fri_pm10: 0,
//       fri_pm1030: 0,
//       fri_pm11: 0,
//       fri_pm1130: 0
//     },
//     fri_AM = {
//       fri_am_id: 1,
//       fri_am12: 0,
//       fri_am1230: 0,
//       fri_am1: 0,
//       fri_am130: 0,
//       fri_am2: 0,
//       fri_am230: 0,
//       fri_am3: 0,
//       fri_am330: 0,
//       fri_am4: 0,
//       fri_am430: 0,
//       fri_am5: 0,
//       fri_am530: 0,
//       fri_am6: 0,
//       fri_am630: 0,
//       fri_am7: 0,
//       fri_am730: 0,
//       fri_am8: 0,
//       fri_am830: 0,
//       fri_am9: 0,
//       fri_am930: 0,
//       fri_am10: 0,
//       fri_am1030: 0,
//       fri_am11: 0,
//       fri_am1130: 0
//     },
//     thu_PM = {
//       thu_pm_id: 1,
//       thu_pm12: 0,
//       thu_pm1230: 0,
//       thu_pm1: 0,
//       thu_pm130: 0,
//       thu_pm2: 0,
//       thu_pm230: 0,
//       thu_pm3: 0,
//       thu_pm330: 0,
//       thu_pm4: 0,
//       thu_pm430: 0,
//       thu_pm5: 0,
//       thu_pm530: 0,
//       thu_pm6: 0,
//       thu_pm630: 0,
//       thu_pm7: 0,
//       thu_pm730: 0,
//       thu_pm8: 0,
//       thu_pm830: 0,
//       thu_pm9: 0,
//       thu_pm930: 0,
//       thu_pm10: 0,
//       thu_pm1030: 0,
//       thu_pm11: 0,
//       thu_pm1130: 0
//     },
//     thu_AM = {
//       thu_am_id: 1,
//       thu_am12: 0,
//       thu_am1230: 0,
//       thu_am1: 0,
//       thu_am130: 0,
//       thu_am2: 0,
//       thu_am230: 0,
//       thu_am3: 0,
//       thu_am330: 0,
//       thu_am4: 0,
//       thu_am430: 0,
//       thu_am5: 0,
//       thu_am530: 0,
//       thu_am6: 0,
//       thu_am630: 0,
//       thu_am7: 0,
//       thu_am730: 0,
//       thu_am8: 0,
//       thu_am830: 0,
//       thu_am9: 0,
//       thu_am930: 0,
//       thu_am10: 0,
//       thu_am1030: 0,
//       thu_am11: 0,
//       thu_am1130: 0
//     },
//     wed_PM = {
//       wed_pm_id: 1,
//       wed_pm12: 0,
//       wed_pm1230: 0,
//       wed_pm1: 0,
//       wed_pm130: 0,
//       wed_pm2: 0,
//       wed_pm230: 0,
//       wed_pm3: 0,
//       wed_pm330: 0,
//       wed_pm4: 0,
//       wed_pm430: 0,
//       wed_pm5: 0,
//       wed_pm530: 0,
//       wed_pm6: 0,
//       wed_pm630: 0,
//       wed_pm7: 0,
//       wed_pm730: 0,
//       wed_pm8: 0,
//       wed_pm830: 0,
//       wed_pm9: 0,
//       wed_pm930: 0,
//       wed_pm10: 0,
//       wed_pm1030: 0,
//       wed_pm11: 0,
//       wed_pm1130: 0
//     },
//     wed_AM = {
//       wed_am_id: 1,
//       wed_am12: 0,
//       wed_am1230: 0,
//       wed_am1: 0,
//       wed_am130: 0,
//       wed_am2: 0,
//       wed_am230: 0,
//       wed_am3: 0,
//       wed_am330: 0,
//       wed_am4: 0,
//       wed_am430: 0,
//       wed_am5: 0,
//       wed_am530: 0,
//       wed_am6: 0,
//       wed_am630: 0,
//       wed_am7: 0,
//       wed_am730: 0,
//       wed_am8: 0,
//       wed_am830: 0,
//       wed_am9: 0,
//       wed_am930: 0,
//       wed_am10: 0,
//       wed_am1030: 0,
//       wed_am11: 0,
//       wed_am1130: 0
//     },
//     tue_PM = {
//       tue_pm_id: 1,
//       tue_pm12: 0,
//       tue_pm1230: 0,
//       tue_pm1: 0,
//       tue_pm130: 0,
//       tue_pm2: 0,
//       tue_pm230: 0,
//       tue_pm3: 0,
//       tue_pm330: 0,
//       tue_pm4: 0,
//       tue_pm430: 0,
//       tue_pm5: 0,
//       tue_pm530: 0,
//       tue_pm6: 0,
//       tue_pm630: 0,
//       tue_pm7: 0,
//       tue_pm730: 0,
//       tue_pm8: 0,
//       tue_pm830: 0,
//       tue_pm9: 0,
//       tue_pm930: 0,
//       tue_pm10: 0,
//       tue_pm1030: 0,
//       tue_pm11: 0,
//       tue_pm1130: 0
//     },
//     tue_AM = {
//       tue_am_id: 1,
//       tue_am12: 0,
//       tue_am1230: 0,
//       tue_am1: 0,
//       tue_am130: 0,
//       tue_am2: 0,
//       tue_am230: 0,
//       tue_am3: 0,
//       tue_am330: 0,
//       tue_am4: 0,
//       tue_am430: 0,
//       tue_am5: 0,
//       tue_am530: 0,
//       tue_am6: 0,
//       tue_am630: 0,
//       tue_am7: 0,
//       tue_am730: 0,
//       tue_am8: 0,
//       tue_am830: 0,
//       tue_am9: 0,
//       tue_am930: 0,
//       tue_am10: 0,
//       tue_am1030: 0,
//       tue_am11: 0,
//       tue_am1130: 0
//     },
//     mon_PM = {
//       mon_pm_id: 1,
//       mon_pm12: 0,
//       mon_pm1230: 0,
//       mon_pm1: 0,
//       mon_pm130: 0,
//       mon_pm2: 0,
//       mon_pm230: 0,
//       mon_pm3: 0,
//       mon_pm330: 0,
//       mon_pm4: 0,
//       mon_pm430: 0,
//       mon_pm5: 0,
//       mon_pm530: 0,
//       mon_pm6: 0,
//       mon_pm630: 0,
//       mon_pm7: 0,
//       mon_pm730: 0,
//       mon_pm8: 0,
//       mon_pm830: 0,
//       mon_pm9: 0,
//       mon_pm930: 0,
//       mon_pm10: 0,
//       mon_pm1030: 0,
//       mon_pm11: 0,
//       mon_pm1130: 0
//     },
//     mon_AM = [
//       {
//         mon_am_id: 1,
//         mon_am12: 0,
//         mon_am1230: 0,
//         mon_am1: 0,
//         mon_am130: 0,
//         mon_am2: 0,
//         mon_am230: 0,
//         mon_am3: 0,
//         mon_am330: 0,
//         mon_am4: 0,
//         mon_am430: 0,
//         mon_am5: 0,
//         mon_am530: 0,
//         mon_am6: 0,
//         mon_am630: 0,
//         mon_am7: 0,
//         mon_am730: 0,
//         mon_am8: 0,
//         mon_am830: 0,
//         mon_am9: 0,
//         mon_am930: 0,
//         mon_am10: 0,
//         mon_am1030: 0,
//         mon_am11: 0,
//         mon_am1130: 0
//       },
//       {
//         mon_am_id: 2,
//         mon_am12: 1,
//         mon_am1230: 1,
//         mon_am1: 1,
//         mon_am130: 1,
//         mon_am2: 1,
//         mon_am230: 1,
//         mon_am3: 1,
//         mon_am330: 1,
//         mon_am4: 1,
//         mon_am430: 1,
//         mon_am5: 1,
//         mon_am530: 1,
//         mon_am6: 1,
//         mon_am630: 1,
//         mon_am7: 1,
//         mon_am730: 1,
//         mon_am8: 1,
//         mon_am830: 1,
//         mon_am9: 1,
//         mon_am930: 1,
//         mon_am10: 1,
//         mon_am1030: 1,
//         mon_am11: 1,
//         mon_am1130: 1
//       },
//       {
//         mon_am_id: 3,
//         mon_am12: 0,
//         mon_am1230: 1,
//         mon_am1: 0,
//         mon_am130: 1,
//         mon_am2: 0,
//         mon_am230: 1,
//         mon_am3: 0,
//         mon_am330: 1,
//         mon_am4: 0,
//         mon_am430: 1,
//         mon_am5: 0,
//         mon_am530: 1,
//         mon_am6: 0,
//         mon_am630: 1,
//         mon_am7: 0,
//         mon_am730: 1,
//         mon_am8: 0,
//         mon_am830: 1,
//         mon_am9: 0,
//         mon_am930: 1,
//         mon_am10: 0,
//         mon_am1030: 1,
//         mon_am11: 0,
//         mon_am1130: 1
//       }
//     ],
//     sun_PM = [
//       {
//         sun_pm_id: 1,
//         sun_pm12: 0,
//         sun_pm1230: 0,
//         sun_pm1: 0,
//         sun_pm130: 0,
//         sun_pm2: 0,
//         sun_pm230: 0,
//         sun_pm3: 0,
//         sun_pm330: 0,
//         sun_pm4: 0,
//         sun_pm430: 0,
//         sun_pm5: 0,
//         sun_pm530: 0,
//         sun_pm6: 0,
//         sun_pm630: 0,
//         sun_pm7: 0,
//         sun_pm730: 0,
//         sun_pm8: 0,
//         sun_pm830: 0,
//         sun_pm9: 0,
//         sun_pm930: 0,
//         sun_pm10: 0,
//         sun_pm1030: 0,
//         sun_pm11: 0,
//         sun_pm1130: 0
//       },
//       {
//         sun_pm_id: 2,
//         sun_pm12: 1,
//         sun_pm1230: 1,
//         sun_pm1: 1,
//         sun_pm130: 1,
//         sun_pm2: 1,
//         sun_pm230: 1,
//         sun_pm3: 1,
//         sun_pm330: 1,
//         sun_pm4: 1,
//         sun_pm430: 1,
//         sun_pm5: 1,
//         sun_pm530: 1,
//         sun_pm6: 1,
//         sun_pm630: 1,
//         sun_pm7: 1,
//         sun_pm730: 1,
//         sun_pm8: 1,
//         sun_pm830: 1,
//         sun_pm9: 1,
//         sun_pm930: 1,
//         sun_pm10: 1,
//         sun_pm1030: 1,
//         sun_pm11: 1,
//         sun_pm1130: 1
//       },
//       {
//         sun_pm_id: 3,
//         sun_pm12: 0,
//         sun_pm1230: 1,
//         sun_pm1: 0,
//         sun_pm130: 1,
//         sun_pm2: 0,
//         sun_pm230: 1,
//         sun_pm3: 0,
//         sun_pm330: 1,
//         sun_pm4: 0,
//         sun_pm430: 1,
//         sun_pm5: 0,
//         sun_pm530: 1,
//         sun_pm6: 0,
//         sun_pm630: 1,
//         sun_pm7: 0,
//         sun_pm730: 1,
//         sun_pm8: 0,
//         sun_pm830: 1,
//         sun_pm9: 0,
//         sun_pm930: 1,
//         sun_pm10: 0,
//         sun_pm1030: 1,
//         sun_pm11: 0,
//         sun_pm1130: 1
//       }
//     ],
//     sun_AM = [
//       {
//         sun_am_id: 1,
//         sun_am12: 0,
//         sun_am1230: 0,
//         sun_am1: 0,
//         sun_am130: 0,
//         sun_am2: 0,
//         sun_am230: 0,
//         sun_am3: 0,
//         sun_am330: 0,
//         sun_am4: 0,
//         sun_am430: 0,
//         sun_am5: 0,
//         sun_am530: 0,
//         sun_am6: 0,
//         sun_am630: 0,
//         sun_am7: 0,
//         sun_am730: 0,
//         sun_am8: 0,
//         sun_am830: 0,
//         sun_am9: 0,
//         sun_am930: 0,
//         sun_am10: 0,
//         sun_am1030: 0,
//         sun_am11: 0,
//         sun_am1130: 0
//       },
//       {
//         sun_am_id: 2,
//         sun_am12: 1,
//         sun_am1230: 1,
//         sun_am1: 1,
//         sun_am130: 1,
//         sun_am2: 1,
//         sun_am230: 1,
//         sun_am3: 1,
//         sun_am330: 1,
//         sun_am4: 1,
//         sun_am430: 1,
//         sun_am5: 1,
//         sun_am530: 1,
//         sun_am6: 1,
//         sun_am630: 1,
//         sun_am7: 1,
//         sun_am730: 1,
//         sun_am8: 1,
//         sun_am830: 1,
//         sun_am9: 1,
//         sun_am930: 1,
//         sun_am10: 1,
//         sun_am1030: 1,
//         sun_am11: 1,
//         sun_am1130: 1
//       },
//       {
//         sun_am_id: 3,
//         sun_am12: 0,
//         sun_am1230: 1,
//         sun_am1: 0,
//         sun_am130: 1,
//         sun_am2: 0,
//         sun_am230: 1,
//         sun_am3: 0,
//         sun_am330: 1,
//         sun_am4: 0,
//         sun_am430: 1,
//         sun_am5: 0,
//         sun_am530: 1,
//         sun_am6: 0,
//         sun_am630: 1,
//         sun_am7: 0,
//         sun_am730: 1,
//         sun_am8: 0,
//         sun_am830: 1,
//         sun_am9: 0,
//         sun_am930: 1,
//         sun_am10: 0,
//         sun_am1030: 1,
//         sun_am11: 0,
//         sun_am1130: 1
//       }
//     ]
//   ]
// }
// function makeExpectedDay(day) {

// }
// function makeMaliciousDay() {

// }
// function seedDays (db, days) {

// }



function makeTimezoneArray(){
  return [
    {
      timezoneid: 1,
      zonename: "PST",
      zoneoffset: "-08:00",
      zonedesc: "Pacific Standard Time"
    },
    {
      timezoneid: 2,
      zonename: "MST",
      zoneoffset: "-07:00",
      zonedesc: "Mountain Standard Time"
    },
    {
      timezoneid: 3,
      zonename: "CST",
      zoneoffset: "-06:00",
      zonedesc: "Central Standard Time"
    },
    {
      timezoneid: 4,
      zonename: "EST",
      zoneoffset: "-05:00",
      zonedesc: "Eastern Standard Time"
    }
  ]
}
function makeExpectedTimezone(zone) {
  return {
    timezoneid: zone.timezoneid,
    zonename: zone.zonename,
    zoneoffset: zone.zoneoffset,
    zonedesc: zone.zonedesc
  }
}
function makeMaliciousTimezone(zone) {
  const maliciousTimezone = {
    timezoneid: 911,
    zonename: `H4x0r <script>alert("xss");</script>`,
    zoneoffset: `Bad image <img src="https://url.to.file.which/does-not.exist" onerror="alert(document.cookie);">. But not <strong>all</strong> bad.`,
    zonedesc: `Bad image <img src="https://url.to.file.which/does-not.exist" onerror="alert(document.cookie);">. But not <strong>all</strong> bad.`
  }
  const expectedTimezone = {
    ...makeExpectedTimezone(maliciousTimezone),
    zonename: `H4x0r &lt;script&gt;alert(\"xss\");&lt;/script&gt;`,
    zoneoffset: `Bad image <img src="https://url.to.file.which/does-not.exist">. But not <strong>all</strong> bad.`,
    zonedesc: `Bad image <img src="https://url.to.file.which/does-not.exist">. But not <strong>all</strong> bad.`
  };

  return {
    maliciousTimezone,
    expectedTimezone
  }
}

function seedTimezone (){

}





function makeWeekArray() {
  return [
    {
      weekId: 1,
      sun_am_id: 1,
      sun_pm_id: 1,
      mon_am_id: 1,
      mon_pm_id: 1,
      tue_am_id: 1,
      tue_pm_id: 1,
      wed_am_id: 1,
      wed_pm_id: 1,
      thu_am_id: 1,
      thu_pm_id: 1,
      fri_am_id: 1,
      fri_pm_id: 1,
      sat_am_id: 1,
      sat_pm_id: 1,
      weekType: 'availability'
    },
    {
      weekId: 2,
      sun_am_id: 2,
      sun_pm_id: 2,
      mon_am_id: 2,
      mon_pm_id: 2,
      tue_am_id: 2,
      tue_pm_id: 2,
      wed_am_id: 2,
      wed_pm_id: 2,
      thu_am_id: 2,
      thu_pm_id: 2,
      fri_am_id: 2,
      fri_pm_id: 2,
      sat_am_id: 2,
      sat_pm_id: 2,
      weekType: 'availability'
    },
    {
      weekId: 3,
      sun_am_id: 3,
      sun_pm_id: 3,
      mon_am_id: 3,
      mon_pm_id: 3,
      tue_am_id: 3,
      tue_pm_id: 3,
      wed_am_id: 3,
      wed_pm_id: 3,
      thu_am_id: 3,
      thu_pm_id: 3,
      fri_am_id: 3,
      fri_pm_id: 3,
      sat_am_id: 3,
      sat_pm_id: 3,
      weekType: 'event'
    }
  ]
}
function makeExpectedWeek(week) {
  return {
    weekId: week.weekId,
    sun_am_id: week.sun_am_id,
    sun_pm_id: week.sun_pm_id,
    mon_am_id: week.mon_am_id,
    mon_pm_id: week.mon_pm_id,
    tue_am_id: week.tue_am_id,
    tue_pm_id: week.tue_pm_id,
    wed_am_id: week.wed_am_id,
    wed_pm_id: week.wed_pm_id,
    thu_am_id: week.thu_am_id,
    thu_pm_id: week.thu_pm_id,
    fri_am_id: week.fri_am_id,
    fri_pm_id: week.fri_pm_id,
    sat_am_id: week.sat_am_id,
    sat_pm_id: week.sat_pm_id,
    weekType: week.weekType
  }
}
function makeMaliciousWeek() {

}
function seedWeeks() {

}



function makeContactsArray() {
  return [
    {
      contactId: 1,
      user1_id: 1,
      user2_id: 2,
      blocked: false,
      blocked_by: null,
      date_connected: now()
    },
    {
      contactId: 2,
      user1_id: 1,
      user2_id: 3,
      blocked: true,
      blocked_by: 3,
      date_connected: now()
    },
    {
      contactId: 3,
      user1_id: 2,
      user2_id: 3,
      blocked: false,
      blocked_by: null,
      date_connected: now()
    }
  ]
}
function makeExpectedContact(c) {
  return {
    contactId: c.contactId,
    user1_id: c.user1_id,
    user2_id: c.user2_id,
    blocked: c.blocked,
    blocked_by: c.blocked_by,
    date_connected: c.date_connected
  }
}
function makeMaliciousContact() {

}
function seedContacts() {

}



function makeEventsArray() {
  return [
    {
      event_id: 1,
      event_name: "Test Event 1",
      about_event: "About Test Event 1",
      event_link: "This is an in-person only event",
      event_location_name: "Test Spot 1",
      event_street: "123 Test St",
      event_city: "City",
      event_state: "State",
      event_zip: "12345",
      event_start_time: "2012-01-22T12:30:00.615Z",
      event_end_time: "2012-01-26T12:30:00.615Z",
      event_start_date: "2012-01-22",
      event_end_date: "2012-01-26",
      event_timezone: 1,
      week_id: 1
    },
    {
      event_id: 2,
      event_name: "Test Event 2",
      about_event: "About Test Event 2",
      event_link: "https://lmgtfy.app/?q=test",
      event_location_name: "This is an online-only event",
      event_street: null,
      event_city: null,
      event_state: null,
      event_zip: null,
      event_start_time: "2014-01-22T12:30:00.615Z",
      event_end_time: "2014-01-26T12:30:00.615Z",
      event_start_date: "2014-01-22",
      event_end_date: "2014-01-26",
      event_timezone: 2,
      week_id: 1
    },
    {
      event_id: 3,
      event_name: "Test Event 3",
      about_event: "About Test Event 3",
      event_link: "https://lmgtfy.app/?q=test",
      event_location_name: "Google Headquarters",
      event_street: "1600 Amphitheatre Pkwy",
      event_city: "Mountain View",
      event_state: "California",
      event_zip: "94043",
      event_start_time: "2020-01-22T12:30:00.615Z",
      event_end_time: "2020-01-26T12:30:00.615Z",
      event_start_date: "2020-01-22",
      event_end_date: "2020-01-26",
      event_timezone: 0,
      week_id: 0
    }
  ]
}
function makeExpectedEvent(event) {
  return {
    event_id: event.event_id,
    event_name: event.event_name,
    about_event: event.about_event,
    event_link: event.event_link,
    event_location_name: event.event_location_name,
    event_street: event.event_street,
    event_city: event.event_city,
    event_state: event.event_state,
    event_zip: event.event_zip,
    event_start_time: event.event_start_time,
    event_end_time: event.event_end_time,
    event_start_date: event.event_start_date,
    event_end_date: event.event_end_date,
    event_timezone: event.event_timezone,
    week_id: event.week_id
  }
}
function makeMaliciousEvent() {

}
function seedEvents() {

}



function makeHostsArray() {
  return [
    {
      host_id: 1,
      user_id: 1,
      event_id: 1
    },
    {
      host_id: 2,
      user_id: 1,
      event_id: 2
    },
    {
      host_id: 3,
      user_id: 2,
      event_id: 2
    }
  ]
}
function makeExpectedHost(h) {
  return {
    host_id: h.host_id,
    user_id: h.user_id,
    event_id: h.event_id
  }
}
function makeMaliciousHost() {

}
function seedHosts() {

}



function makeGuestsArray(){
  return [
    {
      attending_id: 1,
      event_id: 1,
      user_id: 2,
      attending: true
    },
    {
      attending_id: 2,
      event_id: 1,
      user_id: 3,
      attending: false
    },
    {
      attending_id: 3,
      event_id: 2,
      user_id: 2,
      attending: true
    }
  ]
}
function makeExpectedGuest(g) {
  return {
    attending_id: g.attending_id,
    event_id: g.event_id,
    user_id: g.user_id,
    attending: g.attending
  }
}
function makeMaliciousGuest() {

}
function seedGuests() {

}



function makeUsersArray() {
  return [{
    userId: 1,
    username: 'Test User 1',
    firstname: 'Test2',
    lastname: 'User1',
    email: 'testuser1@test.com',
    password: 'Abc123!',
    aboutme: "Here's a little secret about User 1...",
    avatar: 'https://robohash.org/PA7.png?set=set4&size=150x150',
    date_created: new Date('2020-01-01T16:28:32.615Z'),
    date_modified: now(),
    timezone: 8,
    weekId: 1
  },
  {
    userId: 2,
    username: 'Test User 2',
    firstname: 'Test2',
    lastname: 'User2',
    email: 'testuser2@123.com',
    password: 'Password123!',
    aboutme: "User 2 is all the rage in Boston",
    avatar: 'https://robohash.org/PA7.png?set=set4&size=150x150',
    date_created: new Date('2020-03-21T16:28:32.615Z'),
    date_modified: now(),
    timezone: 5,
    weekId: 1
  },
  {
    userId: 3,
    username: 'Test User 3',
    firstname: 'Test3',
    lastname: 'User3',
    email: 'testuser3@sample.com',
    password: '321Password?',
    aboutme: "Here's a little secret about User 1...",
    avatar: 'https://robohash.org/PA7.png?set=set4&size=150x150',
    date_created: new Date('2020-01-01T16:28:32.615Z'),
    date_modified: now(),
    timezone: 1,
    weekId: 1
  }]
};

function makeGroupArray(users) {
  return [{
    id: 1,
    group_name: 'Test Group 1',
    group_image: 'https://images.unsplash.com/photo-1554284126-aa88f22d8b74?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60',
    founder: users[0].userId,
    about_group: 'this is a bit of test info about Group 1',
    created_on: new Date('2029-01-22T16:28:32.615Z')
  },
  {
    id: 2,
    group_name: 'Test Group 2',
    group_image: 'https://images.unsplash.com/photo-1554284126-aa88f22d8b74?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60',
    founder: users[0].userId,
    about_group: "Group 2's About Me looks something like this",
    created_on: new Date('2014-01-22T16:28:32.615Z')
  },
  {
    id: 3,
    group_name: 'Test Group 3',
    group_image: 'https://images.unsplash.com/photo-1554284126-aa88f22d8b74?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60',
    founder: users[1].userId,
    about_group: 'Group 3 rules, Group 1 drools',
    created_on: new Date('2012-01-22T16:28:32.615Z')
  }]
}

function makeExpectedGroup(group) {
  return {
    id: group.id,
    group_name: group.group_name,
    group_image: group.group_image,
    founder: group.founder,
    about_group: group.about_group,
    created_on: group.created_on
  }
}
function makeMaliciousGroup(user) {
  const maliciousGroup = {
    groupId: 911,
    group_name: `H4x0r <script>alert("xss");</script>`,
    group_image: "https://via.placeholder.com/50x50?text=EVIL",
    founder: user.userId,
    about_group: `Bad image <img src="https://url.to.file.which/does-not.exist" onerror="alert(document.cookie);">. But not <strong>all</strong> bad.`,
    created_on: now()
  }
  const expectedGroup = {
    ...makeExpectedGroup([user], maliciousGroup),
    group_name: `H4x0r &lt;script&gt;alert(\"xss\");&lt;/script&gt;`,
    group_image: "https://via.placeholder.com/50x50?text=EVIL",
    founder: user.userId,
    about_group: `Bad image <img src="https://url.to.file.which/does-not.exist">. But not <strong>all</strong> bad.`,
    created_on: now()
  };
  return {
    maliciousGroup,
    expectedGroup,
  };
}

function makeGroupFixtures() {
  const testUsers = makeUsersArray();
  const testGroups = makeGroupArray(testUsers);

  return { testUsers, testGroups };
}

function makeMembersArray() {
  return [
    {
      grpMemsId: 1,
      group_id: 1,
      member_id: 1,
      member_level: 'Founder',
      join_date: now()
    },
    {
      grpMemsId: 2,
      group_id: 1,
      member_id: 2,
      member_level: 'Founder',
      join_date: now()
    },
    {
      grpMemsId: 3,
      group_id: 1,
      member_id: 3,
      member_level: 'Applicant',
      join_date: now()
    },
    {
      grpMemsId: 4,
      group_id: 2,
      member_id: 3,
      member_level: 'Founder',
      join_date: now()
    },
    {
      grpMemsId: 5,
      group_id: 2,
      member_id: 2,
      member_level: 'Admin',
      join_date: now()
    }
  ]
}
function makeExpectedMember(m){
  return {
    grpMemsId: m.grpMemsId,
    group_id: m.group_id,
    member_id: m.member_id,
    member_level: m.member_level,
    join_date: m.join_date
  }
}
function makeMaliciousMember(user, group){
  const maliciousMember = {
    grpMemsId: 911,
    group_id: group.groupId,
    member_id: user.userId,
    member_level: 'H4x0r <script>alert("xss");</script>',
    join_date: now()
  };
  const expectedMember = {
    ...makeExpectedMember([user], [group], maliciousMember),
    grpMemsId: 911,
    member_level: 'H4x0r &lt;script&gt;alert(\"xss\");&lt;/script&gt;',
  };

  return {
    maliciousMember,
    expectedMember
  };
}
function seedMembers() {

}

function cleanTables(db) {
  return db.transaction(trx => {
    trx.raw(
        `TRUNCATE
          users,
          contacts,
          events,
          hosts,
          guests,
          groups,
          group_members,
          week,
          timezone,
          sun_am,
          sun_pm,
          mon_am,
          mon_pm,
          tue_am,
          tue_pm,
          wed_am,
          wed_pm,
          thu_am,
          thu_pm,
          fri_am,
          fri_pm,
          sat_am,
          sat_pm
        `
    ).then(() => {
      Promise.all([
        trx.raw(`ALTER SEQUENCE sat_pm_sat_pm_id_seq minvalue 0 START WITH 1`),
        trx.raw(`ALTER SEQUENCE sat_am_sat_am_id_seq minvalue 0 START WITH 1`),
        trx.raw(`ALTER SEQUENCE fri_pm_fri_pm_id_seq minvalue 0 START WITH 1`),
        trx.raw(`ALTER SEQUENCE fri_am_fri_am_id_seq minvalue 0 START WITH 1`),
        trx.raw(`ALTER SEQUENCE thu_pm_thu_pm_id_seq minvalue 0 START WITH 1`),
        trx.raw(`ALTER SEQUENCE thu_am_thu_am_id_seq minvalue 0 START WITH 1`),
        trx.raw(`ALTER SEQUENCE wed_pm_wed_pm_id_seq minvalue 0 START WITH 1`),
        trx.raw(`ALTER SEQUENCE wed_am_wed_am_id_seq minvalue 0 START WITH 1`),
        trx.raw(`ALTER SEQUENCE tue_pm_tue_pm_id_seq minvalue 0 START WITH 1`),
        trx.raw(`ALTER SEQUENCE tue_am_tue_am_id_seq minvalue 0 START WITH 1`),
        trx.raw(`ALTER SEQUENCE mon_pm_mon_pm_id_seq minvalue 0 START WITH 1`),
        trx.raw(`ALTER SEQUENCE mon_am_mon_am_id_seq minvalue 0 START WITH 1`),
        trx.raw(`ALTER SEQUENCE sun_pm_sun_pm_id_seq minvalue 0 START WITH 1`),
        trx.raw(`ALTER SEQUENCE sun_am_sun_am_id_seq minvalue 0 START WITH 1`),
        trx.raw(`ALTER SEQUENCE timezone_timezoneid_seq minvalue 0 START WITH 1`),
        trx.raw(`ALTER SEQUENCE week_weekid_seq minvalue 0 START WITH 1`),
        trx.raw(`ALTER SEQUENCE users_userId_seq minvalue 0 START WITH 1`),
        trx.raw(`ALTER SEQUENCE contacts_contactId_seq minvalue 0 START WITH 1`),
        trx.raw(`ALTER SEQUENCE group_members_grpMemsId_seq minvalue 0 START WITH 1`),
        trx.raw(`ALTER SEQUENCE groups_groupId_seq minvalue 0 START WITH 1`),
        trx.raw(`ALTER SEQUENCE guests_attendingId_seq minvalue 0 START WITH 1`),
        trx.raw(`ALTER SEQUENCE hosts_host_id_seq minvalue 0 START WITH 1`),
        trx.raw(`ALTER SEQUENCE events_event_id_seq minvalue 0 START WITH 1`),
        trx.raw(`SELECT setval('sat_pm_sat_pm_id_seq', 0)`),
        trx.raw(`SELECT setval('sat_am_sat_am_id_seq', 0)`),
        trx.raw(`SELECT setval('fri_pm_fri_pm_id_seq', 0)`),
        trx.raw(`SELECT setval('fri_am_fri_am_id_seq', 0)`),
        trx.raw(`SELECT setval('thu_pm_thu_pm_id_seq', 0)`),
        trx.raw(`SELECT setval('thu_am_thu_am_id_seq', 0)`),
        trx.raw(`SELECT setval('wed_pm_wed_pm_id_seq', 0)`),
        trx.raw(`SELECT setval('wed_am_wed_am_id_seq', 0)`),
        trx.raw(`SELECT setval('tue_pm_tue_pm_id_seq', 0)`),
        trx.raw(`SELECT setval('tue_am_tue_am_id_seq', 0)`),
        trx.raw(`SELECT setval('mon_pm_mon_pm_id_seq', 0)`),
        trx.raw(`SELECT setval('mon_am_mon_am_id_seq', 0)`),
        trx.raw(`SELECT setval('sun_pm_sun_pm_id_seq', 0)`),
        trx.raw(`SELECT setval('sun_am_sun_am_id_seq', 0)`),
        trx.raw(`SELECT setval('timezone_timezoneid_seq', 0)`),
        trx.raw(`SELECT setval('week_weekid_seq', 0)`),
        trx.raw(`SELECT setval('users_userId_seq', 0)`),
        trx.raw(`SELECT setval('contacts_contactId_seq', 0)`),
        trx.raw(`SELECT setval('group_members_grpMemsId_seq', 0)`),
        trx.raw(`SELECT setval('groups_groupId_seq', 0)`),
        trx.raw(`SELECT setval('guests_attendingId_seq', 0)`),
        trx.raw(`SELECT setval('hosts_host_id_seq', 0)`),
        trx.raw(`SELECT setval('events_event_id_seq', 0)`),
      ])
    })
  })
}

function seedUsers(db, users) {
  const preppedUsers = users.map(user => ({
    ...user,
    password: bcrypt.hashSync(user.password, 1)
  }));

  return db
    .into('users')
    .insert(preppedUsers)
    .then(() => 
    // update the auto sequence to stay in sync
      db.raw(
        `SELECT setval('users_userId_seq', ?)`, [users[users.lenfth - 1].id],
      )
    );
}

function seedGroupsTables(db, users, groups) {
  // use a transaction to group the queries. auto rollback on any failures
  return db.transaction(async trx => {
    await seedUsers(trx, users);
    await trx.into('groups').insert(groups);
    // update the auto nce to match the rced id values
    await trx.raw(
      `SELECT setval('groups_groupId_seq', ?)`, [groups[groups.length - 1].id],
    );
  });
}

function seedMaliciousGroup(db, user, group) {
  return seedUsers(db, [user])
    .then(() =>
      db
        .into('groups')
        .insert([group])
    );
}

function makeAuthHeader(user, secret = process.env.JWT_SECRET) {
  const token = jwt.sign({ user_id: user.id }, secret, {
      subject: user.username,
      algorithm: 'HS256',
  });
  return `Bearer ${token}`;
}

module.exports = {
  makeUsersArray,
  makeGroupArray,
  makeGroupFixtures,
  makeExpectedGroup,
  makeMaliciousGroup,
  makeAuthHeader,
  seedUsers,
  seedGroupsTables,
  seedMaliciousGroup,
  cleanTables,
  seedUsers
}