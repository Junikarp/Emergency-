DROP SCHEMA emergency;
CREATE SCHEMA emergency;

USE emergency;


CREATE TABLE user(
id VARCHAR(50) PRIMARY KEY,
name VARCHAR(50),
password VARCHAR(50),
height INT(10),
weight INT(10),
bloodtype VARCHAR(10),
guardianTel VARCHAR(50)
);

CREATE TABLE disease(
diseaseId INT PRIMARY KEY auto_increment,
userId VARCHAR(50) NOT NULL,
category VARCHAR(50),
value VARCHAR(50),
FOREIGN KEY(userId) REFERENCES user(id)
on delete cascade
);

insert into user (id, name, password, height, weight, bloodtype, guardianTel)
values ("ssafy", "권준구", "1234", "190", "75", "O", "010-1111-1111");
insert into user (id, name, password, height, weight, bloodtype, guardianTel)
values ("dog", "강준규", "1234", "180", "85", "A", "010-2222-2222");
insert into user (id, name, password, height, weight, bloodtype, guardianTel)
values ("dog2", "오건영", "1234", "110", "95", "B", "010-3333-3333");
insert into user (id, name, password, height, weight, bloodtype, guardianTel)
values ("dog3", "최준호", "1234", "188", "65", "AB", "010-5191-0172");

insert into disease (userId, category, value)
values ("dog2", "allergy", "땅콩");
insert into disease (userId, category, value)
values ("dog2", "ulDisease", "천식");
insert into disease (userId, category, value)
values ("dog2", "sideEffect", "각혈");
insert into disease (userId, category, value)
values ("dog2", "medication", "딸기맛물약");
insert into disease (userId, category, value)
values ("ssafy", "allergy", "꽃게");
insert into disease (userId, category, value)
values ("ssafy", "ulDisease", "위염");
insert into disease (userId, category, value)
values ("ssafy", "sideEffect", "기침");
insert into disease (userId, category, value)
values ("ssafy", "medication", "포도맛물약");
insert into disease (userId, category, value)
values ("dog", "allergy", "복숭아");
insert into disease (userId, category, value)
values ("dog", "ulDisease", "기흉");
insert into disease (userId, category, value)
values ("dog", "sideEffect", "어지럼증");
insert into disease (userId, category, value)
values ("dog", "medication", "누룽지맛물약");
insert into disease (userId, category, value)
values ("dog3", "allergy", "귤");
insert into disease (userId, category, value)
values ("dog3", "ulDisease", "온갖병");
insert into disease (userId, category, value)
values ("dog3", "sideEffect", "구토");
insert into disease (userId, category, value)
values ("dog3", "medication", "홍삼맛물약");


select * from disease;
select * from user;