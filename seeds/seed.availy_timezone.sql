/*https://en.wikipedia.org/wiki/List_of_time_zone_abbreviations*/
BEGIN;

TRUNCATE timezone RESTART IDENTITY CASCADE;

INSERT INTO timezone(zonename, zoneoffset, zonedesc)

VALUES
    ('BIT', '-12:00', 'Baker Island Time'), 
    ('SST', '-11:00', 'Samoa Standard Time'),
    ('HST', '-10:00', 'Hawaii-Aleutian Standard Time'),
    ('MIT', '-09:30', 'Marquesas Islands Time'),
    ('AKST', '-09:00', 'Alaska Standard Time'),
    ('HDT', '-09:00', 'Hawaii-Aleutian Daylight Time'),
    ('PST', '-08:00', 'Pacific Standard Time'),
    ('AKDT', '-08:00', 'Alaska Daylight Time'),
    ('PDT', '-07:00', 'Pacific Daylight Time'),
    ('MST', '-07:00', 'Mountain Standard Time'),
    ('MDT', '-06:00', 'Mountain Daylight Time'),
    ('CST', '-06:00', 'Central Standard Time'),
    ('CDT', '-05:00', 'Central Daylight Time'),
    ('EST', '-05:00', 'Eastern Standard Time'),
    ('EDT', '-04:00', 'Eastern Daylight Time'),
    ('AST', '-04:00', 'Atlantic Standard Time'),
    ('NST', '-03:30', 'Newfoundland Standard Time'),
    ('ADT', '-03:00', 'Atlantic Daylight Time'),
    ('WGT', '-03:00', 'West Greenland Time'),
    ('NDT', '-02:30', 'Newfoundland Daylight Time'),
    ('GST', '-02:00', 'South Georgia and the South Sandwich Islands Time'),
    ('EGT', '-01:00', 'Eastern Greenland Time'),
    ('UTC', '+00:00', 'Universal Time, Coordinated'),
    ('CET', '+01:00', 'Central European Time'),
    ('EET', '+02:00', 'Eastern European Time'),
    ('MSK', '+03:00', 'Moscow Time'),
    ('IRST', '+03:30', 'Iran Standard Time'),
    ('GST', '+04:00', 'Gulf Standard Time'),
    ('AFT', '+04:30', 'Afghanistan Time'),
    ('IRDT', '+04:30', 'Iran Daylight Time'),
    ('ORAT', '+05:00', 'Oral Time'),
    ('IST', '+05:30', 'Indian Standard Time'),
    ('NPT', '+05:45', 'Nepal Time'),
    ('BST', '+06:00', 'Bangladesh Standard Time'),
    ('MMT', '+06:30', 'Myanmar Standard Time'),
    ('WIB', '+07:00', 'Western Indonesian Time'),
    ('CST', '+08:00', 'China Standard Time'),
    ('ACWST', '+08:45', 'Australian Central Western Standard Time'),
    ('JST', '+09:00', 'Japan Standard Time'),
    ('ACST', '+09:30', 'Australian Central Standard Time'),
    ('AET', '+10:00', 'Australian Eastern Time'),
    ('ACDT', '+10:30', 'Australian Central Daylight Saving Time'),
    ('AEDT', '+11:00', 'Australian Eastern Daylight Saving Time'),
    ('MHT', '+12:00', 'Marshall Islands Time'),
    ('CHAST', '+12:45', 'Chatham Standard Time'),
    ('TOT', '+13:00', 'Tonga Time'),
    ('NZDT', '+13:00', 'New Zealand Daylight Time'),
    ('CHADT', '+13:45', 'Chatham Daylight Time'),
    ('LINT', '+14:00', 'Line Islands Time');

COMMIT;