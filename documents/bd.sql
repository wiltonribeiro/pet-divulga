create table user_system(
    id_user serial,
    email varchar(15),
    password_user varchar(15),
    name_user varchar,
    registration varchar,
    status_user boolean,
    about text,
    constraint user_system_pk primary key(id_user)
);

create table course(
    id_course serial,
    name_course varchar(40),
    about text,
    link varchar(120),
    constraint course_pk primary key(id_course)
);

create table student(
    id_course integer unique,
    id_user_student integer unique,
    constraint student_pk primary key(id_course, id_user_student),
    constraint student_fk1 foreign key(id_course) references course(id_course),
    constraint student_fk2 foreign key(id_user_student) references user_system(id_user)
);

create table admin_system(
    id_user_admin integer,
    constraint admin_pk primary key(id_user_admin),
    constraint admin_fk foreign key(id_user_admin) references user_system(id_user)
);

create table advisor(
    id_user_advisor integer,
    constraint advisor_pk primary key(id_user_advisor),
    constraint advisor_fk foreign key(id_user_advisor) references user_system(id_user)
);

create table professor(
    id_user_professor integer,
    constraint professor_pk primary key(id_user_professor),
    constraint professor_fk foreign key(id_user_professor) references advisor(id_user_advisor)
);

create table administrative_techinician(
    id_user_administrative integer,
    constraint administrative_pk primary key(id_user_administrative),
    constraint administrative_fk foreign key(id_user_administrative) references advisor(id_user_advisor)
);

create table category(
    id_category serial,
    title varchar(40),
    category_description text,
    constraint category_pk primary key(id_category)
);

create table auth(
    id_auth serial,
    id_user integer,
    status_auth boolean,
    date_auth date,
    constraint auth_pk primary key(id_auth),
    constraint auth_fk foreign key(id_user) references user_system(id_user)
);

create table publication(
    id_publication serial,
    id_auth integer,
    id_category integer,
    title varchar(120),
    publication_description varchar(400),
    content text,
    date_publication date,
    constraint publication_pk primary key(id_publication),
    constraint publication_fk foreign key(id_auth) references auth(id_auth),
    constraint publication_fk2 foreign key(id_category) references category(id_category)
);

create table img(
    id_img serial,
    id_publication integer,
    link varchar,
    constraint img_pk primary key(id_img),
    constraint img_fk foreign key(id_publication) references publication(id_publication)
);

create table tag(
    id_tag serial,
    content varchar(40),
    constraint tag_pk primary key(id_tag)
);

create table publication_has_tag(
    id_publication integer,
    id_tag integer,
    constraint publication_has_tag_pk primary key(id_publication, id_tag),
    constraint publication_has_tag_fk foreign key(id_publication) references publication(id_publication),
    constraint publication_has_tag_fk2 foreign key(id_tag) references tag(id_tag)
);

create table comment(
    id_comment serial,
    id_publication integer,
    id_user integer,
    content varchar,
    date_comment date,
    constraint comment_pk primary key(id_comment),
    constraint comment_fk foreign key(id_publication) references publication(id_publication),
    constraint comment_fk2 foreign key(id_user) references user_system(id_user)
);

create table likes(
    id_user integer,
    id_publication integer,
    constraint likes_pk primary key(id_user, id_publication),
    constraint likes_fk foreign key(id_user) references user_system(id_user),
    constraint likes_fk2 foreign key(id_publication) references publication(id_publication)
);

create table student_has_publication(
    id_user_student integer,
    id_publication integer,
    constraint student_has_publication_pk primary key(id_user_student, id_publication),
    constraint student_has_publication_fk foreign key(id_user_student) references student(id_user_student),
    constraint student_has_publication_fk2 foreign key(id_publication) references publication(id_publication)
);

create table advisor_has_publication(
    id_user_advisor integer,
    id_publication integer,
    constraint advisor_has_publication_pk primary key(id_user_advisor, id_publication),
    constraint advisor_has_publication_fk foreign key(id_user_advisor) references advisor(id_user_advisor),
    constraint advisor_has_publication_fk2 foreign key(id_publication) references publication(id_publication)
);