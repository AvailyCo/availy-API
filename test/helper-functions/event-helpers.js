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
function makeMaliciousEvent(timezone, week) {
  const maliciousEvent = {
    event_id: 911,
    event_name: 'Naughty naughty very naughty <script>alert("xss");</script>',
    about_event: `Bad image <img src="https://url.to.file.which/does-not.exist" onerror="alert(document.cookie);">. But not <strong>all</strong> bad.`,
    event_link: 'Naughty naughty very naughty <script>alert("xss");</script>',
    event_location_name: 'Naughty naughty very naughty <script>alert("xss");</script>',
    event_street: `Bad image <img src="https://url.to.file.which/does-not.exist" onerror="alert(document.cookie);">. But not <strong>all</strong> bad.`,
    event_city: `Bad image <img src="https://url.to.file.which/does-not.exist" onerror="alert(document.cookie);">. But not <strong>all</strong> bad.`,
    event_state: `Bad image <img src="https://url.to.file.which/does-not.exist" onerror="alert(document.cookie);">. But not <strong>all</strong> bad.`,
    event_zip: `Bad image <img src="https://url.to.file.which/does-not.exist" onerror="alert(document.cookie);">. But not <strong>all</strong> bad.`,
    event_start_time: 'Naughty naughty very naughty <script>alert("xss");</script>',
    event_end_time: 'Naughty naughty very naughty <script>alert("xss");</script>',
    event_start_date: 'Naughty naughty very naughty <script>alert("xss");</script>',
    event_end_date: 'Naughty naughty very naughty <script>alert("xss");</script>',
    event_timezone: timezone.timezoneid,
    week_id: week.weekId
  };
  const expectedEvent = {
    ...makeExpectedEvent([timezone],[week], maliciousEvent),
    event_name: 'Naughty naughty very naughty &lt;script&gt;alert(\"xss\");&lt;/script&gt;',
    about_event: `Bad image <img src="https://url.to.file.which/does-not.exist">. But not <strong>all</strong> bad.`,
    event_link: 'Naughty naughty very naughty &lt;script&gt;alert(\"xss\");&lt;/script&gt;',
    event_location_name: 'Naughty naughty very naughty &lt;script&gt;alert(\"xss\");&lt;/script&gt;',
    event_street: `Bad image <img src="https://url.to.file.which/does-not.exist">. But not <strong>all</strong> bad.`,
    event_city: `Bad image <img src="https://url.to.file.which/does-not.exist">. But not <strong>all</strong> bad.`,
    event_state: `Bad image <img src="https://url.to.file.which/does-not.exist">. But not <strong>all</strong> bad.`,
    event_zip: `Bad image <img src="https://url.to.file.which/does-not.exist">. But not <strong>all</strong> bad.`,
    event_start_time: 'Naughty naughty very naughty &lt;script&gt;alert(\"xss\");&lt;/script&gt;',
    event_end_time: 'Naughty naughty very naughty &lt;script&gt;alert(\"xss\");&lt;/script&gt;',
    event_start_date: 'Naughty naughty very naughty &lt;script&gt;alert(\"xss\");&lt;/script&gt;',
    event_end_date: 'Naughty naughty very naughty &lt;script&gt;alert(\"xss\");&lt;/script&gt;',
  };
  return {
    maliciousEvent,
    expectedEvent
  }
}

function seedEvents() {

}
function seedMaliciousEvent() {
  
}


module.exports = {
  makeEventsArray,
  makeExpectedEvent,
  makeMaliciousEvent,

  seedEvents,
  seedMaliciousEvent
}