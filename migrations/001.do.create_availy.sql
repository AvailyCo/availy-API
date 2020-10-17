DROP TABLE IF EXISTS hosts;
DROP TABLE IF EXISTS events;
DROP TABLE IF EXISTS guests

CREATE TABLE hosts (
    host_id INTEGER PRIMARY KEY GENERATED BY DEFAULT AS IDENTITY,
    user_id INTEGER REFERENCES accounts(id) ON DELETE CASCADE NOT NULL,
    event_id INTEGER REFERENCES events(id) ON DELETE CASCADE NOT NULL,
);

CREATE TABLE events (
    event_id INTEGER PRIMARY KEY GENERATED BY DEFAULT AS IDENTITY,
    host INTEGER REFERENCES hosts(host_id) ON DELETE CASCADE NOT NULL,
    event_name TEXT NOT NULL,
    about_event TEXT,
    event_location TEXT NOT NULL,
    event_city TEXT,
    event_state TEXT,
    event_zip INTEGER,
    event_time TIME NOT NULL,
    event_date DATE NOT NULL,
    event_timezone INTEGER REFERENCES timezone(id) NOT NULL,
    week_id INTEGER REFERENCES weekrelationship(week_id) NOT NULL,
);

CREATE TABLE guests (
    attending_id INTEGER PRIMARY KEY GENERATED BY DEFAULT AS IDENTITY,
    event_id INTEGER REFERENCES events(event_id) ON DELETE CASCADE NOT NULL,
    email_address TEXT NOT NULL,
    is_member BOOLEAN NOT NULL,
    user_id INTEGER REFERENCES accounts(id),
    is_attending BOOLEAN NOT NULL,
);