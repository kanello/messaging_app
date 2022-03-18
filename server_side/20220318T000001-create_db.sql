DROP TABLE IF EXISTS users;
CREATE TABLE users (
	user_id INTEGER PRIMARY KEY AUTOINCREMENT,
	user_name varchar unique,
	user_password varchar 
);

DROP TABLE IF EXISTS channels;
CREATE TABLE channels (
	channel_id INTEGER PRIMARY KEY AUTOINCREMENT,
	channel_name varchar unique
    -- PRIMARY KEY (channel_id)
);

DROP TABLE IF EXISTS messages;
CREATE TABLE messages (
	msg_id INTEGER PRIMARY KEY AUTOINCREMENT,
	message_body varchar,
	sent_time timestamp,
	user_id varchar,
	channel_id int,
    -- PRIMARY KEY (msg_id),
    foreign key (channel_id) references channels(channel_id),
    foreign key (user_id) references users(user_id)

);

DROP TABLE IF EXISTS replies;
CREATE TABLE replies (
	reply_id INTEGER PRIMARY KEY AUTOINCREMENT,
    reply_body varchar,
	sent_time timestamp,
	msg_id int,
	user_id varchar,
    -- PRIMARY key (reply_id),
    foreign key (msg_id) references messages(msg_id),
    foreign key (user_id) references users(user_id)

);

DROP TABLE IF EXISTS latest_seen;
CREATE TABLE latest_seen (
	user_id varchar,
	msg_id varchar,
    foreign key (user_id) references users(user_id),
    foreign key (msg_id) references messages(msg_id)

);

drop view if EXISTS v_replies_user;
create view v_replies_user as
select     
    u.user_name,
    r.reply_body,
    r.sent_time,
    r.msg_id,
    r.reply_id
from users u 
join replies r using (user_id);





--this view is going to help us get organised with messages and replies
drop view if EXISTS v_messages;
create view v_messages as
select 
    u.user_id,
    u.user_name,
    m.msg_id,
    m.message_body,
    m.sent_time,
    m.channel_id
from users u
join messages m using (user_id);