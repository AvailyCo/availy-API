BEGIN;

TRUNCATE
    events,
    hosts,
    guests
RESTART IDENTITY CASCADE;

INSERT INTO events(
    event_name,
    about_event,
    event_link,
    event_location_name,
    event_street,
    event_city,
    event_state,
    event_zip,
    event_start_time,
    event_end_time,
    event_start_date,
    event_end_date,
    event_timezone,
    week_id )

VALUES
    (
        'Party!',
        '50th birthday party',
        'https://lmgtfy.app/?q=50th+birthday+party',
        'This is an online-only event',
        null,
        null,
        null,
        null,
        now(),
        '2021-01-13 19:10:25-07',
        '2020-10-01',
        '2021-01-13',
        13,
        7
    ),
    (
        'Christmas Meetup',
        'White elephant before christmas',
        'This is an in-person only event',
        'Lucky Bar',
        '123 Test Street, #789',
        'New York',
        'NY',
        '012345',
        now(),
        '2020-12-25 19:10:25-07',
        '2020-12-15',
        '2020-12-25',
        9,
        8
    );

INSERT INTO hosts(user_id, event_id)

VALUES
    (1, 1),
    (1, 2),
    (2, 2);

INSERT INTO guests(event_id, user_id, attending)

VALUES
    (1, 1, true),
    (1, 2, true),
    (1, 3, false),
    (2, 2, true),
    (2, 3, true);

COMMIT;
