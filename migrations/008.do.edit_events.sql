ALTER TABLE events
  DROP COLUMN event_location,
  DROP COLUMN event_time,
  DROP COLUMN event_date;

ALTER TABLE events
  ADD COLUMN event_link TEXT NOT NULL,
  ADD COLUMN event_street TEXT NOT NULL,
  ADD COLUMN event_start_time TIMESTAMPTZ NOT NULL,
  ADD COLUMN event_end_time TIMESTAMPTZ NOT NULL,
  ADD COLUMN event_start_date DATE NOT NULL,
  ADD COLUMN event_end_date DATE NOT NULL;