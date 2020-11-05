DROP TABLE IF EXISTS group_members;
DROP TYPE IF EXISTS permissions;
DROP TABLE IF EXISTS groups;

CREATE TABLE groups (
  groupId INTEGER PRIMARY KEY GENERATED BY DEFAULT AS IDENTITY,
  group_name TEXT NOT NULL,
  group_image TEXT,
  founder INTEGER REFERENCES users(userId) ON DELETE SET NULL,
  about_group TEXT,
  created_on TIMESTAMPTZ DEFAULT now() NOT NULL
);

CREATE TYPE permissions AS ENUM (
  'Founder',
  'Admin',
  'Member',
  'Applicant'
);

CREATE TABLE group_members (
  grpMemsId INTEGER PRIMARY KEY GENERATED BY DEFAULT AS IDENTITY,
  group_id INTEGER REFERENCES groups(groupId) ON DELETE SET NULL,
  member_id INTEGER REFERENCES users(userId) ON DELETE SET NULL,
  member_level permissions DEFAULT 'Applicant' NOT NULL,
  join_date TIMESTAMPTZ DEFAULT now() NOT NULL
);
