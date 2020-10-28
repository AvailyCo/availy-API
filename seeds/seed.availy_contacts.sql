BEGIN;
INSERT INTO contacts(user1_id, user2_id, blocked, blocked_by, date_connected)

VALUES
    (0, 1, false, null, now()),
    (0, 2, false, null, now()),
    (0, 3, false, null, now()),
    (0, 4, false, null, now()),
    (0, 5, false, null, now()),
    (2, 3, false, null, now()),
    (2, 4, false, null, now()),
    (3, 4, false, null, now()),
    (6, 0, true, 6, now());
COMMIT;