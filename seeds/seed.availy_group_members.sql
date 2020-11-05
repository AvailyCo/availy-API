BEGIN;
INSERT INTO group_members(group_id, member_id, member_level, join_date)

VALUES
    (1, 1, 'Founder', now() ),
    (1, 2, 'Admin', now() ),
    (1, 3, 'Member', now() ),
    (1, 4, 'Applicant', now() ),
    (1, 5, 'Member', now() ),
    (2, 2, 'Founder', now() ),
    (2, 3, 'Admin', now() ),
    (2, 4, 'Member', now()),
    (2, 5, 'Applicant', now() ),
    (3, 1, 'Founder', now() ),
    (3, 4, 'Admin', now() ),
    (3, 5, 'Member', now() ),
    (4, 2, 'Founder', now() ),
    (4, 5, 'Member', now() ),
    (5, 2, 'Founder', now() ),
    (6, 3, 'Founder', now() ),
    (6, 1, 'Applicant', now() ),
    (7, 4, 'Founder', now() ), 
    (7, 2, 'Admin', now() ), 
    (8, 1, 'Founder', now() ),
    (9, 5, 'Founder', now() ),
    (9, 6, 'Member', now() ),
    (9, 1, 'Member', now() ),
    (10, 4, 'Member', now() ), 
    (10, 3, 'Founder', now() );
COMMIT;