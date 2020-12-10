ALTER TABLE IF EXISTS events
  DROP COLUMN event_location,
  DROP COLUMN event_time,
  DROP COLUMN event_date;
  
ALTER TABLE IF EXISTS events
  ADD COLUMN event_link TEXT NOT NULL,
  ADD COLUMN event_location_name TEXT NOT NULL,
  ADD COLUMN event_street TEXT,
  ADD COLUMN event_start_time TIMESTAMPTZ,
  ADD COLUMN event_end_time TIMESTAMPTZ,
  ADD COLUMN event_start_date DATE NOT NULL,
  ADD COLUMN event_end_date DATE NOT NULL;