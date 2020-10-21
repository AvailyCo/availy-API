DROP TABLE IF EXISTS guests;
DROP TABLE IF EXISTS hosts;
DROP TABLE IF EXISTS events;

CREATE TABLE events (
    event_id INTEGER PRIMARY KEY GENERATED BY DEFAULT AS IDENTITY,
    event_name TEXT NOT NULL,
    about_event TEXT,
    event_location TEXT NOT NULL,
    event_city TEXT,
    event_state TEXT,
    event_zip VARCHAR(10),
    event_time TIMESTAMPTZ,
    event_date DATE NOT NULL,
    event_timezone INTEGER REFERENCES timezone(timezoneId) NOT NULL,
    week_id INTEGER REFERENCES week(weekId) NOT NULL,
);

/* removed due to possibly not needing
host INTEGER REFERENCES hosts(host_id) ON DELETE CASCADE NOT NULL,
changed event_zip to varchar(10) */

CREATE TABLE hosts (
    host_id INTEGER PRIMARY KEY GENERATED BY DEFAULT AS IDENTITY,
    user_id INTEGER REFERENCES users(userId) NOT NULL,
    event_id INTEGER REFERENCES events(event_id) NOT NULL,
);

/* removed due to possibly not needing
removed ON DELETE CASCADE for user_id and event_id  */

CREATE TABLE guests (
    attending_id INTEGER PRIMARY KEY GENERATED BY DEFAULT AS IDENTITY,
    event_id INTEGER REFERENCES events(event_id) NOT NULL,
    user_id INTEGER REFERENCES users(userId),
    attending BOOLEAN NOT NULL DEFAULT false,
);

/*removed due to not sure if needed
is_member BOOLEAN NOT NULL,   
Also not sure if you want to say attending is boolean?  What should we do for not sure?*/