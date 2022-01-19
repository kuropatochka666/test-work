CREATE TABLE IF NOT EXISTS public.cars
(
    id serial,
    car_number character varying(100) NOT NULL,
    car_name character varying(100) NOT NULL,
    CONSTRAINT car_pkey PRIMARY KEY (id)
    );

CREATE TABLE IF NOT EXISTS public.rent
(
    id serial,
    car_id integer references cars NOT NULL,
    start_session timestamp with time zone NOT NULL,
    end_session timestamp with time zone NOT NULL,
    price integer NOT NULL,
    CONSTRAINT rent_pkey PRIMARY KEY (id)
    );

CREATE TABLE IF NOT EXISTS public.tariffs
(
    id serial,
    start_date integer NOT NULL,
    end_date integer NOT NULL,
    percent_sale integer NOT NULL,
    CONSTRAINT tariff_pkey PRIMARY KEY (id)
    );
CREATE TABLE IF NOT EXISTS public.prices
(
    id serial,
    price integer NOT NULL,
    alias VARCHAR (50) NOT NULL,
    CONSTRAINT prices_pkey PRIMARY KEY (id),
    UNIQUE(alias)
    );

INSERT INTO cars (car_number, car_name) VALUES
('А111АА', 'KIO RIO'),
('В222ВВ', 'Hyundai Solaris'),
('Е333ЕЕ', 'Renault Logan'),
('К444КК', 'Chevrolet Camaro'),
('С555СС', 'Tesla Model S');

INSERT INTO rent (car_id, start_session, end_session, price) VALUES
(1, '2020-01-21', '2020-01-22', 2000),
(2, '2020-02-01', '2020-02-09', 8750),
(3, '2020-02-01', '2020-02-17', 15950),
(4, '2022-05-12', '2022-05-19', 7800),
(1, '2020-03-01', '2020-03-29', 26150),
(3, '2020-03-01', '2020-03-05', 4950);

INSERT INTO tariffs (start_date, end_date, percent_sale) VALUES
(5, 9, 5),
(10, 17, 10),
(18, 29, 15);

INSERT INTO prices (price, alias) VALUES
(1000, 'base');
