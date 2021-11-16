-- Creating the database
CREATE DATABASE icacie;
-- Creating the user table
CREATE TABLE icacie.User (
    UserId INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    UserMailAddress VARCHAR(64) NOT NULL,
    UserPassword VARCHAR(64) NOT NULL,
    UserFirstName VARCHAR(64) NOT NULL,
    UserLastName VARCHAR(64) NOT NULL
);