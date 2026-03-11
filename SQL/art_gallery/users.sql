create table art_gallery.users
(
    id         int auto_increment
        primary key,
    first_name varchar(255) null,
    last_name  varchar(255) null,
    email      varchar(255) null,
    password   varchar(255) null,
    constraint email
        unique (email)
);

