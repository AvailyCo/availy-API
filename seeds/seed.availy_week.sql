BEGIN;
INSERT INTO week(sun_am_id, sun_pm_id, mon_am_id, mon_pm_id, tue_am_id, tue_pm_id, wed_am_id, wed_pm_id, thu_am_id, thu_pm_id, fri_am_id, fri_pm_id, sat_am_id, sat_pm_id, week_type)

VALUES
    /*user availabilities weeks*/
    (1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 'availability'),
    (2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 'availability'),
    (3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 'availability'),
    (4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 'availability'),
    (5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 'availability'),
    (6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 'availability'),

    /*event weeks*/
    (7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 'event'),
    (8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 'event');

COMMIT;