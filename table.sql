CREATE TABLE user
(
    id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    user  VARCHAR(255) NOT NULL,
    password VARCHAR(255) not null,
    online bool default false
);

CREATE TABLE astre
(
    id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    nom VARCHAR(100) not null,
    type VARCHAR(100) not null ,
    diametre float not null,
    longueurJour float,
    periodeOrbital float,
    temperatureMoyenne float default null,
    densite float,
    masse float 
);


CREATE TABLE satellite
(
    id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    astreId INT NOT NULL,
    nom VARCHAR(100) not null,
    diametre float not null,
    periodeOrbital float not null,
    temperatureMoyenne float default null,
    masse float,
    FOREIGN KEY (astreId) REFERENCES astre(id)
);

create table tag
(
      id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
      userId int,
      tag VARCHAR(255) not null,
      astreId int,
      FOREIGN KEY (userId) REFERENCES user(id),
      FOREIGN KEY (astreId) REFERENCES astre(id)

);