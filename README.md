# CompanyEmployeesManage
html+css+js+ajax+json+php+mariadb
2016.10.22创建test分支

2016.11.19 完成数据交互

database: CompanyEmployee

tables: department,member,position,tolr,user,user_role

department:

id   int  primary key auto_increment

name  varchar(30) not null

member:

id  int(6) primary key auto_increment

name varchar(20) not null

birth int not null

addr varchar(100) not null

sex char(10) not null

Department_id int 外键（department -> id）

Position_id int 外键(position -> id)

position:

id int primary key auto_increment

name varchar(20) not null

role:

id int primary key auto_increment

rolename varchar(30) not null

description varchar(60) not null

depart_id int not null

user:

id int primary key auto_increment

username varchar(20) not null

password varchar(30) not null

user_role:

user_id int 外键（user -> id）

role_id int 外键（role -> id）
