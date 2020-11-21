BEGIN;
INSERT INTO contacts(user1_id, user2_id, blocked, blocked_by, date_connected)

VALUES
    (1, 2, false, null, now()),
    (1, 3, false, null, now()),
    (1, 4, false, null, now()),
    (1, 5, false, null, now()),
    (1, 6, false, null, now()),
    (3, 4, false, null, now()),
    (3, 5, false, null, now()),
    (4, 5, false, null, now()),
    (7, 1, true, null, now());
COMMIT;