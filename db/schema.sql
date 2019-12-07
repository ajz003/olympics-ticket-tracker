USE lz7jjz2umsj81jvx;

DROP TABLE user;

CREATE TABLE user (
	user_id INT AUTO_INCREMENT PRIMARY KEY,
	tel_number VARCHAR(25) UNIQUE,
    subscribed BOOLEAN DEFAULT TRUE
);


INSERT INTO user (tel_number, subscribed) VALUES ('***REMOVED***', FALSE);
INSERT INTO user (tel_number, subscribed) VALUES ('+18057285107', FALSE);
INSERT INTO user (tel_number, subscribed) VALUES ('***REMOVED***', FALSE);

select * from user;


DROP TABLE user;

CREATE TABLE user (
	user_id INT AUTO_INCREMENT PRIMARY KEY,
	tel_number VARCHAR(25) UNIQUE,
    subscribed BOOLEAN DEFAULT TRUE
);


INSERT INTO user (tel_number, subscribed) VALUES ('***REMOVED***', FALSE);
INSERT INTO user (tel_number, subscribed) VALUES ('+18057285107', FALSE);
INSERT INTO user (tel_number, subscribed) VALUES ('***REMOVED***', FALSE);

DELETE FROM user WHERE user_id >= 0;

select * from user;
