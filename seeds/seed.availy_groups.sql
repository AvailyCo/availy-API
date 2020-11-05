BEGIN;
INSERT INTO groups(group_name, group_image, founder, about_group, created_on)

VALUES
    ('Best Friends', null, 1, 'Group about best friends...', now()),
    ('Co-workers', null, 2, 'Coworking group', now()),
    ('Work Out Squad', 'https://images.unsplash.com/photo-1554284126-aa88f22d8b74?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60', 1, 'Workout fun', now()),
    ('Fishing Fanatics', 'https://images.unsplash.com/photo-1533060498584-2f538c6f84fc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60', 2, 'Lets go fishing!', now()),
    ('Gamers Unite!', 'https://images.unsplash.com/photo-1591196702597-062a87208fed?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60', '2', 'Playstation gaming group', now() ),
    ('Bartenders Go!', 'https://images.unsplash.com/photo-1572116469696-31de0f17cc34?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60', 3, 'Meetup at bar', now() ),
    ('Big Business, LLC', null, 4, 'Starting the business', now() ),
    ('Art Gallery Goers', 'https://images.unsplash.com/photo-1582555172866-f73bb12a2ab3?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60', 1, 'The two best things on earth, art and wine!', now() ),
    ('Rock Climbers Extreme', 'https://images.unsplash.com/photo-1570030289513-f44af3cd0944?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60', 5, 'Go for the extreme', now() ),
    ('Night Life in OH', null, 3, 'meetup for night events', now() );
COMMIT;
