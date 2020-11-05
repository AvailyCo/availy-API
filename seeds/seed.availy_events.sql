BEGIN;
INSERT INTO events(event_name, about_event, event_location, event_city, event_state, event_zip, event_time, event_date, event_timezone, week_id )

VALUES
    ('Party!', '50th birthday party', 'Remote', null, null, null, now(), '2020-10-01', 13, 7),
    ('Christmas Meetup', 'White elephant before christmas', 'Lucky Bar', 'New York', 'NY', '012345', now(), '2020-12-15', 9, 8);

INSERT INTO hosts(user_id, event_id)

VALUES
    (1, 1),
    (2, 2);

INSERT INTO guests(event_id, user_id, attending)

VALUES
    (1, 1, true),
    (1, 2, true),
    (1, 3, false),
    (2, 2, true),
    (2, 3, true);

COMMIT;
