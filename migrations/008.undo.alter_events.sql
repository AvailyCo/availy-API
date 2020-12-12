ALTER TABLE IF EXISTS events
  ADD COLUMN event_location,
  ADD COLUMN event_time,
  ADD COLUMN event_date;
  
ALTER TABLE IF EXISTS events
  DROP COLUMN event_link TEXT NOT NULL,
  DROP COLUMN event_location_name TEXT NOT NULL,
  DROP COLUMN event_street TEXT,
  DROP COLUMN event_start_time TIMESTAMPTZ,
  DROP COLUMN event_end_time TIMESTAMPTZ,
  DROP COLUMN event_start_date DATE NOT NULL,
  DROP COLUMN event_end_date DATE NOT NULL;