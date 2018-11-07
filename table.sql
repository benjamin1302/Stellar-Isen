CREATE TABLE utilisateur
(
    id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    email VARCHAR(255) NOT NULL,
    user  VARCHAR(255) NOT NULL,
    password VARCHAR(255)

);

CREATE TABLE astre
(
    id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    nom VARCHAR(100) not null,
    type VARCHAR(100) not null ,
    diametre float not null,
    longueurJour float not null,
    periodeOrbital float not null,
    temperatureMoyenne float not null,
    temperatureSurfaceMoyenne float not null,
    densite float not null,
    masse float not null
);


CREATE TABLE astre
(
    id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    astreId INT NOT NULL,
    nom VARCHAR(100) not null,
    type VARCHAR(100) not null ,
    diametre float not null,
    longueurJour float not null,
    periodeOrbital float not null,
    temperatureMoyenne float not null,
    temperatureSurfaceMoyenne float not null,
    densite float not null,
    masse float not null,
    FOREIGN KEY (astreId) REFERENCES astre(id)
);


