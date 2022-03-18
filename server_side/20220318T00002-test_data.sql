insert into users (user_id, user_name, user_password) values ('1', 'uhtred', 'iloveskade');
insert into users (user_id, user_name, user_password) values ('2', 'Odysseus', 'ithaca');

insert into channels (channel_id, channel_name) values ('1', 'reclaiming home');
insert into channels (channel_id, channel_name) values ('2', 'travels');


insert into messages (msg_id, message_body, sent_time, user_id, channel_id) values ('1', '2022 will be the year', '2022-01-01 00:00:01', '2', '1');
insert into messages (msg_id, message_body, sent_time, user_id, channel_id) values ('2', 'you should visit me in bebanburg soon', '2022-01-01 00:00:01', '1', '2');

insert into replies (reply_id, reply_body, sent_time, msg_id, user_id) values ('1', '#praisehim', '2022-01-01 00:01:02', '1', '1');
insert into replies (reply_id, reply_body, sent_time, msg_id, user_id) values ('2', 'idk, i like the sun here', '2022-01-01 00:01:02', '2', '2');

insert into latest_seen (user_id, msg_id) values ('1', '1');
insert into latest_seen (user_id, msg_id) values ('2', '1');



