drop schema if exists oop2;
create schema oop2;
use oop2;

create table person (
cnp int primary key not null unique,
l_name varchar(50) not null, 
f_name varchar(50) not null, 
e_mail varchar(50) not null unique,
pass varchar(50) not null,
p_number varchar(50) not null,
p_picture varbinary(1000) not null
);

insert into person values
(1,"Bindea1","Bogdan1","test1@yahoo.com",MD5("pass1"),"073345231",10224); 

insert into person  values
(2,"Bindea2","Bogdan2","test2@yahoo.com",MD5("pass2"),"073345232",10225);

create table question (
id int primary key not null unique,
title varchar(50) not null,
c_id int references content(id)
);

create table answers (
id int primary key not null unique,
q_id int references question(id),
c_id int references content(id)

);

create table content (
id int primary key not null unique,
u_id int references person(cnp),
c_text varchar(250) not null,
c_date_time datetime not null,  
picture varbinary(1000) not null
);

create table votes (
id int primary key not null unique,
u_id int references person(cnp),
vote boolean not null,
c_id int references content(id)
);

create table tags (
id int primary key not null unique,
t_name varchar(50) not null unique,
q_id int references question(id)
);

insert into content values
(1,1,"description1",' 2020-09-10 20:20:20 ' ,1234),
(2,2,"description2",' 2020-09-10 21:21:21 ' ,4321);

insert into question values
(1,"question1",1);

insert into answers values
(1,1,2);
