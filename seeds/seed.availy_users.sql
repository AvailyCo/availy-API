BEGIN;
INSERT INTO users(username, firstname, lastname, email, password, aboutme, avatar, date_created, date_modified, timezone, weekId)

VALUES
    ('kalin', 'Kalin', 'Ramsey', 'kalinramsey@gmail.com', 'abc1', 'I am from Arizona and the PM of Availy.', 'https://randomuser.me/api/portraits/lego/2.jpg', now(), now(), 9, 1), 
    ('ajuna', 'Ajuna', 'Prathap', 'ajunaprathap@gmail.com', 'abc2', 'I am from Pennsylvania and part of the UI/UX.', 'https://robohash.org/9Z9.png?set=set4&size=150x150', now(), now(), 14, 2), 
    ('sunny', 'Sunny', 'Lee', 'leesunny507@gmail.com', 'abc3', 'I am from New Jersey and a developer.', 'https://robohash.org/PA7.png?set=set4&size=150x150', now(), now(), 14, 3), 
    ('jing', 'Jing', 'Liang', 'jingliang0503@gmail.com', 'abc4', 'I am from Canada and part of UI/UX.', 'https://robohash.org/YP5.png?set=set4&size=150x150', now(), now(), 14, 4), 
    ('anugrah', 'Anugrah', 'Lambogo', 'lambogoai@gmail.com', 'abc5', 'I am from Illnois and a developer.', 'https://randomuser.me/api/portraits/lego/0.jpg', now(), now(), 12, 5), 
    ('dummy1', 'John', 'Doe', 'dummy1@abc.com', 'abc6', 'I am from nowhere and will remain a mystery.', 'https://randomuser.me/api/portraits/lego/6.jpg', now(), now(), 4, 6),
    ('dummy2', 'Jane', 'Doe', 'dummy2@abc.com', 'abc7', 'The way to get started is to quit talking and begin doing.', 'https://robohash.org/JaneDoe', now(), now(), 6, 7);

COMMIT;