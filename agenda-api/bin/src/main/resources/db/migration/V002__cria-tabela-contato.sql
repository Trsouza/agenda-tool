create table contato (
	id bigint not null auto_increment,
    nome varchar(100) not null,
    email varchar(100) not null,
    telefone varchar(20) not null,   
    cliente_id bigint not null,
    primary key (id)
);

alter table contato add constraint f_contato_cliente foreign key  (cliente_id) references cliente (id);