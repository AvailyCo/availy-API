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

// Seed Timezone Table
function seedTimezoneTables (db, timezones){
  return db.transaction(async trx => {
    await trx.into('timezone').insert(timezones);

    await trx.raw(
      `SELECT setval('timezoneid_seq', ?)`, [timezones[timezone.length - 1].timezoneid],
    )
  })
}
function seedMaliciousTimezone(db, timezone) {
  return db.into('timezone').insert([timezone]);
}


module.exports = {
  makeTimezoneArray,
  makeExpectedTimezone,
  makeMaliciousTimezone,
  
  seedTimezoneTables,
  seedMaliciousTimezone
}