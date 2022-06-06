create table product (
	id serial primary key,
	name text,
	description text,
	price numeric,
	width integer,
	height integer,
	length integer,
	weight integer
);

create table coupon (
	code text,
	percentage numeric,
	expire_date timestamp,
	primary key (code)
);

create table p_order (
	id serial,
	coupon text,
	code text,
	cpf text,
	issue_date timestamp,
	freight numeric,
	total numeric,
	sequence numeric,
	primary key (id)
);

create table order_product (
	id_order integer,
	id_product integer,
	price numeric,
	quantity integer,
	primary key (id_order, id_product)
);