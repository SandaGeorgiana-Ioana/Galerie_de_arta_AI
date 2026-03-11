create table art_gallery.sales
(
    id_sale     int auto_increment
        primary key,
    id_art      int            null,
    sale_price  decimal(10, 2) null,
    sale_date   date           null,
    client_info text           null,
    constraint sales_ibfk_1
        foreign key (id_art) references art_gallery.art (id_art)
            on delete cascade
);

create index id_art
    on art_gallery.sales (id_art);

