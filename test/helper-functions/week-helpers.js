function makeWeekArray(days) {
  return [
    {
      weekId: 1,
      sun_am_id: days[0].sun_am_id,
      sun_pm_id: days[0].sun_pm_id,
      mon_am_id: days[0].mon_am_id,
      mon_pm_id: days[0].mon_pm_id,
      tue_am_id: days[0].tue_am_id,
      tue_pm_id: days[0].tue_pm_id,
      wed_am_id: days[0].wed_am_id,
      wed_pm_id: days[0].wed_pm_id,
      thu_am_id: days[0].thu_am_id,
      thu_pm_id: days[0].thu_pm_id,
      fri_am_id: days[0].fri_am_id,
      fri_pm_id: days[0].fri_pm_id,
      sat_am_id: days[0].sat_am_id,
      sat_pm_id: days[0].sat_pm_id,
      weekType: 'availability'
    },
    {
      weekId: 2,
      sun_am_id: days[1].sun_am_id,
      sun_pm_id: days[1].sun_pm_id,
      mon_am_id: days[1].mon_am_id,
      mon_pm_id: days[1].mon_pm_id,
      tue_am_id: days[1].tue_am_id,
      tue_pm_id: days[1].tue_pm_id,
      wed_am_id: days[1].wed_am_id,
      wed_pm_id: days[1].wed_pm_id,
      thu_am_id: days[1].thu_am_id,
      thu_pm_id: days[1].thu_pm_id,
      fri_am_id: days[1].fri_am_id,
      fri_pm_id: days[1].fri_pm_id,
      sat_am_id: days[1].sat_am_id,
      sat_pm_id: days[1].sat_pm_id,
      weekType: 'availability'
    },
    {
      weekId: 3,
      sun_am_id: days[2].sun_am_id,
      sun_pm_id: days[2].sun_pm_id,
      mon_am_id: days[2].mon_am_id,
      mon_pm_id: days[2].mon_pm_id,
      tue_am_id: days[2].tue_am_id,
      tue_pm_id: days[2].tue_pm_id,
      wed_am_id: days[2].wed_am_id,
      wed_pm_id: days[2].wed_pm_id,
      thu_am_id: days[2].thu_am_id,
      thu_pm_id: days[2].thu_pm_id,
      fri_am_id: days[2].fri_am_id,
      fri_pm_id: days[2].fri_pm_id,
      sat_am_id: days[2].sat_am_id,
      sat_pm_id: days[2].sat_pm_id,
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
function makeMaliciousWeek(week) {
  const maliciousWeek = {
    weekId: 911,
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
    weekType: `H4x0r <script>alert("xss");</script>`
  };
  const expectedWeek = {
    ...makeExpectedWeek(maliciousWeek),
    weekType: `H4x0r &lt;script&gt;alert(\"xss\");&lt;/script&gt;`
  };

  return {
    maliciousWeek,
    expectedWeek
  }
}


function seedWeeks() {

}
function seedMaliciousWeeks() {
  
}

module.exports = {
  makeWeekArray,
  makeExpectedWeek,
  makeMaliciousWeek,

  seedWeeks,
  seedMaliciousWeeks
}