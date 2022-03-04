DROP TABLE IF EXISTS users;
CREATE TABLE users (
	user_id varchar unique,
	user_name varchar unique,
	user_password varchar,
    PRIMARY KEY(user_id) 
);

DROP TABLE IF EXISTS channels;
CREATE TABLE channels (
	channel_id int unique,
	channel_name varchar unique,
    PRIMARY KEY (channel_id)
);

DROP TABLE IF EXISTS messages;
CREATE TABLE messages (
	msg_id int unique,
	message_body varchar,
	sent_time timestamp,
	author_id varchar,
	channel_id int,
    PRIMARY KEY (msg_id),
    foreign key (channel_id) references channels(channel_id),
    foreign key (author_id) references users(user_id)

);

DROP TABLE IF EXISTS replies;
CREATE TABLE replies (
	reply_id int,
    reply_body varchar,
	sent_time timestamp,
	message_id int,
	author_id varchar,
    PRIMARY key (reply_id),
    foreign key (message_id) references messages(msg_id),
    foreign key (author_id) references users(user_id)

);

DROP TABLE IF EXISTS latest_seen;
CREATE TABLE latest_seen (
	user_id varchar,
	msg_id varchar,
    foreign key (user_id) references users(user_id),
    foreign key (msg_id) references messages(msg_id)

);