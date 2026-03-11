create table art_gallery.art
(
    id_art          int auto_increment
        primary key,
    id_artist       int            null,
    art_name        varchar(255)   null,
    art_description text           null,
    price           decimal(10, 2) null,
    constraint art_ibfk_1
        foreign key (id_artist) references art_gallery.artist (id_artist)
            on delete cascade
);

create index id_artist
    on art_gallery.art (id_artist);

