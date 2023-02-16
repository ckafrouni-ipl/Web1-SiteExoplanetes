CREATE TABLE exoplanets.exoplanets
(
	id             SERIAL PRIMARY KEY,
	unique_name    VARCHAR(50) UNIQUE NOT NULL,
	h_class        VARCHAR(100),
	discovery_year INT,
	ist            DOUBLE PRECISION,
	p_class        VARCHAR(100)
);

INSERT INTO exoplanets.exoplanets (unique_name, h_class, discovery_year, ist, p_class)
VALUES ('TRAPPIST-1-d', 'Mésoplanète', 2016, 0.9, 'Sous-terrienne chaude'),
	   ('KOI-1686.01', 'Mésoplanète', 2011, 0.89, 'Super-terrienne chaude'),
	   ('LHS 1723 b', 'Mésoplanète', 2017, 0.89, 'Super-terrienne chaude');